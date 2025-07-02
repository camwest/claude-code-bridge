# @claude-code-mobile/supabase

Shared Supabase client configuration and utilities for the Claude Code Mobile project.

## Contents

- **client.ts** - Supabase client configuration for browser and server
- **types.ts** - Database types and job queue message types
- **auth.ts** - Authentication service with common auth operations
- **queue.ts** - Job queue management using Supabase database and queues

## Usage

### Client Setup

```typescript
import { supabase, supabaseAdmin } from '@claude-code-mobile/supabase/client'

// Browser/client-side operations
const { data, error } = await supabase.from('jobs').select('*')

// Server-side admin operations (requires service role key)
const { data, error } = await supabaseAdmin.from('jobs').insert(...)
```

### Authentication

```typescript
import { AuthService } from '@claude-code-mobile/supabase/auth'

// Sign in
const user = await AuthService.signInWithPassword(email, password)

// Get current user
const currentUser = await AuthService.getCurrentUser()

// Listen for auth changes
AuthService.onAuthStateChange((user) => {
  console.log('Auth state changed:', user)
})
```

### Job Queue

```typescript
import { JobQueue } from '@claude-code-mobile/supabase/queue'

// Create a new job
const job = await JobQueue.createJob({
  user_id: userId,
  type: 'claude_code',
  prompt: 'Review this code',
  repository_url: 'https://github.com/user/repo',
})

// Subscribe to job updates
const subscription = JobQueue.subscribeToJob(job.id, (updatedJob) => {
  console.log('Job updated:', updatedJob)
})
```

## Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Database Schema

This package expects the following database tables:

- `jobs` - Stores Claude Code execution jobs
- `profiles` - User profiles linked to auth

Run the provided SQL migrations to set up the required schema.