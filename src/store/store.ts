import { useLogger } from "../common/log"
import { ActionResponse } from "../onebot/actions/interfaces"
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
 * 
 * 主进程 -> 渲染进程
 * 
 * @param channel 通道
 * @param listener 监听器
 */
const registerIpcDownHandle = (channel: string, listener: (info: IpcDownInfo, data: any) => void) => {
  ipcMainReceive[channel] = listener
}

/**
 * 获取通道的监听器
 * @param channel 通道
 * @returns 监听器
 */
const getIpcDownHandle = (channel: string) => {
  // receive
  return ipcMainReceive[channel]
}

const ActionMap: Record<string, (p: any) => Promise<ActionResponse>> = {}

/**
 * 获取动作处理函数
 * @param action 动作名称
 * @returns 处理函数
 */
const getActionHandle = (action: string) => {
  return ActionMap[action]
}

/**
 * 注册动作处理函数
 * @param name 动作名称
 * @param handle 动作处理函数
 */
const registerActionHandle = (name: string, handle: (p: any) => Promise<ActionResponse>) => {
  if (ActionMap[name]) {
    log.warn('Action: %s已经被注册，将覆盖旧的处理函数', name)
  }
  ActionMap[name] = handle
}

export const useStore = () => {
  return {
    /**
     * GUI通过通道发送消息给electron
     * Electron收到消息触发listener
     * 
     * 因此，可以跳过GUI直接触发特定channel的listener
     * 
     * @param channel 通道
     * @param listener 监听器
     */
    addIpcMainSend,
    /**
     * 获取指定通道的触发方法
     * 
     * @param channel 通道
     * @returns 触发方法
     */
    getIpcMainSend,
    
    /**
     * 注册通道监听器（唯一）
     * @param channel 通道
     * @param listener 监听器
     */
    registerIpcDownHandle,
    /**
     * 获取通道的监听器
     * @param channel 通道
     * @returns 监听器
     */
    getIpcDownHandle,
    
    /**
     * 注册动作处理函数
     * @param name 动作名称
     * @param handle 动作处理函数
     */
    registerActionHandle,
    /**
     * 获取动作处理函数
     * @param action 动作名称
     * @returns 处理函数
     */
    getActionHandle,
  }
}