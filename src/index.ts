import { useLogger } from "./common/log"
import { initBaseEvent } from "./event/base";
import { hook } from "./hook";
import { startServer } from "./server/server";
import { test } from "./test/test";

const log = useLogger('Index')
log.info('info: hi bot!!')

// 核心事件hook
hook()

// 初始化基础事件处理
initBaseEvent()

// 启动服务器
startServer()

// 测试
// test()

// ntqq/resources/app/app_launcher/index.js 原始代码
require('./launcher.node').load('external_index', module);