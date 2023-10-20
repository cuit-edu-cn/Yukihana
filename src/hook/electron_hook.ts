import { ipcMain, BrowserWindow, app } from 'electron'

export const getHookedBrowserWindow = () => {
  const hookBrowserWindow = (OriginalBrowserWindow: any) => {
    function HookedBrowserWindow(options: Electron.BrowserWindowConstructorOptions | undefined) {
      // 修改或增加构造函数的选项
      try {
        console.log('options before:', options)
        if (options && options.webPreferences) {
          options.webPreferences.devTools = true
          // options.webPreferences.preload = "D:/Work/QQ/QQ9.9.3.17412_x64/Files/resources/app/versions/9.9.3-17412/plugin-preloads.js"
        }
        // console.log('options after:', options)
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
  const originloadURL = BrowserWindow.prototype.loadURL;
  BrowserWindow.prototype.loadURL = function(...args){
    // this.setMinimumSize(300, 300);
    console.log('=====loadURL', ...args)
    // setTimeout(() => {
    //   this.webContents.openDevTools()
    //   this.webContents.toggleDevTools();
    // }, 3000)
    this.webContents.openDevTools()
    const path = require('path');
    const extPath = path.join(path.dirname(app.getAppPath()), "extensions");
    console.log('----extPath----', extPath)
    const _send = this.webContents.send
    this.webContents.send = function(...args) {
      console.log('\n\n=====\nsend:', JSON.stringify(args))
      return _send.apply(this, args)
    }
    // this.webContents.session.loadExtension(extPath + "/extension").then(({ id }) => {
    //   // ...
    //   console.log('-----Load Extension:', id)
    // })
    return originloadURL.apply(this, args)
  };
}

const hookIpcMain = () => {
  const ipcMap: Record<string, (event: Electron.IpcMainEvent, ...args: any[]) => void> = {}
  /**
   * 不能使用一个变量承接，会导致无法启动
   * const _on = ipcMain.on
   * _on(...)
   */
  ;(ipcMain as any)._on = ipcMain.on
  ipcMain.on = function(...args) {
    console.log('ipcMain on register:', args)
    if (args[0].includes('IPC_UP')) {
      ipcMap[args[0]] = args[1]
    }
    return (ipcMain as any)._on(args[0], function(event: Electron.IpcMainEvent, ...a: any[]) {
      console.log(`\nipcMain emit for ${args[0]}:`, args)
      // console.log('args:', ...a)
      for (let i = 0; i < a.length; i++) {
        const arg = a[i]
        console.log(`arg${i}:`, arg)
      }
      args[1](event, ...a)
    })
  }
  
  // 不能使用一个变量承接，会导致无法启动
  ;(ipcMain as any)._handle = ipcMain.handle
  ipcMain.handle = function(...args) {
    console.log(`\nipcMain handle register from ${args[0]}:`, args)
    return (ipcMain as any)._handle(args[0], function(event: Electron.IpcMainInvokeEvent, ...a: any[]) {
      // console.log('\nipcMain handle emit, arg length:', a.length)
      // console.log('args:', ...a)
      args[1](event, ...a)
    })
  }
}

export const hookElectron = () => {
  hookLoadUrl()
  hookIpcMain()
}