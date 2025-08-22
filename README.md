# React Vite Quickstart CLI

[![npm version](https://badge.fury.io/js/react-vite-quickstart.svg)](https://badge.fury.io/js/react-vite-quickstart)
[![npm downloads](https://img.shields.io/npm/dm/react-vite-quickstart.svg)](https://www.npmjs.com/package/react-vite-quickstart)
[![license](https://img.shields.io/npm/l/react-vite-quickstart.svg)](https://github.com/lakshay-2411/react-vite-quickstart/blob/master/LICENSE)

A powerful CLI tool to quickly scaffold React + Vite projects with optional Tailwind CSS and TypeScript support. Eliminates the repetitive manual setup process and gets you coding faster.

## ✨ Features

- 🚀 **Single Command Setup** - Create a complete React + Vite project instantly
- 🎨 **Optional Tailwind CSS** - Choose to include Tailwind CSS v4.1 with zero configuration
- 📝 **TypeScript Support** - Optional TypeScript templates with proper type annotations
- 🧹 **Clean Boilerplate** - No unnecessary example code, just a clean starting point
- 📦 **Auto Dependencies** - Automatically installs all required packages
- ⚡ **Ready to Run** - Generated project works immediately with `npm run dev`
- 🔧 **Cross Platform** - Works on Windows, macOS, and Linux

## 🚀 Installation & Quick Start

### Using npx (Recommended)
```bash
npx react-vite-quickstart
```

### Global Installation
```bash
npm install -g react-vite-quickstart
react-vite-quickstart
```

### One-liner project creation
```bash
npx react-vite-quickstart my-awesome-app --typescript --tailwind
```

## Usage

### Interactive Mode
```bash
npx react-vite-quickstart
```

The CLI will prompt you for:
- Project name
- Whether to include Tailwind CSS
- Whether to use TypeScript

### Command Line Arguments
```bash
# Create project with specific name
npx react-vite-quickstart my-awesome-app

# Include Tailwind CSS
npx react-vite-quickstart my-awesome-app --tailwind

# Use TypeScript
npx react-vite-quickstart my-awesome-app --typescript

# Skip all prompts (use defaults)
npx react-vite-quickstart my-awesome-app --yes

# Combine options
npx react-vite-quickstart my-awesome-app --tailwind --typescript --yes
```

### Options

- `--tailwind, -t` - Include Tailwind CSS setup
- `--typescript, -ts` - Use TypeScript template
- `--yes, -y` - Skip prompts and use defaults

## What Gets Created

```
my-awesome-app/
├── src/
│   ├── components/      # Empty components directory
│   ├── App.jsx         # Clean React component (with/without Tailwind)
│   ├── main.jsx        # React entry point
│   └── index.css       # Global styles (with/without Tailwind)
├── public/
├── package.json        # With all dependencies
├── vite.config.js      # Configured for React (+ Tailwind if selected)
└── README.md           
```

## Tailwind CSS Integration

When you choose to include Tailwind CSS, the tool automatically:

1. Installs `tailwindcss` and `@tailwindcss/vite`
2. Configures Vite to use the Tailwind plugin
3. Updates `index.css` with Tailwind imports
4. Provides a styled example component

This uses **Tailwind CSS v4.1**

## Example Output

```bash
$ npx react-vite-quickstart

✨ Welcome to React Vite Project Generator!

? Project name: my-awesome-app
? Add Tailwind CSS? Yes

🚀 Creating Vite project...
📦 Installing dependencies...
🎨 Setting up Tailwind CSS...
🧹 Customizing project...

✅ Project created successfully!

Next steps:
  cd my-awesome-app
  npm run dev
```

## Requirements

- Node.js 16 or higher
- npm (comes with Node.js)

## Why Use This Tool?

**Before:**
1. Run `npm create vite@latest`
2. Choose React template
3. Navigate to project directory
4. Install dependencies
5. Optionally install and configure Tailwind CSS
6. Remove boilerplate code
7. Create basic project structure

⏱️ **Time: 5-10 minutes**

**After:**
```bash
npx react-vite-quickstart
```

⏱️ **Time: <2 minutes**

## Comparison

| Feature | Manual Setup | react-vite-quickstart |
|---------|-------------|----------------------|
| Time Required | 5-10 minutes | <2 minutes |
| Steps | 7+ manual steps | 1 command |
| Tailwind Setup | Manual configuration | Automated |
| Clean Boilerplate | Manual cleanup | Automatic |
| Ready to Code | After manual work | Immediately |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development

To work on this project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/lakshay-2411/react-vite-quickstart.git
   cd react-vite-quickstart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Test locally**
   ```bash
   # Test the CLI tool
   node dist/index.js my-test-project
   
   # Or link it globally for testing
   npm link
   react-vite-quickstart my-test-project
   npm unlink react-vite-quickstart
   ```

5. **Development mode**
   ```bash
   npm run dev
   ```

## 📦 NPM Package

This package is available on npm: [react-vite-quickstart](https://www.npmjs.com/package/react-vite-quickstart)

```bash
# View package info
npm info react-vite-quickstart

# View all versions
npm view react-vite-quickstart versions --json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Lakshay](https://github.com/lakshay-2411)

## ⭐ Support

If you find this tool helpful, please give it a ⭐ on [GitHub](https://github.com/lakshay-2411/react-vite-quickstart)!

---


