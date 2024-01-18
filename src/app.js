const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Define paths for express config
const app = express();
const publicDirectoryApp = path.join(__dirname, "../public"); //generate the path in the public folder
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials"); //partials are used for things you'll use more than once

//set up handlebars engine for dynamic templates, and views locations
app.set("view engine", "hbs"); // you have to set this up exactly so express knows which template engine you're trying to set up
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryApp));
//a way to customize your server, configues our  express app location
//way it works this is the pathh publicDirectory, express go to only this and load the file

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Lara Ishaq",
  }); // render, show a specific view when this path is visited, dynamic
  //first argument is the name of the view to render
  //second argument provided is an object which contains all the values we want that view to be able to access
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "WOW",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP",
    name: "ok",
  });
});

//takes in two arguments, the path and the function that tells you what to do when you reach the path
// function argument req, contains info about the incoming request to the server
// the other argument is the response, this contains a bunch of methods allowing us to customize what we're gonna send back to the requester
// example: for req we can read data rom the database or create some HTML, and the response can send something back after

// app.get("", (req, res) => {
//   res.send("<h2>hello</h2>"); //this will be sent to the person who requested, whether
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Andrew",
//       age: 23,
//     },
//     { name: "Jill", age: 34, location: "Dubai" },
//   ]); //this will be sent to the person who requested, whether
// });

// app.get("/about", (req, res) => {
//   //   const title = "WOW";
//   //   res.send("About Page: " + title);
//   res.send("<title>COOOOOOL</title><h1>wow</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("You must provide an address");
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  //   res.send({
  //     forecast: "Cloudy",
  //     location: "Dublin",
  //     address: req.query.address,
  //   });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send("You must provide a search term");
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//404 Page

app.get("*", (req, res) => {
  res.send("404 Page");
});

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
  console.log("server is running"); //will never show up on the browser
});
