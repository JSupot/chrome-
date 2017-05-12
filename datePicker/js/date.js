(function() {

  function getMonthData(year, month) {
    var currentData = [];
    var preData = [];
    var nextData = [];
    var today = new Date();
    var year = year || today.getFullYear();
    var month = month || (today.getMonth() + 1);
    var firstDay = new Date(year, month - 1, 1);  //当月的第一天
    var lastDay = new Date(year, month, 0);  //当月的最后一天
    var lastDate = lastDay.getDate();
    var firstDate = 1;
    var firstWeekDay = firstDay.getDay();
    var preMonthLastDay = new Date(year, month - 1, 0);
    var preMonthLastDate = preMonthLastDay.getDate();
    var preMonthDayLength = firstWeekDay - 1;

    firstWeekDay = firstWeekDay === 0 ? 7 : firstWeekDay;

    for (var i = 0; i < lastDate ; i++) {
      currentData.push(i+1);
    }

    for (var i = 0; i < preMonthDayLength; i++) {
      preData.unshift(preMonthLastDate - i);
    }
    var len = 42 - currentData.length - preData.length;

    for (var i = 0; i < len; i++) {
      nextData.push(i + 1);
    }

    var data = {
      year: year,
      month: month,
      currentData: currentData,
      preData: preData,
      nextData: nextData
    };
    return data;
  };

  function showDate(data) {
    var str = '';
    var html = '';
    var tbody = document.querySelector('.ry-datepicker-body tbody');
    var current = document.querySelector('.ry-datepicker-cunrent');
    var nowDate = getNowDate();

    data.preData.forEach(function(value) {
      str += '<td class="ry-datepicker-pre">' + value + '</td>';
    });

    data.currentData.forEach(function(value) {
      if (data.year == nowDate.nowYear && data.month == nowDate.nowMonth && value == nowDate.date) {
        str += '<td class="ry-datepicker-cur ry-datepicker-today">' + value + '</td>';
      } else {
        str += '<td class="ry-datepicker-cur">' + value + '</td>';
      }
    });

    data.nextData.forEach(function(value) {
      str += '<td class="ry-datepicker-pre">' + value + '</td>';
    });

    var trList = str.match(/<td.*?<\/td>/g);
    for (var i = 0; i < 6; i++) {
      html += '<tr>'
      trList.forEach(function(value, index) {
          if (Math.floor(index / 7) === i) {
            html += value;
          }
      });
      html += '</tr>';
    }

    tbody.innerHTML = html;
    current.innerHTML = data.year + '-' + data.month;
  }

  function preDate(year, month) {
    var year = Number(year);
    var month = Number(month);
    if (month === 1) {
      year = year - 1;
      month = 12;
    } else {
      month = month - 1;
    }

    return {
      year: year,
      month: month
    };
  }

  function nextDate(year, month) {
    var year = Number(year);
    var month = Number(month);
    if (month === 12) {
      year = year + 1;
      month = 1;
    } else {
      month = month + 1;
    }

    return {
      year: year,
      month: month
    };
  }

  function getNowDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    return {nowYear: year, nowMonth: month, date: date};
  }

  window.datePicker = {
    getMonthData: getMonthData,
    showDate: showDate,
    nextDate: nextDate,
    preDate: preDate
  };


})();

var preBtn = document.querySelector('.ry-datepicker-btn-prev');
      var nextBtn = document.querySelector('.ry-datepicker-btn-next');
      
      
      preBtn.addEventListener('click', function() {
        var currentDate = getCurrentDate();
        var preDate = datePicker.preDate(currentDate.currentYear, currentDate.currentMonth);
        init(preDate.year, preDate.month);
      });

      nextBtn.addEventListener('click', function() {
        var currentDate = getCurrentDate();
        var nextDate = datePicker.nextDate(currentDate.currentYear, currentDate.currentMonth);
        init(nextDate.year, nextDate.month);
      });

      function init(year, month) {
        var monthData = datePicker.getMonthData(year, month);
        datePicker.showDate(monthData);
      }

      function getCurrentDate() {
        var current = document.querySelector('.ry-datepicker-cunrent');
        var currentDate = current.innerHTML.split('-')
        var currentYear = currentDate[0];
        var currentMonth = currentDate[1];
        return {currentYear: currentYear, currentMonth: currentMonth};
      }

      init();