import { randomUUID } from "crypto"
import { IpcUpInfo } from "../../store/interfaces"
import { sendEvent } from "../event/base"
import { NTMessage } from "./interfaces"

export const NTSendMessage = async (msg: NTMessage.SendRequest): Promise<NTMessage.SendResponse> => {
  const channel = 'IPC_UP_2'
  const uuid = randomUUID()
  const reqInfo: IpcUpInfo = {
    type: 'request',
    callbackId: uuid,
    eventName: 'ns-ntApi-2'
  }
  const reqData: [string, NTMessage.SendRequest, any] = [
    "nodeIKernelMsgService/sendMsg",
    msg,
    null
  ]
  return await sendEvent<NTMessage.SendRequest, NTMessage.SendResponse>(channel, reqInfo, reqData)
}