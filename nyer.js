(function () {
    'use strict';


    var button = document.querySelector('button');
    var audio = document.querySelector('audio');

    button.addEventListener('mousedown', function() {
      audio.currentTime = 0;
      audio.play();

      document.title = "N-N-N-N-N-NYERRRRR!";
      setTimeout( function() {
        document.title = "NYERRR"
      }, 600);

      if ("vibrate" in navigator) {
        navigator.vibrate(600);
      }
    });

})();
