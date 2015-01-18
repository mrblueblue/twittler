
(function(){

  // default view mode is all
  var viewMode = 'all';

  var $stream= $('.tweets');

  var initializeTweets = function(){
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      addTweet(tweet);
      index -= 1;
    }
  }

  var tweetListener = function(){
    var lastTweeted = streams.home[streams.home.length-1];
    addTweet(lastTweeted);
    setTimeout(tweetListener, Math.random() * 20000);
  };

  var addTweet = function(tweet) {

    var $tweet = $('<article class="tweet clearfix">');
    var $tweetDetails = $('<div class="tweet-details"></div>');
    var $tweetMessage = $('<p class="tweet-content"></p>');
    var $username = $('<a class="author"></a>');
    var $tweetTime = $('<small class="time"></small>');

    var $avatar = {
      shawndrost : $("<a class='avatar'><img src='img/shawndrost.jpeg'</a>"),
      sharksforcheap : $("<a class='avatar'><img src='img/sharksforcheap.jpg'</a>"),
      mracus : $("<a class='avatar'><img src='img/mracus.png'</a>"),
      douglascalhoun :$("<a class='avatar'><img src='img/douglascalhoun.jpg'</a>")
    }

    if (viewMode === 'all' || viewMode === $username.text() ){
      $tweet.prependTo($stream); 
    } else {
      $tweet.prependTo($stream).hide(); 
    }
   
   $tweet
      .data('author', tweet.user)
      .append($avatar[tweet.user])
      .append($tweetDetails);

    $tweetDetails
      .append($username.text('@'+tweet.user))
      .append($tweetTime.text(tweet.created_at.getHours()))
      .append($tweetMessage.text(tweet.message))

 
    $username.on('click', function(){

      var authorOnClick = $(this).text()
      var clicks = $(this).data('clicks')
      var setClick = $(this).data("clicks", !clicks);
      var allTweets = $('.tweet')
      var othersTweets = $('.tweet').filter( function() {
            return '@' + $(this).data('author') !== authorOnClick;
          });

      if (clicks) {
        viewMode = 'all'
        allTweets.show();
      } else {
        viewMode = authorOnClick
        othersTweets.hide();
      }

      setClick
    });
  };

$(document).ready(function(){
    initializeTweets();
    tweetListener();
  });

}());

