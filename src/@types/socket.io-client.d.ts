declare module 'socket.io-client' {
  import { EventEmitter } from 'events';
  
  export interface SocketOptions {
    forceNew?: boolean;
    multiplex?: boolean;
    transports?: string[];
    reconnection?: boolean;
    reconnectionAttempts?: number;
    reconnectionDelay?: number;
    reconnectionDelayMax?: number;
    randomizationFactor?: number;
    timeout?: number;
    autoConnect?: boolean;
    query?: { [key: string]: string };
    parser?: any;
    extraHeaders?: { [key: string]: string };
  }
  
  export interface Socket extends EventEmitter {
    id: string;
    connected: boolean;
    disconnected: boolean;
    open(): Socket;
    connect(): Socket;
    send(...args: any[]): Socket;
    emit(event: string, ...args: any[]): Socket;
    close(): Socket;
    disconnect(): Socket;
    compress(compress: boolean): Socket;
    on(event: string, fn: (...args: any[]) => void): this;
    once(event: string, fn: (...args: any[]) => void): this;
    off(event: string, fn?: (...args: any[]) => void): this;
    removeListener(event: string, fn?: (...args: any[]) => void): this;
    removeAllListeners(event?: string): this;
    listeners(event: string): Function[];
    hasListeners(event: string): boolean;
  }
  
  export function io(uri: string, opts?: SocketOptions): Socket;
  export function connect(uri: string, opts?: SocketOptions): Socket;
  export default io;
} 