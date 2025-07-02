/**
 * Bridge Protocol Types
 * 
 * Shared TypeScript types for communication between CLI bridge and web UI
 */

// Session and pairing types
export interface BridgeSession {
  id: string;
  userId: string;
  repositoryPath: string;
  createdAt: Date;
  lastActiveAt: Date;
}

export interface PairingInfo {
  pin: string;
  sessionId: string;
  expiresAt: Date;
  deepLink: string;
}

// Conversation types (Claude Code terminology)
export interface Conversation {
  id: string;
  name?: string;
  sessionId?: string; // Claude Code session ID for --resume
  createdAt: Date;
  lastActiveAt: Date;
}

// Prompt execution types
export interface PromptRequest {
  conversationId: string;
  promptId: string;
  prompt: string;
  resume?: boolean;
}

export interface PromptResponse {
  conversationId: string;
  promptId: string;
  type: 'chunk' | 'complete' | 'error' | 'cancelled';
  content?: string;
  error?: string;
  sessionId?: string; // Returned from Claude Code for future --resume
}

// Permission types
export interface PermissionRequest {
  conversationId: string;
  promptId: string;
  tool: string;
  message: string;
}

export type PermissionResponse = 'grant_once' | 'always_allow' | 'cancel';

// Status types
export type BridgeStatus = 'connecting' | 'paired' | 'active' | 'error';
export type PromptStatus = 'pending' | 'running' | 'completed' | 'cancelled' | 'error';

// TODO: Add more types as needed per GitHub issue #2