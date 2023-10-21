export interface NTEventSendInfo {
  type: 'request'
  callbackId: string
  eventName: 'ns-ntApi-2'
}
export interface NTEventReceiveInfo {
  type: 'response'
  callbackId: string
  promiseStatue: string
  eventName: string
}