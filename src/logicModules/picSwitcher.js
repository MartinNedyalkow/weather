/* eslint-disable max-len */
/* eslint-disable no-undef */
const currentTime = new Date().getHours();
const changePic = (skyConditionData) => {
    // weather is rainy
    if (skyConditionData < 600 && currentTime <= 19) {
        $('#current-city-icon').attr('src', './src/pics/animatedWeather/rainy-7.svg');
        $('html').css('background-image', 'url(./src/pics/rainbackground.jpg)');
    // weather is snowy
    } else if (skyConditionData > 600 && skyConditionData < 800 && currentTime <= 19) {
        $('#current-city-icon').attr('src', './src/pics/animatedWeather/snowy-6.svg');
        $('html').css('background-image', 'url(./src/pics/snowbackground.jpg)');
    // weather is sunny or its nightTime
    } else if (skyConditionData === 800) {
        if (currentTime >= 19) {
            $('#current-city-icon').attr('src', './src/pics/animatedWeather/night.svg');
            $('html').css('background-image', 'url(./src/pics/nightbackground.jpg)');
        } else {
            $('#current-city-icon').attr('src', './src/pics/animatedWeather/day.svg');
            $('html').css('background-image', 'url(./src/pics/sunbackground.jpg)');
        }
    // cloudy weather
    } else if (skyConditionData > 800 && currentTime <= 19) {
        $('#current-city-icon').attr('src', './src/pics/animatedWeather/cloudy-day-2.svg');
        $('html').css('background-image', 'url(./src/pics/cloudybackground.jpg)');
    } else {
        $('#current-city-icon').attr('src', './src/pics/animatedWeather/night.svg');
        $('html').css('background-image', 'url(./src/pics/nightbackground.jpg)');
    }
};

const changeBottomPics = (skyConditionData, iconId) => {
    // weather is rainy
    if (skyConditionData < 600) {
        $(`${iconId}`).attr('src', './src/pics/animatedWeather/rainy-7.svg');
    // weather is snowy
    } else if (skyConditionData > 600 && skyConditionData < 800) {
        $(`${iconId}`).attr('src', './src/pics/animatedWeather/snowy-6.svg');
        // weather is sunny or its nightTime
    } else if (skyConditionData === 800) {
        $(`${iconId}`).attr('src', './src/pics/animatedWeather/day.svg');
    // cloudy weather
    } else {
        $(`${iconId}`).attr('src', './src/pics/animatedWeather/cloudy-day-2.svg');
    }
};

export const switchPic = {
    changePic,
    changeBottomPics,
};