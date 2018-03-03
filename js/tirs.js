var hitAlien = false;
var hit = 0;
var launch = 0;
var flou = 6;
var margeTop = $("#space").offset().top / em;
var margeLeft = $("#space").offset().left / em;
console.log(margeLeft);

function missileHit() {

      for (var j=1; j<=40; j++) {


        if ($(".alien:nth-child(" + j + ") .iAlien").is(':visible')) {
          // si alien pas encore touché

          var posYalien = Math.round($(".alien:nth-child(" + j + ") > img").offset().top / em);
          var posXalien = Math.round($(".alien:nth-child(" + j + ") > img").offset().left / em);


          if ( (posYalien >= 58 + margeTop)     // hauteur space 60 - 3 moitié de alien + 1 de margeTop avant bord
              || (  (posYalien >= 54 + margeTop)// hauteur space 60 - 7 (player + margeTop) + 1 pour que ça morde
                    && ( Math.round( (posXalien - 30)/flou ) == Math.round(posPlayer / flou)  )      // 30 moitié de blocAlien
                  )
              ) {
                console.log("touché par un alien");
            perdu();
            // console.log('boom, posYalien = ' + posYalien + ', posXalien = ' + posXalien);
            break; // on empêche la boucle de se poursuivre
          }
          else {

            if (   (  Math.round(posXalien / flou) == Math.round($("#missile").offset().left / (flou * em))   )
                && (  Math.round(posYalien / flou) == Math.round($("#missile").offset().top / (flou * em))   )   ) {
            // si les coordonnées correspondent grossièrement (pour ça qu'on a divisé et arrondi)

              hitAlien = true;
              hit++;
              // alien touché

              $(".alien:nth-child(" + j + ") .iAlien").hide();
              $(".alien:nth-child(" + j + ")").append("<img src='img/explosion.svg' id='explosion'>");
              $("#explosion").hide(1000);

              setTimeout(function() {
                $("#explosion").remove();
              }, 1200);

              $("#missile").css('visibility', 'hidden');
              $("#missile").css('top', "60em");
            }
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


function initBomb() {
      bombReady = false;
      launch = Math.floor(Math.random() * 40);
      while ($(".alien:nth-child(" + launch + ") .iAlien").is(':hidden')) {
        launch = Math.floor(Math.random() * 40);
      }
      if ($(".alien:nth-child(" + launch + ") .iAlien").is(':visible')) {
        bombReady = true;
        posXbomb = Math.round(($(".alien:nth-child(" + launch + ") > img").offset().left) / em - 0.75) - margeLeft; // largeur bomb ~ 1.5em
        posYbomb = Math.round(($(".alien:nth-child(" + launch + ") > img").offset().top) / em);
        $('#bomb').css('left', posXbomb + "em");
        $('#bomb').css('top', posYbomb + "em");
        $("#bomb").fadeIn();
      }
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

function moveMissile() {
  if (posYmissile > 1) {
    // déplacement missile
    posYmissile -= 0.2 * em;
    $("#missile").css('top', Math.round(posYmissile) + "em");
    missileHit();
  }
}

function moveBomb() {
  posYbomb += 0.1 * em;
  console.log(posYbomb);
  // console.log(launch + " posAlien " + $(".alien:nth-child(" + launch + ") > img").offset().left + ' bomb ' + $('#bomb').css('left'));
  $("#bomb").css('top', Math.round(posYbomb) + "em");
  if ( (posYbomb >= 53) && (posYbomb < 55) ) {
    // offset est en pixels, posYbomb en em ; on veut une approximation : la division par flou, arrondie, permet cela
    if ( Math.round((posXbomb + margeLeft - 1.5) / flou) == ( Math.round( ($("#player").offset().left ) / (flou * em) ) ) ) {
      perdu();
    }
  }
  else if (posYbomb >= 55) {
    $("#bomb").hide();
  }
}
