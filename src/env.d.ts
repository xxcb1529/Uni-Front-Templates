/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_SUCCESS_CODE: string;
  readonly VITE_API_AUTH_BEARER: string;
  readonly VITE_API_SOURCE_HEADER_KEY: string;
  readonly VITE_API_SOURCE_HEADER_VALUE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
