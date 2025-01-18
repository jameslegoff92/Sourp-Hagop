import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

const logger = pino({
  level: isProduction ? 'info' : 'trace', // Show all logs in development, starting at trace
  transport: isProduction
    ? undefined // No pretty printing in production
    : {
        target: 'pino-pretty',
        options: {
          colorize: true, // Add colors to logs
          translateTime: true, // Show timestamps in human-readable format
          ignore: 'pid,hostname', // Omit PID and hostname for cleaner output
          messageFormat: '{msg} - {MongoDB URI}'
        },
      },
});

export default logger;