
(function(){

  // default view mode is all
  var viewMode = 'all';

  $(document).ready(function(){
    initializeTweets();
    tweetListener();
  });

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

    var $body = $('.tweets');

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

    $username.text('@'+tweet.user);
    $tweet.data('author', tweet.user);
    $tweetTime.text(tweet.created_at);
    $tweetMessage.text(tweet.message);
    
    // behavior changes according to view mode
    if (viewMode === 'all' || viewMode === $tweetAuthor.text() ){
      // add new tweet to top
      $tweet.prependTo($body); 
    } else {
      // hide new tweet if not in proper view mode
      $tweet.prependTo($body).hide(); 
    }
    
    $avatar[tweet.user].appendTo($tweet);
    $username.appendTo($tweetDetails);
    $tweetTime.appendTo($tweetDetails);
    $tweetMessage.appendTo($tweetDetails);
    
    $tweetDetails.appendTo($tweet);

    // username on click behavior 
    $username.on('click', function(){

      var authorOnClick = $(this).text()
      var clicks = $(this).data('clicks')
      var cycle = $(this).data("clicks", !clicks);
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
      cycle
    });
};


}());