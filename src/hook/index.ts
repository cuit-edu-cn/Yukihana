import { useLogger } from "../common/log"
import { hookElectron } from "./electron_hook"
import { hookModule } from "./module_hook"

export const hook = () => {
  const log = useLogger('HOOK')
  log.info('start hook')
  hookElectron()
  hookModule()
}