
(function(){

$(document).ready(function(){

    var index = streams.home.length - 1;

    // populate with intial tweets
    while(index >= 0){
        var tweet = streams.home[index];
        addTweet(tweet);
        index -= 1;
    }

    // listen for new tweets and add them
    tweetListener();

    // see all of user's tweets

});

// Utility Functions

var addTweet = function(tweet) {

    var $body = $('.tweets');

    var $tweet = $('<article class="tweet clearfix">');
    var $tweetDetails = $('<div class="tweet-details"></div>');
    var $tweetContent = $('<p class="tweet-content"></p>');
    var $tweetAuthor = $('<a class="author"></a>');
    var $tweetTime = $('<small class="time"></small>');

    $tweetAuthor.text('@'+tweet.user);
    $tweetTime.text(tweet.created_at);
    $tweetContent.text(tweet.message);

    $tweet.prependTo($body);
    $tweetAuthor.appendTo($tweetDetails);
    $tweetTime.appendTo($tweetDetails);
    $tweetContent.appendTo($tweetDetails);
    $tweetDetails.appendTo($tweet);

};

var tweetListener = function(){
    var lastTweeted = streams.home[streams.home.length-1];
    addTweet(lastTweeted);
    setTimeout(tweetListener, Math.random() * 5000);
};

}());