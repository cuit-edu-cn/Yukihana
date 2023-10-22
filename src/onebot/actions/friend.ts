import { randomUUID } from "crypto"
import { sendEvent } from "../../event/base"
import { useStore } from "../../store/store"
import { ActionResponse } from "./interfaces"

const { registerActionHandle } = useStore()

const getFriendList = async (p: {}): Promise<ActionResponse<any>> => {
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
  const reqResult = await sendEvent('IPC_UP_2', {
    type: 'request',
    callbackId: randomUUID(),
    eventName: 'ns-NodeStoreApi-2'
  }, ['getBuddyList'])
  
  // TODO: 接收订阅推送
  return ret
}

export const initFriend = () => {
  registerActionHandle('get_friend_list', getFriendList)
}