// document.getElementById('change-background').addEventListener('click', () => {
//   const backgrounds = ['#FFEB3B', '#8BC34A', '#03A9F4', '#FF5722'];
//   const randomColor = backgrounds[Math.floor(Math.random() * backgrounds.length)];
//   document.body.style.backgroundColor = randomColor;
// });

// 如果你想添加动态内容，可以在这里做其他处理
// const quotes = [
//   "生活就是不断的开始，又不断的结束。",
//   "活在当下，珍惜每一刻。",
//   "每天都是新的一天，充满新的希望。"
// ];

// document.getElementById('quote').innerText = quotes[Math.floor(Math.random() * quotes.length)];


chrome.runtime.sendMessage({ action: "fetchQuote" }, (response) => {
  

  console.log(response);
  
  if (response && !response.error) {
    document.getElementById("quote").innerText = response.quote.text + " —— 《" + response.quote.from + "》";
  } else {
    document.getElementById("quote").innerText = "获取语录失败";
  }
});

var imageUrl;
var responseData;

// 获取背景图片的 URL 并更新页面背景
function setBackgroundImage() {
  const cachedImageUrl = localStorage.getItem('cachedImageUrl');
  const cachedresponseData = localStorage.getItem('bingResponse');
  const cacheTime = localStorage.getItem('cacheTime');
  const currentTime = new Date().getTime();
  const cacheDuration = 60 * 60 * 1000; // 缓存1小时
  if (cachedImageUrl && cacheTime && (currentTime - cacheTime < cacheDuration)) {
    imageUrl = cachedImageUrl;
    responseData = cachedresponseData;
    // imageUrl = 'images/wallhaven-l83e5l.png'; // 黑色测试图
    // imageUrl = 'images/wallhaven-k7pljd.jpg'; // 白色测试图 
    applyBackgroundImage();
  } else {
    chrome.runtime.sendMessage(
      { action: 'fetchBackgroundImage' },
      (response) => {
        if (response.error) {
          console.error(response.error);
        } else {

          imageUrl = response.imageInfo.url;
          imageUrl = imageUrl.replaceAll('1920x1080', 'UHD');
          responseData = response;

          localStorage.setItem('cachedImageUrl', imageUrl);
          localStorage.setItem('bingResponse', JSON.stringify(response));
          localStorage.setItem('cacheTime', currentTime);

          applyBackgroundImage()
        }
      }
    );
  }
  // 调整字体颜色
  // adjustTextColor(imageUrl);
}

function applyBackgroundImage() {
  document.body.style.backgroundImage = `url(${imageUrl})`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center center';

  document.getElementById('download-button').addEventListener('mouseover', function () {
    // 鼠标移入时显示卡片
    document.querySelector('.card').style.display = 'block';
  });

  document.getElementById('download-button').addEventListener('mouseout', function () {
    // 鼠标移出时隐藏卡片
    document.querySelector('.card').style.display = 'none';
  });

  data = JSON.parse(responseData);

  document.getElementById("img-title").textContent = data.imageInfo.title + " - 来源：Bing";
  document.getElementById("img-info").textContent = data.imageInfo.copyright;
  document.getElementById('download-button').addEventListener('click', function () {
    window.open(imageUrl, '_blank');
  });

}

// 页面加载时调用函数设置背景
window.onload = setBackgroundImage;

// 点击按钮更换背景
// document.getElementById('change-background').addEventListener('click', setBackgroundImage);

// 获取背景图片的主要颜色
// function getBackgroundColor(imageUrl) {
//   const img = new Image();
//   img.src = imageUrl;

//   return new Promise((resolve, reject) => {
//     img.onload = function () {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0, img.width, img.height);

//       const imageData = ctx.getImageData(0, 0, img.width, img.height);
//       const data = imageData.data;
//       let r = 0, g = 0, b = 0;

//       for (let i = 0; i < data.length; i += 4) {
//         r += data[i];     // Red
//         g += data[i + 1]; // Green
//         b += data[i + 2]; // Blue
//       }

//       const pixelCount = data.length / 4;
//       r = r / pixelCount;
//       g = g / pixelCount;
//       b = b / pixelCount;

//       resolve({ r, g, b });
//     };
//     img.onerror = function () {
//       reject('图片加载失败');
//     };
//   });
// }

// 计算颜色的亮度
// function getBrightness(color) {
//   return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
// }

// 根据图片的亮度调整字体颜色
// async function adjustTextColor(imageUrl) {
//   const backgroundColor = await getBackgroundColor(imageUrl);
//   // console.log(backgroundColor);
//   const brightness = getBrightness(backgroundColor);
//   console.log(brightness);
//   // const elements = [title, introduce, quote];
//   const elements = [quote];
//   const color = brightness < 128 ? 'white' : 'black';
//   elements.forEach(el => el.style.color = color);
// }


// 搜索
document.getElementById("search-btn").addEventListener("click", function () {
  const engine = document.getElementById("search-engine").value;
  const query = document.getElementById("search-box").value.trim();
  if (query) {
    window.location.href = engine + encodeURIComponent(query);
  }
});

document.getElementById("search-box").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    document.getElementById("search-btn").click();
  }
});

chrome.storage.sync.get("darkMode", function (data) {
  if (data.darkMode) {
    document.body.classList.add("dark-mode")
  }
});

chrome.runtime.sendMessage({ action: "getWeather" }, (response) => {
  if (response && !response.error) {
    document.getElementById("weatherInfo").innerText =
      `天气: ${response.weather}, 温度: ${response.temperature}°C`;
  } else {
    document.getElementById("weatherInfo").innerText = "获取天气失败";
  }
});