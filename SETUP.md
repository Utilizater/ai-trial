# TrialAI Setup Guide

This project uses **Claude AI (Anthropic)** for AI-powered trial simulations.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Anthropic API Key

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env
```

### 3. Add Your Anthropic API Key

Open the `.env` file and replace the placeholder with your actual API key:

```env
ANTHROPIC_API_KEY=your_actual_api_key_here
```

**How to get your API key:**

1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env` file

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## AI Model Configuration

The project uses **Claude 3.5 Sonnet** (`claude-3-5-sonnet-20241022`) as the default model. This is configured in [`src/pages/assistantCore/helper.ts`](src/pages/assistantCore/helper.ts:48).

To change the model, update the `model` constant:

```typescript
const model = 'claude-3-5-sonnet-20241022'; // or another Claude model
```

Available Claude models:

- `claude-3-5-sonnet-20241022` (recommended)
- `claude-3-opus-20240229`
- `claude-3-sonnet-20240229`
- `claude-3-haiku-20240307`

## Project Structure

- [`src/pages/assistantCore/helper.ts`](src/pages/assistantCore/helper.ts) - Claude AI integration and message handling
- [`src/pages/assistantCore/index.ts`](src/pages/assistantCore/index.ts) - Trial controller and role management
- [`src/pages/api/run-trial.ts`](src/pages/api/run-trial.ts) - API endpoint for trial execution
- [`.env`](.env) - Environment variables (not committed to git)

## Important Notes

- **Never commit your `.env` file** - It contains sensitive API keys
- The `.env` file is already added to [`.gitignore`](.gitignore)
- Keep your API key secure and don't share it publicly
- Monitor your API usage in the Anthropic Console

## Troubleshooting

### API Key Issues

- Ensure your API key is correctly set in the `.env` file
- Verify the key has no extra spaces or quotes
- Check that your Anthropic account has available credits

### Build Errors

- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Runtime Errors

- Check the console for detailed error messages
- Verify the `.env` file is in the root directory
- Ensure the Next.js server is restarted after changing environment variables

## Support

For issues related to:

- **Anthropic API**: Visit [Anthropic Documentation](https://docs.anthropic.com/)
- **Project Issues**: Check the project repository or contact the maintainers
