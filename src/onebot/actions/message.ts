import { randomUUID } from "crypto"
import { useLogger } from "../../common/log"
import { IpcUpInfo } from "../../store/interfaces"
import { sendEvent } from "../../event/base"

const log = useLogger('Message')

export const sendGroupMessage = () => {
  const msg = {
    action: "send_message",
    params: {
      detail_type: "group",
      group_id: "933286835",
      message: [
        {
          type: "text",
          data: {
            text: "我是文字巴拉巴拉巴拉"
          }
        }
      ]
    }
  }
  const params = msg.params

  const channel = 'IPC_UP_2'
  const uuid = randomUUID()
  const reqInfo: IpcUpInfo = {
    type: 'request',
    callbackId: uuid,
    eventName: 'ns-ntApi-2'
  }
  const reqData = [
    "nodeIKernelMsgService/sendMsg",
    {
      "msgId": "0",
      "peer": {
        "chatType": 2,
        "peerUid": params.group_id,
        "guildId": ""
      },
      "msgElements": [
        {
          "elementType": 1,
          "elementId": "",
          "textElement": {
            "content": "hi, message from nt bot!!!",
            "atType": 0,
            "atUid": "",
            "atTinyId": "",
            "atNtUid": ""
          }
        }
      ],
      "msgAttributeInfos": new Map()
    },
    null
  ]
  sendEvent(channel, reqInfo, reqData)
    .then(res => {
      log.info('success:', res)
    })
    .catch(err => {
      log.info('error start')
      log.error('error:', err)
    })

}