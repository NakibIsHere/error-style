// Test regular Node.js error
try {
  const obj = undefined;
  obj.map(x => x);
} catch (error) {
  console.log('Regular Node.js error:');
  console.log(error);
}
