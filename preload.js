// All of the Node.js APIs are available in the preload process.
// 定义了一个事件监听器，当web页面加载完成后通知你。
window.addEventListener('DOMContentLoaded', () => {
  //定义了一个功能函数用来为index.html中的所有placeholder设置文本
  const replaceText = (selector, text) => { 
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  // 遍历了想展示版本号的组件列表
  for (const type of ['chrome', 'node', 'electron']) {
    // 调用replaceText来查找index.html中的版本占位符并将其文本值设置为process.versions的值
    replaceText(`${type}-version`, process.versions[type])
  }
})
