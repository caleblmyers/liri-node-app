require("dotenv").config()
var axios = require("axios")
var moment = require("moment")
var keys = require("./keys.js")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify)

function bandsSearch(keyword) {
    axios
        .get("https://rest.bandsintown.com/artists/" + keyword + "/events?app_id=codingbootcamp")
        .then(function (response) {
            if (response.data.length > 0) {
                for (let i = 0; i < response.data.length; i++) {
                    console.log("===================================")
                    console.log("Event #", (i + 1), "for", keyword)
                    console.log("Venue:", response.data[i].venue.name)
                    console.log("Location:", response.data[i].venue.city, response.data[i].venue.region)
                    console.log("Date:", moment(response.data[i].datetime, "YYYY-MM-DD").format("MM/DD/YYYY"))
                }
            } else {
                console.log("No matches found!")
            }
        })
}

function spotifySearch(keyword) {
    spotify
        .search({
            type: "track",
            query: keyword || "The Sign Ace of Base",
        })
        .then(function (response) {
            console.log("Artist: " + response.tracks.items[0].artists[0].name)
            console.log("Song: " + response.tracks.items[0].name)
            console.log("Link: " + response.tracks.items[0].preview_url)
            console.log("Album: " + response.tracks.items[0].album.name)
        })
        .catch(function (err) {
            console.log("Error occurred: " + err)
        })
}

function omdbSearch(keyword) {
    axios
        .get("http://www.omdbapi.com/?t=" + (keyword || "Mr Nobody") + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            if (response.data.Response === "True") {
                console.log("Movie Title: " + response.data.Title)
                console.log("Year Released: " + response.data.Year)
                console.log("IMDB Rating: " + response.data.imdbRating)
                console.log(response.data.Ratings[1].Source + " Rating: " + response.data.Ratings[1].Value)
                console.log("Produced in: " + response.data.Country)
                console.log("Available Language(s):  " + response.data.Language)
                console.log("Plot Summary: " + response.data.Plot)
                console.log("Cast Members: " + response.data.Actors)
            } else {
                console.log("No matches found!")
            }
        })
        .catch(function (err) {
            if (err.response) {
                console.log("---------------Data---------------")
                console.log(err.response.data)
                console.log("---------------Status---------------")
                console.log(err.response.status)
                console.log("---------------Status---------------")
                console.log(err.response.headers)
            } else if (err.request) {
                console.log(err.request)
            } else {
                console.log("Error: ", err.message)
            }
            console.log(err.config)
        })
}

switch (process.argv[2]) {
    case "concert-this":
        bandsSearch(process.argv[3])
        break;

    case "spotify-this-song":
        spotifySearch(process.argv[3])
        break;

    case "movie-this":
        omdbSearch(process.argv[3])
        break;

    default:
        console.log("Not a recognized command")
}
