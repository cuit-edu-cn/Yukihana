import { NTReceiveMessage } from "../ntqq/message/interfaces";
import { BotMessage } from "../onebot/common/interfaces";

/**
 * NTQQ的消息转bot消息
 * 
 * @param elems 来自NTQQ的消息
 * @returns 给bot的消息
 */
export const convertNTMessage2BotMessage = (elems: NTReceiveMessage.NTMessageElementType[]): BotMessage.BotMsgBase[] => {
  const result: BotMessage.BotMsgBase[] = []
  for (const ele of elems) {
    switch (ele.elementType) {
      case 1:
        // 纯文本
        {
          const text: BotMessage.BotMsgBase<BotMessage.Text> = {
            type: 'text',
            data: {
              text: ele.textElement.content
            }
          }
          // TODO: 对@的处理
          result.push(text)
        }
        break;
      case 2:
        // 图片
        {
          const pic: BotMessage.BotMsgBase<BotMessage.File> = {
            type: 'image',
            data: {
              file_id: ele.picElement.fileUuid
            }
          }
          result.push(pic)
        }
        break;
      case 5:
        // 视频
        break;
      case 6:
        // 表情
        break;
      case 7:
        // 引用回复
        {
          const reply: BotMessage.BotMsgBase<BotMessage.Reply> = {
            type: 'image',
            data: {
              message_id: ele.replyElement.sourceMsgIdInRecords,
              user_id: ele.replyElement.senderUid
            }
          }
          result.push(reply)
        }
        break;
      case 11:
        // 商城表情
        break;
    
      default:
        break;
    }
  }
  return result
}