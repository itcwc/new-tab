const apiKey = "你的API Key";  // 你的API Key

const city = "610000";  // 北京 adcode
const cacheKey = "weather_cache";
const updateInterval = 30 * 60 * 1000; // 30分钟

const quoteCacheKey = "quote_cache";
const cacheDuration = 5 * 60 * 1000; // 5 分钟
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log('接收到请求:', request);
  // 必应壁纸请求
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

  // 天气请求
  if (request.action === "getWeather") {
    chrome.storage.local.get(cacheKey, (result) => {
      const cachedData = result[cacheKey];
      if (cachedData && (Date.now() - cachedData.updateTime < updateInterval)) {
        sendResponse(cachedData);
      } else {
        fetchWeather();
        setTimeout(() => {
          chrome.storage.local.get(cacheKey, (newResult) => {
            sendResponse(newResult[cacheKey] || { error: "数据获取失败" });
          });
        }, 2000); // 给 API 一点时间返回数据
      }
    });
    return true; // 表示 sendResponse 是异步的
  }

  // 语录请求
  if (request.action === "fetchQuote") { // 确保 action 名称正确

    chrome.storage.local.get(quoteCacheKey, (result) => {
      const cachedData = result[quoteCacheKey];
      if (cachedData && Date.now() - cachedData.updateTime < cacheDuration) {
        sendResponse({ quote: cachedData.quote });
      } else {
        fetchQuote().then(() => {
          chrome.storage.local.get(quoteCacheKey, (newResult) => {
            sendResponse(newResult[quoteCacheKey] || { error: "数据获取失败" });
          });
        });
      }
    });

    return true; // 异步返回
  }
  
});

function fetchWeather() {
  // console.log("天气请求");
  
  const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${apiKey}&city=${city}&extensions=base&output=json`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === "1") {
        const weatherData = {
          weather: data.lives[0].weather,
          temperature: data.lives[0].temperature,
          updateTime: Date.now()
        };
        chrome.storage.local.set({ [cacheKey]: weatherData });
      }
    })
    .catch(() => {
      console.error("天气请求失败");
    });
}



// **定时更新天气**
setInterval(fetchWeather, updateInterval);
// fetchWeather(); // 立即执行一次


function fetchQuote() {
  return fetch("https://api.keguan.org.cn/api/yiyan/api.php?type=json&c=i")
    .then(response => response.json())
    .then(data => {
      const quoteData = {
        quote: data,  // API 返回的语录
        updateTime: Date.now()
      };
      chrome.storage.local.set({ [quoteCacheKey]: quoteData });
    })
    .catch(() => {
      console.error("语录请求失败");
    });
}

// **定时更新语录**
setInterval(fetchQuote, cacheDuration);
// fetchQuote(); // 立即执行一次

