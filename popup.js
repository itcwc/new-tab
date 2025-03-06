document.getElementById("openNewTab").addEventListener("click", function() {
    chrome.tabs.create({ url: "newtab.html" });  // 打开新标签页
});

// document.getElementById("settings").addEventListener("click", function() {
//     chrome.runtime.openOptionsPage();  // 打开插件设置页
// });
document.addEventListener("DOMContentLoaded", function () {
    const toggleNewTab = document.getElementById("toggleNewTab");

    // 获取存储的状态
    chrome.storage.sync.get("enableNewTab", function (data) {
        toggleNewTab.checked = data.enableNewTab ?? true; // 默认启用
    });

    // 监听用户开关
    toggleNewTab.addEventListener("change", function () {
        chrome.storage.sync.set({ enableNewTab: toggleNewTab.checked }, function () {
            alert("设置已保存！");
        });
    });
});