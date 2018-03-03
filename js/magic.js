
$('#space').hide();

function showGame() {
        $('button').hide(2000);
        $('strong').animate({'font-size': '0'}, 2000);
        $('#space').fadeIn(3000);
    setTimeout(function() { start(); }, 2000);
}

function hideGame() {
        $('button').fadeIn(1500);
        $('strong').animate({'font-size': '3em'}, 2000);
        $('#space').hide(700);
        clearInterval(tic);
}

function resetPos() {
  posXaliens = 20;
  $('#blocAlien').css('left', posXaliens + "em");
  posYaliens = 2;
  $('#blocAlien').css('top', posYaliens + "em");
  posPlayer = 50;
  $('#player').css('left', posPlayer + "em");
  for (var j=1; j<=40; j++) {
    $(".alien:nth-child(" + j + ") .iAlien").fadeIn();
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
  resetPos();
  pause = true;
  clearInterval(tic);
  $("#missile").css('visibility', 'hidden');
  $('#blocAlien').css('opacity', 0.5);
  vitesse /= 1.5; // on augmente la vitesse
  setTimeout(function() {
    $('#player').width('5em');
    $('#message').html('');
    $('#blocAlien').css('opacity', 1);
    $('#player').attr('src','img/rocket.svg');
    start();
  }, 1500);
}
