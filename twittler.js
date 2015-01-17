
(function(){

$(document).ready(function(){

    var $body = $('.tweets');

    var index = streams.home.length - 1;
    while(index >= 0){

		var tweet = streams.home[index];
        var article = '<article class="tweet clearfix"></article>'
	    var $tweet = $(article);

	    $tweet.text('@' + tweet.user + ': ' + tweet.message);
	    $tweet.appendTo($body);

	    index -= 1
	}


});

}());