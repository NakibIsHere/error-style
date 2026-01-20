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
  
  // Test error
  try {
    const obj: any = undefined;
    obj.map((x: any) => x);
  } catch (error) {
    if (args.regular) {
      console.log('\n📄 Regular Error Message:');
      console.log(error instanceof Error ? error.message : String(error));
    } else {
      console.log('\n🎨 Styled Error Message:');
      console.log(prettyError(error instanceof Error ? error : new Error(String(error))));
    }
  }
  
  console.log(`\n📈 Total errors processed: ${getErrorCount()}`);
}

if (require.main === module) {
  main();
}
