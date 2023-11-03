import { NTReceiveMessageType } from "../../ntqq/message/interfaces";
import { NTSendMessageType } from "../../ntqq/message/interfaces";
import { BotMessage } from "../../onebot/common/interfaces";

/**
 * NTQQ的消息转bot消息
 * 
 * @param elems 来自NTQQ的消息
 * @returns 给bot的消息
 */
export const convertNTMessage2BotMessage = (elems: NTReceiveMessageType.NTMessageElementType[]): BotMessage.BotMsgBase[] => {
  const result: BotMessage.BotMsgBase[] = []
  for (const ele of elems) {
    switch (ele.elementType) {
      case 1:
        // 纯文本
        {
          const text: BotMessage.BotMsgBase = {
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
          const pic: BotMessage.BotMsgBase = {
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
          const reply: BotMessage.BotMsgBase = {
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

/**
 * bot消息转NTQQ的消息
 * 
 * @param elems 来自NTQQ的消息
 * @returns 给bot的消息
 */
export const convertBotMessage2NTMessage = (elems: BotMessage.BotMsgBase[]): NTSendMessageType.MsgElement[] => {
  const result: NTSendMessageType.MsgElement[] = []
  for (const ele of elems) {
    switch (ele.type) {
      case 'text':
        // 纯文本
        {
          const text: NTSendMessageType.MsgElement = {
            elementType: 1,
            elementId: "",
            textElement: {
              content: '',
              atType: 0,
              atUid: "",
              atTinyId: "",
              atNtUid: ""
            }
          }
          // TODO: 对@的处理
          result.push(text)
        }
        break;
      case 'image':
        // TODO: 图片
        {
          const pic: NTSendMessageType.MsgElement = {
            elementType: 2,
            elementId: "",
          }
          result.push(pic)
        }
        break;
      case 'video':
        // 视频
        break;
      // case '':
      //   // 表情
      //   break;
      case 'reply':
        // TODO:引用回复
        {
          // const reply: BotMessage.BotMsgBase = {
          //   type: 'image',
          //   data: {
          //     message_id: ele.replyElement.sourceMsgIdInRecords,
          //     user_id: ele.replyElement.senderUid
          //   }
          // }
          // result.push(reply)
        }
        break;
      // case 'marketFace':
      //   // 商城表情
      //   break;
    
      default:
        break;
    }
  }
  return result
}