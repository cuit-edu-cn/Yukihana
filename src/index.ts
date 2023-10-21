import { useLogger } from "./common/log"
import { initBaseEvent } from "./event/base";
import { hook } from "./hook";
import { test } from "./test/test";

const log = useLogger('Index')
log.info('hi bot!!')

hook()
initBaseEvent()
test()
// ntqq/resources/app/app_launcher/index.js
require('./launcher.node').load('external_index', module);