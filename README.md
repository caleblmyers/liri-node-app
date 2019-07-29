# liri-node-app

Caleb Myers

### Overview

This is a command line LIRI program designed to access data from Spotify, BandsInTown, and IMDb. This allows users to retrieve data from these three sources in one program with easy to use commands.

There are several commands available in the program that users may choose from.

 * `concert-this`
 * `spotify-this-song`
 * `movie-this`
 * `do-what-it-says`

To begin, navigate to your directory containing the program files. You will need three pieces of information to run a command:

 * The file name -- `liri.js`

 * Which command you want to run

 * A term to search for

These three items will allow you to make a command with LIRI. (NOTE: `do-what-it-says` does not require a search term after the command)

### Examples

Making a search to BandsInTown for Red Hot Chili Peppers

 * `node liri.js concert-this Red Hot Chili Peppers`

![concert-this working](./images/concert-working)

Making a search to Spotify for the song "Wish You Were Here"

 * `node liri.js spotify-this-song Wish You Were Here`

Making a search to IMDb for The Goonies

 * `node liri.js movie-this The Goonies`

Running the command listed in `random.txt`

 * `node do-what-it-says`

### Details

Tech

Process