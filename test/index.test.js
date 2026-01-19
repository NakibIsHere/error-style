import { test } from 'node:test';
import assert from 'node:assert';
import { prettyTry, prettyTryAsync, formatError } from '../dist/index.js';

test('prettyTry handles undefined property error', () => {
  const result = prettyTry(() => {
    const users = undefined;
    return users.map(u => u.name);
  });
  
  assert.strictEqual(result.success, false);
  assert(result.error);
  assert(result.error.reason.includes('before it existed'));
  assert(result.error.fix.includes('optional chaining'));
});

test('prettyTry handles successful execution', () => {
  const result = prettyTry(() => {
    const users = [{ name: 'John' }];
    return users.map(u => u.name);
  });
  
  assert.strictEqual(result.success, true);
  assert.deepStrictEqual(result.data, ['John']);
});

test('prettyTry handles map is not a function error', () => {
  const result = prettyTry(() => {
    const users = 'not an array';
    return users.map(u => u.name);
  });
  
  assert.strictEqual(result.success, false);
  assert(result.error);
  assert(result.error.reason.includes('isn\'t an array'));
});

test('prettyTryAsync handles async errors', async () => {
  const result = await prettyTryAsync(async () => {
    const response = { text: async () => '<html>Error page</html>' };
    return JSON.parse(await response.text());
  });
  
  assert.strictEqual(result.success, false);
  assert(result.error);
  assert(result.error.reason.includes('isn\'t valid JSON'));
});

test('formatError creates readable output', () => {
  const errorExplanation = {
    message: 'Cannot read properties of undefined',
    reason: 'You tried to use something before it existed.',
    fix: 'Check if the value exists first.',
    suggestions: ['Try optional chaining', 'Add if statement']
  };
  
  const formatted = formatError(errorExplanation);
  assert(formatted.includes('❌'));
  assert(formatted.includes('Reason:'));
  assert(formatted.includes('Fix:'));
  assert(formatted.includes('Suggestions:'));
});

test('prettyTry handles null property error', () => {
  const result = prettyTry(() => {
    const user = null;
    return user.name;
  });
  
  assert.strictEqual(result.success, false);
  assert(result.error);
  assert(result.error.reason.includes('null value'));
});
