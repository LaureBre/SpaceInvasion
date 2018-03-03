
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
  posX = 20;
  posY = 2;
  // for (var j=1; j<=40; j++) {
  //   $(".alien:nth-child(" + j + ") .iAlien").css('visibility', 'visible');
  // }
}
