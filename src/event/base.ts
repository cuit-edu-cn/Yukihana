import { useLogger } from "../common/log"
import { IpcDownInfo, IpcUpInfo } from "../store/interfaces"
import { useStore } from "../store/store"
import { CallbackInfo } from "./interfaces"

const { registerIpcMainReceive, getIpcMainSend } = useStore()
const log = useLogger('Base')
/**
 * <callbackId, CallbackInfo>
 */
const callbackMap: Record<string, CallbackInfo> = {}

export const sendEvent = (channel: string, reqInfo: IpcUpInfo, reqData: any[]) => {
  log.info('sendEvent')
  return new Promise<{info: IpcDownInfo, data: any[]}>((resolve, reject) => {
    const timeout = setTimeout(() => {
      log.info('log timeout')
      reject('timeout')
    }, 30000)
    if (reqInfo.callbackId){
      callbackMap[reqInfo.callbackId] = {
        resolve,
        reject,
        timeout,
      }
      log.info('getIpcMainSend')
      const send = getIpcMainSend(channel)
      send({} as any, reqInfo, reqData)
    }
    else {
      reject()
    }
    
  })
  
}

export const initBaseEvent = () => {
  registerIpcMainReceive('IPC_DOWN_2', (info, data) => {
    // log.info('Receive', info, data)
    const { callbackId } = info
    if (!callbackId || !callbackMap[callbackId]){
      // log.info('没有找到回调方法！')
      return
    }
    const h = callbackMap[callbackId]
    clearTimeout(h.timeout)
    delete callbackMap[callbackId]
    if (info.promiseStatue !== 'full') {
      h.reject({info, data})
    }
    else {
      h.resolve({info, data})
    }
  })
}
