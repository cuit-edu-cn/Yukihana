import { useLogger } from "./common/log"
import { hook } from "./hook";

const log = useLogger('Index')
log.info('hi bot!!')

hook()

// ntqq/resources/app/app_launcher/index.js
require('./launcher.node').load('external_index', module);