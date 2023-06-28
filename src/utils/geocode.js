/* The code snippet is defining a function called `geocode` that takes in an `address` and a `callback`
function as parameters. */
const request = require("request");

// Geocoding
// Address -> Lat/Long -> Weather
//request function is going to have 2 argu.
//in request modules'response (json) automatically parse JSON responses for us, set json to true.
//encodeURIComponent()- its going to covert special char. into string

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    "%.json?access_token=pk.eyJ1IjoibmlyYWotcGFyaTEyMyIsImEiOiJjbGl1MDBsejkwdHBjM25vN2V3NXE2dTVsIn0.PklxOzY3lWAVXZfUfg4FrA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    //connectivtity problem - low level os error
    if (error) {
      callback("Unable to connect to location services!", undefined);
    }
    //when location is bad.
    else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    }
    //when we are having actual response.
    else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
