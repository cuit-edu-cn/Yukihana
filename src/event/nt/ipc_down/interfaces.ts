export interface QRCodePicture {
  qrcodeInfo: {
    pngBase64QrcodeData: string
    qrcodeUrl: string
    expireTime: number
    pollTimeInterval: number
  }
}
