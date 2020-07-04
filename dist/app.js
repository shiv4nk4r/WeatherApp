window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescription = document.querySelector(".temp-desc-text");
  let tempDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let humidtySection = document.querySelector(".humidity strong");
  let feelsSection = document.querySelector(".feels-like span");
  let iconSection = document.querySelector(".icon");

  const temperatureSpan = document.querySelector(".degree-section span");
  const temperatureSection = document.querySelector(".degree-section");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `http://api.weatherstack.com/current?access_key=117ebbf151010bd5bf793bdb46e6c4f3&query=${lat},${long}`;
      const apiRequest = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=61a02e080ec74e998b12154b8fda95c4`;
      fetch(apiRequest)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.data[0]);
          const { icon } = data.data[0].weather;
          console.log(icon);
          let iconUrl = ` https://www.weatherbit.io/static/img/icons/${icon}.png`;
          var image = document.createElement("IMG", iconUrl);
          image.setAttribute("src", iconUrl);
          iconSection.appendChild(image);
        });
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const {
            temperature,
            weather_descriptions,
            humidity,
            is_day,
            feelslike,
          } = data.current;
          const { timezone_id, region } = data.location;
          //Set DOM Elements for the API
          tempDegree.textContent = Math.floor(temperature);
          tempDescription.textContent = weather_descriptions[0];
          locationTimezone.textContent = region;
          humidtySection.textContent = humidity;
          feelsSection.textContent = feelslike + " C";
          //Formulae for fahrenheit
          let Fahrenheit = (temperature / 5) * 9 + 32;
          let feelFarenh = (feelslike / 5) * 9 + 32;
          //Change temp to C and F
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              feelsSection.textContent = Math.floor(feelslike) + " C";

              tempDegree.textContent = Math.floor(temperature);
            } else {
              temperatureSpan.textContent = "F";
              tempDegree.textContent = Math.floor(Fahrenheit);
              feelsSection.textContent = Math.floor(feelFarenh) + " F";
            }
          });
        });
    });
  }
});
