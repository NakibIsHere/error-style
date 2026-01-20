import { prettyError, prettyTry, getErrorCount } from 'error-style';

console.log('🧪 Testing error-style package\n');

// Test 1: Undefined property error
console.log('--- Test 1: Undefined property ---');
const result1 = prettyTry(() => {
  const users = undefined;
  return users.map(u => u.name);
});

if (!result1.success) {
  console.log(prettyError(result1.error));
}

// Test 2: JSON parsing error
console.log('\n--- Test 2: JSON parsing error ---');
const result2 = prettyTry(() => {
  return JSON.parse('<html>Error page</html>');
});

if (!result2.success) {
  console.log(prettyError(result2.error));
}

// Test 3: Map not a function
console.log('\n--- Test 3: Map not a function ---');
const result3 = prettyTry(() => {
  const data = 'not an array';
  return data.map(item => item);
});

if (!result3.success) {
  console.log(prettyError(result3.error));
}

// Test 4: React-style error
console.log('\n--- Test 4: React error ---');
const result4 = prettyTry(() => {
  throw new Error('Objects are not valid as a React child');
}, { framework: 'react' });

if (!result4.success) {
  console.log(prettyError(result4.error, { framework: 'react' }));
}

// Test 5: Unknown error
console.log('\n--- Test 5: Unknown error ---');
const result5 = prettyTry(() => {
  const obj = undefined;
  return obj.someProperty.someMethod();
});

if (!result5.success) {
  console.log(prettyError(result5.error));
}

console.log('\n✅ Test complete!');
console.log(`📈 Total errors processed: ${getErrorCount()}`);

// Test 6: Network error simulation
console.log('\n--- Test 6: Network error ---');
try {
  throw new Error('Failed to fetch');
} catch (error) {
  console.log(prettyError(error));
}

// Test 7: Async error
console.log('\n--- Test 7: Async error ---');
const asyncTest = async () => {
  try {
    const response = await fetch('https://nonexistent-api.example.com');
    return await response.json();
  } catch (error) {
    console.log(prettyError(error));
  }
};

asyncTest().then(() => {
  console.log('\n🎉 All tests completed!');
  console.log(`📊 Final error count: ${getErrorCount()}`);
});
