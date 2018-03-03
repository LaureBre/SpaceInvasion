// $(window).width()
var posX = 20; // space = 100 em - blocAlien = 40 em / 2
var posY = 2; // marge par rapport au haut
var dir = 1; // part à droite
var maxPosX = 42; // space = 60 em - player = 5 em - marge bas 1em + demi-missile 1 em + nouvelle marge 1 em = 42
/////////////  variable en fonction des vaisseaux restants
var maxPosY = 25; // blocAlien
/////////////
// // $(window).width()
// var posX = 0; // space = 100 em - blocAlien = 40 em / 2
// var posY = -29; // marge par rapport au haut
// var dir = 1; // part à droite
// var maxPosX = 19; // space = 60 em - player = 5 em - marge bas 1em + demi-missile 1 em + nouvelle marge 1 em = 42
// /////////////  variable en fonction des vaisseaux restants
// var maxPosY = 14; // blocAlien
// /////////////
var elem = document.getElementById('blocAlien');
var vies = 3;
var vitesse = 10;
var pause = true;
var posYmissFixe = 51;
var posYmissile = posYmissFixe;
var missileTime = 0;
var tic;

var em = $(":root").css("font-size").substr(0, 2);
console.log("1 em = " + em + "px"); // valeur de 1em en pixels

function start() {
  clearInterval(tic);
  pause = false;
  hit = 0;

// les aliens
    tic = setInterval(function() {

    // missile joueur
      missileTime++;
      if ( (missileTime < 45) && (pause == false) && (hitAlien == false) ) {
        if (missileTime%2 == 0 ){
          repeatMissile();
        }
      }
      else if (missileTime >= 50){
        initMissile();
        missileTime = 0;
        hitAlien = false;
      }

      // déplacement aliens
      if ((dir == 1) && (posX >= maxPosX) && (pause == false)) {
          dir = -1;
      }
      else if ((dir == -1) && (posX <= 3) && (pause == false)) {
          dir = 1;
      }
      posX += dir/10;
      elem.style.left = posX + "em";
      if ((Math.round(posX*10)%30 == 0) && (posY < (23))) {
          posY += 0.2;
          elem.style.top = posY + "em";
      }
      else if (posY >= (23)){
        // clearInterval(tic);
        perdu();
      }

      // missiles aliens

    }, vitesse);
}

// repositionnement du missile
function initMissile() {
  // réinitialisation du tir au bout d'un certain temps
    $("#missile").css('visibility', 'visible');
    // départ sur le Y de player
    posYmissile = posYmissFixe;
    $("#missile").css('top', posYmissile + "em");
    // on revient à la pointe du vaisseau
    $("#missile").css('left', $("#player").css('left'));
}

function repeatMissile() {
  if ((posYmissile > 1) && (hitAlien == false) && (pause == false) ) {
    // déplacement missile
    posYmissile -= 2 * em;
    $("#missile").css('top', Math.round(posYmissile) + "em");
    missileHit();
  }
}

var player = document.getElementById('player');
var posPlayer = 47.5;

document.addEventListener('keydown', function(e) {
    if ( (e.keyCode == 37) && (posPlayer > 5 * em) && (pause == false) ) {
        posPlayer -= 20 / vitesse;
    } else if ( (e.keyCode == 39) && (posPlayer < 95 * em) && (pause == false) ) {
        posPlayer += 20 / vitesse;
    }
    if ( (e.keyCode == 27) && (pause == false) ) {
        pause = true;
        clearInterval(tic);
    }
    else if ( (e.keyCode == 27) && (pause == true) ) {
        // pause = false;
        start();
    }
    player.style.left = posPlayer + "em";
}, false);
