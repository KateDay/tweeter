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

function formatTime (time) {
    var diff = Math.floor((Date.now() - time) / 1000);
    var interval = Math.floor(diff / 31536000);

    if (interval >= 1) {
        return interval + " years" + " ago";
    }
    interval = Math.floor(diff / 2592000);
    if (interval >= 1) {
        return interval + " months" + " ago";
    }
    interval = Math.floor(diff / 604800);
    if (interval >= 1) {
        return interval + " weeks" + " ago";
    }
    interval = Math.floor(diff / 86400);
    if (interval >= 1) {
        return interval + " days" + " ago";
    }
    interval = Math.floor(diff / 3600);
    if (interval >= 1) {
        return interval + " hours" + " ago";
    }
    interval = Math.floor(diff / 60);
    if (interval >= 1) {
        return interval + " minutes" + " ago";
    }
    return "<1m" + " ago";
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
    
    var $icons = $('<span>').addClass('icons');
    var $icon1 = $('<i>').addClass('fas fa-flag');
    var $icon2 = $('<i>').addClass('fas fa-retweet');
    var $icon3 = $('<i>').addClass('fas fa-heart');
    
    var $contentDate = $('<p>').addClass('feedFoot').text(formatTime (data.created_at));
    
    $footer.append([$icons.append([$icon1, $icon2, $icon3]), $contentDate]);

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
