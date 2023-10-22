import { WebSocketServer } from 'ws'
/**
 * 启动Websocket服务器
 */
export const startWebsocketServer = () => {

  const wss = new WebSocketServer({ port: 8080 });

  wss.on('connection', function connection(ws) {
      console.log('server: receive connection.');
      
      ws.on('message', function incoming(message) {
          console.log('server: received: %s', message);
      });

      ws.send('world');
  });

}