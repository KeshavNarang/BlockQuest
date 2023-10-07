let game = document.getElementById("game");
game.width = Math.min(0.75 * window.innerWidth, 0.75 * 8 * window.innerHeight / 4);
game.height = Math.min(0.75 * window.innerHeight, 0.75 * 4 * window.innerWidth / 8);

let pen = game.getContext("2d");

let blurryIndex = window.devicePixelRatio;
function fixBlurryIndex() {
  let blurryHeight = getComputedStyle(game).getPropertyValue("height").slice(0, -2);
  let blurryWidth = getComputedStyle(game).getPropertyValue("width").slice(0, -2);

  game.setAttribute('height', blurryHeight * blurryIndex);
  game.setAttribute('width', blurryWidth * blurryIndex);
}

// Define block colors
const brown = "#8B2D19";
const green = "#59F440";
const yellow = "#FFFF00";

// Create brown blocks
let brownBlocks = [];
for (let i = 0; i < 8; i++) {
  let x = Math.random() * game.width;
  let y = Math.random() * game.height;
  let size = Math.min(game.width / 8, game.height / 8);
  let block = new Block(brown, x, y, size, size / 10);
  brownBlocks.push(block);
}

// Create green blocks
let greenBlocks = [];
for (let i = 0; i < 2; i++) {
  let x = Math.random() * game.width;
  let y = Math.random() * game.height;
  let size = Math.min(game.width / 8, game.height / 8);
  let block = new PlayerBlock(green, x, y, size, size / 10);
  greenBlocks.push(block);
}

// Create yellow block
let yellowBlock = new Block(yellow, 0, game.height - (game.height / 8), game.width / 8, game.height / 8);

animate();
function animate() {
  let w = game.width;
  let h = game.height;

  requestAnimationFrame(animate);
  pen.clearRect(0, 0, w, h);

  if (innerWidth < 350 || innerHeight < 150 || innerWidth <= innerHeight) {
    // Handle this case if needed.
  } else {
    for (let i = 0; i < brownBlocks.length; i++) {
      brownBlocks[i].resize(w / 8);
      brownBlocks[i].reposition(w / pw, h / ph);
      brownBlocks[i].roundRect();
    }

    for (let i = 0; i < greenBlocks.length; i++) {
      greenBlocks[i].resize(w / 8);
      greenBlocks[i].reposition(w / pw, h / ph);
      greenBlocks[i].accelerate();
      greenBlocks[i].decelerate();
      greenBlocks[i].collisions();
      greenBlocks[i].move();
      greenBlocks[i].roundRect();
    }

    yellowBlock.resize(w / 8);
    yellowBlock.reposition(w / pw, h / ph);
    yellowBlock.roundRect();

    pw = game.width;
    ph = game.height;
  }
}