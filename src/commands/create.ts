import inquirer from 'inquirer';
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
    // Get project configuration
    config = await getProjectConfig(projectName, options);
    
    // Validate project name
    validateProjectName(config.name);

    // Check if directory already exists
    const projectPath = path.resolve(process.cwd(), config.name);
    if (await fs.pathExists(projectPath)) {
      throw new Error(`Directory "${config.name}" already exists!`);
    }

    // Create Vite project
    await createViteProject(config);

    // Setup project files
    await setupProject(config);

    // Success message
    console.log(chalk.green('\n✅ Project created successfully!\n'));
    console.log(chalk.cyan('Next steps:'));
    console.log(chalk.white(`  cd ${config.name}`));
    console.log(chalk.white('  npm run dev\n'));

  } catch (error) {
    throw error;
  }
}

async function getProjectConfig(projectName?: string, options: ProjectOptions = {}): Promise<ProjectConfig> {
  const questions = [];

  // Ask for project name if not provided
  if (!projectName) {
    questions.push({
      type: 'input',
      name: 'name',
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

  // Ask for Tailwind CSS if not specified
  if (options.tailwind === undefined && !options.yes) {
    questions.push({
      type: 'confirm',
      name: 'includeTailwind',
      message: 'Add Tailwind CSS?',
      default: false
    });
  }

  // Ask for TypeScript if not specified
  if (options.typescript === undefined && !options.yes) {
    questions.push({
      type: 'confirm',
      name: 'useTypeScript',
      message: 'Use TypeScript?',
      default: false
    });
  }

  let answers: any = {};
  if (questions.length > 0 && !options.yes) {
    answers = await inquirer.prompt(questions);
  }

  return {
    name: projectName || answers.name,
    includeTailwind: options.tailwind ?? answers.includeTailwind ?? false,
    useTypeScript: options.typescript ?? answers.useTypeScript ?? false
  };
}

async function createViteProject(config: ProjectConfig): Promise<void> {
  const spinner = ora('Creating Vite project...').start();
  
  try {
    // Choose template based on TypeScript preference
    const template = config.useTypeScript ? 'react-ts' : 'react';
    
    // Create Vite project using npm create vite
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
