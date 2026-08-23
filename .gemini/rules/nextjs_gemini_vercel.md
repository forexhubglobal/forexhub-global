---
name: Next.js & Gemini Vercel Guidelines
description: Mandatory coding practices and troubleshooting steps for Gemini SDK integrations, Next.js dynamic imports, and Vercel environments.
---

# Next.js & Gemini Vercel Guidelines

When working on this project, strictly adhere to the following rules:

1. **Gemini SDK Model Constraints**: 
   - ALWAYS use `gemini-3.6-flash` (or the latest verified 3.x generation) when initializing the `@google/generative-ai` SDK.
   - DO NOT use `gemini-1.5-flash` or `gemini-pro`, as they return `404 Not Found` or "no longer available to new users" for modern GCP API Keys.

2. **Environment Variable Sanitization**:
   - ALWAYS append `.trim()` when reading API keys from `process.env` (e.g., `process.env.GEMINI_API_KEY?.trim()`).
   - Trailing whitespaces or newlines from Vercel copy-pasting will silently corrupt Google AI SDK HTTP headers and cause 404 routing errors.

3. **Next.js Dynamic Imports (SSR)**:
   - When using `next/dynamic` with `{ ssr: false }` (e.g., for WebGL Canvas/Globe components), you MUST include the `'use client';` directive at the very top of the file where the import is called.
   - Failure to do this will cause fatal `npm run build` compilation crashes in Next.js 16+, blocking all Vercel deployments.
