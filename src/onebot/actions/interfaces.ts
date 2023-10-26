/**
 * 动作请求
 */
export interface ActionRequest<T = any> {
  /**
   * 唯一标识uuid
   */
  id: string
  /**
   * 动作名称
   */
  action: string
  /**
   * 动作参数
   */
  params: T
}

/**
 * 动作响应
 */
export interface ActionResponse<T = any> {
  /**
   * 唯一标识uuid，与对应请求一致
   */
  id: string
  /**
   * 动作执行结果
   */
  status: 'ok' | 'failed'
  /**
   * 返回码
   */
  retcode: number
  /**
   * 响应数据
   */
  data: T
  /**
   * 错误信息
   */
  message: string
}

/**
 * 获取用户信息动作的数据
 */
export interface UserInfoReq {
  user_id: string
}

/**
 * 响应用户信息动作的数据
 */
export interface UserInfoResp {
  user_id: string
  user_name: string
  user_displayname: string
  user_remark: string
}

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
  export interface Text {
    text: string
  }
  export interface At {
    user_id: string
  }
  export interface File {
    file_id: string
  }
  export interface Location {
    latitude: number
    longitude: number
    title: string
    content: string
  }
  export interface Reply {
    message_id: string
    user_id: string
  }
}