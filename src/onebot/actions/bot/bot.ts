import { randomUUID } from "crypto"
import { NTEventListenerHandle, useStore } from "../../../store/store"
import { BotActionResponse, BotActionParams } from "../interfaces"
import { BotLogin } from "./interfaces"
import { useLogger } from "../../../common/log"
import { getUserInfoByUid } from "../../common/user"
import { sendEvent } from "../../../ntqq/event/base"
import { NTLogin, NTQRCodeResponse } from "../../../ntqq/login/interfaces"

const { registerActionHandle, registerEventListener, removeEventListener } = useStore()

const log = useLogger('Bot Action')


const loginByAccountInfo = (p: BotLogin.LoginData): Promise<BotActionResponse<any>> => {
  return new Promise(async (resolve, reject) => {
    log.info("req param from client:", JSON.stringify(p))
    let responseStart = false
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
    const ntLogin: NTLogin.LoginRequest = {
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
    // 注册重复登录监听事件
    const repeatLogin = (payload: NTQRCodeResponse) => {
      if (!responseStart) {
        responseStart = true
        ret.status = 'failed'
        ret.retcode = 34001
        ret.message = '重复登录'
        ret.data = payload
        resolve(ret)
      }
    }
    registerEventListener('IPC_DOWN_1_ns-ntApi-1_nodeIKernelLoginListener/onUserLoggedIn', 'once', repeatLogin)
    try {
      // 重复登录会导致超时
      const resp = await sendEvent('IPC_UP_1', {
        type: "request",
        callbackId: randomUUID(),
        eventName: "ns-ntApi-1"
      }, [
        'nodeIKernelLoginService/passwordLogin',
        ntLogin,
        null
      ])
      // 非重复登录，移除监听
      removeEventListener('IPC_DOWN_1_ns-ntApi-1_nodeIKernelLoginListener/onUserLoggedIn', repeatLogin)
      if (!responseStart) {
        responseStart = true
        ret.data = resp.data
        resolve(ret)
      }
    }
    catch(e) {

    }

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
    registerEventListener('IPC_DOWN_1_ns-ntApi-1_nodeIKernelLoginListener/onQRCodeGetPicture', 'once', (payload: NTQRCodeResponse) => {
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

const test = async (p: BotActionParams): Promise<BotActionResponse<any>> => {
  const resp: BotActionResponse<any> = {
    id: "",
    status: "ok",
    retcode: 0,
    data: undefined,
    message: ""
  }
  resp.data = await getUserInfoByUid('u_EbxBsO-JLi3oxEYabJ0umg')
  return resp
}
export const initBot = () => {
  // 登录
  registerActionHandle('login_by_account', loginByAccountInfo)
  registerActionHandle('login_by_qrcode', loginByQrCode)
  registerActionHandle('test', test)
}