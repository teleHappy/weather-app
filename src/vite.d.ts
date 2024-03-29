// vite-env.d.ts
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

interface ImportMeta {
  env: Record<string, string>;
}
