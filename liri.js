require("dotenv").config()

var keys = require("./keys.js")

var Spotify = require("node-spotify-api")

var spotify = new Spotify(keys.spotify)

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
        });
}

switch (process.argv[2]) {
    case "spotify-this-song":
        spotifySearch(process.argv[3])
        break;
    default:
        console.log("Not a recognized command")
}
