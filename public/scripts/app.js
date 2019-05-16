/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
{
    "user": {
    "name": "Newton",
    "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
    },
    "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
},
{
    "user": {
    "name": "Descartes",
    "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
    },
    "handle": "@rd" },
    "content": {
    "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
},
{
    "user": {
    "name": "Johann von Goethe",
    "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
    },
    "handle": "@johann49"
    },
    "content": {
    "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
}
];

$(document).ready(function(){

    function renderTweets(tweets) {
        tweets.forEach(tweet => {
            $('#tweetsContainer').append(createTweetElement(tweet));
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

    renderTweets(data);

});
