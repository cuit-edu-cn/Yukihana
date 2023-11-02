import { randomUUID } from "crypto"
import { useLogger } from "../../common/log"
import { sendEvent } from "../event/base"
import { NTLogin } from "./interfaces"
import { useStore } from "../../store/store"

const log = useLogger('NT Account')
const { registerEventListener } = useStore()

/**
 * 使用账户登录
 * 
 * @param ntLogin.LoginRequest 登录信息
 * @returns 登录结果
 */
export const NTLoginByAccountInfo = (ntLogin: NTLogin.LoginRequest): Promise<NTLogin.LoginResponse> => {
  return new Promise(async (resolve, reject) => {
    log.info("req to nt:", JSON.stringify(ntLogin))
    let responseStart = false
    // 注册重复登录监听事件
    const repeatLogin = (payload: any) => {
      if (!responseStart) {
        responseStart = true
        const ret: NTLogin.LoginResponse = {
          result: "-1",
          loginErrorInfo: {
            step: 0,
            errMsg: "repeat login",
            proofWaterUrl: "",
            newDevicePullQrCodeSig: "",
            jumpUrl: "",
            jumpWord: "",
            tipsTitle: "",
            tipsContent: ""
          }
        }
        resolve(ret)
      }
    }
    registerEventListener('IPC_DOWN_1_ns-ntApi-1_nodeIKernelLoginListener/onUserLoggedIn', 'once', repeatLogin)
    try {
      // 重复登录会导致超时
      const resp = await sendEvent<NTLogin.LoginRequest, NTLogin.LoginResponse>('IPC_UP_1', {
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
        resolve(resp.data)
      }
    }
    catch(e) {

    }

  })
}