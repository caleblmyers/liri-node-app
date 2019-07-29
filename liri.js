require("dotenv").config()
var fs = require("fs")
var axios = require("axios")
var moment = require("moment")
var keys = require("./keys.js")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify)

function bandsSearch(keyword) {
    axios
        .get("https://rest.bandsintown.com/artists/" + keyword + "/events?app_id=codingbootcamp")
        .then(function (res) {
            console.log("Searching for " + keyword + "...")
            if (Array.isArray(res.data) && res.data.length > 0) {
                for (let i = 0; i < res.data.length; i++) {
                    console.log("===================================")
                    console.log("Event #", (i + 1), "for", keyword)
                    console.log("Venue:", res.data[i].venue.name)
                    console.log("Location:", res.data[i].venue.city, (res.data[i].venue.region || res.data[i].venue.country))
                    console.log("Date:", moment(res.data[i].datetime, "YYYY-MM-DD").format("MM/DD/YYYY"))
                }
            } else {
                console.log("No matches found!")
            }
        })
        .catch(function (err) {
            console.log(err.response.data.message || err.response.data.errorMessage)
        })
}

function spotifySearch(keyword) {
    spotify
        .search({
            type: "track",
            query: keyword || "The Sign Ace of Base",
        })
        .then(function (res) {
            console.log("Searching for " + (keyword || "The Sign by Ace of Base") + "...")
            if (res.tracks.items.length > 0) {
                for (let i = 0; i < res.tracks.items.length; i++) {
                    console.log("===================================")
                    console.log("Track #", (i + 1), "for:", (keyword || "The Sign by Ace of Base"))
    
                    for (let j = 0; j < res.tracks.items[i].artists.length; j++) {
                        console.log("Artist:", res.tracks.items[i].artists[j].name)
                    }
    
                    console.log("Song:", res.tracks.items[i].name)
                    console.log("Link:", (res.tracks.items[i].preview_url || "Unavailable"))
                    console.log("Album:", res.tracks.items[i].album.name)
                }
            } else {
                console.log("No matches found!")
            }
        })
        .catch(function (err) {
            console.log("Error occurred:", err)
        })
}

function omdbSearch(keyword) {
    axios
        .get("http://www.omdbapi.com/?t=" + (keyword || "Mr Nobody") + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log("Searching for " + (keyword || "Mr Nobody") + "...")
            if (response.data.Response === "True") {
                console.log("Movie Title:", response.data.Title)
                console.log("Year Released:", response.data.Year)
                console.log("IMDB Rating:", response.data.imdbRating)

                for (let i = 0; i < response.data.Ratings.length; i++) {
                    if (response.data.Ratings[i].Source === "Rotten Tomatoes") {
                        console.log(response.data.Ratings[i].Source, "Rating:", response.data.Ratings[1].Value)
                    }
                }

                console.log("Produced in:", response.data.Country)
                console.log("Available Language(s):", response.data.Language)
                console.log("Plot Summary:", response.data.Plot)
                console.log("Cast Members:", response.data.Actors)
            } else {
                console.log("No matches found!")
            }
        })
        .catch(function (err) {
            if (err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else if (err.request) {
                console.log(err.request)
            } else {
                console.log("Error: ", err.message)
            }
            console.log(err.config)
        })
}

function randomSearch() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }

        var input = data.split(",")
        processCommand(input[0], input[1])
    })
}

function processCommand(command, input) {
    switch (command) {
        case "concert-this":
            bandsSearch(input)
            break;

        case "spotify-this-song":
            spotifySearch(input)
            break;

        case "movie-this":
            omdbSearch(input)
            break;

        case "do-what-it-says":
            randomSearch()
            break;

        default:
            console.log("Not a recognized command")
    }
}

processCommand(process.argv[2], process.argv.slice(3).join(" "))