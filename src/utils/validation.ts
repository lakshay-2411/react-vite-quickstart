export function validateProjectName(name: string): void {
  if (!name || !name.trim()) {
    throw new Error('Project name cannot be empty');
  }

  const trimmedName = name.trim();

  // Check for invalid characters
  if (!/^[a-zA-Z0-9-_]+$/.test(trimmedName)) {
    throw new Error('Project name can only contain letters, numbers, hyphens, and underscores');
  }

  // Check if name starts with a letter or number
  if (!/^[a-zA-Z0-9]/.test(trimmedName)) {
    throw new Error('Project name must start with a letter or number');
  }

  // Check for reserved names
  const reservedNames = [
    'node_modules', 'package.json', 'package-lock.json',
    'npm', 'node', 'react', 'vite', 'src', 'public',
    'dist', 'build', '.git', '.gitignore'
  ];

  if (reservedNames.includes(trimmedName.toLowerCase())) {
    throw new Error(`"${trimmedName}" is a reserved name and cannot be used`);
  }

  // Check length
  if (trimmedName.length > 214) {
    throw new Error('Project name is too long (max 214 characters)');
  }
}
