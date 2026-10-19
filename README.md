# CTab 新标签页 · Chrome 扩展

> 一个基于 **Manifest V3** 的 Chrome 新标签页扩展，把空白的新标签页变成集「时钟 · 搜索 · 天气 · 每日壁纸 · 每日一言」于一体的个人主页。  
> 同时本仓库也是掘金专栏 [《谷歌浏览器插件开发系列》](https://juejin.cn/column/7473799336674869260) 的**配套源码**。

## ✨ 功能特性

- 🕐 **实时时钟与日期**：新标签页顶部显示当前时间与日期（纯前端 `clock.js`）。
- 🔍 **多搜索引擎**：内置 Google / Bing / 百度 一键切换，输入即搜。
- 🌤 **实时天气**：基于高德地图开放平台天气 API，显示当前城市天气与温度，本地缓存 30 分钟。
- 🖼 **必应每日壁纸**：自动拉取 Bing 每日精选壁纸作为背景，并支持一键下载。
- 💡 **每日一言**：接入一言 API，每次打开随机展示一句文案。
- 🌙 **深色模式**：通过扩展弹窗（popup）一键切换暗色主题。

## 📸 截图

> 在 `images/` 目录下放置截图后，在此处用 `![截图](images/xxx.png)` 引用。

## 🛠 技术栈

| 类别   | 说明                              |
| ---- | ------------------------------- |
| 扩展规范 | Chrome Manifest V3              |
| 前端   | 原生 HTML / CSS / JavaScript      |
| 存储   | `chrome.storage.local`          |
| 后台   | Service Worker（`background.js`） |
| 数据接口 | 高德天气 API · 必应壁纸 · 一言 API        |

## 📦 安装（开发者模式加载）

1. 克隆或下载本仓库：
   ```bash
   git clone https://github.com/itcwc/new-tab.git
   ```
2. 打开 Chrome，进入 `chrome://extensions/`。
3. 右上角开启 **开发者模式（Developer mode）**。
4. 点击 **加载已解压的扩展程序（Load unpacked）**，选择仓库根目录。
5. 打开新标签页即可看到效果。

## ⚙️ 配置

天气功能依赖高德地图开放平台 API Key：

1. 前往 [高德开放平台](https://lbs.amap.com/) 申请「Web 服务」类型的 Key。
2. 打开 `background.js`，替换：
   ```js
   const apiKey = "你的API Key";   // 替换为高德 Key
   const city   = "610000";        // 替换为你的城市 adcode（如北京 110000）
   ```
3. 在扩展管理页刷新本扩展后生效。

> 💡 必应壁纸与每日一言无需配置，开箱即用。

## 📚 配套教程

本仓库对应掘金专栏 **《谷歌浏览器插件开发系列》**，从零讲解 Chrome 扩展的结构、Manifest V3、Service Worker、消息通信与 UI 开发：  
👉 <https://juejin.cn/column/7473799336674869260>

## 📄 许可证

[MIT](LICENSE) — 自由使用、修改与分发。
