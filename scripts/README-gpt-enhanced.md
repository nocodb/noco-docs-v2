# GPT-Enhanced LLM Content Generator

This script generates an enhanced `llms.txt` file using OpenAI's ChatGPT API to create better structured and more comprehensive documentation for LLM training.

## Features

- **AI-Enhanced Content**: Uses GPT-4 to analyze and improve the structure of documentation
- **Rich Content Extraction**: Extracts not just metadata but actual content from HTML pages
- **Intelligent Categorization**: Better categorization of documentation sections
- **Comprehensive Output**: Generates detailed sections including:
  - Project Overview
  - Key Features
  - Getting Started Guide
  - Detailed Documentation Structure
  - Common Use Cases
  - FAQ Section
- **Fallback System**: If the API fails, falls back to manual content generation
- **Rate Limiting**: Respects API limits with built-in delays and batch processing

## Prerequisites

1. **OpenAI API Key**: You need an active OpenAI API key
2. **Built Project**: The script reads from the Next.js build output, so run `npm run build` first

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set your OpenAI API Key**:
   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   ```

3. **Build the project** (if not already done):
   ```bash
   npm run build
   ```

## Usage

### Basic Usage
```bash
npm run generate-llm-gpt
```

### With Environment Variables
```bash
OPENAI_API_KEY="your-key" SITE_URL="https://docs.nocodb.com" OUTPUT_FILE="enhanced-llms.txt" npm run generate-llm-gpt
```

### Direct Script Execution
```bash
tsx scripts/generate-llm-content-with-gpt.ts
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | *required* | Your OpenAI API key |
| `SITE_URL` | `https://docs.nocodb.com` | Base URL for the documentation site |
| `OUTPUT_FILE` | `llms-enhanced.txt` | Output filename for the generated file |

## Output

The script generates a comprehensive markdown file with the following structure:

```
# Project Title

## Overview
[AI-generated comprehensive overview]

## Key Features
- Feature 1
- Feature 2
...

## Quick Start Guide
1. Step 1
2. Step 2
...

## Documentation
### Category 1
#### Page Title
[Description and key points]

### Category 2
[More documentation sections]

## Common Use Cases
- Use case 1
- Use case 2
...

## Frequently Asked Questions
**Q: Question 1**
A: Answer 1
...
```

## How It Works

1. **Content Extraction**: Scans the built HTML files and extracts:
   - Page titles and metadata
   - Main content text (first 2000 characters)
   - URLs and categorization

2. **AI Enhancement**: Sends a comprehensive summary to GPT-4 with instructions to:
   - Create a compelling project overview
   - Organize content into logical sections
   - Generate helpful getting started guides
   - Create FAQ sections
   - Identify common use cases

3. **Document Generation**: Combines the AI-generated structure with detailed page information to create the final document

## Comparison with Standard Script

| Feature | Standard Script | GPT-Enhanced Script |
|---------|----------------|-------------------|
| Content Analysis | Metadata only | Full content + metadata |
| Structure | Basic | AI-optimized |
| Overview Generation | Template-based | AI-generated |
| Getting Started | Simple list | Structured guide |
| FAQ Section | None | AI-generated |
| Use Cases | Basic | AI-identified |
| Fallback | None | Full fallback system |

## API Costs

The script uses GPT-4 which costs approximately:
- ~$0.03 per 1K tokens for input
- ~$0.06 per 1K tokens for output

For a typical documentation site with 50-100 pages, expect costs around $0.50-$2.00 per run.

## Troubleshooting

### "OPENAI_API_KEY environment variable is required"
Set your API key: `export OPENAI_API_KEY="your-key"`

### "No build output found"
Run `npm run build` first to generate the HTML files

### "Error with GPT API"
- Check your API key is valid
- Ensure you have sufficient API credits
- The script will fall back to manual generation if the API fails

### Rate Limiting
The script includes built-in rate limiting. If you hit limits:
- Wait a few minutes before retrying
- Consider reducing the `batchSize` in the script

## Customization

You can modify the script to:
- Change the GPT model (currently uses `gpt-4`)
- Adjust the content extraction length
- Modify the categorization logic
- Customize the output format
- Add additional AI prompts for specific content types

## Contributing

To improve the script:
1. Test with different documentation structures
2. Enhance the content extraction logic
3. Improve the AI prompts for better output
4. Add support for additional content types 