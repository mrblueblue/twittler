
(function(){

$(document).ready(function(){

    var $body = $('.tweets');

    var index = streams.home.length - 1;
    while(index >= 0){

		var tweet = streams.home[index];
        
	    var $tweet = $('<article class="tweet clearfix">');
        var $tweetDetails = $('<div class="tweet-details"></div>')
        var $tweetContent = $('<p class="tweet-content"></p>');
        var $tweetAuthor = $('<a class="author"></a>')
        var $tweetTime = $('<small class="time"></small>')


	    

        $tweetAuthor.text('@'+tweet.user)
        $tweetTime.text(tweet.created_at)
        $tweetContent.text(tweet.message);

        $tweet.appendTo($body);
        $tweetAuthor.appendTo($tweetDetails)
        $tweetTime.appendTo($tweetDetails)
        $tweetContent.appendTo($tweetDetails)
        $tweetDetails.appendTo($tweet)

	    index -= 1
	}


});

}());