import { NextApiRequest, NextApiResponse } from 'next';
import {
  generateITrialSequence,
  schema,
} from '../assistantCore/helper/generateITrialSequence';
import { fetchWithRetry } from '../assistantCore/helper/jsonValidator';
import { TrialController, ITrialSequence } from '../assistantCore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method != 'POST') {
  //   res.setHeader('Allow', ['POST']);
  //   res.status(405).end(`Method ${req.method} Not Allowed`);
  //   return;
  // }
  // const prompt = req.body?.prePrompt as string;
  const prompt = req.query.prePrompt as string;
  if (!prompt) {
    res.status(400).send('prePrompt must be provided');
    return;
  }
  try {
    const trialSequence = (await fetchWithRetry(
      generateITrialSequence,
      prompt,
      schema,
      5
    )) as ITrialSequence[];

    const trialController = new TrialController(trialSequence, prompt);
    // await trialController.startTrial();
    res.send(trialSequence);
  } catch (error) {
    console.log('error!', error);
    res.status(500).send(error);
  }
}
