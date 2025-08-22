import { input, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
import { ProjectOptions, ProjectConfig } from '../types';
import { setupProject } from '../utils/setup';
import { validateProjectName } from '../utils/validation';

export async function createProject(projectName?: string, options: ProjectOptions = {}): Promise<void> {
  let config: ProjectConfig;

  try {
    config = await getProjectConfig(projectName, options);
    
    validateProjectName(config.name);

    const projectPath = path.resolve(process.cwd(), config.name);
    if (await fs.pathExists(projectPath)) {
      throw new Error(`Directory "${config.name}" already exists!`);
    }

    await createViteProject(config);

    await setupProject(config);

    console.log(chalk.green('\n✅ Project created successfully!\n'));
    console.log(chalk.cyan('Next steps:'));
    console.log(chalk.white(`  cd ${config.name}`));
    console.log(chalk.white('  npm run dev\n'));

  } catch (error) {
    throw error;
  }
}

async function getProjectConfig(projectName?: string, options: ProjectOptions = {}): Promise<ProjectConfig> {
  let name = projectName;
  let includeTailwind = options.tailwind ?? false;
  let useTypeScript = options.typescript ?? false;

  // Ask for project name if not provided and not using --yes
  if (!name && !options.yes) {
    name = await input({
      message: 'Project name:',
      validate: (input: string) => {
        if (!input.trim()) {
          return 'Project name is required!';
        }
        try {
          validateProjectName(input.trim());
          return true;
        } catch (error) {
          return error instanceof Error ? error.message : 'Invalid project name';
        }
      }
    });
  }

  // Ask for Tailwind CSS if not specified and not using --yes
  if (options.tailwind === undefined && !options.yes) {
    includeTailwind = await confirm({
      message: 'Add Tailwind CSS?',
      default: false
    });
  }

  // Ask for TypeScript if not specified and not using --yes
  if (options.typescript === undefined && !options.yes) {
    useTypeScript = await confirm({
      message: 'Use TypeScript?',
      default: false
    });
  }

  return {
    name: name || 'my-react-app',
    includeTailwind,
    useTypeScript
  };
}

async function createViteProject(config: ProjectConfig): Promise<void> {
  const spinner = ora('Creating Vite project...').start();
  
  try {
    const template = config.useTypeScript ? 'react-ts' : 'react';
    
    const command = `npm create vite@latest ${config.name} -- --template ${template}`;
    execSync(command, { 
      stdio: 'pipe',
      cwd: process.cwd()
    });
    
    spinner.succeed('Vite project created');
  } catch (error) {
    spinner.fail('Failed to create Vite project');
    throw new Error(`Failed to create Vite project: ${error}`);
  }
}
