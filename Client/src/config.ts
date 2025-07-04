interface ImportMetaEnv {
  readonly VITE_BACKEND_BASE_URL: string;

}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export const Base_Url = import.meta.env.VITE_BACKEND_BASE_URL;
// console.log("Loaded Base_Url:", import.meta.env.VITE_BACKEND_BASE_URL);


