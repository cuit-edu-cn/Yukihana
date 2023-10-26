import { BotActionParams } from "../interfaces"

/**
 * 登陆数据
 * 机器人 <-> 框架
 * 
 */
export declare namespace BotLogin {
  
  /**
   * 请求体
   * 机器人 -> 框架
   */
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

  /**
   * 响应体
   * 框架 -> 机器人
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