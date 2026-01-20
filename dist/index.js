// Export the new getErrorCount function
export { getErrorCount } from './core/pretty-error.js';
// Export main classes and functions
export { coreRules } from './rules/core-rules.js';
export { RuleEngine } from './engine/rule-engine.js';
export { PrettyFormatter } from './formatter/pretty-formatter.js';
export { prettyTry, prettyTryAsync, formatError } from './core/index.js';
export { setupGlobalErrorHandlers, removeGlobalErrorHandlers } from './utils/global-handlers.js';
export { prettyError, logPrettyError, wrapWithErrorHandler } from './core/pretty-error.js';
// Export default instances
export { prettyFormatter } from './formatter/pretty-formatter.js';
