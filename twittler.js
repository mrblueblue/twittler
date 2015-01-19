
var Twittle = (function () {

  var viewMode = 'all';

  var viewToggle = {
    shawndrost : 0,
    sharksforcheap : 0,
    mracus : 0,
    douglascalhoun : 0 
  }

  // Populates stream with generated tweets
  var twittlerInitializer = function() {
    var index = streams.home.length - 1;
    while(index >= 0){
      var twittle = streams.home[index];
      twittleMaker(twittle);
      index -= 1;
    }
  }

  // Listens for newly genereated tweets and adds them to stream
  var twittleListener = function (){
    var lastGeneratedTweet = streams.home[streams.home.length-1];
    twittleMaker(lastGeneratedTweet);
    setTimeout(twittleListener, Math.random() * 20000);
  };

  // Takes a generated tweet and makes it into a twittle and then adds to stream
  var twittleMaker = function(tweet) {

    var $stream = $('.tweets');  

    var $twittle = $('<article>').attr({'class':'tweet clearfix', 'data-author':tweet.user})
      var $details = $('<div class="tweet-details"></div>');
        var $message = $('<p>').attr({'class':'tweet-content'}).text(tweet.message)
        var $author = $('<a>').attr({'class':'author', 'data-author':tweet.user}).text('@'+tweet.user) 
        var $timeStamp = $('<small class="time"></small>').text(tweet.created_at.getHours());

      var $avatar = {
        shawndrost : $("<a class='avatar' data-author='shawndrost'><img src='img/shawndrost.jpeg'></a>"),
        sharksforcheap : $("<a class='avatar' data-author='sharksforcheap'><img src='img/sharksforcheap.jpg'></a>"),
        mracus : $("<a class='avatar' data-author='mracus'><img src='img/mracus.png'></a>"),
        douglascalhoun :$("<a class='avatar' data-author='douglascalhoun'><img src='img/douglascalhoun.jpg'></a>")
      }
   
   $twittle
      .append($avatar[tweet.user])
      .append($details);

      $details
        .append($author)
        .append($timeStamp)
        .append($message)
 
    $author.on('click', toggleViewMode)
    $('.avatar').on('click', toggleViewMode);

    // Adds to stream as hidden or showing depending on view mode
    if ( viewMode === 'all' || viewMode === $author.text() ){
      $twittle.prependTo($stream); 
    } else {
      $twittle.prependTo($stream).hide(); 
    }
  };

  // Toggles view mode on click
  var toggleViewMode = function(){

    var allTwittles = $('.tweet');
    var clickedAuthor = $(this).data('author');
    var notAuthor = allTwittles.filter(function(){return $(this).data('author') !== clickedAuthor;});
    var hidden = viewToggle[clickedAuthor] % 2 !== 0;

    viewToggle[clickedAuthor]++

    if (hidden) {
      viewMode = 'all';
      allTwittles.show();
    } else {
      viewMode = clickedAuthor;
      notAuthor.hide();
    }
  };

  // Makes time-stamp human-friendly
  var makeFriendlyTime = function(time){};

  // Public methods
  return { intialize : twittlerInitializer,
            listen : twittleListener}

})();

$(document).ready(function(){
    Twittle.intialize();
    Twittle.listen();
  });