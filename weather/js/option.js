
var cityInput = document.getElementById('newCity');
var saveBtn = document.getElementById('saveCity');
var city = localStorage.city || 'hangzhou';
cityInput.value = city;

saveBtn.addEventListener('click', function() {
    if (cityInput.value) {
        localStorage.city = cityInput.value;
    }

    console.log(localStorage.city);
});


