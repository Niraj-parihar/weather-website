/* This code is a JavaScript module that exports a function called `forcast`. */
const request = require("request");

const forcast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b73f002ded61443b0b499733c4a92b69&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degress out. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forcast;
