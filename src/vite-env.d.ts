/// <reference types="vite/client" />
interface Window {
  launcher: {
    hello(): string
    async execCommand(command: string, args?: Array<string>): any
    async spawn(command: string, args?: Array<string>): any
    async getPath(name: 'home' | 'appData' | 'userData' | 'sessionData' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps')
    hide(): void
  };
}
