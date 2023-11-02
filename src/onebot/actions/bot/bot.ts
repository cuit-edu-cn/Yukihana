import { randomUUID } from "crypto"
import { NTEventListenerHandle, useStore } from "../../../store/store"
import { BotActionResponse, BotActionParams } from "../interfaces"
import { BotLogin } from "./interfaces"
import { useLogger } from "../../../common/log"
import { getUserInfoByUid } from "../../common/user"
import { sendEvent } from "../../../ntqq/event/base"
import { NTLogin, NTQRCodeResponse } from "../../../ntqq/login/interfaces"
import { NTLoginByAccountInfo } from "../../../ntqq/login/account"
import { NTGetLoginQrCode } from "../../../ntqq/login/qrcode"
import { loginByAccount, loginByQrCode } from "../../../transfer/login"

const { registerActionHandle, registerEventListener, removeEventListener } = useStore()

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
  registerActionHandle('login_by_account', loginByAccount)
  registerActionHandle('login_by_qrcode', loginByQrCode)
  registerActionHandle('test', test)
}