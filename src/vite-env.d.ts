/// <reference types="vite/client" />

declare module 'vite' {
  interface CssOptions {
    postcss?: string | { config?: string };
  }
}