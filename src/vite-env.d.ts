/// <reference types="vite/client" />

// Gør TypeScript glad for .mdx moduler
declare module "*.mdx" {
  import type { ComponentType } from "react";
  export const meta: Record<string, unknown> | undefined;
  const Component: ComponentType<any>;
  export default Component;
}
