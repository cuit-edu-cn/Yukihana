import { randomUUID } from "crypto"
import { sendEvent } from "../../event/base"
import { useStore } from "../../store/store"
import { ActionResponse } from "./interfaces"

const { registerActionHandle, registerEventListener } = useStore()

const getFriendList = async (p: {}): Promise<ActionResponse<any>> => {
  return new Promise(async (resolve, reject) => {
    const ret: ActionResponse = {
      id: "",
      status: "ok",
      retcode: 0,
      data: undefined,
      message: ""
    }
    const regResult = await sendEvent('IPC_UP_2', {
      type: 'request',
      callbackId: randomUUID(),
      eventName: 'ns-NodeStoreApi-2-register'
    }, ['onBuddyListChange'])
    registerEventListener(`ns-NodeStoreApi-2_onBuddyListChange`, 'once', (payload) => {
      ret.data = payload
      resolve(ret)
    })
    const reqResult = await sendEvent('IPC_UP_2', {
      type: 'request',
      callbackId: randomUUID(),
      eventName: 'ns-NodeStoreApi-2'
    }, ['getBuddyList'])
    
  })
}

export const initFriend = () => {
  registerActionHandle('get_friend_list', getFriendList)
}