import { randomUUID } from "crypto"
import { sendEvent } from "../../event/base"
import { useStore } from "../../store/store"
import { ActionResponse } from "./interfaces"

const { registerActionHandle, registerEventListener } = useStore()

/**
 * 获取好友列表
 * 
 * @param p 空参数
 * @returns 好友列表
 */
const getFriendList = async (p: {}): Promise<ActionResponse<any>> => {
  return new Promise(async (resolve, reject) => {
    const ret: ActionResponse = {
      id: "",
      status: "ok",
      retcode: 0,
      data: undefined,
      message: ""
    }

    // 订阅好友列表更新事件
    const regResult = await sendEvent('IPC_UP_2', {
      type: 'request',
      callbackId: randomUUID(),
      eventName: 'ns-NodeStoreApi-2-register'
    }, ['onBuddyListChange'])

    // 超时拒绝
    let time = setTimeout(() => {
      reject('timeout')
    }, 30000)

    registerEventListener(`IPC_DOWN_2_ns-NodeStoreApi-2_onBuddyListChange`, 'once', (payload) => {
      ret.data = payload

      // 清除超时计时
      clearTimeout(time)
      resolve(ret)
    })
    const reqResult = await sendEvent('IPC_UP_2', {
      type: 'request',
      callbackId: randomUUID(),
      eventName: 'ns-NodeStoreApi-2'
    }, ['getBuddyList'])
    
  })
}

/**
 * 初始化好友动作
 */
export const initFriend = () => {
  // 注册获取好友列表
  registerActionHandle('get_friend_list', getFriendList)
}