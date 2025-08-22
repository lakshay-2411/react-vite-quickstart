#!/usr/bin/env node

import { Command } from 'commander';
import { createProject } from './commands/create';
import { version } from '../package.json';
import chalk from 'chalk';
import { ProjectOptions } from './types';

const program = new Command();

program
  .name('react-vite-quickstart')
  .description('CLI tool to quickly scaffold React + Vite projects')
  .version(version);

program
  .argument('[project-name]', 'name of the project')
  .option('-t, --tailwind', 'include Tailwind CSS')
  .option('-ts, --typescript', 'use TypeScript template')
  .option('-y, --yes', 'skip prompts and use defaults')
  .action(async (projectName: string | undefined, options: ProjectOptions) => {
    console.log(chalk.cyan('✨ Welcome to React Vite Project Generator!\n'));
    
    try {
      await createProject(projectName, options);
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }
  });

program.parse();
