import { NextApiRequest, NextApiResponse } from 'next';
import { TrialController, ITrialSequence, sequence } from '../assistantCore';
import {
  generateITrialSequence,
  schema,
} from '../assistantCore/helper/generateITrialSequence';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const prompt = req.query.prompt as string;
  const prosecutorName = req.query.prosecutorName as string;
  const judgeName = req.query.judgeName as string;
  // console.log('prosecutorName', prosecutorName);
  // console.log('judgeName', judgeName);
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt must be provided' });
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const sendData = (data: any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    //@ts-ignore
    if (res.flush) {
      //@ts-ignore
      res.flush();
    }
  };

  try {
    sendData({ type: 'connection', status: 'established' });

    const trialSequence = sequence;
    // const trialSequence = await generateITrialSequence(prompt, schema) as ITrialSequence[];
    sendData(trialSequence);
    const options = {
      ...(judgeName ? { judgeName } : {}),
      ...(prosecutorName ? { prosecutorName } : {}),
    };
    const trialController = new TrialController(trialSequence, prompt, options);
    await trialController.startTrial(sendData);

    res.end();
  } catch (error) {
    console.error('Error in SSE handler:', error);
    //@ts-ignore
    sendData({
      type: 'error',
      message: 'An error occurred',
      //@ts-ignore
      details: error.message,
    });
    res.end();
  }

  req.on('close', () => {
    console.log('SSE connection closed');
  });
}
