import { supabase, supabaseAdmin } from './client'
import type { 
  Database, 
  JobStatus, 
  JobType, 
  QueueMessage, 
  RealtimeJob,
  RealtimePayload 
} from './types'

type JobInsert = Database['public']['Tables']['jobs']['Insert']
type JobUpdate = Database['public']['Tables']['jobs']['Update']
type JobRow = Database['public']['Tables']['jobs']['Row']

export class JobQueue {
  /**
   * Create a new job in the database and queue
   */
  static async createJob(job: Omit<JobInsert, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<JobRow> {
    // Insert job into database
    const { data, error } = await supabase
      .from('jobs')
      .insert({
        ...job,
        status: 'pending' as JobStatus,
      })
      .select()
      .single()

    if (error) throw error

    // Add job to Supabase Queue for processing
    const queueMessage: QueueMessage = {
      job_id: data.id,
      user_id: data.user_id,
      type: data.type,
      payload: {
        prompt: data.prompt,
        repository_url: data.repository_url || undefined,
        branch: data.branch || undefined,
        allowed_tools: data.allowed_tools || undefined,
        max_turns: data.max_turns || undefined,
        timeout: data.timeout || undefined,
      }
    }

    // TODO: Implement Supabase Queue integration when available
    // For now, we'll use a simple approach with the database
    console.log('Job queued:', queueMessage)

    return data
  }

  /**
   * Update job status and result
   */
  static async updateJob(jobId: string, updates: JobUpdate): Promise<JobRow> {
    const { data, error } = await supabaseAdmin
      .from('jobs')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', jobId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  /**
   * Get job by ID
   */
  static async getJob(jobId: string): Promise<JobRow | null> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw error
    }
    return data
  }

  /**
   * Get jobs for a user
   */
  static async getUserJobs(userId: string, limit = 50): Promise<JobRow[]> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  /**
   * Get pending jobs (for worker processing)
   */
  static async getPendingJobs(limit = 10): Promise<JobRow[]> {
    const { data, error } = await supabaseAdmin
      .from('jobs')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  /**
   * Cancel a job
   */
  static async cancelJob(jobId: string, userId: string): Promise<JobRow> {
    const { data, error } = await supabase
      .from('jobs')
      .update({ 
        status: 'cancelled' as JobStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', jobId)
      .eq('user_id', userId) // Ensure user can only cancel their own jobs
      .select()
      .single()

    if (error) throw error
    return data
  }

  /**
   * Subscribe to job updates for real-time UI
   */
  static subscribeToJob(jobId: string, callback: (job: RealtimeJob) => void) {
    return supabase
      .channel(`job:${jobId}`)
      .on<RealtimeJob>(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'jobs',
          filter: `id=eq.${jobId}`,
        },
        (payload: RealtimePayload<RealtimeJob>) => {
          callback(payload.new)
        }
      )
      .subscribe()
  }

  /**
   * Subscribe to all jobs for a user
   */
  static subscribeToUserJobs(userId: string, callback: (job: RealtimeJob, event: string) => void) {
    return supabase
      .channel(`user_jobs:${userId}`)
      .on<RealtimeJob>(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'jobs',
          filter: `user_id=eq.${userId}`,
        },
        (payload: RealtimePayload<RealtimeJob>) => {
          const event = payload.eventType.toLowerCase()
          const job = payload.new || payload.old
          callback(job, event)
        }
      )
      .subscribe()
  }
}