require("dotenv").config();
const fs = require("fs");
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
const axios = require("axios");

var command = process.argv[2];
var searchTerm = process.argv.splice(3).join(" ");

RunLiri(command, searchTerm);
//look here for the command to run the app//
function RunLiri(func, find) {
  switch (func) {
    case "spotify-this-song":
      return SearchSpotify(find);
    case "movie-this":
      return SearchOmdb(find);
    case "do-what-it-says":
      return doIt();
  }

  //   if (func === "spotify-this-song") {
  //     return SearchSpotify(find);
  //   }
  //   if (func === "movie-this") {
  //     return SearchOmdb(find);
  //   }
}

function doIt() {
  fs.readFile("random.txt", "utf8", function(err, text) {
    if (err) throw err;

    var randomArr = text.split(",");
    console.log(randomArr);

    for(var i = 0; i < randomArr.length; i++){
        if(i % 2 === 0){
            RunLiri(randomArr[i], randomArr[i+1])
        }
    }
    // RunLiri(randomArr[0], randomArr[1])
    // RunLiri(randomArr[2], randomArr[3])
  });
}

function SearchSpotify(query) {
  spotify.search({ type: "track", query }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    console.log(data.tracks.items[0].artists[0].name);
  });
}

// function SearchOmdb(query){
//     var urlHit =  "http://www.omdbapi.com/?t=" + query + "&y=&plot=full&tomatoes=true&apikey=" + keys.omdb.api_key;

//     axios.get(urlHit)
//         .then(function(response){
//             console.log(response.data.Title)
//              db.movies.create(response.data)
//                 .then(function(dbRes){
//                     console.log(dbRes)
//                 })
//                 .catch(function(err){
//                     console.log(err)
//                 })
//         })
//         .catch(function(err){
//             console.log(err)
//         })
// }

async function SearchOmdb(query) {
  var urlHit =
    "http://www.omdbapi.com/?t=" +
    query +
    "&y=&plot=full&tomatoes=true&apikey=" +
    keys.omdb.api_key;

  try {
    var response = await axios.get(urlHit);

    console.log(response.data.Title);
  } catch (error) {
    console.log(error.message);
  }
}
