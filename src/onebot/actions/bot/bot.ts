import { randomUUID } from "crypto"
import { sendEvent } from "../../../event/base"
import { useStore } from "../../../store/store"
import { BotActionResponse, BotActionParams } from "../interfaces"
import { NTQRCodePicture } from "../../../event/nt/ipc_down/interfaces"
import { BotLogin } from "./interfaces"

const { registerActionHandle, registerEventListener } = useStore()

const loginByAccountInfo = (p: BotLogin.LoginData): Promise<BotActionResponse<any>> => {
  return new Promise(async (resolve, reject) => {
    const ret: BotActionResponse = {
      id: "",
      status: "ok",
      retcode: 0,
      data: undefined,
      message: ""
    }
    if (p.loginInfo === undefined || p.loginInfo == null || typeof p.loginInfo !== 'object') {
      ret.status = 'failed'
      ret.retcode = 10003
      ret.message = 'loginInfo参数不正确'
      reject(ret)
      return
    }
    const resp = await sendEvent('IPC_UP_1', {
      type: "request",
      callbackId: randomUUID(),
      eventName: "ns-ntApi-1"
    }, [
      'nodeIKernelLoginService/passwordLogin',
      p,
      null
    ])
    ret.data = resp.data
    resolve(ret)

  })
}
const loginByQrCode = (p: BotActionParams): Promise<BotActionResponse<any>> => {
  return new Promise(async (resolve, reject) => {
    const ret: BotActionResponse = {
      id: "",
      status: "ok",
      retcode: 0,
      data: undefined,
      message: ""
    }
    registerEventListener('IPC_DOWN_1_ns-ntApi-1_nodeIKernelLoginListener/onQRCodeGetPicture', 'once', (payload: NTQRCodePicture) => {
      ret.data = payload
      resolve(ret)
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

export const initBot = () => {
  // 登录
  registerActionHandle('login_by_account', loginByAccountInfo)
  registerActionHandle('login_by_qrcode', loginByQrCode)
}