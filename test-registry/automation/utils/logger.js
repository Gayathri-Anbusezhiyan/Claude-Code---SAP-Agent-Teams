// automation/utils/logger.js
// Simple logging utility for SAP Fiori test automation

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

const currentLevel = LOG_LEVELS[process.env.LOG_LEVEL || 'INFO'] || LOG_LEVELS.INFO;

function formatMessage(level, message, context) {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` [${context}]` : '';
  return `${timestamp} [${level}]${contextStr} ${message}`;
}

const logger = {
  debug(message, context) {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      console.log(formatMessage('DEBUG', message, context));
    }
  },

  info(message, context) {
    if (currentLevel <= LOG_LEVELS.INFO) {
      console.log(formatMessage('INFO', message, context));
    }
  },

  warn(message, context) {
    if (currentLevel <= LOG_LEVELS.WARN) {
      console.warn(formatMessage('WARN', message, context));
    }
  },

  error(message, context) {
    if (currentLevel <= LOG_LEVELS.ERROR) {
      console.error(formatMessage('ERROR', message, context));
    }
  },

  step(stepNumber, description, context) {
    this.info(`Step ${stepNumber}: ${description}`, context);
  },

  testStart(testId, testName) {
    this.info(`=== START: ${testId} - ${testName} ===`);
  },

  testEnd(testId, status) {
    this.info(`=== END: ${testId} - ${status.toUpperCase()} ===`);
  },
};

module.exports = { logger };
