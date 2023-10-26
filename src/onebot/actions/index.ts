import { initBot } from "./bot/bot"
import { initFriend } from "./friend/friend"

export const initAction = () => {
  initBot()
  initFriend()
}