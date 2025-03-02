// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Custom New Tab Extension Installed!");
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('接收到请求:', request);
  if (request.action === 'fetchBackgroundImage') {
    fetch('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN')
      .then(response => response.json())
      .then(data => {

        const imageInfo = data.images[0];
        imageInfo.url = 'https://cn.bing.com' + data.images[0].url;
        
        sendResponse({ imageInfo });
      })
      .catch(error => {
        // console.error('背景图片加载失败:', error);
        sendResponse({ error: '背景图片加载失败' });
      });
    return true;  // 需要异步响应
  }
});