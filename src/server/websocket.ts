import { WebSocketServer } from 'ws' // https://github.com/websockets/ws/issues/1538#issuecomment-1150203821
import { BotActionRequest, BotActionResponse } from '../onebot/actions/interfaces';
import { useStore } from '../store/store';
import { NIL as NIL_UUID} from 'uuid'
import { checkBaseRequestField } from '../common/action';
import { useLogger } from '../common/log';

const { getActionHandle } = useStore()
const log = useLogger('WebSocket')

/**
 * 启动Websocket服务器
 */
export const startWebsocketServer = () => {

  const wss = new WebSocketServer({ port: 8080 });

  wss.on('connection', function connection(ws) {
    log.info('server: receive connection.');
    
    ws.on('message', async function incoming(message) {
      let msg: BotActionRequest
      try {
        log.info('server: received: ', message.toString());
        // 此处解析可能会失败
        msg = JSON.parse(message.toString())
        const ret = checkBaseRequestField(msg)
        if (ret !== undefined) {
          ws.send(JSON.stringify(ret));
          return 
        }
      }
      catch (e) {
        // 消息json格式不正确
        const result: BotActionResponse = {
          id: NIL_UUID,
          status: 'failed',
          retcode: 10002,
          data: null,
          message: 'Bad Request'
        }
        ws.send(JSON.stringify(result));
        return
      }

      // 获取动作处理函数
      log.info('request action:', msg.action)
      const handle = getActionHandle(msg.action)
      if (handle != undefined) {
        let resp: BotActionResponse
        try {
          resp = await handle(msg.params)
          resp.id = msg.id
        }
        catch (e) {
          resp = {
            id: msg.id,
            status: 'failed',
            retcode: 20002,
            data: null,
            message: 'Internal Handler Error'
          }
        }
        ws.send(JSON.stringify(resp));
      }
      else {
        // 没有找到处理函数
        const result: BotActionResponse = {
          id: msg.id,
          status: 'failed',
          retcode: 10002,
          data: null,
          message: 'Unsupported Action'
        }
        ws.send(JSON.stringify(result));
      }
    });

  });
  wss.on('error', (e) => {
    log.info('failed to create server!', e)
  })

}