var hitAlien = false;
var hit = 0;

function missileHit() {

      for (var j=0; j<40; j++) {

        if ($(".alien:nth-child(" + (j+1) + ") .iAlien").is(':visible')) {
          // si alien pas encore touché

          if (   (Math.round($(".alien:nth-child(" + (j+1) + ")").offset().left / 60)
          == (Math.round($("#missile").offset().left / 60)))
          && (Math.round(($(".alien:nth-child(" + (j+1) + ")").offset().top + 60) / 70))
          == (Math.round($("#missile").offset().top / 60 ))   ){
          // si les coordonnées correspondent grossièrement (pour ça qu'on a divisé et arrondi)

            hitAlien = true;
            hit++;
            // alien touché

            $(".alien:nth-child(" + (j+1) + ") .iAlien").hide();
            $(".alien:nth-child(" + (j+1) + ")").append("<img src='img/explosion.svg' id='explosion'>");
            $("#explosion").hide(1000);

            setTimeout(function() {
              $("#explosion").remove();
            }, 1200);

            $("#missile").css('visibility', 'hidden');
            $("#missile").css('top', "60em");

            // // debug // //
            // $(".alien:nth-child(" + (j+1) + ")").append(j+1);
            // $("#missile").css('background-color', 'red');
            }
        }

      } // fin for j

      if (hit == 40) {
          gagne();
      }
}

// joueur touché
function perdu() {
  vies--;
  $('#player').attr('src','img/exploLaterale.svg');
  $('#player').width('50em');

  bigEvent();

  // message
  if (vies == 0) {
    $("#message").html('BOooOoM ! Perdu !');
    setTimeout(function() {
      hideGame();
    }, 1500);
  }
  else if (vies == 2) {
      $("#message").html("BOOM ! Il vous reste deux vies");
  }
  else {
    $("#message").html("BOOoM ! Il ne vous reste plus qu'une seule vie");
  }

}

var niveau = 1;

function gagne() {
  $("#message").html("BRAVO ! Vous accédez au niveau suivant.");
  bigEvent();
  niveau++;
}

function bigEvent() {
  pause = true;
  resetPos();
  clearInterval(tic);
  $("#missile").css('visibility', 'hidden');
  $('#blocAlien').css('opacity', 0.5);
  for (var i=0; i<40; i++) {
    $(".alien:nth-child(" + (i+1) + ") .ialien").css('visibility', 'visible');
  }
  vitesse /= 1.5; // on augmente la vitesse
  setTimeout(function() {
    $('#message').html('');
    $('#blocAlien').css('opacity', 1);
    $("#missile").css('visibility', 'visible');
    $('#player').width('5em');
    $('#player').attr('src','img/rocket.svg');
  }, 1500);
}
