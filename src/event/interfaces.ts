import { IpcDownInfo } from "../store/interfaces"

export interface CallbackInfo {
  resolve: (value: { info: IpcDownInfo; data: any }) => void
  reject: (value: { info: IpcDownInfo; data: any }) => void
  /**
   * 超时reject用
   */
  timeout: NodeJS.Timeout
}

/**
 * 消息事件的payload
 * 
 * NTQQ -> 框架
 * 
 */
export interface NTMessagePayloadType {
  msgList: NTMessageItemType[]
}

/**
 * 每一条消息的信息
 * 
 * NTQQ -> 框架
 * 
 */
interface NTMessageItemType {
  msgId: `${number}`
  msgRandom: `${number}`
  msgSeq: `${number}`
  cntSeq: `${number}`
  /**
   * 1 - 好友消息
   * 2 - 群聊消息
   * 
   */
  chatType: 1 | 2
  msgType: 2
  subMsgType: 1
  sendType: 0
  senderUid: `u_${string}`
  /**
   * 群号
   */
  peerUid: `${number}`
  channelId: string
  guildId: string
  guildCode: `${number}`
  fromUid: `${number}`
  fromAppid: `${number}`
  msgTime: `${number}`
  msgMeta: "0x"
  sendStatus: 2
  sendRemarkName: string
  /**
   * 用户的群昵称
   */
  sendMemberName: string
  sendNickName: string
  guildName: string
  channelName: string
  /**
   * 消息元素
   * 
   * 一条消息会由一个至多个消息元素组成
   */
  elements: NTMessageElementType[]
  /**
   * 引用回复会用到
   */
  records: []
  emojiLikesList: []
  commentCnt: `${number}`
  directMsgFlag: 0
  directMsgMembers: []
  peerName: string
  freqLimitInfo: null
  editable: boolean
  avatarMeta: string
  avatarPendant: string
  feedId: string
  roleId: `${number}`
  timeStamp: `${number}`
  clientIdentityInfo: null
  isImportMsg: boolean
  atType: number
  roleType: number
  fromChannelRoleInfo: {
    roleId: "0"
    name: ""
    color: 0
  }
  fromGuildRoleInfo: {
    roleId: "0"
    name: ""
    color: 0
  }
  levelRoleInfo: {
    roleId: "0"
    name: ""
    color: 0
  }
  recallTime: `${number}`
  isOnlineMsg: boolean
  generalFlags: "0x"
  clientSeq: `${number}`
  fileGroupSize: null
  foldingInfo: null
  multiTransInfo: null
  senderUin: `${number}`
  peerUin: `${number}`
  msgAttrs: {}
  anonymousExtInfo: null
  nameType: number
  avatarFlag: number
  extInfoForUI: null
  personalMedal: null
  categoryManage: number
}

/**
 * 消息元素数据
 */
export interface NTMessageElementType {
  /**
   * 消息元素类型
   * 
   * 1 - 纯文本&@ textElement
   * 
   * 2 - 图片 picElement
   * 
   * 5 - 视频 videoElement
   * 
   * 6 - 表情 faceElement
   * 
   * 7 - 引用回复 replyElement
   * 
   * 11 - 商城表情 marketFaceElement
   * 
   */
  elementType: 1 | 2 | 5 | 6 | 7 | 11
  elementId: `${number}`
  extBufForUI: "0x"
  textElement: NTMessage.TextElementType
  faceElement: null
  marketFaceElement: null
  replyElement: NTMessage.ReplyElementType

  /**
   * 图片元素
   */
  picElement: NTMessage.PicElementType
  pttElement: null
  videoElement: null
  grayTipElement: null
  arkElement: null
  fileElement: null
  liveGiftElement: null
  markdownElement: null
  structLongMsgElement: null
  multiForwardMsgElement: null
  giphyElement: null
  walletElement: null
  inlineKeyboardElement: null
  textGiftElement: null
  calendarElement: null
  yoloGameResultElement: null
  avRecordElement: null
  structMsgElement: null
  faceBubbleElement: null
  shareLocationElement: null
  tofuRecordElement: null
}

/**
 * NTQQ的消息各种消息元素类型
 * 
 * NTQQ -> 框架
 */
export declare namespace NTMessage {

  /**
   * 纯文本消息元素
   */
  export interface TextElementType {
    content: string
    /**
     * 0 - 没有@
     * 1 - @ 全体成员
     * 2 - 有@
     */
    atType: 0 | 2
    atUid: `${number}`
    atTinyId: `${number}`
    /**
     * NT QQ中的uid
     */
    atNtUid: string
    subElementType: 0
    atChannelId: `${number}`
    linkInfo: null
    atRoleId: `${number}`
    atRoleColor: 0
    atRoleName: string
    needNotify: 0
  }

  /**
   * 视频消息元素
   */
  export interface VideoElementType {
    filePath: string
    fileName: string
    videoMd5: string
    thumbMd5: string
    fileTime: number
    thumbSize: number
    /**
     * 2 - mp4
     */
    fileFormat: number
    fileSize: `${number}`
    thumbWidth: number
    thumbHeight: number
    busiType: 0
    subBusiType: 0
    thumbPath: {}
    transferStatus: 0
    progress: 0
    invalidState: 0
    fileUuid: string
    fileSubId: ""
    fileBizId: null
    originVideoMd5: string
    import_rich_media_context: null
    sourceVideoCodecFormat: 0
  }

  /**
   * 图片消息元素
   */
  export interface PicElementType {
    picSubType: 0
    fileName: `{${string}}.${string}`
    fileSize: `${number}`
    picWidth: number
    picHeight: number
    original: boolean
    md5HexStr: string
    sourcePath: string
    thumbPath: {}
    transferStatus: number
    progress: number
    picType: number
    invalidState: number
    fileUuid: `${number}`
    fileSubId: string
    thumbFileSize: number
    fileBizId:null
    downloadIndex:null
    summary: string
    emojiFrom: null
    emojiWebUrl: null
    emojiAd:{
      url: string
      desc: string
    }
    emojiMall:{
      packageId: number
      emojiId: number
    },
    emojiZplan:{
      actionId: 0,
      actionName: string,
      actionType: 0,
      playerNumber: 0,
      peerUid: `${number}`
      bytesReserveInfo: string
    },
    originImageMd5: string,
    originImageUrl: string,
    import_rich_media_context: null,
    isFlashPic: boolean
  }

  /**
   * 商城表情消息元素
   */
  export interface MarketFaceElement {
    itemType: 6
    faceInfo: 1
    emojiPackageId: number
    subType: 3
    mediaType: 0
    imageWidth: number
    imageHeight: number
    faceName: string
    emojiId: string
    key: string
    param: null
    mobileParam: null
    sourceType: null
    startTime: null
    endTime: null
    emojiType: number
    hasIpProduct: null
    voiceItemHeightArr: null
    sourceName: null
    sourceJumpUrl: null
    sourceTypeName: null
    backColor: null
    volumeColor: null
    staticFacePath: string
    dynamicFacePath: string
    supportSize: {
                  width: number
                  height: number
                }[]
    apngSupportSize: null
  }

  /**
   * 引用回复消息元素
   */
  export interface ReplyElementType {
    replayMsgId: `${number}`
    replayMsgSeq: `${number}`
    replayMsgRootSeq: `${number}`
    replayMsgRootMsgId: `${number}`
    replayMsgRootCommentCnt: `${number}`
    sourceMsgIdInRecords: `${number}`
    sourceMsgText: string
    sourceMsgTextElems: ReplySourceMsgTextElemType[]
    /**
     * 被引用消息的发送者qq号
     */
    senderUid: `${number}`
    /**
     * 被引用消息的发送者用户id
     */
    senderUidStr: `u_${string}`
    replyMsgClientSeq: `${number}`
    replyMsgTime: `${number}`
    replyMsgRevokeType: 0
    sourceMsgIsIncPic: boolean
    sourceMsgExpired: boolean
    anonymousNickName: null
    originalMsgState: null
  }

  interface ReplySourceMsgTextElemType {
    replyAbsElemType: 1
    textElemContent: string
    faceElem: null
  }
}
const d = { "msgList": [{ "msgId": "7294142341675492344", "msgRandom": "600541791", "msgSeq": "261529", "cntSeq": "0", "chatType": 2, "msgType": 7, "subMsgType": 0, "sendType": 0, "senderUid": "u_K54_tDilsiaIV_m0q4XgCg", "peerUid": "764624271", "channelId": "", "guildId": "", "guildCode": "0", "fromUid": "0", "fromAppid": "0", "msgTime": "1698299857", "msgMeta": "0x", "sendStatus": 2, "sendRemarkName": "", "sendMemberName": "群主邀请了白丝jk萝莉加入了群聊！", "sendNickName": "", "guildName": "", "channelName": "", "elements": [{ "elementType": 5, "elementId": "7294142341675492343", "extBufForUI": "0x", "textElement": null, "faceElement": null, "marketFaceElement": null, "replyElement": null, "picElement": null, "pttElement": null, "videoElement": { "filePath": "D:\\data\\tim\\335438501\\nt_qq\\nt_data\\Video\\2023-10\\Ori\\146e02114e23a2bdd1541e835dc5a05e.mp4", "fileName": "146e02114e23a2bdd1541e835dc5a05e.mp4", "videoMd5": "146e02114e23a2bdd1541e835dc5a05e", "thumbMd5": "685f37c824907d23d77eb3771ca3ebac", "fileTime": 54, "thumbSize": 67736, "fileFormat": 2, "fileSize": "4141436", "thumbWidth": 480, "thumbHeight": 640, "busiType": 0, "subBusiType": 0, "thumbPath": {}, "transferStatus": 0, "progress": 0, "invalidState": 0, "fileUuid": "305102010004363034020100020464bd4b1802037a1db9020448e63cb702046539ffd00410146e02114e23a2bdd1541e835dc5a05e02037a13f502010004140000000866696c65747970650000000431303033", "fileSubId": "", "fileBizId": null, "originVideoMd5": "", "import_rich_media_context": null, "sourceVideoCodecFormat": 0 }, "grayTipElement": null, "arkElement": null, "fileElement": null, "liveGiftElement": null, "markdownElement": null, "structLongMsgElement": null, "multiForwardMsgElement": null, "giphyElement": null, "walletElement": null, "inlineKeyboardElement": null, "textGiftElement": null, "calendarElement": null, "yoloGameResultElement": null, "avRecordElement": null, "structMsgElement": null, "faceBubbleElement": null, "shareLocationElement": null, "tofuRecordElement": null }], "records": [], "emojiLikesList": [], "commentCnt": "0", "directMsgFlag": 0, "directMsgMembers": [], "peerName": "CUIT 后花园", "freqLimitInfo": null, "editable": false, "avatarMeta": "", "avatarPendant": "", "feedId": "", "roleId": "0", "timeStamp": "0", "clientIdentityInfo": null, "isImportMsg": false, "atType": 0, "roleType": 0, "fromChannelRoleInfo": { "roleId": "0", "name": "", "color": 0 }, "fromGuildRoleInfo": { "roleId": "0", "name": "", "color": 0 }, "levelRoleInfo": { "roleId": "0", "name": "", "color": 0 }, "recallTime": "0", "isOnlineMsg": true, "generalFlags": "0x", "clientSeq": "0", "fileGroupSize": null, "foldingInfo": null, "multiTransInfo": null, "senderUin": "0", "peerUin": "0", "msgAttrs": {}, "anonymousExtInfo": null, "nameType": 0, "avatarFlag": 0, "extInfoForUI": null, "personalMedal": null, "categoryManage": 0 }] }