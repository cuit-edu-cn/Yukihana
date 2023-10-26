declare namespace NsNtApi2 {
  export interface SendMsg {
    msgId: string
    peer: MsgPeer
    msgElements: MsgElement[]
    msgAttributeInfos: Map<string, any>
  }
  interface MsgElement {
    elementType: number
    elementId: string
    textElement: TextElement
  }
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
 * NTQQ <-> 框架
 */
export declare namespace NTLogin {
  /**
   * 登录数据
   * 框架 -> NTQQ
   */
  interface LoginData {
    loginInfo: {
      uin: `${number}`
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