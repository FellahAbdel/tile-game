function alea(min, max) {
  // [0;15[
  return Math.floor(Math.random() * (max - min) + min);
}

const STARTINGPOSITION = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let randPosition = [];

function createTuile() {
  for (var countTuile = 0; countTuile <= 15; countTuile++) {
    // var paragrapheElt = "<p>" + countTuile + "</p>";
    var tuile = '<div class="tuile" id="t' + countTuile + '"><p></p></div>';
    $("#puzzlearea").append(tuile);
  }
}

function addParagraphe(tuileNumber, tuilePosition) {
  $("#t" + tuileNumber).append("<p>" + tuilePosition + "</p>");
}
function loadImages(positions) {
  for (var tuileId = 0; tuileId < 16; tuileId++) {
    // console.log(pos);
    var pos = positions[tuileId];
    if (pos === 15) {
      $("#t" + tuileId).css("background-image", "none");
      $("#t" + tuileId + " p").text(pos);
    } else {
      // On charge les autres images non vide;
      var url = 'url("img/0' + pos + '.jpg")';
      $("#t" + tuileId).css("background-image", url);
      $("#t" + tuileId + " p").text(pos);
    }
  }
}

createTuile();
loadImages(STARTINGPOSITION);

function createRandomPosition() {
  var localeRandPostion = [];
  var randValue = alea(0, 16);

  localeRandPostion.push(randValue);
  for (var i = 1; i <= 15; i++) {
    randValue = alea(0, 16);
    // while randValue is in localeRandPostion, we ask another value
    while (localeRandPostion.indexOf(randValue) !== -1) {
      randValue = alea(0, 16);
    }
    // Here we have another value;
    localeRandPostion.push(randValue);
  }

  return localeRandPostion;
}

function neigbhorTilesAccessibles(randomLst, tileNumber) {
  if ([5, 6, 9, 10].indexOf(tileNumber) !== -1) {
    return [
      randomLst[tileNumber - 1],
      randomLst[tileNumber + 1],
      randomLst[tileNumber - 4],
      randomLst[tileNumber + 4],
    ];
  } else if ([1, 2].indexOf(tileNumber) !== -1) {
    return [
      randomLst[tileNumber - 1],
      randomLst[tileNumber + 1],
      randomLst[tileNumber + 4],
    ];
  } else if ([4, 8].indexOf(tileNumber) !== -1) {
    return [
      randomLst[tileNumber - 4],
      randomLst[tileNumber + 4],
      randomLst[tileNumber + 1],
    ];
  } else if ([7, 11].indexOf(tileNumber) !== -1) {
    return [
      randomLst[tileNumber - 4],
      randomLst[tileNumber - 1],
      randomLst[tileNumber + 4],
    ];
  } else if ([13, 14].indexOf(tileNumber) !== -1) {
    return [
      randomLst[tileNumber - 1],
      randomLst[tileNumber + 1],
      randomLst[tileNumber - 4],
    ];
  } else if (tileNumber == 0)
    return [randomLst[tileNumber + 1], randomLst[tileNumber + 4]];
  else if (tileNumber == 3)
    return [randomLst[tileNumber - 1], randomLst[tileNumber + 4]];
  else if (tileNumber == 12)
    return [randomLst[tileNumber - 4], randomLst[tileNumber + 1]];
  else if (tileNumber == 15)
    return [randomLst[tileNumber - 1], randomLst[tileNumber - 4]];
}

function isThereVoidTile(neighborTiles) {
  if (neighborTiles.indexOf(15) !== -1) {
    return true;
  } else {
    return false;
  }
}

function swap(tileNumber, voidTileNumber) {
  const tempPNumber = $("#t" + tileNumber + " p").text();
  const tmpURLimg = 'url("img/0' + tempPNumber + '.jpg")';
  console.log(tmpURLimg);

  // we proced to the swap
  $("#t" + tileNumber).css("background-image", "none");
  $("#t" + tileNumber + " p").text(15);

  $("#t" + voidTileNumber).css("background-image", tmpURLimg);
  $("#t" + voidTileNumber + " p").text(tempPNumber);

  randPosition[voidTileNumber] = randPosition[tileNumber];
  randPosition[tileNumber] = 15;
}

$("#shuffle").click(function () {
  // console.log(randPosition);
  randPosition = createRandomPosition();
  loadImages(randPosition);
  // var shuffleAudio = new Audio("sounds/tile-shuffle.mp3");
  // shuffleAudio.play();
  startTimer();
  this.style.display = "none";
  $("#game-state").text("Le jeu est en cours...");
});

function gameIsEnd(randomLst) {
  for (let i = 0; i < randomLst.length; i++) {
    if (randomLst[i] !== STARTINGPOSITION[i]) {
      return false;
    }
  }
  return true;
}

$(".tuile").click(function () {
  if (gameIsEnd(randPosition)) {
    $("#output").text("Puzzle soved!");
    console.log("You solved the puzzle");
    return;
  } else {
    var songPath = "sounds/click-song.wav";
    var audio = new Audio(songPath);
    audio.play();
    const attrId = $(this).attr("id");
    const tileNumber = Number(attrId.slice(1, attrId.length));
    // console.log(randPosition);
    // console.log("tile number : ", tileNumber);
    const neigbhorTiles = neigbhorTilesAccessibles(randPosition, tileNumber);
    if (isThereVoidTile(neigbhorTiles)) {
      let voidTileNumber = randPosition.indexOf(15);
      // console.log(voidTileNumber);
      swap(tileNumber, voidTileNumber);
      console.log(randPosition);
    }
    // console.log(neigbhorTiles);
    // console.log("Is there void tile : ", isThereVoidTile(neigbhorTiles));
  }
});
