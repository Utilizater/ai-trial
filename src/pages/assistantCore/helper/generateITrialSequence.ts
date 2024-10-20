import { getAnswer, jsonToObjectGPT4o } from '../helper';

export const schema = {
  type: 'array',
  minItems: 2,
  items: {
    type: 'object',
    properties: {
      role: { type: 'string' },
      prompt: { type: 'string' },
      name: { type: 'string' },
    },
    required: ['role', 'prompt'],
    additionalProperties: true,
  },
};

export const generateITrialSequence = async (trialContext: string) => {
  const promptForAi = `
  Given the following trial context:

  ${trialContext}

  Please generate a JSON array of objects adhering to the following interface (Type Script):

  interface ITrialSequence {
    role: string;
    name?: string;
    prompt: string;
  }

  Each object in the array represents a step in the trial sequence. Use appropriate roles from this set (strictly): "prosecutor", "lawyer", "defendant", "defense_witness", "prosecution_witness" and "judge" for last message (with specific names if necessary). For each step, specify:

	•	role: The role of the person speaking or acting. ["prosecutor", "lawyer", "defendant", "defense_witness", "prosecution_witness", "judge"]
	•	name: The name of the person (if applicable, e.g., for witnesses or the defendant).
	•	prompt: A brief description of what judge requests to say or do at this point in the trial.

  Include typical trial stages like opening statements, direct and cross-examinations of witnesses, closing arguments, and the judge’s final decision. Ensure that the JSON is properly formatted and follows the structure of the provided interface.”

  By using this prompt, the LLM should generate a JSON file in the required format based on any given trial context.

  Example Output (json):
  [
    {
      "role": "prosecutor",
      "prompt": "Provide opening statement to the court."
    },
    {
      "role": "lawyer",
      "prompt": "Provide opening statement to the court."
    },
    {
      "role": "Prosecutor",
      "prompt": "Direct examination of the first prosecution witness."
    },
    {
      "role": "prosecution_witness",
      "name": "Nick",
      "prompt": "Answer the prosecutor’s question."
    },
    {
      "role": "lawyer",
      "prompt": "Cross-examination of the first prosecution witness."
    },
    {
      "role": "prosecutor",
      "prompt": "Direct examination of the second prosecution witness."
    },
    {
      "role": "defense_witness",
      "name": "Emily",
      "prompt": "Answer the prosecutor’s question."
    },
    {
      "role": "lawyer",
      "prompt": "Cross-examination of the second prosecution witness."
    },
    {
      "role": "prosecutor",
      "prompt": "Prosecution rests their case."
    },
    {
      "role": "lawyer",
      "prompt": "Direct examination of the first defense witness."
    },
    {
      "role": "defense_witness",
      "name": "John",
      "prompt": "Answer the defense lawyer’s question."
    },
    {
      "role": "Prosecutor",
      "prompt": "Cross-examination of the first defense witness."
    },
    {
      "role": "Lawyer",
      "prompt": "Direct examination of the second defense witness."
    },
    {
      "role": "defense_witness",
      "name": "Emily",
      "prompt": "Answer the defense lawyer’s question."
    },
    {
      "role": "prosecutor",
      "prompt": "Cross-examination of the second defense witness."
    },
    {
      "role": "lawyer",
      "prompt": "Defense rests their case."
    },
    {
      "role": "prosecutor",
      "prompt": "Question the defendant."
    },
    {
      "role": "defendant",
      "name": "Clark",
      "prompt": "Answer the prosecutor’s question."
    },
    {
      "role": "lawyer",
      "prompt": "Question the defendant."
    },
    {
      "role": "defendant",
      "name": "Clark",
      "prompt": "Answer the defense lawyer’s question."
    },
    {
      "role": "prosecutor",
      "prompt": "Provide closing argument to the court."
    },
    {
      "role": "lawyer",
      "prompt": "Provide closing argument to the court."
    },
    {
      "role": "judge",
      "prompt": "Make a final decision. Is the defendant guilty or not guilty based on the evidence and arguments presented?"
    }
  ]

  as you can see Judge has only last requested - to make a final decision. 

  `;

  const answer = await getAnswer(promptForAi);
  // console.log('answer!', answer);
  const parsedAnswer = jsonToObjectGPT4o(answer);
  // console.log('parsedAnswer!', parsedAnswer);
  return parsedAnswer;
};
