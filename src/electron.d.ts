export {};

declare global {
  interface Window {
    electronAPI?: {
      platform: string;
      versions: {
        electron: string;
        chrome: string;
        node: string;
      };
    };
  }
}
