import Ajv from 'ajv';

export const fetchWithRetry = async (
  fetchFunction: (input: string) => Promise<string>,
  functionInput: string,
  schema: any,
  maxAttempts: number
): Promise<any> => {
  let attempts = 0;
  let parsedAnswer;
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  while (attempts < maxAttempts) {
    try {
      parsedAnswer = await fetchFunction(functionInput);
      console.log('fetchWithRetry answer', parsedAnswer);
      if (validate(parsedAnswer)) {
        return parsedAnswer;
      }
      throw new Error('incorrect structure');
    } catch (error) {
      console.log(`Attempt ${attempts + 1} failed:`, error);
      attempts += 1;
      if (attempts >= maxAttempts) {
        throw new Error('Max attempts reached. Could not fetch valid answer.');
      }
    }
  }
};
