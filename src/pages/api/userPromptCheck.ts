import { NextApiRequest, NextApiResponse } from 'next';
import { prePromptCheck, schema } from '../assistantCore/helper/prePromptCheck';
import { fetchWithRetry } from '../assistantCore/helper/jsonValidator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  const prePrompt = req.body?.prePrompt as string;
  if (!prePrompt) {
    res.status(400).send('prePrompt must be provided');
    return;
  }
  try {
    const parsedAnswer = await fetchWithRetry(
      prePromptCheck,
      prePrompt,
      schema,
      5
    ); // 5 attempts
    res.send(parsedAnswer);
  } catch (error) {
    console.log('error!', error);
    res.status(500).send(error);
  }
}
