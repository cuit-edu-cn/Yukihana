import { BotMessage } from "../../onebot/common/interfaces"
import { NTSendMessage } from "../../ntqq/message/message"
import { NTSendMessageType } from "../../ntqq/message/interfaces"
import { useLogger } from "../../common/log"

const log = useLogger('Group')

export const sendMessageToGroup = async (targetId: string, msg: BotMessage.BotMsgBase[]) => {
  log.info(`sendMessage to ${targetId} with:`, msg)
  const elements: NTSendMessageType.MsgElement[] = []
  for (const m of msg) {
    if (m.type === 'text' && m.data.text) {
      elements.push({
        elementType: 1,
        elementId: "",
        textElement: {
          content: m.data.text,
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