
(function(){

var viewMode = 'all'

$(document).ready(function(){
    initialize();
    tweetListener();
});

var initialize = function(){
    var index = streams.home.length - 1;
    while(index >= 0){
        var tweet = streams.home[index];
        addTweet(tweet);
        index -= 1;
    }
}

var addTweet = function(tweet) {

    var $body = $('.tweets');

    var $tweet = $('<article class="tweet clearfix">');
    var $tweetDetails = $('<div class="tweet-details"></div>');
    var $tweetContent = $('<p class="tweet-content"></p>');
    var $tweetAuthor = $('<a class="author"></a>');
    var $tweetTime = $('<small class="time"></small>');

    $tweetAuthor.text('@'+tweet.user);
    $tweet.data('author', tweet.user)
    $tweetTime.text(tweet.created_at);
    $tweetContent.text(tweet.message);

    $tweet.prependTo($body);
    $tweetAuthor.appendTo($tweetDetails);
    $tweetTime.appendTo($tweetDetails);
    $tweetContent.appendTo($tweetDetails);
    $tweetDetails.appendTo($tweet);

    // add on click behavior 
    $('.author').on('click', function(event){
        event.preventDefault();
        var authorOnClick = $(this).text();
        $('article').filter( function() {
            return '@' + $(this).data('author') !== authorOnClick;
        }).toggle();
    });

};

var tweetListener = function(){
    var lastTweeted = streams.home[streams.home.length-1];
    addTweet(lastTweeted);
    setTimeout(tweetListener, Math.random() * 20000);
};;

}());