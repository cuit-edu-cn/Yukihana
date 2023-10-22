import { startHTTPServer } from "./http"
import { startWebsocketServer } from "./websocket"

export const startServer = () => {
  startWebsocketServer()
}