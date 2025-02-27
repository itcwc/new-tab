// document.getElementById('change-background').addEventListener('click', () => {
//   const backgrounds = ['#FFEB3B', '#8BC34A', '#03A9F4', '#FF5722'];
//   const randomColor = backgrounds[Math.floor(Math.random() * backgrounds.length)];
//   document.body.style.backgroundColor = randomColor;
// });

// 如果你想添加动态内容，可以在这里做其他处理
const quotes = [
  "生活就是不断的开始，又不断的结束。",
  "活在当下，珍惜每一刻。",
  "每天都是新的一天，充满新的希望。"
];

document.getElementById('quote').innerText = quotes[Math.floor(Math.random() * quotes.length)];

// 获取背景图片的 URL 并更新页面背景
function setBackgroundImage() {
  chrome.runtime.sendMessage(
    { action: 'fetchBackgroundImage' },
    (response) => {
      if (response.error) {
        console.error(response.error);
      } else {
        var imageUrl = response.imageUrl;
        imageUrl = imageUrl.replaceAll('1920x1080', 'UHD');
        console.log(imageUrl);
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center center';
      }
    }
  );
}

// 页面加载时调用函数设置背景
window.onload = setBackgroundImage;

// 点击按钮更换背景
// document.getElementById('change-background').addEventListener('click', setBackgroundImage);
