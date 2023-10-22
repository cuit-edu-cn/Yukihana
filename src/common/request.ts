import { NIL as NIL_UUID } from "uuid";
import { ActionRequest, ActionResponse } from "../onebot/actions/interfaces";

export const checkBaseRequestField = (req: ActionRequest): ActionResponse | undefined => {
  const ret: ActionResponse = {
    id: req.id || NIL_UUID,
    status: "failed",
    retcode: 10001,
    data: undefined,
    message: "Bad Request"
  }
  try {

    // id仅作请求响应配对使用，不校验格式
    if (req.id === null || req.id === undefined) {
      ret.message += '[id不能为空]'
      return ret
    }
    if (typeof req.id !== 'string') {
      ret.message += '[id应为字符串]'
      return ret
    }
    if (req.id.length === 0) {
      ret.message += '[id长度不能为0]'
      return ret
    }

    // action
    if (req.action === null || req.action === undefined) {
      ret.message += '[action不能为空]'
      return ret
    }
    if (typeof req.action !== 'string') {
      ret.message += '[action应为字符串]'
      return ret
    }
    if (req.action.length === 0) {
      ret.message += '[action长度不能为0]'
      return ret
    }

    // params
    if (req.params === null || req.params === undefined) {
      ret.message += '[params不能为空]'
      return ret
    }
  }
  catch(e) {
    // 发送异常
    ret.message += '[必要参数识别失败]'
    return ret
  }
  return undefined
}