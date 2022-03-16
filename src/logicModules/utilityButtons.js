/* eslint-disable no-alert */
/* eslint-disable no-undef */
import { getData } from './getData.js';
const searchButton = () => {
    $('#search-city-button').on('click', () => {
        const city = $('#search-city-input').val();
        if (city === '') {
            alert('Please enter a city !');
        } else {
            getData.getCityData(city);
            getData.dayFiller(city);
        }
    });
    $('#search-city-input').keyup((event) => {
        if (event.keyCode === 13) {
            const city = $('#cities > input').val();
            if ( city === '') {
                alert('Please enter a city !');
            } else {
                getData.getCityData(city);
                getData.dayFiller(city);
            }
        }
    });
};
const hideShowFn = () => {
    $('#hideshow').on('click', getData.MoreLess);
};
const homeButton = () => {
    $('#Home').on('click', () => {
        checkFavCity();
    });
};
const geoFindMe = () => {
    const success =(position)=>{
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getData.getCityDataCoords(latitude, longitude);
    };

    const error =() => {
        status.textContent = 'Unable to retrieve your location';
    };

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        // status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
};

const getLocation = () => {
    $('#get-location').on('click', () => geoFindMe() );
};
const checkFavCity = () => {
    if (localStorage.getItem('favCity')) {
        // call  function to display the weather with favCity as parameter
        const savedFavCity = localStorage.getItem('favCity');
        getData.getCityData(savedFavCity);
        getData.dayFiller(savedFavCity);
    } else if (!localStorage.getItem('favCity')) {
        getData.getCityData('Sofia');
        getData.dayFiller('Sofia');
    }
};

const favCityFunctions = () => {
    const onLoadFav = () => {
        if (localStorage.getItem('favCity')) {
            const savedFavCity = localStorage.getItem('favCity');
            getData.getCityData(savedFavCity);
            getData.dayFiller(savedFavCity);
            $('#fav-icon').toggleClass('fas');
        } else {
            getData.getCityData('Sofia');
            getData.dayFiller('Sofia');
        }
    };
    onLoadFav();

    const removeFavCity = () => {
        localStorage.removeItem('favCity');
    };

    const addFavCity = (city) => {
        if (typeof(Storage) !== 'undefined') {
            // Store the favourite city in localStorage
            localStorage.setItem('favCity', city);
        } else {
            // eslint-disable-next-line no-alert
            alert('Sorry, your browser does not support Web Storage...');
        }
    };
    const addRemoveFavCity = () => {
        $('#fav-icon').on('click', () => {
            if ($('#fav-icon').hasClass('fas')) {
                removeFavCity();
                $('#fav-icon').toggleClass('fas');
                return;
            }

            $('#fav-icon').toggleClass('fas');
            const favCity = $('#current-city-name').html();
            addFavCity(favCity);
        });
    };
    addRemoveFavCity();
};

const favCityOnLoadCheck = (data) => {
    const displayedCity = data.name;
    if (displayedCity !== localStorage.getItem('favCity')
     && $('#fav-icon').hasClass('fas')) {
        $('#fav-icon').toggleClass('fas');
    } else if (displayedCity === localStorage.getItem('favCity')
     && $('#fav-icon').hasClass('far')
      && localStorage.getItem('searchedCity') !== displayedCity) {
        $('#fav-icon').toggleClass('fas');
    }
    localStorage.setItem('searchedCity', data.name);
};


export {
    getLocation,
    favCityFunctions,
    favCityOnLoadCheck,
    checkFavCity,
    searchButton,
    hideShowFn,
    homeButton,
};

