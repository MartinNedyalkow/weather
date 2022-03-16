/* eslint-disable no-undef */
import { switchPic } from './picSwitcher.js';
import { getData } from './getData.js';
const renderCity = (data) => {
    const skyConditionData = data.weather[0].id;
    const temperature = Math.round(data.main.temp);
    $('#current-city-name').html(data.name);
    $('#current-city-temp').html(`${temperature} °`);
    switchPic.changePic(skyConditionData);
};
const renderCityCoords = (data) => {
    const skyConditionData = data.weather[0].id;
    const temperature = Math.round(data.main.temp);
    $('#current-city-name').html(data.name);
    $('#current-city-temp').html(`${temperature} °`);
    getData.dayFiller(data.name);
    switchPic.changePic(skyConditionData);
};

export const render = {
    renderCity,
    renderCityCoords,
};
