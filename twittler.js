

var Twittle = (function () {

  var viewMode = 'all';

  var viewToggle = {
    shawndrost : 0,
    sharksforcheap : 0,
    mracus : 0,
    douglascalhoun : 0 
  }

  function twittlerInitializer() {
    var index = streams.home.length - 1;
    while(index >= 0){
      var twittle = streams.home[index];
      twittleMaker(twittle);
      index -= 1;
    }
  }

  function twittleListener(){
    var lastGeneratedTwittle = streams.home[streams.home.length-1];
    twittleMaker(lastGeneratedTwittle);
    setTimeout(twittleListener, Math.random() * 20000);
  };

  function twittleMaker(tweet) {

    var $stream = $('.tweets');  

    var $twittle = $('<article class="tweet clearfix">');
      var $details = $('<div class="tweet-details"></div>');
        var $message = $('<p class="tweet-content"></p>');
        var $author = $('<a class="author"></a>');
        var $timeStamp = $('<small class="time"></small>');

      var $avatar = {
        shawndrost : $("<a class='avatar'><img src='img/shawndrost.jpeg'</a>"),
        sharksforcheap : $("<a class='avatar'><img src='img/sharksforcheap.jpg'</a>"),
        mracus : $("<a class='avatar'><img src='img/mracus.png'</a>"),
        douglascalhoun :$("<a class='avatar'><img src='img/douglascalhoun.jpg'</a>")
      }

    if ( viewMode === 'all' || viewMode === $author.text() ){
      $twittle.prependTo($stream); 
    } else {
      $twittle.prependTo($stream).hide(); 
    }
   
   $twittle
      .data('author', tweet.user)
      .append($avatar[tweet.user])
      .append($details);

      $details
        .append($author.text('@'+tweet.user))
        .append($timeStamp.text(tweet.created_at.getHours()))
        .append($message.text(tweet.message));
 
    $author.on('click', function(){
      var clickedAuthor = $(this).text();
      var notAuthor = $('.tweet').filter( function() {
            return '@' + $(this).data('author') !== clickedAuthor;
          });

      if ( $(this).data('clicks') ) {
        viewMode = 'all'
        $stream.show();
      } else {
        viewMode = clickedAuthor;
        notAuthor.hide();
      }
      $(this).data("clicks", !clicks);
    });
  };

  return { intialize : twittlerInitializer,
            listen : twittleListener}

})();

$(document).ready(function(){
    Twittle.intialize();
    Twittle.listen();
  });