import { randomUUID } from "crypto"
import { sendEvent } from "../../../event/base"
import { useStore } from "../../../store/store"
import { BotActionResponse, BotActionParams } from "../interfaces"
import { NTQRCodePicture } from "../../../event/nt/ipc_down/interfaces"
import { BotLogin } from "./interfaces"
import { NTLogin } from "../../../event/nt/ipc_up/interfaces"
import { useLogger } from "../../../common/log"

const { registerActionHandle, registerEventListener } = useStore()

const log = useLogger('Bot Action')

const loginByAccountInfo = (p: BotLogin.LoginData): Promise<BotActionResponse<any>> => {
  return new Promise(async (resolve, reject) => {
    log.info("req param from client:", JSON.stringify(p))
    const ret: BotActionResponse = {
      id: "",
      status: "ok",
      retcode: 0,
      data: undefined,
      message: ""
    }
    if (p.id === undefined || p.id == null || typeof p.id !== 'number') {
      ret.status = 'failed'
      ret.retcode = 10003
      ret.message = 'id参数不正确'
      reject(ret)
      return
    }
    const ntLogin: NTLogin.LoginData = {
      loginInfo: {
        uin: `${p.id}`,
        passwordMd5: p.password,
        step: 0,
        newDeviceLoginSig: "",
        proofWaterSig: "",
        proofWaterRand: "",
        proofWaterSid: ""
      }
    }
    log.info("req to nt:", JSON.stringify(ntLogin))
    const resp = await sendEvent('IPC_UP_1', {
      type: "request",
      callbackId: randomUUID(),
      eventName: "ns-ntApi-1"
    }, [
      'nodeIKernelLoginService/passwordLogin',
      ntLogin,
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