import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Claude Code Mobile</h1>
        <p className={styles.subtitle}>
          Mobile-friendly asynchronous wrapper around Claude Code with real-time streaming updates
        </p>

        <section className={styles.section}>
          <h2>Project Overview</h2>
          <p>
            Claude Code Mobile provides a production-ready foundation for building mobile applications 
            that leverage Claude Code's powerful automation capabilities while maintaining the responsive, 
            intuitive user experience that mobile users expect.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Core Architecture</h2>
          <p>
            Our architecture combines <strong>queue-based asynchronous execution</strong> with{" "}
            <strong>real-time streaming updates</strong> and <strong>progressive disclosure UI patterns</strong>.
          </p>
          
          <h3>Technology Stack</h3>
          <ul>
            <li><strong>Vercel Sandbox</strong> - Isolated code execution environment</li>
            <li><strong>Upstash Workflow</strong> - Job orchestration and retry logic</li>
            <li><strong>Supabase</strong> - Database, authentication, and real-time updates</li>
            <li><strong>Next.js</strong> - Full-stack web application</li>
            <li><strong>Turborepo</strong> - Monorepo build system</li>
          </ul>

          <h3>Execution Flow</h3>
          <ol>
            <li>User submits Claude Code task in Next.js web app</li>
            <li>App creates Upstash Workflow for orchestration</li>
            <li>Workflow invokes Next.js API route</li>
            <li>API route spins up Vercel Sandbox for secure execution</li>
            <li>Sandbox clones repository and runs Claude Code CLI</li>
            <li>Results streamed back and stored in Supabase</li>
            <li>Real-time UI updates via Supabase Realtime</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>Key Features</h2>
          <ul>
            <li><strong>Secure Code Execution</strong> - Isolated Linux VMs via Vercel Sandbox</li>
            <li><strong>Real-time Updates</strong> - Live progress streaming via WebSockets</li>
            <li><strong>Progressive Disclosure</strong> - Three-tier information architecture</li>
            <li><strong>Queue-based Processing</strong> - Reliable job orchestration</li>
            <li><strong>Mobile-optimized</strong> - Responsive UI with mobile-first design</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Claude Code Integration</h2>
          <p>
            The system leverages Claude Code's non-interactive mode with mobile-relevant capabilities:
          </p>
          <pre className={styles.code}>
{`# Mobile backend-optimized execution
claude -p "Review this mobile API code" \\
  --output-format stream-json \\
  --allowedTools "Read,Edit,Bash(npm test)" \\
  --max-turns 3 \\
  --timeout 300`}
          </pre>
          
          <h3>Key Flags for Mobile Backends</h3>
          <ul>
            <li><code>--output-format stream-json</code> - Real-time parsing of structured responses</li>
            <li><code>--allowedTools</code> - Granular permission control for security</li>
            <li><code>--max-turns</code> - Prevents infinite loops in automated contexts</li>
            <li><code>--verbose</code> - Detailed logging for debugging mobile integrations</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Progressive Disclosure UI</h2>
          <p>
            Based on GitHub Mobile's successful approach, our UI implements three-tier information disclosure:
          </p>
          <ul>
            <li><strong>Level 1: Command Overview</strong> - Basic status and primary actions</li>
            <li><strong>Level 2: Detailed Results</strong> - Structured output and error details</li>
            <li><strong>Level 3: Full Context</strong> - Complete conversation history and debug info</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Repository Structure</h2>
          <pre className={styles.code}>
{`apps/
├── docs/               # Project documentation
└── web/                # Next.js app (UI + API routes)

packages/
├── eslint-config/      # Shared linting rules
├── typescript-config/  # Shared TypeScript config
└── supabase/           # Supabase client + utilities`}
          </pre>
        </section>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="/architecture"
          >
            View Architecture Details
          </a>
          <a
            href="/api"
            className={styles.secondary}
          >
            API Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
