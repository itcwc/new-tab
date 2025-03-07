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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchWeather") {
      const apiKey = "你的高德API_KEY"; // 请替换为你的 API KEY
      const city = "110000"; // 北京的 adcode，可替换为其他城市
      const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${apiKey}&city=${city}&extensions=base&output=json`;

      fetch(url)
          .then(response => response.json())
          .then(data => sendResponse(data))
          .catch(error => sendResponse({ error: error.message }));

      return true; // 让 sendResponse 继续生效
  }
});
