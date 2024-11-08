const API_KEY =  `d25d1f7923cc0cf67d4a0d48c27447c7` 
const form = document.querySelector("form")
const search = document.querySelector("#search")
const weather = document.querySelector("#weather") 
const getWeather = async(city) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json()
    // console.log(data);
    // console.log(data.main.humidity);
    return showWeather(data)
}

const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h2> Location Not Found <h2>`
        return;
    }
    weather.innerHTML =  
        `<div class = "subbox">
                <div>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                </div>
                <div>
                    <h2>${Math.round(data.main.temp)} ℃</h2>
                    <h4> ${data.weather[0].main} </h4>  
                    <h4>Feels like ${Math.round(data.main.feels_like)} ℃</h4>
                </div>
            </div>
            <div class="subbox">
                <span><img id="pressure" src="img/humidity.png" alt="">
                    <h6>Humidity</h6>
                    ${data.main.humidity}%
                </span>
                <span><img id="pressure" src="img/water.png" alt=""><h6>Pressure</h6> ${data.main.pressure}hPa</span>
            </div> 
            <div class="subbox">
                <span><img id="pressure" src="img/sunrise.png" alt=""><h6>Sunrise</h6>${gettime(data.sys.sunrise)} AM</span>
                <span><img id="pressure" src="img/sunset.png" alt=""><h6>Sunset</h6>${gettime(data.sys.sunset)}PM</span>
            </div> 
            <div class="subbox">
                <span><img id="pressure" src="img/visibility.png" alt=""><h6>Visibility</h6>${(data.visibility)/1000}km</span>
                <span><img id="pressure" src="img/windy.png" alt=""><h6>Wind Speed</h6>${Math.round(data.wind.speed)}Km/h</span>
            </div> 
        `
}

form.addEventListener(
    "submit",
    function(event) {
        getWeather(search.value)
        event.preventDefault();
    }
) 

const gettime = (miliseconds)=>{
    const date = new Date(miliseconds);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const time = `${hours}:${minutes}:${seconds}`;
    return time;
} 