let weather = {
  apiKey: "57340a1b2bf0aae8a130d95b59239da8",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp,feels_like, humidity } = data.main;
    const { speed, deg } = data.wind;
    
    if(deg == 0){
      direction = "North";
    } else if(0<=deg && deg<=90){
        direction = "North-East";
    } else if(deg == 90){
        direction = "East";
    } else if(90 <= deg && deg <=180){
        direction = "South-East";
    } else if (deg == 180) {
        direction = "South";
    } else if(180<= deg && deg <= 270){
        direction = "South-West";
    } else if (deg == 270) {
        direction ="West";
    } else{
        direction = "North-West";
    }
    
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".feels_like").innerText ="Feels like: "+ feels_like + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h | " + deg + " °" +"("+direction+")";
    
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

document.querySelector(".search-button").addEventListener("click", function () {
    weather.search();
    });


    


