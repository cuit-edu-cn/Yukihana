import { ipcMain, BrowserWindow, app } from 'electron'
import { useLogger } from '../common/log';
import { useStore } from '../store/store';

const log = useLogger('ElectronHook')
export const getHookedBrowserWindow = () => {
  const hookBrowserWindow = (OriginalBrowserWindow: any) => {
    function HookedBrowserWindow(options: Electron.BrowserWindowConstructorOptions | undefined) {
      // 修改或增加构造函数的选项
      try {
        // log.info('options before:', options)
        if (options && options.webPreferences) {
          options.webPreferences.devTools = true
          // options.webPreferences.preload = "D:/Work/QQ/QQ9.9.3.17412_x64/Files/resources/app/versions/9.9.3-17412/plugin-preloads.js"
        }
        // log.info('options after:', options)
      }catch(e) {
  
      }
      // 使用修改后的选项调用原始构造函数
      return new OriginalBrowserWindow(options);
    }
  
    // 复制原始构造函数的原型链并进行替换
    HookedBrowserWindow.prototype = Object.create(OriginalBrowserWindow.prototype);
    HookedBrowserWindow.prototype.constructor = HookedBrowserWindow;
    Object.setPrototypeOf(HookedBrowserWindow, OriginalBrowserWindow);
  
    return HookedBrowserWindow;
  };
  
  // 使用替换的构造函数
  return hookBrowserWindow(BrowserWindow);
}

const hookLoadUrl = () => {
  const { getIpcMainReceiveListener } = useStore()
  const originloadURL = BrowserWindow.prototype.loadURL;
  BrowserWindow.prototype.loadURL = function(...args){
    // this.setMinimumSize(300, 300);
    // log.info('=====loadURL', ...args)
    // setTimeout(() => {
    //   this.webContents.openDevTools()
    //   this.webContents.toggleDevTools();
    // }, 3000)
    this.webContents.openDevTools()
    const path = require('path');
    const extPath = path.join(path.dirname(app.getAppPath()), "extensions");
    // log.info('----extPath----', extPath)
    const _send = this.webContents.send
    this.webContents.send = function(channel, ...args) {
      // log.info('\n\n=====\nsend:', channel, JSON.stringify(args))
      // log.info('寻找监听器...')
      const listener = getIpcMainReceiveListener(channel)
      if (listener) {
        // log.info('找到监听器，开始处理...')
        listener(args[0], args[1])
      }
      // else {
        // log.info('没有找到监听器！')
      // }
      return _send.apply(this, [channel, ...args])
    }
    // this.webContents.session.loadExtension(extPath + "/extension").then(({ id }) => {
    //   // ...
    //   log.info('-----Load Extension:', id)
    // })
    return originloadURL.apply(this, args)
  };
}

const hookIpcMain = () => {
  const { addIpcMainSend } = useStore()
  /**
   * 不能使用一个变量承接，会导致无法启动
   * const _on = ipcMain.on
   * _on(...)
   */
  ;(ipcMain as any)._on = ipcMain.on
  // gui发送消息，electron 收到消息
  ipcMain.on = function(...args) {
    // log.info('ipcMain on register:', args)
    if (args[0].includes('IPC_UP')) {
      addIpcMainSend(args[0], args[1])
    }
    return (ipcMain as any)._on(args[0], function(event: Electron.IpcMainEvent, ...a: any[]) {
      // log.info(`\nipcMain emit for ${args[0]}:`, args)
      // log.info('args:', ...a)
      for (let i = 0; i < a.length; i++) {
        const arg = a[i]
        // log.info(`arg${i}:`, arg)
      }
      args[1](event, ...a)
    })
  }
  
  // 不能使用一个变量承接，会导致无法启动
  ;(ipcMain as any)._handle = ipcMain.handle
  ipcMain.handle = function(...args) {
    // log.info(`\nipcMain handle register from ${args[0]}:`, args)
    return (ipcMain as any)._handle(args[0], function(event: Electron.IpcMainInvokeEvent, ...a: any[]) {
      // log.info('\nipcMain handle emit, arg length:', a.length)
      // log.info('args:', ...a)
      args[1](event, ...a)
    })
  }
}

export const hookElectron = () => {
  hookLoadUrl()
  hookIpcMain()
}