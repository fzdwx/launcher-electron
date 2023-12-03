/// <reference types="vite/client" />
interface Window {
    launcher: {
        hello(): Promise<string>
        execCommand(command: string, args?: Array<string>): Promise<any>
        spawn(command: string, args?: Array<string>): Promise<any>
        getPath(name: 'home' | 'appData' | 'userData' | 'sessionData' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps'):Promise<string>
        getSelect(): Promise<string>
        getClipText(): Promise<string>
        setClipText(text: string): void
        hide(): void
        show(): void
    };
}
