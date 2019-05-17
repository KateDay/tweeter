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
        return $(".errAlert").text("This Tweet is WAY too long!").slideDown()
    }
    if(!input){
        return $(".errAlert").text("Tell me your story!").slideDown()
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

function clearOut(){
    const maxValue = $('textarea').data('length');
    const counter = parseInt($(".counter").text());

    if ( counter > 0 && counter < maxValue) {
        $(".errAlert").text("").slideUp()
    }
}

$(document).ready(function(){
    loadTweets()
    $('form#composeTweet').on("submit", postTweet)
    $('textarea').on("input", clearOut);
    
    $(".toggleButton").click(function(){
        $(".new-tweet").slideToggle()
        $('textarea').focus();
    });

});
