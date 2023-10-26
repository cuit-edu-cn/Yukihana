import { IpcDownInfo } from "../store/interfaces";

export interface CallbackInfo {
  resolve: (value: { info: IpcDownInfo; data: any }) => void;
  reject: (value: { info: IpcDownInfo; data: any }) => void;
  /**
   * 超时reject用
   */
  timeout: NodeJS.Timeout;
}

export interface NTMessagePayloadType {
  msgList: NTMessageItemType[];
}
interface NTMessageItemType {
  msgId: string;
  msgRandom: string;
  msgSeq: string;
  cntSeq: string;
  /**
   * 1 - 好友消息
   * 2 - 群聊消息
   * 
   */
  chatType: 1 | 2;
  msgType: 2;
  subMsgType: 1;
  sendType: 0;
  senderUid: string;
  peerUid: `${number}`;
  channelId: string;
  guildId: string;
  guildCode: `${number}`;
  fromUid: `${number}`;
  fromAppid: `${number}`;
  msgTime: `${number}`;
  msgMeta: "0x";
  sendStatus: 2;
  sendRemarkName: string;
  sendMemberName: string;
  sendNickName: string;
  guildName: string;
  channelName: string;
  /**
   * 消息内容
   */
  elements: NTMessageElementType[];
  records: [];
  emojiLikesList: [];
  commentCnt: `${number}`;
  directMsgFlag: 0;
  directMsgMembers: [];
  peerName: string;
  freqLimitInfo: null;
  editable: boolean;
  avatarMeta: string;
  avatarPendant: string;
  feedId: string;
  roleId: `${number}`;
  timeStamp: `${number}`;
  clientIdentityInfo: null;
  isImportMsg: boolean;
  atType: number;
  roleType: number;
  fromChannelRoleInfo: {
    roleId: "0";
    name: "";
    color: 0;
  };
  fromGuildRoleInfo: {
    roleId: "0";
    name: "";
    color: 0;
  };
  levelRoleInfo: {
    roleId: "0";
    name: "";
    color: 0;
  };
  recallTime: `${number}`;
  isOnlineMsg: boolean;
  generalFlags: "0x";
  clientSeq: `${number}`;
  fileGroupSize: null;
  foldingInfo: null;
  multiTransInfo: null;
  senderUin: `${number}`;
  peerUin: `${number}`;
  msgAttrs: {};
  anonymousExtInfo: null;
  nameType: number;
  avatarFlag: number;
  extInfoForUI: null;
  personalMedal: null;
  categoryManage: number;
}

interface NTMessageElementType {
  /**
   * 1 - 纯文本&@ textElement
   * 2 - 图片 picElement
   * 6 - 表情 faceElement
   * 7 - 引用回复 replyElement
   * 11 - 商城表情 marketFaceElement
   */
  elementType: 1 | 2 | 6 | 7 | 11;
  elementId: `${number}`;
  extBufForUI: "0x";
  textElement: NTMessage.TextElementType;
  faceElement: null;
  marketFaceElement: null;
  replyElement: null;
  picElement: null;
  pttElement: null;
  videoElement: null;
  grayTipElement: null;
  arkElement: null;
  fileElement: null;
  liveGiftElement: null;
  markdownElement: null;
  structLongMsgElement: null;
  multiForwardMsgElement: null;
  giphyElement: null;
  walletElement: null;
  inlineKeyboardElement: null;
  textGiftElement: null;
  calendarElement: null;
  yoloGameResultElement: null;
  avRecordElement: null;
  structMsgElement: null;
  faceBubbleElement: null;
  shareLocationElement: null;
  tofuRecordElement: null;
}
export declare namespace NTMessage {
  export interface TextElementType {
    content: string;
    /**
     * 0 - 没有@
     * 1 - @ 全体成员
     * 2 - 有@
     */
    atType: 0 | 2;
    atUid: `${number}`;
    atTinyId: `${number}`;
    /**
     * NT QQ中的uid
     */
    atNtUid: string;
    subElementType: 0;
    atChannelId: `${number}`;
    linkInfo: null;
    atRoleId: `${number}`;
    atRoleColor: 0;
    atRoleName: string;
    needNotify: 0;
  }
  export interface ReplyElementType {
    replayMsgId: `${number}`,
    replayMsgSeq: `${number}`,
    replayMsgRootSeq: `${number}`,
    replayMsgRootMsgId: `${number}`,
    replayMsgRootCommentCnt: `${number}`,
    sourceMsgIdInRecords: `${number}`,
    sourceMsgText: string,
    sourceMsgTextElems: ReplySourceMsgTextElemType[],
    senderUid: `${number}`,
    senderUidStr: `u_${string}`,
    replyMsgClientSeq: `${number}`,
    replyMsgTime: `${number}`,
    replyMsgRevokeType: 0,
    sourceMsgIsIncPic: boolean,
    sourceMsgExpired: boolean,
    anonymousNickName: null,
    originalMsgState: null,
  }
  interface ReplySourceMsgTextElemType {
    replyAbsElemType: 1,
    textElemContent: string,
    faceElem: null,
  }
}
