import { convertNTMessage2BotMessage } from "../../common/convert"
import { NTMessagePayloadType } from "../../event/interfaces"
import { useServer } from "../../server/server"
import { useStore } from "../../store/store"
import { EventDataType } from "./interfaces"

const { registerEventListener } = useStore()
const { sendMessage } = useServer()

export const listenMessage = () => {
  registerEventListener('IPC_DOWN_2_ns-ntApi-2_nodeIKernelMsgListener/onRecvMsg', 'always', (payload: NTMessagePayloadType) => {
    const { msgList } = payload
    for (const msg of msgList) {
      const ret: EventDataType = {
        time: parseInt(msg.msgTime),
        type: "message",
        detail_type: "",
        sub_type: "",
        user_id: msg.senderUid
      }
      switch (msg.chatType) {
        case 1:
          // 好友消息
          ret.detail_type = 'private'

          break
        case 2:
          // 群聊消息
          ret.detail_type = 'group'
          ret.group_id = msg.peerUid
          break
      }
      ret.message = convertNTMessage2BotMessage(msg.elements)
      sendMessage(JSON.stringify(ret))
    }
  })
}