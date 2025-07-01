/// <reference types="vite/client" />

export namespace NodeJS {
  export interface ProcessEnv {
    BROWSER: 'chrome' | 'firefox' | 'edge' | 'opera' | 'safari';
    MINIFY: 'true' | 'false';
  }
}

interface ImportMetaEnv {
  VITE_DEBUG_LOG?: string
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare global {
  interface Window {
    __PREFILL_PASSWORD__: string;
    __PACKAGE_VERSION__: string;
    __IS_DEV__: boolean;
    __IS_FIREFOX__: boolean;
    __IS_OPERA__: boolean;
    __IS_CHROME__: boolean;
    __IS_SAFARI__: boolean;
    __BUILD_TIME__: string;
  }
  
  // For direct usage in modules
  const __PREFILL_PASSWORD__: string;
  const __PACKAGE_VERSION__: string;
  const __IS_DEV__: boolean;
  const __IS_FIREFOX__: boolean;
  const __IS_OPERA__: boolean;
  const __IS_CHROME__: boolean;
  const __IS_SAFARI__: boolean;
  const __BUILD_TIME__: string;
}
