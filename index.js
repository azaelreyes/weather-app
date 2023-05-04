const main = document.getElementById('main');
const tempImg = document.getElementById('tempImg');
const cityname = document.getElementById('cityname');
const dateTime = document.getElementById('dateTime');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition')
const feelsLike = document.getElementById('feelsLike')
const wind = document.getElementById('wind')
const humidity = document.getElementById('humidity')
const uvIndex = document.getElementById('uvIndex')
const cloudiness = document.getElementById('cloudiness')
const visibility = document.getElementById('visibility')
const chanceOfRain = document.getElementById('chanceOfRain')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
}
const loadingScreen =  document.getElementById('loading-screen')
//node objects
const forecastWeekday = document.querySelectorAll('.forecastWeekday')
const forecastDayTemp = document.querySelectorAll('.forecast-day-temp')
const forcastNightTemp = document.querySelectorAll('.forcast-night-temp')
const tableChanceOfRain = document.querySelectorAll('.table-chance-of-rain')
const forecastWind = document.querySelectorAll('.forecast-day-wind')
const forecastDayImg = document.querySelectorAll('.forecast-day-img')

async function getWeather(city){
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=73ab6e334e1f4e74bf1225335230105&q=${city}&days=7&aqi=no&alerts=no`);
    const weather = await response.json();

    //Everything Below Here is filling out the HTML
    cityname.innerHTML=`${weather.location.name}, ${weather.location.region}`;
    dateTime.innerHTML=`${new Date().toLocaleString('en-US',options).replace(/^0/, '')}`
    temp.innerHTML=`${Math.round(weather.current.temp_f)}°F`;
    condition.innerHTML = `${weather.current.condition.text}`
    feelsLike.innerHTML = `Feels Like ${Math.round(weather.current.feelslike_f)}°F`
    wind.innerHTML=`${weather.current.wind_mph} mph`;
    humidity.innerHTML=`${weather.current.humidity}%`;
    uvIndex.innerHTML=`${weather.current.uv}`;
    cloudiness.innerHTML=`${weather.current.cloud}%`
    visibility.innerHTML=`${weather.current.vis_miles}mph`;
    chanceOfRain.innerHTML =`${weather.forecast.forecastday[0].day.daily_chance_of_rain}%`
    sunrise.innerHTML=`${weather.forecast.forecastday[0].astro.sunrise.toLocaleString('en-US', options).replace(/^0/, '')}`
    sunset.innerHTML=`${weather.forecast.forecastday[0].astro.sunset.toLocaleString('en-US', options).replace(/^0/, '')}`
    tempImg.src = `./weather/day/${weather.current.condition.icon.split('/').pop()}`
    
    forecastWeekday.forEach((day, i)=>{
        const d = new Date(weather.forecast.forecastday[i+1].date);
        d.setDate(d.getDate() + 1);
        day.innerHTML = d.toLocaleString('en-US', {weekday: 'long'});
    });
    forecastDayTemp.forEach((temp,i)=>{
        temp.innerHTML = `${Math.round(weather.forecast.forecastday[i+1].day.maxtemp_f)} °F`
    })
    forcastNightTemp.forEach((temp,i)=>{
        temp.innerHTML = `${Math.round(weather.forecast.forecastday[i+1].day.mintemp_f)} °F`
    })
    tableChanceOfRain.forEach((per,i)=>{
        per.innerHTML = `${weather.forecast.forecastday[i+1].day.daily_chance_of_rain}%`
    })
    forecastWind.forEach((wind, i)=>{
        wind.innerHTML = `${Math.round(weather.forecast.forecastday[i+1].day.maxwind_mph)} mph`
    })
    forecastDayImg.forEach((icon,i)=>{
        icon.src=`./weather/day/${weather.forecast.forecastday[i+1].day.condition.icon.split('/').pop()}`
    })

    loadingScreen.style.visibility = 'hidden';
    console.log(weather)
}
getWeather('watsonville');

function newSearch(e){
    e.preventDefault();
    getWeather(e.target.parentNode.parentNode.querySelector("input").value);
    e.target.parentNode.parentNode.querySelector("input").value='';
    loadingScreen.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click',newSearch);