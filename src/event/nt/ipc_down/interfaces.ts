export interface NTQRCodePicture {
  qrcodeInfo: {
    pngBase64QrcodeData: string
    qrcodeUrl: string
    expireTime: number
    pollTimeInterval: number
  }
}
