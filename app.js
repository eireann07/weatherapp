const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
  });

 app.post("/", function(req, res){
   const query = req.body.cityName;
   const apiKey = "314b206eae5de154570762d17da7cb26";
   const units = "metric";
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

   https.get(url, function(response){
     console.log(response.statusCode);

     response.on("data", function(data){
       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const description = weatherData.weather[0].description;
       const feelsLike = weatherData.main.feels_like;
       const high = weatherData.main.temp_max;
       const low = weatherData.main.temp_min;
       const icon = weatherData.weather[0].icon;
       const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
       res.write("<h1>The temperature in " + query+ " is currently " + temp + " degrees Celcius.</h1>");
       res.write("<h2> though it feels like " + feelsLike + " degrees Celcius. </h2>");
       res.write("<h3>It is currently " + description + " in "+  query + ".</h3>");
       res.write("<h3>The high will be " + high + " and the low will be " + low +".</h3>");
       res.write("<img src =" + imageURL + ">");
       res.send();
  });
});
});






app.listen(8080, function(){

});
