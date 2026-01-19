import { prettyTry, prettyTryAsync, formatError } from './dist/index.js';

console.log('🧪 Testing error-style package\n');

// Test 1: Undefined property error
console.log('--- Test 1: Undefined property ---');
const result1 = prettyTry(() => {
  const users = undefined;
  return users.map(u => u.name);
});

if (!result1.success) {
  console.log(formatError(result1.error));
}

// Test 2: Successful case
console.log('\n--- Test 2: Success case ---');
const result2 = prettyTry(() => {
  const users = [{ name: 'John' }, { name: 'Jane' }];
  return users.map(u => u.name);
});

console.log('Success:', result2.success);
console.log('Data:', result2.data);

// Test 3: JSON parsing error
console.log('\n--- Test 3: JSON parsing error ---');
const result3 = prettyTry(() => {
  const badJson = '<html>Error page</html>';
  return JSON.parse(badJson);
});

if (!result3.success) {
  console.log(formatError(result3.error));
}

// Test 4: Async error
console.log('\n--- Test 4: Async error ---');
prettyTryAsync(async () => {
  const response = { 
    status: 404,
    text: async () => '<h1>Not Found</h1>' 
  };
  return JSON.parse(await response.text());
}).then(result4 => {
  if (!result4.success) {
    console.log(formatError(result4.error));
  }
});

console.log('\n✅ Demo complete!');
