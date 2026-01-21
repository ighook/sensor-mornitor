export {};

declare global {
  interface Window {
    __ENV__: {
      API_URL: string;
      GOOGLE_MAPS_API_KEY: string;
    };
    API_URL: string;
    google: any;
  }
}