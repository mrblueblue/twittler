
var Twittler = (function () {

  // Private variables for toggling view
  var viewMode = 'all';

  var viewToggle = {
    shawndrost : 0,
    sharksforcheap : 0,
    mracus : 0,
    douglascalhoun : 0 
  };

  // Populates stream with intial generated twittles
  var twittlerInitializer = function() {
    var index = streams.home.length - 1;
    while(index >= 0){
      var twittle = streams.home[index];
      addToStream(twittle)
      index -= 1;
    }
  };

  // Listens and adds to stream newly genereated twittles
  var twittleListener = function (){
    var lastGeneratedTweet = streams.home[streams.home.length-1];
    addToStream(lastGeneratedTweet);
    setTimeout(twittleListener, Math.random() * 20000);
  };

  // Adds a twittle to the stream
  var addToStream = function(twittle){
   var $stream = $('.tweets');  
   if ( viewMode === 'all' || viewMode === $author.text() ){
      twittleMaker(twittle).prependTo($stream); 
    } else {
      twittleMaker(twittle).prependTo($stream).hide(); 
    }
  };

  // Manufactures HTML for twittles
  var twittleMaker = function(tweet) {

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
      'data-livestamp': tweet.created_at
    });

    var $avatar = $('<a>',{
      class: 'avatar',
      click: toggleViewMode,
      'data-author': tweet.user,
      html: $('<img>', {
        src: avatars[tweet.user]
      })
    });

   $twittle
      .append($avatar)
      .append($details);

      $details
        .append($author)
        .append($timeStamp)
        .append($message);

    return $twittle;
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

  // Returns public methods
  return { intialize : twittlerInitializer,
            listen : twittleListener}

})();

$(document).ready(function(){
    Twittler.intialize();
    Twittler.listen();
  });