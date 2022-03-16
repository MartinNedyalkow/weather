/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import { switchPic } from './picSwitcher.js';
import { render } from './render.js';
import { favCityOnLoadCheck } from './utilityButtons.js';

const getCityData = (cityToDisplay) => {
    $.get(`https:/api.openweathermap.org/data/2.5/weather?q=${cityToDisplay}
           &appid=b5aa9741f34fd7ef2daf3cfe3eb0d2fc&units=metric`, (data) => {
        render.renderCity(data);
    })
        .then( (data) => {
            favCityOnLoadCheck(data);
        });
};
const getCityDataCoords = (lat, lon) => $.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b5aa9741f34fd7ef2daf3cfe3eb0d2fc&units=metric`, (data) => {
    render.renderCityCoords(data);
}).then((data) => {
    favCityOnLoadCheck(data);
});

// eslint-disable-next-line consistent-return
const dayOfTheWeek=(data) => {// Returns Name of day
    switch (new Date(data).getDay()) {
    case 0:
        const sunday = 'Sunday';
        return sunday;
    case 1:
        const monday = 'Monday';
        return monday;
    case 2:
        const tuesday = 'Tuesday';
        return tuesday;
    case 3:
        const wednesday = 'Wednesday';
        return wednesday;
    case 4:
        const thursday = 'Thursday';
        return thursday;
    case 5:
        const friday = 'Friday';
        return friday;
    case 6:
        const saturday = 'Saturday';
        return saturday;
    default:
    }
};

const fiveDayFill=(city, i)=>{// Fills 5 day forcast
    $.getJSON('http://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=b5aa9741f34fd7ef2daf3cfe3eb0d2fc&units=metric',
        // eslint-disable-next-line no-loop-func
        function(data) {
            $(`#Date-day-${i}`).empty().append(
                `${dayOfTheWeek(data.list[i].dt_txt)}
                     ${data.list[i].dt_txt.split(' ')[0].split('-')[2]}`);
            $(`#Temp-day-${i}`).empty().append(
                `${maxtInd(data, i, 'Max')}°
                |${maxtInd(data, i, 'Min')}°`);
            const icon1 = (data.list[i].weather[0].id);
            switchPic.changeBottomPics(icon1, (`#Icon-day-${i}`));
            $(`#Desk-${i}`).empty().append(
                data.list[i].weather[0].description);
            $(`#Wind-${i}`).empty().append(
                `Wind ${maxtInd(data, i, 'Wind')}m/s`);
            $(`#Humidity-${i}`).empty().append(
                `Humidity ${data.list[i].main.humidity}%`);
            $(`#Pressure-${i}`).empty().append(
                `Pressure ${Math.round(data.list[i].main.pressure)}hPa`);
        })
    ;
}
;

const dayFiller=(city)=> {
    [7, 15, 23, 31, 39].map((el)=>{
        fiveDayFill(city, el)
        ;
    })
    ;
};

const MoreLess=()=>{// Toggles hide and show additional information from days
    $('.content').slideToggle('slow');
    if ($('#hideshow').html()==='More') {
        $('#hideshow').html('Less');
    } else {
        $('#hideshow').html('More');
    }
};

// eslint-disable-next-line consistent-return
const maxtInd = (data, i, par)=>{
    // eslint-disable-next-line consistent-return
    const dates=data.list.filter(function(el) {
        if (data.list[i].dt_txt.split(' ')[0].split('-')[2]===el.dt_txt.split(' ')[0].split('-')[2]) {
            return data.list[i].dt_txt.split(' ')[0].split('-')[2]
            ;
        }
    }); if (par==='Max') {
        const tempArr=dates.map(function(el) {
            el=el.main.temp_max;
            return el.toFixed(0);
        });
        // eslint-disable-next-line prefer-spread
        const maxDiference=Math.max.apply(Math, tempArr.map(Number));
        return maxDiference;
    } else if (par==='Min') {
        const tempArr=dates.map(function(el) {
            el=el.main.temp_min;
            return el.toFixed(0);
        });
        // eslint-disable-next-line prefer-spread
        const maxDiference=Math.min.apply(Math, tempArr.map(Number));
        return maxDiference;
    } else if (par === 'Wind') {
        const tempArr=dates.map(function(el) {
            el=el.wind.speed;
            return el.toFixed(1);
        });
        // eslint-disable-next-line prefer-spread
        const maxDiference=Math.max.apply(Math, tempArr.map(Number));
        return maxDiference;
    }
};

export const getData = {
    getCityData,
    getCityDataCoords,
    fiveDayFill,
    MoreLess,
    dayFiller,

};