var fs = require('fs');
require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');

// console.log('keys are:::::: ', keys);

// var twitterApiKey = twitterKeys.consumer_key;
// var twitterAppSecret = twitterKeys.consumer_secret;
// var twitterAccessTokenKey = twitterKeys.access_token_key;
// var twitterAccessTokenSecret = twitterKeys.access_token_secret;

var userInput = process.argv[3];
var userCommand = process.argv[2];

console.log("*******************",userCommand,"*******************", userInput,"*******************")

var spotify = new Spotify(keys.spotifyKeys);

var twitter = new Twitter(keys.twitterKeys);

switch(userCommand){
    case 'my-tweets':
        tweets();
        return;
    case 'spotify-this-song':
        spotifyIt();
        return;
    case 'movie-this':
        movieIt();
        return;
    case 'do-what-it-says':
        doWhatItSays();
        return;
    default:
        console.log('Can\'t recognize your command');
        break;
}

function tweets(){
    //This will show your last 20 tweets and when they were created at in your terminal/bash window;
    console.log("tweeting")
    twitter.get('statuses/user_timeline', {screen_name:"cnn",rejectUnauthorized:false}, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
        console.log(error);
        console.log(response)
    });
//     twitter.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
//         // console.log(tweets);
//     });
}

function spotifyIt(){
    console.log('spotifying')
    //This will show the following information about the song in your terminal/bash window
    //  * Artist(s)
    //  * The song's name
    //  * A preview link of the song from Spotify
    //  * The album that the song is from;
    // If no song is provided then your program will default to "The Sign" by Ace of Base.
    spotify.search({ 
        type: 'track', 
        query: userInput 
    }).then(function(response) {
        console.log('************** album.name:')
        console.log(response.tracks.items[0].album.name);
        console.log('************** artists:')
        // for name/s return every NAME in array. for each in array  
        console.log(response.tracks.items[0].artists);
        console.log('************** name:')
        console.log(response.tracks.items[0].name);
        console.log('************** link:')
        console.log(response.tracks.items[0].preview_url);
        // if ==null then 
        console.log('************ if tat link is null:')
        console.log(response.tracks.items[0].external_urls.spotify);
        console.log('************* FULL RESPONSE:')
        console.log(response.tracks.items[0]);
    }).catch(function(err) {
        console.log(err);
    });
}

function movieIt(){
    //This will output the following information to your terminal/bash window:
    //      * Title of the movie.
    //      * Year the movie came out.
    //      * IMDB Rating of the movie.
    //      * Rotten Tomatoes Rating of the movie.
    //      * Country where the movie was produced.
    //      * Language of the movie.
    //      * Plot of the movie.
    //      * Actors in the movie.
    //  * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    request("http://www.omdbapi.com/?t="+userInput+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body));
        }
    });
}

function doWhatItSays(){
    //code;
    // * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    //  * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
    //  * Feel free to change the text in that document to test out the feature for other commands.
}


//BONUS

//In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

//Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.

