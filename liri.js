var fs = require('fs');
require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');

var userInput = process.argv[3];
var userCommand = process.argv[2];
var spotify = new Spotify(keys.spotifyKeys);
var twitter = new Twitter(keys.twitterKeys);
var output = '';
whichCommand(userCommand);

function whichCommand(userCommand){
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
}

function tweets(){
    //This will show your last 20 tweets and when they were created at in your terminal/bash window;
    twitter.get('statuses/user_timeline', {screen_name:"meandjs",limit:20,rejectUnauthorized:false}, function(error, tweets, response) {
        if (error) {
            console.log(error);
            return;
        }
        let i = 1;
        output += "Executing command " + userCommand + "\n";
        tweets.forEach(function(tweet){
            output += "Tweet #"+i+":"+tweet.text+"\n";
            i++;
        })
        console.log(output);
        saveToLog(output);
        signIt();
    });
}

function spotifyIt(){
    //This will show the following information about the song in your terminal/bash window
    //  * Artist(s)
    //  * The song's name
    //  * A preview link of the song from Spotify
    //  * The album that the song is from;
    // If no song is provided then your program will default to "The Sign" by Ace of Base.
    if(!userInput){
        userInput = 'The Sign Ace of Base';
    }
    output += "Executing command " + userCommand + " for " + userInput + "\n";
    spotify.search({ 
        type: 'track', 
        query: userInput 
    }).then(function(response) {
        output += '______________________________________ \nSONG NAME:\n';
        output += ' > ' + response.tracks.items[0].name + '\n';
        output += '______________________________________ \nALBUM NAME:\n';
        output += ' > ' + response.tracks.items[0].album.name + '\n';
        if(response.tracks.items[0].artists.length>1){
            output += '______________________________________ \nARTISTS:\n';
        }
        else{
            output += '______________________________________ \nARTIST:\n';
        }
        // for name/s return every NAME in array. for each in array  
        response.tracks.items[0].artists.forEach(function(artist){
            output += ' > ' + artist.name + '\n';
        })
        if(response.tracks.items[0].preview_url){
            output += '______________________________________ \nPREVIEW LINK:\n';
            output += ' > ' + response.tracks.items[0].preview_url + '\n';
        }
        // in case no preview link 
        output += '______________________________________ \nOPEN SONG:\n';
        output += ' > ' + response.tracks.items[0].external_urls.spotify + '\n';
        console.log(output);
        saveToLog(output);
        signIt();
    }).catch(function(err) {
        console.log(err);
    });
}

function movieIt(){
    //"movie-this" will output the following information to your terminal/bash window:
    //      * Title of the movie.
    //      * Year the movie came out.
    //      * IMDB Rating of the movie.
    //      * Rotten Tomatoes Rating of the movie.
    //      * Country where the movie was produced.
    //      * Language of the movie.
    //      * Plot of the movie.
    //      * Actors in the movie.
    //  * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if(!userInput){
        userInput = 'Mr. Nobody';
    }
    output += "Executing command " + userCommand + " for " + userInput + "\n";
    request("http://www.omdbapi.com/?t="+userInput+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log(JSON.parse(body));
            output += '______________________________________ \nMOVIE NAME:\n';
            output += ' > ' + JSON.parse(body).Title + '\n';
            output += '______________________________________ \nMOVIE YEAR:\n';
            output += ' > ' + JSON.parse(body).Year + '\n';
            output += '______________________________________ \nIMDB RATING:\n';
            var ratingImdb = JSON.parse(body).Ratings.filter(function (element) { 
                return element.Source === 'Internet Movie Database';
            });
            output += ratingImdb[0].Value + '\n';
            output += '______________________________________ \nROTTEN TOMATOES RATING:\n';
            var ratingImdb = JSON.parse(body).Ratings.filter(function (element) { 
                return element.Source === 'Rotten Tomatoes';
            });
            output += ratingImdb[0].Value + '\n';
            output += '______________________________________ \nCOUNTRY:\n';
            output += ' > ' + JSON.parse(body).Country + '\n';
            output += '______________________________________ \nLANGUAGE:\n';
            output += ' > ' + JSON.parse(body).Language + '\n';
            output += '______________________________________ \nPLOT:\n';
            output += ' > ' + JSON.parse(body).Plot + '\n';
            output += '______________________________________ \nACTORS:\n';
            output += ' > ' + JSON.parse(body).Actors + '\n';
            console.log(output);
            saveToLog(output);
            signIt();
        }
    });
}

function doWhatItSays(){
    // * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    fs.readFile('./random.txt', 'utf8', function(error, data){
        if(error){
            return console.log(error);
        }
        data = data.split(',');
        userCommand = data[0];
        userInput = data[1];
        whichCommand(userCommand);
    });
}

function signIt(){
    console.log(' -------------------------------------------------- \n|                                                  |\n|        Thank you for using this magic app        |\n|        Please come back soon                     |\n|        \u00A9 Anastasia Fefilova                      |\n|                                                  |\n --------------------------------------------------\n');
}

//BONUS
//In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
//Make sure you append each command you run to the `log.txt` file. 
// * Do not overwrite your file each time you run a command.
function saveToLog(output){
    fs.appendFile('./log.txt', output + "\n\n======================================\n\n", function(err){
        if(err){
            console.log(err);
        }
    });
}
