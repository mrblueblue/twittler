(function(){

$(document).ready(function(){
        var $body = $('body');
        $body.html('');

        var index = streams.home.length - 1;
        while(index >= 0){
          var tweet = streams.home[index];
          var $tweet = $('<div></div>');
          var timeStamp = tweet.created_at;
          $tweet.text('@' + tweet.user + ' - ' + timeStamp + ': ' + tweet.message);
          $tweet.appendTo($body);
          index -= 1;
        }

      });

}());