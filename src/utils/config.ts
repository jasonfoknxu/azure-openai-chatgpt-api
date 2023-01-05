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

interface Config {
  ENABLE_SSL: boolean;
  HTTP_PORT: number;
  HTTPS_PORT: number;
  SSL_CERT: string | null;
  SSL_KEY: string | null;
  TOKEN_SECRET: string;
  TOKEN_TTL: number;
}

const config: Config = {
  ENABLE_SSL: loadedConfig.ENABLE_SSL === 'true',
  HTTP_PORT: parseInt(loadedConfig.HTTP_PORT) ?? 80,
  HTTPS_PORT: parseInt(loadedConfig.HTTPS_PORT) ?? 443,
  SSL_CERT: loadedConfig.SSL_CERT ?? null,
  SSL_KEY: loadedConfig.SSL_KEY ?? null,
  TOKEN_SECRET: loadedConfig.TOKEN_SECRET ?? '',
  TOKEN_TTL: parseInt(loadedConfig.TOKEN_TTL) ?? 3600,
};

export default config;
