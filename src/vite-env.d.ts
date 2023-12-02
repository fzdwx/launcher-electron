/// <reference types="vite/client" />
interface Window {
  launcher: {
    hello(): string
    async execCommand(command: string, args?: Array<string>): any
    async spawn(command: string, args?: Array<string>): any
    hide(): void
  };
}
