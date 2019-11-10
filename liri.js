require('dotenv').config()
var keys = require('./keys')
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var searchTerm = process.argv.splice(3).join(" ");

RunLiri(command, searchTerm);

function RunLiri(func, find){
    if(func === "spotify-this-song"){
        return SearchSpotify(find)
    }
}

function SearchSpotify(query){
    spotify.search({ type: 'track', query }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        console.log(data.tracks.items[0].artists[0].name); 
    });
}

function SearchOmdb(query){
    
}