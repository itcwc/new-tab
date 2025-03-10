document.getElementById("openNewTab").addEventListener("click", function () {
    chrome.tabs.create({ url: "newtab.html" });  // 打开新标签页
});

chrome.storage.sync.get(["darkMode"], function (data) {
    toggleDarkMode.checked = data.darkMode ?? false; // 默认关闭黑暗模式
    if (toggleDarkMode.checked) {
        document.body.classList.add("dark-mode");
    }
});

// 监听用户开关（黑暗模式）
toggleDarkMode.addEventListener("change", function () {
    chrome.storage.sync.set({ darkMode: toggleDarkMode.checked }, function () {
        if (toggleDarkMode.checked) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    });
});