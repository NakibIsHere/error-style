#!/usr/bin/env node

import { prettyError, getErrorCount } from '../index.js';

interface CLIOptions {
  regular?: boolean;
}

function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);
  const options: CLIOptions = {};
  
  if (args.includes('-r') || args.includes('--regular')) {
    options.regular = true;
  }
  
  return options;
}

function showHelp() {
  console.log(`
🚀 error-style CLI

Usage:
  error-style [options]

Options:
  -r, --regular    Show regular error messages instead of styled ones
  -h, --help       Show this help message

Examples:
  error-style              # Show styled errors
  error-style -r          # Show regular errors
  error-style --regular    # Show regular errors
`);
}

function main() {
  const args = parseArgs();
  
  if (process.argv.includes('-h') || process.argv.includes('--help')) {
    showHelp();
    return;
  }
  
  console.log('🚀 error-style CLI Demo\n');
  
  // Test 1: Undefined property error
  console.log('--- Test 1: Undefined property ---');
  try {
    const users: any = undefined;
    users.map((u: any) => u.name);
  } catch (error) {
    if (args.regular) {
      console.log('\n📄 Regular Error Message:');
      console.log(error instanceof Error ? error.message : String(error));
    } else {
      console.log('\n🎨 Styled Error Message:');
      console.log(prettyError(error instanceof Error ? error : new Error(String(error))));
    }
  }
  
  // Test 2: JSON parsing error
  console.log('\n--- Test 2: JSON parsing error ---');
  try {
    JSON.parse('<html>Error page</html>');
  } catch (error) {
    if (args.regular) {
      console.log(error instanceof Error ? error.message : String(error));
    } else {
      console.log(prettyError(error instanceof Error ? error : new Error(String(error))));
    }
  }
  
  // Test 3: Map not a function
  console.log('\n--- Test 3: Map not a function ---');
  try {
    const data: any = 'not an array';
    data.map((item: any) => item);
  } catch (error) {
    if (args.regular) {
      console.log(error instanceof Error ? error.message : String(error));
    } else {
      console.log(prettyError(error instanceof Error ? error : new Error(String(error))));
    }
  }
  
  // Test 4: React error
  console.log('\n--- Test 4: React error ---');
  try {
    throw new Error('Objects are not valid as a React child');
  } catch (error) {
    if (args.regular) {
      console.log(error instanceof Error ? error.message : String(error));
    } else {
      console.log(prettyError(error instanceof Error ? error : new Error(String(error)), { framework: 'react' }));
    }
  }
  
  // Test 5: Unknown error
  console.log('\n--- Test 5: Unknown error ---');
  try {
    const obj: any = undefined;
    obj.someProperty.someMethod();
  } catch (error) {
    if (args.regular) {
      console.log(error instanceof Error ? error.message : String(error));
    } else {
      console.log(prettyError(error instanceof Error ? error : new Error(String(error))));
    }
  }
  
  console.log(`\n📈 Total errors processed: ${getErrorCount()}`);
}

// Always run main function for CLI
main();
