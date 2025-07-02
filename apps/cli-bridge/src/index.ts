#!/usr/bin/env node

/**
 * Claude Code Bridge - CLI entry point
 * 
 * Enables remote browser control of local Claude Code execution
 */

import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .name('claude-code-bridge')
  .description('CLI bridge for remote Claude Code execution')
  .version('0.1.0');

program
  .option('-f, --force', 'force start even if another bridge is active')
  .option('--reset', 'reset stored session and generate new PIN')
  .option('--timeout <minutes>', 'timeout for prompts in minutes', '30')
  .option('--log-file <path>', 'log to file in addition to stdout')
  .action(async (options) => {
    console.log(chalk.blue('🔗 Starting Claude Code Bridge...'));
    
    // TODO: Implement bridge logic
    console.log(chalk.yellow('⚠️  Implementation in progress - see GitHub issues'));
    console.log(chalk.gray('Repository: https://github.com/camwest/claude-code-bridge'));
  });

program.parse(process.argv);