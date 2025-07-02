// Generated Supabase types will go here
// TODO: Replace with actual generated types from `supabase gen types typescript`
export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          status: JobStatus
          type: JobType
          prompt: string
          repository_url?: string
          branch?: string
          allowed_tools?: string[]
          max_turns?: number
          timeout?: number
          result?: JobResult
          error_message?: string
          logs?: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          status?: JobStatus
          type: JobType
          prompt: string
          repository_url?: string
          branch?: string
          allowed_tools?: string[]
          max_turns?: number
          timeout?: number
          result?: JobResult
          error_message?: string
          logs?: string[]
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          status?: JobStatus
          type?: JobType
          prompt?: string
          repository_url?: string
          branch?: string
          allowed_tools?: string[]
          max_turns?: number
          timeout?: number
          result?: JobResult
          error_message?: string
          logs?: string[]
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name?: string
          avatar_url?: string
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string
          avatar_url?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string
          avatar_url?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      job_status: JobStatus
      job_type: JobType
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Job-related types
export type JobStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
export type JobType = 'claude_code' | 'repository_analysis' | 'code_review'

export interface JobResult {
  output?: string
  files_modified?: string[]
  files_created?: string[]
  files_deleted?: string[]
  commit_hash?: string
  duration_ms?: number
}

// Queue message types for Supabase Queues
export interface QueueMessage {
  job_id: string
  user_id: string
  type: JobType
  payload: {
    prompt: string
    repository_url?: string
    branch?: string
    allowed_tools?: string[]
    max_turns?: number
    timeout?: number
  }
}

// Real-time subscription types
export type RealtimeJob = Database['public']['Tables']['jobs']['Row']
export type RealtimePayload<T = any> = {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new: T
  old: T
  errors: string[] | null
}