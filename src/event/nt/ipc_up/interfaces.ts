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

export interface BotActionParams {
  /**
   * 内部标识，用于类型提示
   */
  _mark: 'action'
}
export declare namespace BotLogin {
  interface LoginData extends BotActionParams {
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

  export interface BotLoginResponse {
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