// 环境:nodejs和npm。然后在项目文件夹下输入npm install安装electron。启动输入npm start
// 这个main.js脚本就是主进程。在项目文件夹下.
// 最后打包并分发应用程序.   npm install --save-dev @electron-forge/cli
// npx electron-forge import   npm run make 最后生成out目录中。
// 为了管理应用程序的生命周期事件以及创建和控制浏览器窗口,从electron包导入了app和BrowserWindow模块
// ES6中module成为标准,export导出接口,import引入模块.但是node中任采用CommonJS规范,使用require引入模块
// app:electron中控制应用生命周期的模块。Brow...:创建原生浏览器窗口的模块。
const {app, BrowserWindow} = require('electron') //const定义的变量不可以修改，而且必须初始化
const path = require('path') //导入 path 包，该包为操作文件路径提供了实用的功能

function createWindow () {  //定义一个方法用来创建一个带有预加载脚本的新的浏览器窗口
  // 主进程使用BrowserWindow实例创建页面
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.启用开发工具
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow() //通过调用createWindow方法，在electron app第一次被初始化时创建了一个新的窗口
  
  app.on('activate', function () {
    // 添加一个新的侦听器，只有当应用程序激活后没有可见窗口时，才能创建新的浏览器窗口。 
    // 例如，在首次启动应用程序后或重启运行中的应用程序。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 添加了一个新的侦听器，当全部窗口关闭时退出
app.on('window-all-closed', function () {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') app.quit()
})

// 这个脚本中还可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
