import { anthropic, createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { createOpenAI, openai } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { LanguageModel } from "ai";

export type ModelWithTools = {
  model: LanguageModel;
  tools: Record<string, unknown>;
};

export type ModelProvider = "openai" | "google" | "anthropic" | "openrouter";

/**
 * Create a model instance based on environment configuration
 * Reads from:
 * - AI_PROVIDER: 'openai' | 'google' | 'anthropic' | 'openrouter' (default: 'openai')
 * - AI_MODEL: model identifier (e.g., 'gpt-4', 'gemini-1.5-pro', 'claude-3-5-sonnet-20241022', 'openai/gpt-4')
 * - OPENAI_API_KEY: for OpenAI provider (optional, uses default if not set)
 * - GOOGLE_GENERATIVE_AI_API_KEY: for Google provider (optional, uses default if not set)
 * - ANTHROPIC_API_KEY: for Anthropic provider (optional, uses default if not set)
 * - OPENROUTER_API_KEY: for OpenRouter provider (required for OpenRouter)
 */
export function createModel(): ModelWithTools {
  const provider = (process.env.AI_PROVIDER as ModelProvider) || "openai";
  const modelId = process.env.AI_MODEL;

  switch (provider) {
    case "openai": {
      const modelName = modelId || "gpt-4-turbo";
      let modelInstance: LanguageModel;
      let openaiProvider: ReturnType<typeof createOpenAI> | typeof openai;

      // If custom API key is provided, create custom client
      if (process.env.OPENAI_API_KEY) {
        openaiProvider = createOpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
        modelInstance = openaiProvider(modelName);
      } else {
        openaiProvider = openai;
        modelInstance = openai(modelName);
      }

      return {
        model: modelInstance,
        tools: {
          web_search: openaiProvider.tools.webSearch({
            searchContextSize: "high",
          }),
        },
      };
    }
    case "google": {
      const modelName = modelId || "gemini-1.5-pro";
      let modelInstance: LanguageModel;
      let googleProvider:
        | ReturnType<typeof createGoogleGenerativeAI>
        | typeof google;

      // If custom API key is provided, create custom client
      if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        googleProvider = createGoogleGenerativeAI({
          apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
        });
        modelInstance = googleProvider(modelName);
      } else {
        googleProvider = google;
        modelInstance = google(modelName);
      }

      return {
        model: modelInstance,
        tools: {
          web_search: googleProvider.tools.googleSearch({}),
        },
      };
    }
    case "anthropic": {
      const modelName = modelId || "claude-3-5-sonnet-20241022";
      let modelInstance: LanguageModel;
      let anthropicProvider:
        | ReturnType<typeof createAnthropic>
        | typeof anthropic;

      // If custom API key is provided, create custom client
      if (process.env.ANTHROPIC_API_KEY) {
        anthropicProvider = createAnthropic({
          apiKey: process.env.ANTHROPIC_API_KEY,
        });
        modelInstance = anthropicProvider(modelName);
      } else {
        anthropicProvider = anthropic;
        modelInstance = anthropic(modelName);
      }

      return {
        model: modelInstance,
        tools: {
          web_search: anthropicProvider.tools.webSearch_20250305({
            maxUses: 5,
          }),
        },
      };
    }
    case "openrouter": {
      const modelName = modelId || "openai/gpt-4-turbo";
      const openrouter = createOpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY || "",
      });
      return {
        model: openrouter(modelName),
        tools: {},
      };
    }
    default:
      throw new Error(
        `Unsupported AI provider: ${provider}. Use 'openai', 'google', 'anthropic', or 'openrouter'.`
      );
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
): ModelWithTools {
  switch (provider) {
    case "openai": {
      let openaiProvider: ReturnType<typeof createOpenAI> | typeof openai;
      let modelInstance: LanguageModel;

      if (apiKey) {
        openaiProvider = createOpenAI({ apiKey });
        modelInstance = openaiProvider(modelId);
      } else {
        openaiProvider = openai;
        modelInstance = openai(modelId);
      }

      return {
        model: modelInstance,
        tools: {
          web_search: openaiProvider.tools.webSearch({
            searchContextSize: "high",
          }),
        },
      };
    }
    case "google": {
      let googleProvider:
        | ReturnType<typeof createGoogleGenerativeAI>
        | typeof google;
      let modelInstance: LanguageModel;

      if (apiKey) {
        googleProvider = createGoogleGenerativeAI({ apiKey });
        modelInstance = googleProvider(modelId);
      } else {
        googleProvider = google;
        modelInstance = google(modelId);
      }

      return {
        model: modelInstance,
        tools: {
          web_search: googleProvider.tools.googleSearch({}),
        },
      };
    }
    case "anthropic": {
      let anthropicProvider:
        | ReturnType<typeof createAnthropic>
        | typeof anthropic;
      let modelInstance: LanguageModel;

      if (apiKey) {
        anthropicProvider = createAnthropic({ apiKey });
        modelInstance = anthropicProvider(modelId);
      } else {
        anthropicProvider = anthropic;
        modelInstance = anthropic(modelId);
      }

      return {
        model: modelInstance,
        tools: {
          web_search: anthropicProvider.tools.webSearch_20250305({
            maxUses: 5,
          }),
        },
      };
    }
    case "openrouter": {
      const openrouter = createOpenRouter({
        apiKey: apiKey || process.env.OPENROUTER_API_KEY || "",
      });
      return {
        model: openrouter(modelId),
        tools: {},
      };
    }
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
