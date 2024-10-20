import { getAiData, LlmMessage } from './helper';

interface IRole {
  type: RoleType;
  name?: string;
  speak(messages: IMessage[]): Promise<Message>;
}

enum RoleType {
  SYSTEM = 'system',
  JUDGE = 'Judge',
  LAWYER = 'Lawyer',
  PROSECUTOR = 'Prosecutor',
  DEFENDANT = 'Defendant',
  DEFENSE_WITNESS = 'DefenseWitness',
  PROSECUTION_WITNESS = 'ProsecutionWitness',
}

const getRoleBasePrePrompt = (name?: string) => ({
  [RoleType.SYSTEM]:
    'You are playing the role of the system. Provide necessary instructions and context.',
  [RoleType.JUDGE]: `You are playing the role of the judge ${
    name ? name : ''
  } in a bench trial. ${
    name
      ? `As ${name}, use your experience and public practice to inform your decisions. `
      : ''
  }Based on the evidence and arguments presented, make a fair and impartial decision about the defendant's guilt or innocence. Important that the last word of your text has to be "Guilty" or "Not Guilty"`,
  [RoleType.LAWYER]:
    'You are playing the role of the lawyer. Advocate for your client with logical and persuasive arguments.',
  [RoleType.PROSECUTOR]: `You are playing the role of the prosecutor${
    name ? ` ${name}` : ''
  }. ${
    name
      ? `As ${name}, use your experience and public practice to guide your arguments. `
      : ''
  }Present the case against the defendant with strong evidence and arguments.`,
  [RoleType.DEFENDANT]:
    'You are playing the role of the defendant. Respond to the following context, reasonably defend yourself.',
  [RoleType.DEFENSE_WITNESS]: `You are playing the role of the defense witness. Provide testimony that supports the defense's case.`,
  [RoleType.PROSECUTION_WITNESS]:
    'You are playing the role of the prosecution witness. Provide relevant testimony.',
});
interface IMessage {
  sender: IRole;
  content: string;
  timestamp: Date;
  responseTo?: IMessage; // Optional chaining to reference the message being responded to
}

export interface ITrialSequence {
  role: string;
  name?: string;
  prompt: string;
}

class Role implements IRole {
  type: RoleType;
  name: string;

  constructor(type: string, name?: string) {
    switch (type.toLowerCase()) {
      case 'defendant':
        this.type = RoleType.DEFENDANT;
        break;
      case 'judge':
        this.type = RoleType.JUDGE;
        break;
      case 'lawyer':
        this.type = RoleType.LAWYER;
        break;
      case 'prosecutor':
        this.type = RoleType.PROSECUTOR;
        break;
      case 'defense_witness':
        this.type = RoleType.DEFENSE_WITNESS;
        break;
      case 'prosecution_witness':
        this.type = RoleType.PROSECUTION_WITNESS;
        break;
      case 'system':
        this.type = RoleType.SYSTEM;
        break;
      default:
        throw new Error(`Unknown role name: ${type}`);
    }
    this.name = name ? name : '';
  }

  async speak(messages: IMessage[]): Promise<Message> {
    const formattedMessages: LlmMessage[] = messages.map((msg) => ({
      role: 'assistant',
      content: `${msg.sender.type}${this.name ? ' ' + this.name : ''}: ${
        msg.content
      }`,
    }));

    const prePrompt = getRoleBasePrePrompt(this.name)[this.type];
    console.log('prePrompt!', prePrompt);

    formattedMessages.push({ role: 'system', content: prePrompt });
    // console.log('formattedMessages', formattedMessages);
    // Generate AI response
    const responseContent = (await getAiData(formattedMessages)) as string;

    return new Message(
      this,
      responseContent,
      new Date(),
      messages[messages.length - 1]
    );
  }
}

class Message implements IMessage {
  sender: IRole;
  content: string;
  timestamp: Date;
  responseTo?: IMessage;

  constructor(
    sender: IRole,
    content: string,
    timestamp: Date,
    responseTo?: IMessage
  ) {
    this.sender = sender;
    this.content = content;
    this.timestamp = timestamp;
    this.responseTo = responseTo;
  }
}

export class TrialContext {
  public sequence: ITrialSequence[];
  public messages: IMessage[] = [];

  constructor(sequence: ITrialSequence[]) {
    this.sequence = sequence;
  }

  addMessage(message: IMessage): void {
    this.messages.push(message);
  }

  getNextSequence(): ITrialSequence | undefined {
    return this.sequence.shift();
  }

  getLastMessage() {
    return this.messages[this.messages.length - 1];
  }
}

class RoleFactory {
  static createRole(type: string, name?: string): IRole {
    return new Role(type);
  }
}

export const sequence: ITrialSequence[] = [
  {
    role: 'Prosecutor',
    prompt: 'Provide opening statement to the court.',
  },
  {
    role: 'Lawyer',
    prompt: 'Provide opening statement to the court.',
  },
  {
    role: 'Prosecutor',
    prompt: 'Direct examination of the first witness.',
  },
  {
    role: 'prosecution_witness',
    name: 'Nick',
    prompt: 'Answer the prosecutor’s question.',
  },
  {
    role: 'Lawyer',
    prompt: 'Cross-examination of the first prosecution witness.',
  },
  {
    role: 'Judge',
    prompt:
      'Make a final decision. Is the defendant guilty or not guilty based on the evidence and arguments presented?',
  },
];

export class TrialController {
  private context: TrialContext;
  private initialContext: string;
  private judgeName?: string;
  private prosecutorName?: string;

  constructor(
    sequence: ITrialSequence[],
    initialContext: string,
    options?: {
      judgeName?: string;
      prosecutorName?: string;
    }
  ) {
    this.context = new TrialContext(sequence);
    this.initialContext = initialContext;
    this.judgeName = options?.judgeName;
    this.prosecutorName = options?.prosecutorName;
  }

  async startTrial(callback: (data: any) => void): Promise<void> {
    const initialMessage = new Message(
      RoleFactory.createRole('system'),
      this.initialContext,
      new Date()
    );
    this.context.addMessage(initialMessage);

    let nextSequence = this.context.getNextSequence();
    while (nextSequence) {
      let { role, prompt, name } = nextSequence;
      console.log('role', role);
      console.log('orole.toLowerCase() === ', role.toLowerCase() === 'judge');
      console.log('this.judgeName', this.judgeName);
      if (role.toLowerCase() === 'judge' && this.judgeName) {
        console.log('Here we are!', this.judgeName);
        name = this.judgeName;
      }
      if (role.toLowerCase() === 'prosecutor' && this.prosecutorName) {
        console.log('Here we are!', this.prosecutorName);
        name = this.prosecutorName;
      }
      const appRole = new Role(role, name);
      const message = new Message(appRole, prompt, new Date());
      this.context.addMessage(message);

      const response = await appRole.speak(this.context.messages);
      this.context.addMessage(response);
      console.log(
        'this.context.getLastMessage()',
        this.context.getLastMessage()
      );
      callback(this.context.getLastMessage());

      nextSequence = this.context.getNextSequence();
    }
    // console.log(this.context.messages);
  }
}
