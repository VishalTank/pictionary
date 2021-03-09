import io from 'socket.io-client';
import { fromEvent, Observable } from 'rxjs';

export class SocketService {
    private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

    public init(): SocketService {
        console.log('initializing socket service.');
        this.socket = io('http://localhost:3000');
        return this;
    }

    public send(message: any): void {
        console.log('emitting message:', message);
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<any> {
        return fromEvent(this.socket, 'message');
    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}
