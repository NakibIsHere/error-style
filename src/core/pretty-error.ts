import { ruleEngine } from '../engine/rule-engine.js';
import { prettyFormatter } from '../formatter/pretty-formatter.js';
import { ErrorContext } from '../rules/types.js';

// Simple error counter
let errorCount = 0;

/**
 * Main enhanced error handler - primary way to use error-style
 */
export function prettyError(error: Error, context?: Partial<ErrorContext>, regular: boolean = false): string {
  // Always increment count
  errorCount++;
  
  // DISABLED: Regular mode functionality
  // if (regular) {
  //   return error.stack || error.message;
  // }
  
  const ruleMatch = ruleEngine.findMatch(error, context);
  return prettyFormatter.formatError(error, ruleMatch, context);
}

/**
 * Log an error with pretty formatting
 */
export function logPrettyError(error: Error, context?: Partial<ErrorContext>, regular: boolean = false): void {
  // DISABLED: Regular mode functionality
  // if (regular) {
  //   console.log(error.stack || error.message);
  // } else {
    console.log(prettyError(error, context, regular));
  // }
}

/**
 * Get total errors processed
 */
export function getErrorCount(): number {
  return errorCount;
}

/**
 * Create a wrapped function that automatically handles errors
 */
export function wrapWithErrorHandler<T extends (...args: any[]) => any>(
  fn: T,
  context?: Partial<ErrorContext>,
  regular: boolean = false
): T {
  return ((...args: any[]) => {
    try {
      const result = fn(...args);
      
      // Handle async functions
      if (result && typeof result.catch === 'function') {
        return result.catch((error: Error) => {
          logPrettyError(error, context, regular);
          throw error; // Re-throw to maintain behavior
        });
      }
      
      return result;
    } catch (error) {
      logPrettyError(error instanceof Error ? error : new Error(String(error)), context, regular);
      throw error; // Re-throw to maintain behavior
    }
  }) as T;
}
