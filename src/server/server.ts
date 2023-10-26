import { useLogger } from "../common/log"
import { startHTTPServer } from "./http"
import { startWebsocketServer } from "./websocket"

const log = useLogger('Server')

export const startServer = () => {
  log.info('start websocket server...')
  startWebsocketServer()
}
const sendMessage = (msg: string) => {

}
export const useServer = () => ({
  sendMessage
})