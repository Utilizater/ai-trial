import OpenAI from 'openai';
export const jsonToObjectGPT3dot5 = (content: string): any => {
  return JSON.parse(content);
};

export const jsonToObjectGPT4o = (content: string): any => {
  try {
    console.log('initial content', content);

    // Find the first occurrence of '{' or '[' and the last occurrence of '}' or ']'
    const firstBraceIndex = Math.min(
      content.indexOf('{') !== -1
        ? content.indexOf('{')
        : Number.MAX_SAFE_INTEGER,
      content.indexOf('[') !== -1
        ? content.indexOf('[')
        : Number.MAX_SAFE_INTEGER
    );
    const lastBraceIndex = Math.max(
      content.lastIndexOf('}') !== -1
        ? content.lastIndexOf('}')
        : Number.MIN_SAFE_INTEGER,
      content.lastIndexOf(']') !== -1
        ? content.lastIndexOf(']')
        : Number.MIN_SAFE_INTEGER
    );

    if (
      firstBraceIndex === Number.MAX_SAFE_INTEGER ||
      lastBraceIndex === Number.MIN_SAFE_INTEGER
    ) {
      throw new Error('Invalid JSON format');
    }

    // Extract the JSON string
    content = content.slice(firstBraceIndex, lastBraceIndex + 1).trim();
    console.log('after update', content);
    return JSON.parse(content);
  } catch (error) {
    console.log('not parsed message - ', content);
    throw error;
  }
};

const model = 'gpt-4o';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type LlmMessage = {
  role: string;
  content: string;
};

export async function getAnswer(prompt: string): Promise<string> {
  const data = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: 'assistant',
        content: prompt,
      },
    ] as any,
    stream: false,
  });
  return data.choices[0].message.content || '';
}

export async function getAiData(messages: LlmMessage[]) {
  const data = await openai.chat.completions.create({
    model,
    messages: messages as any,
    stream: false,
  });

  return data.choices[0].message.content;
}

export async function sendMessage(
  messages: LlmMessage[],
  content: string,
  customRole: string
): Promise<string> {
  const formattedContent = `${customRole}: ${content}`;
  messages.push({ role: 'user', content: formattedContent });

  const stream = await openai.chat.completions.create({
    model,
    messages: messages as any,
    stream: true,
  });

  let fullResponse = '';

  for await (const chunk of stream) {
    if (chunk.choices[0]?.delta?.content) {
      const text = chunk.choices[0].delta.content;
      process.stdout.write(text);
      fullResponse += text;
    }
  }

  messages.push({
    role: 'assistant',
    content: fullResponse,
  });

  return fullResponse;
}
