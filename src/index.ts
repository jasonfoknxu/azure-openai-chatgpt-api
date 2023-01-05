import app from './app';
import log from './utils/log';
import config from './utils/config';
import https from 'https';
import http from 'http';
import fs from 'fs';

let server: https.Server | http.Server | null = null;

const createServer = () => {
  if (config.ENABLE_SSL && config.SSL_CERT && config.SSL_KEY) {
    // Create HTTPS server
    try {
      server = https
        .createServer(
          {
            key: fs.readFileSync(config.SSL_KEY),
            cert: fs.readFileSync(config.SSL_CERT),
          },
          app
        )
        .listen(config.HTTPS_PORT);
      log(`HTTPS Server started. Listening to port ${config.HTTPS_PORT}`, 'i');
    } catch (err) {
      log(['HTTPS Server cannot be started.', err], 'e');
      process.exit(1);
    }
  } else {
    // Create HTTP Server
    server = app.listen(config.HTTP_PORT, async () => {
      log(`HTTP Server started. Listening to port ${config.HTTP_PORT}`, 'i');
    });
  }
};

// Close server
const closeServer = () => {
  if (server) {
    server.close(() => {
      log('Server closed. (EXIT)', 'x');
    });
  }
};

// Exit process
const exitHandler = () => {
  closeServer();
  process.exit(1);
};

// Exception handling
const unexpectedErrorHandler = (error: string) => {
  log(['Unexpected Error!', error], 'e');
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// Kill process
process.on('SIGTERM', () => {
  log('Server closed. (SIGTERM received)', 'w');
  closeServer();
});

(() => {
  createServer();
})();

export { createServer, closeServer };
