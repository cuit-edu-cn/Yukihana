import { NTLoginByAccountInfo } from "../ntqq/login/account"
import { NTLogin } from "../ntqq/login/interfaces"
import { NTGetLoginQrCode } from "../ntqq/login/qrcode"
import { BotLogin } from "../onebot/actions/bot/interfaces"
import { BotActionResponse, BotActionParams } from "../onebot/actions/interfaces"
import { useLogger } from "../common/log"

const log = useLogger('Login')
export const loginByAccount = async (p: BotLogin.LoginData): Promise<BotActionResponse<any>> => {
  log.info("req param from client:", JSON.stringify(p))
  const ret: BotActionResponse = {
    id: "",
    status: "ok",
    retcode: 0,
    data: {},
    message: ""
  }
  if (p.id === undefined || p.id == null || typeof p.id !== 'number') {
    ret.status = 'failed'
    ret.retcode = 10003
    ret.message = 'id参数不正确'
    return ret
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
  try {
    const resp = await NTLoginByAccountInfo(ntLogin)
    ret.data = resp
    return ret
  }
  catch(e) {
    ret.data = e
    return ret
  }

}
export const loginByQrCode = async (p: BotActionParams): Promise<BotActionResponse<any>> => {
  const ret: BotActionResponse = {
    id: "",
    status: "ok",
    retcode: 0,
    data: undefined,
    message: ""
  }
  const resp = await NTGetLoginQrCode()
  ret.data = resp
  return ret
}