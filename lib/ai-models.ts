import { openai, createOpenAI } from '@ai-sdk/openai';
import { google, createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import type { LanguageModel } from 'ai';

export type ModelProvider = 'openai' | 'google' | 'openrouter';

/**
 * Create a model instance based on environment configuration
 * Reads from:
 * - AI_PROVIDER: 'openai' | 'google' | 'openrouter' (default: 'openai')
 * - AI_MODEL: model identifier (e.g., 'gpt-4', 'gemini-1.5-pro', 'openai/gpt-4')
 * - OPENAI_API_KEY: for OpenAI provider (optional, uses default if not set)
 * - GOOGLE_GENERATIVE_AI_API_KEY: for Google provider (optional, uses default if not set)
 * - OPENROUTER_API_KEY: for OpenRouter provider (required for OpenRouter)
 */
export function createModel(): LanguageModel {
  const provider = (process.env.AI_PROVIDER as ModelProvider) || 'openai';
  const modelId = process.env.AI_MODEL;

  switch (provider) {
    case 'openai': {
      const model = modelId || 'gpt-4-turbo';
      // If custom API key is provided, create custom client
      if (process.env.OPENAI_API_KEY) {
        const customOpenAI = createOpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
        return customOpenAI(model);
      }
      return openai(model);
    }
    case 'google': {
      const model = modelId || 'gemini-1.5-pro';
      // If custom API key is provided, create custom client
      if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        const customGoogle = createGoogleGenerativeAI({
          apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
        });
        return customGoogle(model);
      }
      return google(model);
    }
    case 'openrouter': {
      const model = modelId || 'openai/gpt-4-turbo';
      const openrouter = createOpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY || '',
      });
      return openrouter(model);
    }
    default:
      throw new Error(`Unsupported AI provider: ${provider}. Use 'openai', 'google', or 'openrouter'.`);
  }
}

/**
 * Create a model with custom provider and model ID
 * Useful for switching models dynamically
 */
export function createCustomModel(
  provider: ModelProvider,
  modelId: string,
  apiKey?: string
): LanguageModel {
  switch (provider) {
    case 'openai': {
      if (apiKey) {
        const customOpenAI = createOpenAI({ apiKey });
        return customOpenAI(modelId);
      }
      return openai(modelId);
    }
    case 'google': {
      if (apiKey) {
        const customGoogle = createGoogleGenerativeAI({ apiKey });
        return customGoogle(modelId);
      }
      return google(modelId);
    }
    case 'openrouter': {
      const openrouter = createOpenRouter({
        apiKey: apiKey || process.env.OPENROUTER_API_KEY || '',
      });
      return openrouter(modelId);
    }
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
