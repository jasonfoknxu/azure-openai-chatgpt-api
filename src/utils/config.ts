import dotenv from 'dotenv';
import Path from 'path';
let envOptions = {};

// Load .env config file
if (process.argv) {
  const args = process.argv.slice(2);
  let envPath = Path.resolve(process.cwd(), '.env');
  switch (args[0]) {
    case 'test':
    case 'testing':
      envPath = Path.resolve(process.cwd(), '.testing.env');
      break;
  }
  envOptions = { ...envOptions, path: envPath };
}
const loadConfig = dotenv.config(envOptions);
if (loadConfig.error) {
  console.error('[API] <ERROR> Cannot load config');
  throw loadConfig.error;
}

const loadedConfig = loadConfig.parsed;

if (!loadedConfig) {
  console.error('[API] <ERROR> Cannot load config');
  throw new Error();
}

const config: Config = {
  ENABLE_SSL: loadedConfig.ENABLE_SSL === 'true',
  HTTP_PORT: parseInt(loadedConfig.HTTP_PORT) ?? 80,
  HTTPS_PORT: parseInt(loadedConfig.HTTPS_PORT) ?? 443,
  SSL_CERT: loadedConfig.SSL_CERT ?? null,
  SSL_KEY: loadedConfig.SSL_KEY ?? null,
  ENDPOINT: loadedConfig.ENDPOINT.charAt(loadedConfig.ENDPOINT.length - 1) !== '/' ? `${loadedConfig.ENDPOINT}/` : loadedConfig.ENDPOINT,
  DEPLOYMENT_NAME: loadedConfig.DEPLOYMENT_NAME,
  API_VERSION: loadedConfig.API_VERSION,
  KEY: loadedConfig.KEY,
  temperature: parseFloat(loadedConfig.temperature) ?? null,
  top_p: parseInt(loadedConfig.top_p) ?? null,
  n: parseInt(loadedConfig.n) ?? null,
  stream: (loadedConfig.stream === 'true' || loadedConfig.stream === '1'),
  stop: loadedConfig.stop ?? null,
  max_tokens: parseInt(loadedConfig.max_tokens) ?? null,
  presence_penalty: parseFloat(loadedConfig.presence_penalty) ?? null,
  frequency_penalty: parseFloat(loadedConfig.frequency_penalty) ?? null,
  // logit_bias: loadedConfig.logit_bias ?? null,
  user: loadedConfig.user ?? null,
};

export default config;
