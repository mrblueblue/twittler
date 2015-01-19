
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

    var $twittle = $('<article>',{
      class: 'tweet clearfix', 
      'data-author': tweet.user
    });

    var $details = $('<div>',{
      class: "tweet-details"
    });

    var $message = $('<p>',{
      class: 'tweet-content', 
      text: tweet.message
    });

    var $author = $('<a>',{
      class: 'author', 
      'data-author': tweet.user,
      text: '@'+tweet.user,
      click: toggleViewMode
    });

    var $timeStamp = $('<small>',{
      class: 'time',
      text: tweet.created_at.getHours()
    });

    var $avatars = {}

    // Avatar HTML template
    var getAvatars = function(){
      var avatars = {
          shawndrost : 'img/shawndrost.jpeg',
          sharksforcheap : 'img/sharksforcheap.jpg',
          mracus : 'img/mracus.png',
          douglascalhoun : 'img/douglascalhoun.jpg'
        }
      for (key in avatars) {
        $avatars[key] = $('<a>',{
          class: 'avatar',
          click: toggleViewMode,
          'data-author': key,
          html: $('<img>', {
            src: avatars[key]
          })
        })
      }
  }();

   $twittle
      .append($avatars[tweet.user])
      .append($details);

      $details
        .append($author)
        .append($timeStamp)
        .append($message);
 
    // Adds to stream as hidden or showing depending on view mode
    if ( viewMode === 'all' || viewMode === $author.text() ){
      $twittle.prependTo($stream); 
    } else {
      $twittle.prependTo($stream).hide(); 
    }

    console.log($twittle)
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