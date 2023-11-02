import { randomUUID } from "crypto"
import { useStore } from "../../store/store"
import { sendEvent } from "../event/base"
import { NTQRCodeResponse } from "./interfaces"

const { registerEventListener } = useStore()

/**
 * 获取登录二维码
 * @returns 二维码信息
 */
export const NTGetLoginQrCode = (): Promise<NTQRCodeResponse> => {
  return new Promise(async (resolve, reject) => {
    registerEventListener('IPC_DOWN_1_ns-ntApi-1_nodeIKernelLoginListener/onQRCodeGetPicture', 'once', (payload: NTQRCodeResponse) => {
      resolve(payload)
    })
    const resp = await sendEvent('IPC_UP_1', {
      type: "request",
      callbackId: randomUUID(),
      eventName: "ns-ntApi-1"
    }, [
      'nodeIKernelLoginService/getQRCodePicture',
      null,
      null
    ])

  })
}