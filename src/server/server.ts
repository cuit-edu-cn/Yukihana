import { useLogger } from "../common/log"
import { startHTTPServer } from "./http"
import { startWebsocketServer } from "./websocket"

const log = useLogger('Server')

export const startServer = () => {
  log.info('start websocket server...')
  startWebsocketServer()
}