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
const d = {
  cmdName: "nodeIKernelMsgListener/onRecvMsg",
  cmdType: "event",
  payload: {
    msgList: [
      {
        msgId: "7293832838041270258",
        msgRandom: "2201265943",
        msgSeq: "9133",
        cntSeq: "0",
        chatType: 2,
        msgType: 9,
        subMsgType: 33,
        sendType: 0,
        senderUid: "u_K54_tDilsiaIV_m0q4XgCg",
        peerUid: "933286835",
        channelId: "",
        guildId: "",
        guildCode: "0",
        fromUid: "0",
        fromAppid: "0",
        msgTime: "1698227794",
        msgMeta: "0x",
        sendStatus: 2,
        sendRemarkName: "",
        sendMemberName: "",
        sendNickName: "msojocs",
        guildName: "",
        channelName: "",
        elements: [
          {
            elementType: 7,
            elementId: "7293832838041270252",
            extBufForUI: "0x",
            textElement: null,
            faceElement: null,
            marketFaceElement: null,
            replyElement: {
              replayMsgId: "0",
              replayMsgSeq: "9132",
              replayMsgRootSeq: "0",
              replayMsgRootMsgId: "0",
              replayMsgRootCommentCnt: "0",
              sourceMsgIdInRecords: "7293832838041270259",
              sourceMsgText: "",
              sourceMsgTextElems: [
                {
                  replyAbsElemType: 1,
                  textElemContent: "[放空]",
                  faceElem: null,
                },
              ],
              senderUid: "1690127128",
              senderUidStr: "u_K54_tDilsiaIV_m0q4XgCg",
              replyMsgClientSeq: "0",
              replyMsgTime: "1698227699",
              replyMsgRevokeType: 0,
              sourceMsgIsIncPic: false,
              sourceMsgExpired: false,
              anonymousNickName: null,
              originalMsgState: null,
            },
            picElement: null,
            pttElement: null,
            videoElement: null,
            grayTipElement: null,
            arkElement: null,
            fileElement: null,
            liveGiftElement: null,
            markdownElement: null,
            structLongMsgElement: null,
            multiForwardMsgElement: null,
            giphyElement: null,
            walletElement: null,
            inlineKeyboardElement: null,
            textGiftElement: null,
            calendarElement: null,
            yoloGameResultElement: null,
            avRecordElement: null,
            structMsgElement: null,
            faceBubbleElement: null,
            shareLocationElement: null,
            tofuRecordElement: null,
          },
          {
            elementType: 1,
            elementId: "7293832838041270257",
            extBufForUI: "0x",
            textElement: {
              content: "77777777777777777",
              atType: 0,
              atUid: "0",
              atTinyId: "0",
              atNtUid: "",
              subElementType: 0,
              atChannelId: "0",
              linkInfo: null,
              atRoleId: "0",
              atRoleColor: 0,
              atRoleName: "",
              needNotify: 0,
            },
            faceElement: null,
            marketFaceElement: null,
            replyElement: null,
            picElement: null,
            pttElement: null,
            videoElement: null,
            grayTipElement: null,
            arkElement: null,
            fileElement: null,
            liveGiftElement: null,
            markdownElement: null,
            structLongMsgElement: null,
            multiForwardMsgElement: null,
            giphyElement: null,
            walletElement: null,
            inlineKeyboardElement: null,
            textGiftElement: null,
            calendarElement: null,
            yoloGameResultElement: null,
            avRecordElement: null,
            structMsgElement: null,
            faceBubbleElement: null,
            shareLocationElement: null,
            tofuRecordElement: null,
          },
        ],
        records: [
          {
            msgId: "7293832838041270259",
            msgRandom: "3020415852",
            msgSeq: "9132",
            cntSeq: "0",
            chatType: 2,
            msgType: 17,
            subMsgType: 8,
            sendType: 0,
            senderUid: "u_K54_tDilsiaIV_m0q4XgCg",
            peerUid: "933286835",
            channelId: "",
            guildId: "",
            guildCode: "0",
            fromUid: "0",
            fromAppid: "0",
            msgTime: "1698227700",
            msgMeta: "0x",
            sendStatus: 2,
            sendRemarkName: "",
            sendMemberName: "",
            sendNickName: "msojocs",
            guildName: "",
            channelName: "",
            elements: [
              {
                elementType: 11,
                elementId: "7293832838041270260",
                extBufForUI: "0x",
                textElement: null,
                faceElement: null,
                marketFaceElement: {
                  itemType: 6,
                  faceInfo: 1,
                  emojiPackageId: 12049,
                  subType: 3,
                  mediaType: 0,
                  imageWidth: 200,
                  imageHeight: 200,
                  faceName: "[放空]",
                  emojiId: "8c76b8f11e8f16b88c1993665f6318eb",
                  key: "d2fab8a3c0eae31d",
                  param: null,
                  mobileParam: null,
                  sourceType: null,
                  startTime: null,
                  endTime: null,
                  emojiType: 1,
                  hasIpProduct: null,
                  voiceItemHeightArr: null,
                  sourceName: null,
                  sourceJumpUrl: null,
                  sourceTypeName: null,
                  backColor: null,
                  volumeColor: null,
                  staticFacePath:
                    "D:\\data\\tim\\335438501\\nt_qq\\nt_data\\Emoji\\marketface\\12049\\8c76b8f11e8f16b88c1993665f6318eb_aio.png",
                  dynamicFacePath:
                    "D:\\data\\tim\\335438501\\nt_qq\\nt_data\\Emoji\\marketface\\12049\\8c76b8f11e8f16b88c1993665f6318eb",
                  supportSize: [
                    { width: 300, height: 300 },
                    { width: 200, height: 200 },
                  ],
                  apngSupportSize: null,
                },
                replyElement: null,
                picElement: null,
                pttElement: null,
                videoElement: null,
                grayTipElement: null,
                arkElement: null,
                fileElement: null,
                liveGiftElement: null,
                markdownElement: null,
                structLongMsgElement: null,
                multiForwardMsgElement: null,
                giphyElement: null,
                walletElement: null,
                inlineKeyboardElement: null,
                textGiftElement: null,
                calendarElement: null,
                yoloGameResultElement: null,
                avRecordElement: null,
                structMsgElement: null,
                faceBubbleElement: null,
                shareLocationElement: null,
                tofuRecordElement: null,
              },
            ],
            records: [],
            emojiLikesList: [],
            commentCnt: "0",
            directMsgFlag: 0,
            directMsgMembers: [],
            peerName: "测试",
            freqLimitInfo: null,
            editable: false,
            avatarMeta: "",
            avatarPendant: "",
            feedId: "",
            roleId: "0",
            timeStamp: "0",
            clientIdentityInfo: null,
            isImportMsg: false,
            atType: 0,
            roleType: 0,
            fromChannelRoleInfo: { roleId: "0", name: "", color: 0 },
            fromGuildRoleInfo: { roleId: "0", name: "", color: 0 },
            levelRoleInfo: { roleId: "0", name: "", color: 0 },
            recallTime: "0",
            isOnlineMsg: false,
            generalFlags: "0x",
            clientSeq: "0",
            fileGroupSize: null,
            foldingInfo: null,
            multiTransInfo: null,
            senderUin: "0",
            peerUin: "0",
            msgAttrs: {},
            anonymousExtInfo: null,
            nameType: 0,
            avatarFlag: 0,
            extInfoForUI: null,
            personalMedal: null,
            categoryManage: 0,
          },
        ],
        emojiLikesList: [],
        commentCnt: "0",
        directMsgFlag: 0,
        directMsgMembers: [],
        peerName: "测试",
        freqLimitInfo: null,
        editable: false,
        avatarMeta: "",
        avatarPendant: "",
        feedId: "",
        roleId: "0",
        timeStamp: "0",
        clientIdentityInfo: null,
        isImportMsg: false,
        atType: 2,
        roleType: 0,
        fromChannelRoleInfo: { roleId: "0", name: "", color: 0 },
        fromGuildRoleInfo: { roleId: "0", name: "", color: 0 },
        levelRoleInfo: { roleId: "0", name: "", color: 0 },
        recallTime: "0",
        isOnlineMsg: true,
        generalFlags: "0x",
        clientSeq: "0",
        fileGroupSize: null,
        foldingInfo: null,
        multiTransInfo: null,
        senderUin: "0",
        peerUin: "0",
        msgAttrs: {},
        anonymousExtInfo: null,
        nameType: 0,
        avatarFlag: 0,
        extInfoForUI: null,
        personalMedal: null,
        categoryManage: 0,
      },
    ],
  },
};
