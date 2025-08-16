/// <reference types="chrome" />

declare global {
  interface Window {
    chrome?: typeof chrome;
    EXTENSION_MODE?: boolean;
    POPUP_MODE?: boolean;
  }
}