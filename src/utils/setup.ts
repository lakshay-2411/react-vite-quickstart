import ora from 'ora';
import chalk from 'chalk';
import { execSync } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';
import { ProjectConfig } from '../types';
import { getReactAppTemplate, getIndexCssTemplate, getViteConfigTemplate, getAppCssTemplate } from '../templates';

export async function setupProject(config: ProjectConfig): Promise<void> {
  const projectPath = path.resolve(process.cwd(), config.name);
  
  // Install dependencies
  await installDependencies(projectPath);
  
  // Add Tailwind CSS if requested
  if (config.includeTailwind) {
    await setupTailwind(projectPath);
  }
  
  // Clean up and customize boilerplate
  await customizeProject(projectPath, config);
}

async function installDependencies(projectPath: string): Promise<void> {
  const spinner = ora('Installing dependencies...').start();
  
  try {
    execSync('npm install', { 
      stdio: 'pipe',
      cwd: projectPath 
    });
    spinner.succeed('Dependencies installed');
  } catch (error) {
    spinner.fail('Failed to install dependencies');
    throw new Error(`Failed to install dependencies: ${error}`);
  }
}

async function setupTailwind(projectPath: string): Promise<void> {
  const spinner = ora('Setting up Tailwind CSS...').start();
  
  try {
    // Install Tailwind CSS v4.1
    execSync('npm install tailwindcss @tailwindcss/vite', { 
      stdio: 'pipe',
      cwd: projectPath 
    });
    
    // Update vite.config.js
    const viteConfigPath = path.join(projectPath, 'vite.config.js');
    const viteConfigContent = getViteConfigTemplate(true);
    await fs.writeFile(viteConfigPath, viteConfigContent);
    
    // Update index.css
    const indexCssPath = path.join(projectPath, 'src', 'index.css');
    const indexCssContent = getIndexCssTemplate(true);
    await fs.writeFile(indexCssPath, indexCssContent);
    
    spinner.succeed('Tailwind CSS configured');
  } catch (error) {
    spinner.fail('Failed to setup Tailwind CSS');
    throw new Error(`Failed to setup Tailwind CSS: ${error}`);
  }
}

async function customizeProject(projectPath: string, config: ProjectConfig): Promise<void> {
  const spinner = ora('Customizing project...').start();
  
  try {
    // Create components directory
    const componentsDir = path.join(projectPath, 'src', 'components');
    await fs.ensureDir(componentsDir);
    
    // Replace App.jsx/tsx with clean template
    const appExtension = config.useTypeScript ? 'tsx' : 'jsx';
    const appPath = path.join(projectPath, 'src', `App.${appExtension}`);
    const appContent = getReactAppTemplate(config.includeTailwind, config.useTypeScript);
    await fs.writeFile(appPath, appContent);
    
    // Create/update App.css
    const appCssPath = path.join(projectPath, 'src', 'App.css');
    const appCssContent = getAppCssTemplate();
    await fs.writeFile(appCssPath, appCssContent);
    
    // Update index.css
    const indexCssPath = path.join(projectPath, 'src', 'index.css');
    const indexCssContent = getIndexCssTemplate(config.includeTailwind);
    await fs.writeFile(indexCssPath, indexCssContent);
    
    // Update vite.config.js/ts
    const viteConfigExtension = config.useTypeScript ? 'ts' : 'js';
    const viteConfigPath = path.join(projectPath, `vite.config.${viteConfigExtension}`);
    const viteConfigContent = getViteConfigTemplate(config.includeTailwind, config.useTypeScript);
    await fs.writeFile(viteConfigPath, viteConfigContent);
    
    // Remove default assets that we don't need
    const assetsToRemove = [
      path.join(projectPath, 'src', 'assets', 'react.svg'),
      path.join(projectPath, 'public', 'vite.svg')
    ];
    
    for (const assetPath of assetsToRemove) {
      if (await fs.pathExists(assetPath)) {
        await fs.remove(assetPath);
      }
    }
    
    // Update README.md
    await updateReadme(projectPath, config);
    
    spinner.succeed('Project customized');
  } catch (error) {
    spinner.fail('Failed to customize project');
    throw new Error(`Failed to customize project: ${error}`);
  }
}

async function updateReadme(projectPath: string, config: ProjectConfig): Promise<void> {
  const readmePath = path.join(projectPath, 'README.md');
  
  const readmeContent = `# ${config.name}

A React application built with Vite${config.includeTailwind ? ' and Tailwind CSS' : ''}.

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open your browser and visit \`http://localhost:5173\`

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint

## Tech Stack

- ⚛️ React 18
- ⚡ Vite
- 📦 npm${config.includeTailwind ? '\n- 🎨 Tailwind CSS' : ''}

## Project Structure

\`\`\`
${config.name}/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── App.jsx      # Main app component
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles
├── package.json
└── vite.config.js
\`\`\`

---

Created with [react-vite-quickstart](https://www.npmjs.com/package/react-vite-quickstart)
`;

  await fs.writeFile(readmePath, readmeContent);
}
