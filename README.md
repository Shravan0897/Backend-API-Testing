# Backend API Testing (TypeScript, JSONPlaceholder)

**Base URL:** `https://jsonplaceholder.typicode.com`

This mini project includes a tiny Jest test suite in TypeScript that hits a few JSONPlaceholder endpoints and checks:

- **Correctness of responses**
- **Data integrity**
- **Robustness** (handling unexpected input)

## Setup

**Prereqs**
- Node.js 18+
- npm 8+

**Install**
```bash
npm install
```

**Run tests**
```bash
npm test
```

**Optional: point to a different base URL**
```bash
BASE_URL=https://jsonplaceholder.typicode.com npm test
```
If `BASE_URL` is not set, tests default to `https://jsonplaceholder.typicode.com`.

## Project structure

```
.
├─ package.json
├─ tsconfig.json
└─ tests
   └─ api.test.ts
```

## Notes
- Uses **ts-jest** to transpile TypeScript on the fly.
- Uses **axios** for HTTP and **zod** for schema validation.
- JSONPlaceholder is a mock API.
