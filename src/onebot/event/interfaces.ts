/**
 * 事件数据
 */
export interface EventData {
  id: string
  time: number
  /**
   * 事件类型
   */
  type: 'meta' | 'message' | 'notice' | 'request'
  /**
   * 事件详细类型
   */
  detail_type: string
  /**
   * 事件子类型（详细类型的下一级类型）
   */
  sub_type: string
}