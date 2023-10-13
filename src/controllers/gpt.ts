import { Request, Response, NextFunction } from 'express';
import config from '../utils/config';
import axios from 'axios';
import { GPTPrompt, GPTRequest } from '../types/gptRequest';

/**
 * Get GPT-4 / ChatGPT Chat Completions result
 */
const prompt = async (req: Request, res: Response, next: NextFunction) => {
  const callGPT = await chatCompletion(req.body);

  if (!callGPT || typeof callGPT === 'string') {
    return res.result(callGPT ?? 'Request GPT failed.', 500);
  }

  return res.result(callGPT);
};

/**
 * Get the value of param if exists or return the default value if configured
 */
const getValueOrDefault = <T>(...values: Array<T | undefined | null>): T | undefined => {
  for (const value of values) {
    if (value !== undefined && value !== null) {
      return value;
    }
  }
  return undefined;
};

/**
 * Call GPT-4 / ChatGPT Chat Completions API from Azure
 */
const chatCompletion = async (params: GPTRequest) => {
  if (!params.prompt && !params.userPrompt) {
    return 'Missing prompt.';
  }

  let prompts: GPTPrompt[] = [];

  if (params.systemPrompt) {
    prompts.push({ role: 'system', content: params.systemPrompt });
  }

  prompts.push({ role: 'user', content: params.prompt ?? params.userPrompt } as GPTPrompt);

  if (params.assistantPrompt) {
    prompts.push({ role: 'assistant', content: params.assistantPrompt });
  }

  const requestBody: GPTRequest = {
    messages: prompts,
    temperature: getValueOrDefault(params.temperature, config.temperature),
    n: getValueOrDefault(params.n, config.n),
    stream: getValueOrDefault(params.stream, config.stream),
    stop: getValueOrDefault(params.stop, config.stop),
    max_tokens: getValueOrDefault(params.max_tokens, config.max_tokens),
    presence_penalty: getValueOrDefault(params.presence_penalty, config.presence_penalty),
    frequency_penalty: getValueOrDefault(params.frequency_penalty, config.frequency_penalty),
    // logit_bias: getValueOrDefault(params.logit_bias, config.logit_bias),
    user: getValueOrDefault(params.user, config.user),
    // function_call: getValueOrDefault(params.function_call, config.function_call),
    // functions: getValueOrDefault(params.functions, config.functions),
  };

  // Filter out invalid values from the request body
  Object.keys(requestBody).forEach((key) => {
    const k = key as keyof GPTRequest;
    console.warn(`requestBody[${k}]`, requestBody[k]);
    if (Number.isNaN(requestBody[k]) || requestBody[k] === null || requestBody[k] === undefined || requestBody[k] === '') {
      delete requestBody[k];
    }
  });

  try {
    const res = await axios.post(
      `${config.ENDPOINT}openai/deployments/${config.DEPLOYMENT_NAME}/chat/completions?api-version=${config.API_VERSION}`,
      JSON.stringify(requestBody),
      {
        headers: {
          'content-type': 'application/json',
          'api-key': config.KEY,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    console.error(`Azure OpenAI Error: `, error);
    if (error.response) {
      return `Azure OpenAI Error Response: ${error.response.status} - ${error.response.statusText}`;
    }
    return null;
  }
};

export { prompt };
