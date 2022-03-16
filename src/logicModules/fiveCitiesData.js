/* eslint-disable no-undef */
import { getData } from './getData.js';


const fiveCitiesButtonHandler = () => {
    $('#sofia').on('click', () => {
        const city = 'Sofia';
        getData.getCityData(city);
        getData.dayFiller(city);
    });

    $('#rome').on('click', () => {
        const city = 'Rome,ita';
        getData.getCityData(city);
        getData.dayFiller(city);
    });

    $('#london').on('click', () => {
        const city = 'London';
        getData.getCityData(city);
        getData.dayFiller(city);
    });

    $('#paris').on('click', () => {
        const city = 'Paris';
        getData.getCityData(city);
        getData.dayFiller(city);
    });

    $('#madrid').on('click', () => {
        const city = 'Madrid';
        getData.getCityData(city);
        getData.dayFiller(city);
    });
};

export {
    fiveCitiesButtonHandler,
};
