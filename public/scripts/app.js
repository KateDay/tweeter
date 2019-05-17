/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function renderTweets(tweets) {
    tweets.forEach(tweet => {
        $('#tweetsContainer').prepend(createTweetElement(tweet));
    });   
}

function createTweetElement(data){
    var $tweet = $('<article>').addClass('feed');

    var $header = $('<header>');
    var $avatar = $('<img>').attr('src', data.user.avatars.small);
    var $name = $('<h1>').addClass('feedHead').text(data.user.name);
    var $handle = $('<p>').addClass('handel').text(data.user.handle);
    $header.append([$avatar, $name, $handle]);

    var $content = $('<p>').addClass('feedContent').text(data.content.text);

    var $footer = $('<footer>');
    var $contentDate = $('<p>').addClass('feedFoot').text(data.created_at);
    $footer.append($contentDate);

    $tweet.append([$header, $content, $footer]);        
    return $tweet;
}

function postTweet(event) {
    event.preventDefault()
    
    const data = $( this ).serialize();
    const $textarea = $('textarea')
    const input = $textarea.val().trim();
    const inputAmt = input.length;
    const maxValue = $textarea.data('length');


    if (inputAmt > maxValue) {
        return alert("This Tweet is WAY too long!")
    }
    if(!input){
        return alert("Tell me your story!")
    }
    
    const status = () => {
        console.log("Got response");
                loadTweets();
                this.reset();
                $('.counter').text(maxValue);
    }

    $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
        success: status,
        
    });    
}

function loadTweets(){
    $.ajax({
        type: "GET",
        url: "/tweets",
        success: renderTweets
    });

}

$(document).ready(function(){
    loadTweets()
    $('form#composeTweet').on("submit", postTweet,)
    
    $(".toggleButton").click(function(){
        $(".new-tweet").slideToggle()
        $('textarea').focus();
    });

});
