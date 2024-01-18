const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=db5d1c12b1789e45c9b0f86fb80c3345&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body } = response) => {
    if (error) {
      callback("Unable to connect to the server!", undefined);
    } else if (body.error) {
      callback("Location not found.", undefined);
    } else {
      callback(
        undefined,
        "It is currently " +
          body.current.temperature +
          " degrees out. There is " +
          body.current.precip +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
