interface GPTPrompt {
  role: "system" | "user" | "assistant" | "function";
  content: string;
}

interface GPTRequest {
  systemPrompt?: string;
  userPrompt?: string;
  prompt?: string;
  assistantPrompt?: string;
  messages?: GPTPrompt[];
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  logit_bias?: { [tokenId: number]: number };
  user?: string;
  n?: number;
  stream?: boolean;
  stop?: string | string[];
  presence_penalty?: number;
  frequency_penalty?: number;
}

export {GPTPrompt, GPTRequest}