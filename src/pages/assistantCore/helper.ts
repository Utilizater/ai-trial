import Anthropic from '@anthropic-ai/sdk';

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
        : Number.MAX_SAFE_INTEGER,
    );
    const lastBraceIndex = Math.max(
      content.lastIndexOf('}') !== -1
        ? content.lastIndexOf('}')
        : Number.MIN_SAFE_INTEGER,
      content.lastIndexOf(']') !== -1
        ? content.lastIndexOf(']')
        : Number.MIN_SAFE_INTEGER,
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

// Using Claude 3.5 Sonnet as the model
const model = 'claude-sonnet-4-6';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type LlmMessage = {
  role: string;
  content: string;
};

// Helper function to convert messages to Anthropic format
function convertToAnthropicMessages(messages: LlmMessage[]): {
  system?: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
} {
  const systemMessages: string[] = [];
  const conversationMessages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }> = [];

  for (const msg of messages) {
    if (msg.role === 'system') {
      systemMessages.push(msg.content);
    } else if (msg.role === 'user' || msg.role === 'assistant') {
      conversationMessages.push({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      });
    } else {
      // Treat other roles as assistant messages
      conversationMessages.push({
        role: 'assistant',
        content: msg.content,
      });
    }
  }

  // Ensure messages alternate between user and assistant
  const alternatingMessages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }> = [];
  let lastRole: 'user' | 'assistant' | null = null;

  for (const msg of conversationMessages) {
    if (lastRole === msg.role) {
      // If we have consecutive messages from the same role, merge them
      const lastMessage = alternatingMessages[alternatingMessages.length - 1];
      lastMessage.content += '\n\n' + msg.content;
    } else {
      alternatingMessages.push(msg);
      lastRole = msg.role;
    }
  }

  // Ensure the first message is from user
  if (
    alternatingMessages.length > 0 &&
    alternatingMessages[0].role !== 'user'
  ) {
    alternatingMessages.unshift({
      role: 'user',
      content: 'Please respond to the following context.',
    });
  }

  // Ensure the last message is from user (required by Claude)
  if (
    alternatingMessages.length > 0 &&
    alternatingMessages[alternatingMessages.length - 1].role !== 'user'
  ) {
    alternatingMessages.push({
      role: 'user',
      content: 'Please provide your response.',
    });
  }

  return {
    system: systemMessages.length > 0 ? systemMessages.join('\n\n') : undefined,
    messages: alternatingMessages,
  };
}

export async function getAnswer(prompt: string): Promise<string> {
  const { system, messages } = convertToAnthropicMessages([
    {
      role: 'user',
      content: prompt,
    },
  ]);

  const response = await anthropic.messages.create({
    model,
    max_tokens: 4096,
    system,
    messages,
  });

  const content = response.content[0];
  return content.type === 'text' ? content.text : '';
}

export async function getAiData(messages: LlmMessage[]) {
  const { system, messages: anthropicMessages } =
    convertToAnthropicMessages(messages);

  const response = await anthropic.messages.create({
    model,
    max_tokens: 4096,
    system,
    messages: anthropicMessages,
  });

  const content = response.content[0];
  return content.type === 'text' ? content.text : '';
}

export async function sendMessage(
  messages: LlmMessage[],
  content: string,
  customRole: string,
): Promise<string> {
  const formattedContent = `${customRole}: ${content}`;
  messages.push({ role: 'user', content: formattedContent });

  const { system, messages: anthropicMessages } =
    convertToAnthropicMessages(messages);

  const stream = await anthropic.messages.stream({
    model,
    max_tokens: 4096,
    system,
    messages: anthropicMessages,
  });

  let fullResponse = '';

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      const text = chunk.delta.text;
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
