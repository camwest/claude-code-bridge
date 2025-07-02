/**
 * Claude SDK Client
 * 
 * TypeScript wrapper around Claude Code SDK with process management
 */

import { spawn, ChildProcess } from 'child_process';

export interface ClaudeOptions {
  prompt: string;
  resume?: string; // session ID for --resume
  allowedTools?: string[];
  maxTurns?: number;
  timeout?: number;
  outputFormat?: 'stream-json' | 'text';
}

export interface ClaudeResult {
  sessionId?: string;
  output: string;
  error?: string;
  exitCode: number;
}

export class ClaudeSDK {
  private processes = new Map<string, ChildProcess>();

  /**
   * Verify Claude Code is available and API key is set
   */
  async verifySetup(): Promise<{ valid: boolean; error?: string }> {
    // TODO: Implement API key verification
    // Check for ANTHROPIC_API_KEY environment variable
    // Test Claude Code SDK availability
    return { valid: false, error: 'Implementation pending - see GitHub issue #3' };
  }

  /**
   * Execute a Claude Code prompt
   */
  async executePrompt(
    promptId: string,
    options: ClaudeOptions,
    onChunk?: (chunk: string) => void
  ): Promise<ClaudeResult> {
    // TODO: Implement Claude Code execution
    // Spawn child process with appropriate flags
    // Stream output via onChunk callback
    // Handle --resume for conversation continuity
    throw new Error('Implementation pending - see GitHub issue #3');
  }

  /**
   * Cancel a running prompt
   */
  async cancelPrompt(promptId: string): Promise<boolean> {
    const process = this.processes.get(promptId);
    if (process) {
      process.kill('SIGTERM');
      this.processes.delete(promptId);
      return true;
    }
    return false;
  }

  /**
   * Get running prompts
   */
  getRunningPrompts(): string[] {
    return Array.from(this.processes.keys());
  }
}