// $(window).width()

var posXaliens = 20; // space = 100 em - blocAlien = 40 em / 2
// console.log("posAliens = " + Math.round($('#blocAlien').css('left').substr(0, 3) / em));
var posYaliens = 2; // marge par rapport au haut
var dir = 1; // part à droite
var maxposXaliens = 42; // space = 60 em - player = 5 em - marge bas 1em + demi-missile 1 em + nouvelle marge 1 em = 42
/////////////  variable en fonction des vaisseaux restants
var maxposYaliens = 25; // blocAlien
/////////////

var posPlayer = 50; // au milieu de #space

var vies = 3;

var vitesseInitiale = 12; // Vitesse de départ : intervale, + il est petit, + ça va vite
var vitesse = vitesseInitiale;
var pause = true;

var posYmissFixe = 51; // y de départ du missile : à la pointe du vaisseau
var posYmissile = posYmissFixe;

var tic;  // interval de jeu

var missileTime = 0; // timer du tir du missile
var bombTime = 0;
var bombReady = false;

// RECUPERATION DE LA VALEUR EN PIXELS DE 1em
var em = $(":root").css("font-size").substr(0, 2);
console.log("1 em = " + em + "px"); // valeur de 1em en pixels

function start() {
  clearInterval(tic);
  pause = false;
  hit = 0;

  initMissile();
  initBomb();

    tic = setInterval(function() {

    // missile joueur
      missileTime++;
      if (missileTime >= 80){
        initMissile();
        missileTime = 0;
        hitAlien = false;
      }
      else {
        if ( (pause == false) && (hitAlien == false) && (missileTime%4 == 0 ) ) {
          moveMissile();
        }
      }

      // bomb aliens
      bombTime++;
      if (bombTime >= 160) {
        bombTime = 0;
        initBomb();
        console.log("initBomb");
      }
      else {
        if ( (pause == false) && (bombReady == true) && (missileTime%4 == 0 ) ) {
          moveBomb();
        }
      }

      // déplacement aliens
      if ((dir == 1) && (posXaliens >= maxposXaliens) && (pause == false)) {
          dir = -1;
      }
      else if ((dir == -1) && (posXaliens <= 3) && (pause == false)) {
          dir = 1;
      }
      posXaliens += dir/5;
      $('#blocAlien').css('left', posXaliens + "em");
      if (Math.round(posXaliens*10)%30 == 0) {
          posYaliens += 0.1;
          $('#blocAlien').css('top', posYaliens + "em");
      }

    }, vitesse);
}

// Interaction utilisateur
document.addEventListener('keydown', function(e) {
    if ( ((e.keyCode == 37) || (e.keyCode == 81)) && (posPlayer > 5.5) && (pause == false) ) {
        posPlayer -= 1;
    } else if ( ((e.keyCode == 39) || (e.keyCode == 68)) && (posPlayer < 95.5) && (pause == false) ) {
        posPlayer += 1;
    } else if ( (e.keyCode == 27) && (pause == false) ) {
        pause = true;
        clearInterval(tic);
    } else if ( (e.keyCode == 27) && (pause == true) ) {
        // pause = false;
        start();
    } else if (e.keyCode == 13) {
      showGame();
    }
    $('#player').css('left', posPlayer + "em");
}, false);
