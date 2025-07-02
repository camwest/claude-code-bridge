# Claude Code Bridge

🔗 A CLI bridge that enables remote browser control of local Claude Code execution, keeping your code secure on your machine.

## Quick Start

```bash
npm i -g @claude/bridge          # Install once (Node ≥ 18)
cd ~/projects/my-repo            # Navigate to your repo
claude-bridge                    # Start bridge
# CLI prints:
# 🔗 https://bridge.app/pair#7F32A9C4   PIN: 7F32A9C4 (10-min expiry)
```

1. Open the link → Sign in with Google → Enter PIN
2. Browser shows conversations list
3. Type prompts; replies stream live
4. Stop bridge (Ctrl-C), restart later without new PIN

## Architecture

This monorepo contains:

### Applications
- `cli-bridge`: Node.js CLI binary for local Claude Code execution
- `web`: Next.js web interface for browser control  
- `docs`: Project documentation

### Packages
- `bridge-protocol`: Shared types for CLI-browser communication
- `claude-sdk`: TypeScript wrapper around Claude Code SDK
- `supabase`: Authentication and real-time communication
- `eslint-config`: Shared ESLint configurations
- `typescript-config`: Shared TypeScript configurations

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## How It Works

1. **Local Execution**: Claude Code runs entirely on your machine
2. **Secure Bridge**: CLI creates encrypted Supabase Realtime channels  
3. **Browser Control**: Web UI sends prompts and receives responses
4. **Multi-Device**: Same session works across all your devices/tabs

## Development

### Prerequisites
- Node.js ≥ 18
- Claude Code CLI installed and configured
- ANTHROPIC_API_KEY environment variable

### Setup
```bash
git clone https://github.com/camwest/claude-code-mobile
cd claude-code-mobile
bun install
```

### Build & Test
```bash
# Build all packages
bun run build

# Run CLI in development
cd apps/cli-bridge
bun run dev

# Run web UI
cd apps/web  
bun run dev
```

## Project Status

🚧 **In Development** - See [GitHub Issues](https://github.com/camwest/claude-code-mobile/issues) for current progress:

- [📦 Bridge Protocol Package](https://github.com/camwest/claude-code-mobile/issues/2)
- [🔧 Claude SDK Package](https://github.com/camwest/claude-code-mobile/issues/3)  
- [💻 CLI Bridge Application](https://github.com/camwest/claude-code-mobile/issues/4)
- [🌐 Web UI Application](https://github.com/camwest/claude-code-mobile/issues/5)
- [📡 Supabase Integration](https://github.com/camwest/claude-code-mobile/issues/6)
- [📚 Documentation & Distribution](https://github.com/camwest/claude-code-mobile/issues/7)

## Security

- Code never leaves your machine
- Supabase channels use random UUIDs
- Google authentication via Supabase Auth
- TLS encryption for all communications

## Contributing

See individual GitHub issues for specific tasks. Each issue contains detailed acceptance criteria and implementation guidance.
