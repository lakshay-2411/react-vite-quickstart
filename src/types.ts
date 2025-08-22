export interface ProjectOptions {
  tailwind?: boolean;
  typescript?: boolean;
  yes?: boolean;
}

export interface ProjectConfig {
  name: string;
  includeTailwind: boolean;
  useTypeScript: boolean;
}
