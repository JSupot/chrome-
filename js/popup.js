function httpRequest(url, callback, value) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText, value);
        }
    };

    xhr.send(null);
}

function showWeatherTable(data, value) {
    data = JSON.parse(data);
    console.log('data: ', data.HeWeather5);


    if (data.HeWeather5) {
        var detail = data.HeWeather5[0];
        if (detail.status == 'ok') {
            if (detail.basic) {
                var city = detail.basic.city;
                var country = detail.basic.cnty;
                document.getElementById('title').innerHTML = country + ' - ' + city;
            }

            if (detail.daily_forecast) {
                var dailyForecast = detail.daily_forecast;
                var html = '<tr><th>日期</th><th>天气</th><th>最低温度</th><th>最高温度</th></tr>';
                dailyForecast.forEach(function(value, index) {
                    html += '<tr>'
                        +      '<td>' + value.date + '</td>'
                        +      '<td>' + value.cond.txt_d + '</td>'
                        +      '<td>' + value.tmp.min + '</td>'
                        +      '<td>' + value.tmp.max + '</td>'
                        +  '</tr>'
                });

                document.getElementById('weather-table').innerHTML = html;
                localStorage.city = value;
            }
        } else {
            document.getElementById('errstr').innerHTML = '请输入有效城市';
        }

    } else {
        document.getElementById('errstr').innerHTML = '获取数据出错';
    }

}

function getURl(city) {
    return 'https://free-api.heweather.com/v5/forecast?city=' + city + '&key=a3bf66826d024937b1068bf7ef21c09c';
}

var city = localStorage.city || 'hangzhou';
var input = document.getElementById('city');
var btn = document.getElementById('save');
var errstr = document.getElementById('errstr');
input.value = city;

var url = getURl(city);

httpRequest(url, showWeatherTable, city);


btn.addEventListener('click', function() {
    var value = input.value;
    errstr.innerHTML = '';

    if (value) {
        value = value.trim();
        if (value) {
            // localStorage.city = value;
            var url = getURl(value);
            httpRequest(url, showWeatherTable, value);
        } else {
            errstr.innerHTML = '请输入有效城市';
        }
        
    } else {
        errstr.innerHTML = '请输入有效城市';
    }
});