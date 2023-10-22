declare namespace NsNtApi2 {
  export interface SendMsg {
    msgId: string
    peer: MsgPeer
    msgElements: MsgElement[]
    msgAttributeInfos: Map<string, any>
  }
  interface MsgElement {
    elementType: number
    elementId: string
    textElement: TextElement
  }
  interface TextElement {
    content: string
    atType: number
    atUid: string
    atTinyId: string
    atNtUid: string
  }
  interface MsgPeer {
    chatType: number
    peerUid: string
    guildId: string
  }

  export interface CmdData<T> {
    cmdName: string
    cmdType: string
    payload: T
  }
}