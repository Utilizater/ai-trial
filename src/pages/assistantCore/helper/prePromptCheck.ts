import { getAnswer, jsonToObjectGPT4o } from '../helper';
// import { jsonToObjectGPT4o } from '';

export const schema = {
  type: 'object',
  properties: {
    isPrePrePromptValid: { type: 'boolean' },
    explanation: { type: 'string' },
  },
  required: ['isPrePrePromptValid', 'explanation'],
};

export const prePromptCheck = async (
  userPrePrompt: string
): Promise<string> => {
  const promptForAi = `
  You are an AI assistant tasked with validating user-provided preprompts for a courtroom trial simulation. Your goal is to check whether the preprompt is correctly formatted and contains all necessary elements. A correct preprompt must include:

  The role of the defendant.
  The accusation or charges against the defendant.
  Evidence supporting the accusation.
  If the preprompt is valid, return a JSON response with:

  "isPrePrePromptValid": true
  "explanation": "The preprompt is valid."
  If the preprompt is invalid, return a JSON response with:

  "isPrePrePromptValid": false
  "explanation": "Explanation of what is missing or incorrect."
  Example of a correct preprompt:
  "The defendant, a high-profile tech executive, is accused of embezzling millions of dollars from their company. The evidence includes financial records, witness testimonies from employees, and an incriminating email trail."

  Example of an invalid preprompt:
  "The defendant is accused of embezzling money. Evidence includes financial records."

  Response for valid preprompt:

  json
  {
    "isPrePrePromptValid": true,
    "explanation": "The preprompt is valid."
  }
  Response for invalid preprompt:

  json
  {
    "isPrePrePromptValid": false,
    "explanation": "The preprompt is missing the role of the defendant and detailed evidence."
  }
  User Preprompt:
  ${userPrePrompt}

  Instructions:
  Analyze the user-provided preprompt above and determine if it meets the criteria for a valid preprompt. Return your evaluation in the specified JSON format.
  `;

  const answer = await getAnswer(promptForAi);
  const parsedAnswer = jsonToObjectGPT4o(answer);

  return parsedAnswer;
};
