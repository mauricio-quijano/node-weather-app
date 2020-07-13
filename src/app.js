const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

// Address pages to views
app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Mauricio Quijano",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Mauricio Quijano",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Mauricio Quijano",
        message: "This is the message for helping people",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address.",
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address,
            });
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help",
        name: "Mauricio Quijano",
        errorMessage: "Help article not found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "Not found",
        name: "Mauricio Quijano",
        errorMessage: "Page not found",
    });
});

app.listen(port, () => console.log(`Server is up on port ${port}`));
