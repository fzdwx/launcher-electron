/// <reference types="vite/client" />
interface Window {
  launcher: {
    hello(): string
    execCommand(command: string, args?: Array<string>): any
  };
}
