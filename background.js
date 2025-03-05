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

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "toggleNewTab") {
//       chrome.storage.sync.get("enableNewTab", function (data) {
//           if (data.enableNewTab) {
//               chrome.declarativeNetRequest.updateDynamicRules({
//                   removeRuleIds: [1],
//                   addRules: [{
//                       id: 1,
//                       priority: 1,
//                       action: { type: "redirect", redirect: { url: chrome.runtime.getURL("newtab.html") }},
//                       condition: { urlFilter: "chrome://newtab/", resourceTypes: ["main_frame"] }
//                   }]
//               });
//           } else {
//               chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [1] });
//           }
//       });
//   }
// });

// chrome.tabs.onCreated.addListener((tab) => {

//   console.log('tabs.onCreated');

//   chrome.storage.sync.get("enableNewTab", function (data) {

//       console.log(data.enableNewTab);

//       if (data.enableNewTab && tab.url === "chrome://newtab/") {
//           chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("newtab.html") });
//       }
//   });
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading" && (tab.url === "chrome://newtab/" || tab.url === "about:blank")) {
    chrome.storage.sync.get("enableNewTab", function (data) {
      console.log("新标签页检测：", data.enableNewTab, tab.url);
      if (data.enableNewTab) {
        // 先创建新的标签页
        chrome.tabs.create({ url: chrome.runtime.getURL("newtab.html") }, () => {
          // 关闭原来的 new tab
          chrome.tabs.remove(tabId);
        });
      }
    });
  }
});