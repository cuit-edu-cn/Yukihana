import { useLogger } from "../common/log"
import { IpcDownInfo, IpcUpInfo } from "./interfaces"

const log = useLogger('Store')
const ipcMainMap: Record<string, (event: Electron.IpcMainEvent, info: IpcUpInfo, ...args: any[]) => void> = {}
const ipcMainReceive: Record<string, (info: IpcDownInfo, data: any) => void> = {}

/**
 * GUI通过通道发送消息给electron
 * Electron收到消息触发listener
 * 
 * 因此，可以跳过GUI直接触发特定channel的listener
 * 
 * @param channel 通道
 * @param listener 监听器
 */
const addIpcMainSend = (channel: string, listener: (event: Electron.IpcMainEvent, ...args: any[]) => void) => {
  if (ipcMainMap[channel]) {
    log.warn(`通道[${channel}]重复添加`)
  }
  ipcMainMap[channel] = listener
}

/**
 * 获取指定通道的触发方法
 * 
 * @param channel 通道
 * @returns 触发方法
 */
const getIpcMainSend = (channel: string) => {
  return ipcMainMap[channel]
}
/**
 * 注册通道监听器（唯一）
 * @param channel 通道
 * @param listener 监听器
 */
const registerIpcMainReceive = (channel: string, listener: (info: IpcDownInfo, data: any) => void) => {
  ipcMainReceive[channel] = listener
}

/**
 * 获取通道的监听器
 * @param channel 通道
 * @returns 监听器
 */
const getIpcMainReceiveListener = (channel: string) => {
  // receive
  return ipcMainReceive[channel]
}
export const useStore = () => {
  return {
    addIpcMainSend,
    getIpcMainSend,
    registerIpcMainReceive,
    getIpcMainReceiveListener,
  }
}