![Untitled design](https://github.com/user-attachments/assets/07a8aec8-a864-4444-b519-5765d4404960)
# ERROR-STYLE
To view the package, see [npmjs.com/package/error-style](https://www.npmjs.com/package/error-style)

Transform technical error messages into human-friendly explanations for better debugging.

## 🎯 The Problem

Technical error messages are confusing:

```
❌ Cannot read properties of undefined
```

## ✨ The Solution

Clear, human-friendly explanations:

```
❌ Cannot read properties of undefined

**Reason:**
You tried to use something before it existed.

**Fix:**
Check if the value exists first using optional chaining (?.) or if statements.

**Suggestions:**
• Try: `value?.property` instead of `value.property`
• Add: `if (value) { /* your code */ }`
• Initialize the variable before using it
```
## 🚀 Usage

### Basic Usage

```javascript
import { prettyTry } from 'error-style';

prettyTry(() => {
  users.map(u => u.name)
});
```

Instead of crashing, you get:
- `success: false` (sounds much nicer, huh? 😜)
- Clear explanation of what went wrong (finally! now you can fix your project's errors from 4 years ago!)
- Actionable fix suggestions (that are not from Webster's Dictionary. You can understand them 🙄)

### Async Usage

```javascript
import { prettyTryAsync } from 'error-style';

const result = await prettyTryAsync(async () => {
  const response = await fetch('/api/users');
  return response.json();
});

if (!result.success) {
  console.log(result.error.reason);
  console.log(result.error.fix);
}
```

### Formatting Errors

```javascript
import { formatError, logError } from 'error-style';

const result = prettyTry(() => riskyCode());

if (!result.success) {
  // Pretty format
  console.log(formatError(result.error));
  
  // Or directly log
  logError(result.error);
}
```

## 🎪 Real Examples

### Bad Array Usage

```javascript
prettyTry(() => {
  const users = undefined;
  return users.map(u => u.name);
});
```

**Output:**
```
❌ Cannot read properties of undefined

**Reason:**
You tried to use something before it existed.

**Fix:**
Check if the value exists first using optional chaining (?.) or if statements.
```
### JSON Parsing Error

```javascript
await prettyTryAsync(async () => {
  const response = await fetch('/api/data');
  return response.json(); // API returns HTML error page
});
```

**Output:**
```
❌ Unexpected token

**Reason:**
Failed to parse JSON - the response isn't valid JSON.

**Fix:**
The API probably returned HTML or an error message instead of JSON.

**Suggestions:**
• Check `response.status` before parsing
• Log the raw response: `console.log(await response.text())`
• Verify the API endpoint is correct
```
### Network Error

```javascript
await prettyTryAsync(async () => {
  const response = await fetch('https://wrong-url.com/api');
  return response.json();
});
```

**Output:**
```
❌ Failed to fetch

**Reason:**
Network request failed - can't reach the server.

**Fix:**
Check your internet connection and the API URL.
```
## 🧩 Supported Errors

- **Undefined/Null errors** - Property access on undefined/null
- **Array errors** - `map is not a function` and similar
- **JSON errors** - Parsing failures, unexpected tokens
- **Network errors** - Failed fetch, CORS issues
- **Async/await errors** - Using await outside async functions
- **Module errors** - Missing imports, wrong paths
- **Fallback** - Generic helpful messages for unknown errors

## 🎯 Who This Helps

- **Beginners learning JavaScript** - Understand what errors actually mean
- **React developers** - Debug component issues faster
- **API builders** - Handle network and parsing errors gracefully
- **Students** - Learn programming without frustration
- **Hobby developers** - Build without getting stuck
- **Pros debugging fast** - Get instant clarity on common issues that you forget how to fix at 3 in the morning. Your welcome.

## 📦 Installation

```bash
npm install error-style
```

## 🔧 API Reference

```typescript
prettyTry<T>(fn: () => T): PrettyTryResult<T>
```

Wraps a synchronous function and provides friendly error messages.

**Returns:**
```typescript
{
  success: boolean;
  data?: T;
  error?: ErrorExplanation;
}
```

```typescript
prettyTryAsync<T>(fn: () => Promise<T>): Promise<PrettyTryResult<T>>
```

Same as `prettyTry` but for async functions.

```typescript
formatError(error: ErrorExplanation): string
```

Formats an error explanation into a readable string.

```typescript
logError(error: ErrorExplanation): void
```

Logs a formatted error to console.error.

## 🤝 Contributing

Found an error that needs a better explanation? 
Open an issue or submit a PR!

## 📄 License

MIT - slammers001
