import { WebSocketGateway, WebSocketServer, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class VoteGateway {
  @WebSocketServer() server: Server;

  handleVote(@MessageBody() data: any) {
    // Broadcast to all clients
    this.server.emit('vote:update', data);
  }
}
