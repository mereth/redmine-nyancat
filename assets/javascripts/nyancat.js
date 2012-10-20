function nyancat_init(baseUrl) {
$(function () {
    var keyPressed = 0;   // counter of key presses
    var keyMax = 2;   // when pressed that many times sequentially, start animation
    var keyCode = 16; // shift key
    var animationDuration = 9000; // number of milliseconds the animation will take
    
    var $body = $('body');
    $body.append('<img src="'+baseUrl+'/images/nyancat.gif" id="image" width="100" style="position:absolute;z-index:9999;left:-100px;top:50px;"/>');
    var $img = $("img#image");
    
    $body.append('<audio id="sound" preload="auto"><source src="'+baseUrl+'/audios/nyancat.ogg" type="audio/ogg"/><source src="'+baseUrl+'/audios/nyancat.mp3" type="audio/mp3" /></audio>');
    var sound = $("#sound").get(0);

    var nyancat_reset = function() {
        if(sound.play) {
            sound.pause();
            sound.currentTime = 0;
            sound.volume = 1;
        }
        $img.css("left", "-100px");
    }
    
    function nyancat_start() {
        if(sound.play) {
            sound.play();
        }
        $img.show().animate({ "left": "+=" + parseInt($("body").width() + 100) + "px"}, animationDuration, nyancat_reset);
    };
    
    $(document).keyup(function (event) {
        if (event.which == keyCode) {
            keyPressed++;
        } else {
            keyPressed = 0;
        }
        if (keyPressed == keyMax) {
            keyPressed = 0;
            nyancat_start();
        }
    });
    
    if(sound.play) {
        $("#sound").on('timeupdate', function () {
            var vol = 1,
            interval = 200;
            if (Math.floor(sound.currentTime) == 6) {
                if (sound.volume == 1) {
                    var intervalID = setInterval(function () {
                        if (vol > 0) {
                            vol -= 0.10;
                            if (vol >= 0.10)
                            sound.volume = vol.toFixed(1);
                        } else {
                            clearInterval(intervalID);
                        }
                    },
                    interval);
                }
            }
        });
    }
});
};