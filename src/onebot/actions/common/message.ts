import { randomUUID } from "crypto"
import { useLogger } from "../../../common/log"
import { IpcUpInfo } from "../../../store/interfaces"
import { sendEvent } from "../../../event/base"
import { BotMessage } from "../../common/interfaces"
import { NTSendMessage } from "../../../event/nt/ipc_up/interfaces"

const log = useLogger('Message')

export const sendMessageToGroup = async (groupId: string, msg: BotMessage.MessageType): Promise<NTSendMessage.SendResponse> => {
  
  const elements: NTSendMessage.MsgElement[] = []
  for (const m of msg) {
    if (m.type === 'text') {
      elements.push({
        elementType: 2,
        elementId: "",
        textElement: {
          content: '',
          atType: 0,
          atUid: "",
          atTinyId: "",
          atNtUid: ""
        }
      })
    }
  }

  const channel = 'IPC_UP_2'
  const uuid = randomUUID()
  const reqInfo: IpcUpInfo = {
    type: 'request',
    callbackId: uuid,
    eventName: 'ns-ntApi-2'
  }
  const reqData: [string, any, any] = [
    "nodeIKernelMsgService/sendMsg",
    {
      "msgId": "0",
      "peer": {
        "chatType": 2,
        "peerUid": `${groupId}`,
        "guildId": ""
      },
      "msgElements": elements,
      "msgAttributeInfos": new Map()
    },
    null
  ]
  return await sendEvent(channel, reqInfo, reqData)
}