import { initBot } from "./bot"
import { initFriend } from "./friend"

export const initAction = () => {
  initBot()
  initFriend()
}