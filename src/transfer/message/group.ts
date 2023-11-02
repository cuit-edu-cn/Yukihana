import { BotMessage } from "../../onebot/common/interfaces"
import { NTSendMessage } from "../../ntqq/message/message"
import { NTMessage } from "../../ntqq/message/interfaces"

export const sendMessageToGroup = async (targetId: string, msg: BotMessage.MessageType) => {

  const elements: NTMessage.MsgElement[] = []
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
  return await NTSendMessage({
    "msgId": "0",
    "peer": {
      "chatType": 2,
      "peerUid": `${targetId}`,
      "guildId": ""
    },
    "msgElements": elements,
    "msgAttributeInfos": new Map()
  })
}