const request = require("request");

// Geocoding
// Address -> Lat/Long -> Weather
//request function is going to have 2 argu.
//in request modules'response (json) automatically parse JSON responses for us, set json to true.
//encodeURIComponent()- its going to covert special char. into string

const geocode = (Address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(Address) +
    "%.json?access_token=pk.eyJ1IjoibmlyYWotcGFyaTEyMyIsImEiOiJjbGl1MDBsejkwdHBjM25vN2V3NXE2dTVsIn0.PklxOzY3lWAVXZfUfg4FrA&limit=1";
  request({ url, json: true }, (error, response) => {
    //connectivtity problem - low level os error
    if (error) {
      callback("Unable to connect location services!", undefined);
    }
    //when location is bad.
    else if (response.body.error) {
      callback("Unable to find location. Try another search", undefined);
    }
    //when we are having actual response.
    else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
