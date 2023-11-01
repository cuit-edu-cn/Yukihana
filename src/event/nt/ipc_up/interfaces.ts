/**
 * NTTQQ发送消息
 * 
 * 框架 <-> NTQQ
 */
export declare namespace NTSendMessage {

  /**
   * 发送消息
   * 
   * 框架 -> NTQQ
   */
  export interface SendRequest {
    msgId: string
    peer: MsgPeer
    msgElements: MsgElement[]
    msgAttributeInfos: Map<string, any>
  }

  /**
   * 发送消息的结果
   * 
   * NTQQ -> 框架
   */
  export interface SendResponse {
  }

  export interface MsgElement {
    /**
     * 消息元素类型
     * 1 - 纯文本&@ textElement
     * 2 - 图片 picElement
     * 6 - 表情 faceElement
     * 7 - 引用回复 replyElement
     * 11 - 商城表情 marketFaceElement
     */
    elementType: 1 | 2 | 6 | 7 | 11
    elementId: string
    textElement: TextElement
  }

  /**
   * 纯文本
   */
  interface TextElement {
    content: string
    atType: number
    atUid: string
    atTinyId: string
    atNtUid: string
  }
  interface MsgPeer {
    chatType: number
    peerUid: string
    guildId: string
  }

}

export interface NTCmdDataType<PayloadType = any> {
  cmdName: string
  cmdType: string
  payload: PayloadType
}

/**
 * 登录数据
 * 框架 <-> NTQQ
 */
export declare namespace NTLogin {
  
  /**
   * 登录数据
   * 框架 -> NTQQ
   */
  interface LoginData {
    loginInfo: {
      /**
       * 用户账号
       */
      uin: `${number}`
      /**
       * 用户密码的MD5
       * 
       */
      passwordMd5: string
      step: number
      newDeviceLoginSig: string
      proofWaterSig: string
      proofWaterRand: string
      proofWaterSid: string
    }
  }

  /**
   * 响应数据
   * NTQQ -> 框架
   */
  export interface LoginResponse {
    result: `${number}`
    loginErrorInfo: {
      step: number
      errMsg: string
      proofWaterUrl: string
      newDevicePullQrCodeSig: string
      jumpUrl: string
      jumpWord: string
      tipsTitle: string
      tipsContent: string
    }
  }
}