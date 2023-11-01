import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { infoLogger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    infoLogger.info(`Database connected successfully`);
    server = app.listen(config.port, () => {
      infoLogger.info(`Application app listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error(`Failed to connect Database`, err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
