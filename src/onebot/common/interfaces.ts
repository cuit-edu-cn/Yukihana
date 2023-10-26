
declare namespace BotMessage {

  /**
   * 发送消息
   */
  export interface SendMsg {
    detail_type: 'private' | 'group'
    group_id?: string
    user_id?: string
    message: BotMsgBase<Text | At | File | Location | Reply>[]
  }

  /**
   * 撤回消息
   */
  export interface DeleteMsg {
    message_id: string
  }

  /**
   * 消息基础类型
   */
  export interface BotMsgBase<T> {
    type: 'text' | 'mention' | 'mention_all' | 'image' | 'vioce' | 'audio' | 'video' | 'file' | 'location' | 'reply'
    data: T
  }

  /**
   * 纯文本
   */
  export interface Text {
    text: string
  }

  /**
   * @ 操作
   */
  export interface At {
    user_id: string
  }

  /**
   * 文件消息
   */
  export interface File {
    file_id: string
  }

  /**
   * 位置消息
   */
  export interface Location {
    latitude: number
    longitude: number
    title: string
    content: string
  }

  /**
   * 引用回复消息
   */
  export interface Reply {
    message_id: string
    user_id: string
  }
}