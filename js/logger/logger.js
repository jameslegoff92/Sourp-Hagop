// lib/logger.js or utils/logger.js

let logger;

// Check if we're in a server environment (Node.js)
if (typeof window === 'undefined') {
  // Server-side: Use Pino
  try {
    const pino = require('pino');
    const isProduction = process.env.NODE_ENV === 'production';
    
    logger = pino({
      level: isProduction ? 'info' : 'trace',
      transport: isProduction
        ? undefined // No pretty printing in production
        : {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: true,
              ignore: 'pid,hostname',
            },
          },
    });
  } catch (error) {
    // Fallback if pino fails to load
    console.warn('Pino failed to load, using console fallback:', error.message);
    logger = {
      trace: (...args) => console.log('[TRACE]', ...args),
      debug: (...args) => console.log('[DEBUG]', ...args),
      info: (...args) => console.log('[INFO]', ...args),
      warn: (...args) => console.warn('[WARN]', ...args),
      error: (...args) => console.error('[ERROR]', ...args),
      fatal: (...args) => console.error('[FATAL]', ...args),
    };
  }
} else {
  // Client-side: Use console with Pino-like interface
  logger = {
    trace: (...args) => console.log('[TRACE]', ...args),
    debug: (...args) => console.log('[DEBUG]', ...args),
    info: (...args) => console.log('[INFO]', ...args),
    warn: (...args) => console.warn('[WARN]', ...args),
    error: (...args) => console.error('[ERROR]', ...args),
    fatal: (...args) => console.error('[FATAL]', ...args),
  };
}

export default logger;