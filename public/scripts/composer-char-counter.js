
$(document).ready(function() {
    let maxValue = $('textarea').data('length');

    $('textarea').on('input', function(){
        let counter = parseInt($('.counter')[0].innerHTML);
        let inputAmt = $('textarea').val().length;
        
        $('.counter')[0].innerHTML = maxValue - inputAmt;        
        if (inputAmt > maxValue) {
            $('.counter').addClass("invalid");   
        } else {
            $('.counter').removeClass("invalid");
        }
    });
});

