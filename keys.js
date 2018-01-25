var spotifyKeys = {
    id: process.env.SPOTIFY_CLIENT_ID,
    secret: process.env.SPOTIFY_CLIENT_SECRET
};

var twitterKeys = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

var musixKey =  process.env.MUSIXMATCH_API_KEY

module.exports = {
    spotifyKeys: spotifyKeys,
    twitterKeys: twitterKeys,
    musixKey: musixKey,
}