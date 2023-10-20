import { useLogger } from "./common/log"

const log = useLogger('Index')
log.info('hi bot!!')

// ntqq/resources/app/app_launcher/index.js
require('./launcher.node').load('external_index', module);