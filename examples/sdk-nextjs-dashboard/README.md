# Formsync Dashboard Example

This is a comprehensive example of how to build a form management dashboard using the [Formsync SDK](https://www.npmjs.com/package/formsync). Built with [Next.js](https://nextjs.org), it demonstrates how to programmatically fetch forms and their submissions.

## Features

- **List Forms**: Fetch all available forms associated with your API key.
- **View Submissions**: Drill down into specific forms to see all captured data.
- **Dynamic Content**: Uses Next.js App Router with dynamic rendering for real-time data access.

## Getting Started

### 1. Prerequisites

You'll need a Formsync API key. You can get one from the [Formsync Dashboard](https://formsync.live).

### 2. Environment Setup

Create a `.env` file in this directory and add your API key:

```env
FORMSYNC_API_KEY=your_api_key_here
```

### 3. Installation

Install the dependencies:

```bash
pnpm install
```

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## SDK Usage

This example uses the `formsync` package to interact with the Formsync API.

### Initialization

The SDK is initialized in `config/formsync.ts`:

```typescript
import { FormSync } from "formsync";

export const formsync = new FormSync({
  apiKey: process.env.FORMSYNC_API_KEY!,
});
```

### Fetching Forms

To list all forms:

```typescript
const res = await formsync.forms.list();
if (res.success) {
  console.log(res.forms);
}
```

### Fetching Submissions

To fetch submissions for a specific form:

```typescript
const res = await formsync.submissions.list({ formId: "your_form_id" });
if (res.success) {
  console.log(res.submissions);
}
```

## Learn More

- [Formsync Documentation](https://formsync.app)
- [Next.js Documentation](https://nextjs.org/docs)
