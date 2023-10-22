import { useLogger } from "../common/log"
import { IpcDownInfo, IpcUpInfo } from "../store/interfaces"
import { useStore } from "../store/store"
import { CallbackInfo } from "./interfaces"
import { CmdData } from "./nt/ipc_up/interfaces"

const { registerIpcDownHandle, getIpcMainSend, getEventListenerList } = useStore()
const log = useLogger('Base')
/**
 * <callbackId, CallbackInfo>
 */
const callbackMap: Record<string, CallbackInfo> = {}

/**
 * 模拟渲染进程向主进程发送请求
 * 
 * @param channel 通道
 * @param reqInfo 请求信息
 * @param reqData 请求数据
 * @returns 结果
 */
export const sendEvent = (channel: string, reqInfo: IpcUpInfo, reqData: any[]) => {
  log.info('sendEvent')
  return new Promise<{ info: IpcDownInfo, data: any[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      log.info('log timeout')
      reject('timeout')
    }, 30000)
    if (reqInfo.callbackId) {
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
  // 目前似乎就5个
  Array.from({ length: 5 }).map((i) => registerIpcDownHandle(`IPC_DOWN_${i}`, (info, data) => {
    // log.info('Receive', info, data)
    if (info.type == 'response') {
      // 响应数据给渲染层
      const { callbackId } = info
      if (!callbackId || !callbackMap[callbackId]) {
        // log.info('没有找到回调方法！')
        return
      }
      const h = callbackMap[callbackId]
      clearTimeout(h.timeout)
      delete callbackMap[callbackId]
      if (info.promiseStatue !== 'full') {
        h.reject({ info, data })
      }
      else {
        h.resolve({ info, data })
      }
    }
    else {
      // 向渲染层发送请求
      const { callbackId } = info
      if (!callbackId) {
        // 推送订阅信息，不携带回调ID
        const cmdList = data as CmdData[]
        for (const cmd of cmdList) {
          if (cmd.cmdType === 'event') {
            const listenerList = getEventListenerList(`${info.eventName}_${cmd.cmdName}`)
            if (listenerList) {
              for (const listener of listenerList) {
                listener.handle(cmd.payload)
              }
            }
          }
          else {
            log.warn('不支持的订阅类型: %s', cmd.cmdType)
          }
        }
      }
      else {
        // 向渲染层发送请求，会产生响应。但是理论上不会需要处理
      }

    }
  }))

}
