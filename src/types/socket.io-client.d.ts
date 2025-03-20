import { Socket as SocketIOClientSocket } from "socket.io-client";

declare module "socket.io-client" {
  export interface Socket extends SocketIOClientSocket {}
} 