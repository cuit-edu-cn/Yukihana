/**
 * 二维码
 */
export interface NTQRCodeResponse {
  qrcodeInfo: {
    pngBase64QrcodeData: string
    qrcodeUrl: string
    expireTime: number
    pollTimeInterval: number
  }
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
  interface LoginRequest {
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