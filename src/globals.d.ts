import { Socket } from 'socket.io-client';

declare global {
  interface Window {
    io: any;
    initializeSocketIO: (serverUrl: string) => any;
  }
}

export {}; 