function updateClock() {
    var date = new Date();

    // 年、月、日
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    // 时、分、秒
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    // 格式化时间为两位数
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    // 获取星期几
    var weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var weekDay = weekDays[date.getDay()];

    // 实时显示
    var element = document.getElementById('time');
    element.innerHTML = hour + ':' + minute + ':' + second;
    
    var dateElement = document.getElementById('date');
    dateElement.innerHTML = year + '年' + month + '月' + day + '日 ' + weekDay;
}

// 每秒更新一次时间
setInterval(updateClock, 1000);

// 初始化显示时间
updateClock();