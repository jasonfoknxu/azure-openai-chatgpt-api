interface Config {
  ENABLE_SSL: boolean;
  HTTP_PORT: number;
  HTTPS_PORT: number;
  SSL_CERT: string | null;
  SSL_KEY: string | null;
  ENDPOINT: string;
  DEPLOYMENT_NAME: string;
  API_VERSION: string;
  KEY: string;
  temperature: number | null;
  top_p: number | null;
  n: number | null;
  stream: boolean | null;
  stop: string | string[] | null;
  max_tokens: number | null;
  presence_penalty: number | null;
  frequency_penalty: number | null;
  // logit_bias: object | null;
  user: string | null;
}