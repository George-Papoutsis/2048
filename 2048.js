let classes = [
  "game-space_2",
  "game-space_4",
  "game-space_8",
  "game-space_16",
  "game-space_32",
  "game-space_64",
  "game-space_128",
  "game-space_256",
  "game-space_512",
  "game-space_1024",
  "game-space_2048",
];

let squares_from_html = document.querySelectorAll(".game-space_board-square");
let score = document.querySelector(".options_score-count");
let best_score = document.querySelector(".options_best-score-count");
const new_game_btn = document.querySelector(".options_new-game");
const left_btn = document.querySelector(".controls_left");
const right_btn = document.querySelector(".controls_right");
const top_btn = document.querySelector(".controls_top");
const down_btn = document.querySelector(".controls_down");
let start_of_game = false;
let score_count = 0;
let final_screen = document.querySelector(".final_screen");
let play_again = document.getElementById("playAgain_btn");
let message = document.querySelector(".message");
let final_score = document.querySelector(".final_score");

//setup the board as a 2d array
let squares = [
  [
    squares_from_html[0],
    squares_from_html[1],
    squares_from_html[2],
    squares_from_html[3],
  ],
  [
    squares_from_html[4],
    squares_from_html[5],
    squares_from_html[6],
    squares_from_html[7],
  ],
  [
    squares_from_html[8],
    squares_from_html[9],
    squares_from_html[10],
    squares_from_html[11],
  ],
  [
    squares_from_html[12],
    squares_from_html[13],
    squares_from_html[14],
    squares_from_html[15],
  ],
];

//event listeners
new_game_btn.addEventListener("click", setupBoard);
left_btn.addEventListener("click", move);
right_btn.addEventListener("click", move);
top_btn.addEventListener("click", move);
down_btn.addEventListener("click", move);
play_again.addEventListener("click", playAgain);

function playAgain() {
  final_screen.classList.toggle("show");
  final_screen.classList.toggle("hidden");
  final_screen.classList.remove("win_screen");
  final_screen.classList.remove("loose_screen");
  setupBoard();
}

//clear the board
function setupBoard() {
  start_of_game = true;
  //clear board
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares.length; j++) {
      for (let k = 0; k < classes.length; k++) {
        squares[i][j].classList.remove(classes[k]);
      }
    }
  }

  //place 2 starting squares
  let positions = getPositions();

  start_of_game = false;

  squares[positions[0]][positions[1]].classList.add(
    classes[Math.floor(Math.random() * 2)]
  );
  squares[positions[2]][positions[3]].classList.add(
    classes[Math.floor(Math.random() * 2)]
  );
  score_count = 0;
  score.innerText = score_count;
}

function getPositions() {
  let row1 = Math.floor(Math.random() * 4);
  let col1 = Math.floor(Math.random() * 4);
  if (start_of_game) {
    let row2 = Math.floor(Math.random() * 4);
    let col2 = Math.floor(Math.random() * 4);
    if (row1 == row2 && col1 == col2) {
      return getPositions();
    }
    return [row1, col1, row2, col2];
  } else {
    if (squares[row1][col1].classList.length > 1) {
      return getPositions();
    }
    return [row1, col1];
  }
}

//spawn a new square
function spawnSquare() {
  let position = getPositions();
  squares[position[0]][position[1]].classList.add(
    classes[Math.floor(Math.random() * 2)]
  );
}

//move the squares
function move() {
  if (this == left_btn) {
    for (let i = 0; i < squares.length; i++) {
      for (let j = 1; j < squares.length; j++) {
        if (squares[i][j].classList.length > 1) {
          for (let k = j; k > 0; k--) {
            if (squares[i][k - 1].classList.length == 1) {
              squares[i][k - 1].classList.add(squares[i][k].classList[1]);
              squares[i][k].classList.remove(squares[i][k].classList[1]);
            }
            if (squares[i][k - 1].classList.length > 1) {
              if (
                squares[i][k - 1].classList[1] == squares[i][k].classList[1]
              ) {
                squares[i][k - 1].classList.add(
                  classes[classes.indexOf(squares[i][k].classList[1]) + 1]
                );
                squares[i][k - 1].classList.remove(squares[i][k].classList[1]);
                squares[i][k].classList.remove(squares[i][k].classList[1]);
                score_count += Math.pow(
                  2,
                  classes.indexOf(squares[i][k - 1].classList[1]) + 1
                );
              }
            }
          }
        }
      }
    }
  } else if (this == right_btn) {
    for (let i = 0; i < squares.length; i++) {
      for (let j = 2; j >= 0; j--) {
        if (squares[i][j].classList.length > 1) {
          for (let k = j; k < 3; k++) {
            if (squares[i][k + 1].classList.length == 1) {
              squares[i][k + 1].classList.add(squares[i][k].classList[1]);
              squares[i][k].classList.remove(squares[i][k].classList[1]);
            }
            if (squares[i][k + 1].classList.length > 1) {
              if (
                squares[i][k + 1].classList[1] == squares[i][k].classList[1]
              ) {
                squares[i][k + 1].classList.add(
                  classes[classes.indexOf(squares[i][k].classList[1]) + 1]
                );
                squares[i][k + 1].classList.remove(squares[i][k].classList[1]);
                squares[i][k].classList.remove(squares[i][k].classList[1]);
                score_count += Math.pow(
                  2,
                  classes.indexOf(squares[i][k + 1].classList[1]) + 1
                );
              }
            }
          }
        }
      }
    }
  } else if (this == top_btn) {
    for (let i = 1; i < squares.length; i++) {
      for (let j = 0; j < squares.length; j++) {
        if (squares[i][j].classList.length > 1) {
          for (let k = i; k > 0; k--) {
            if (squares[k - 1][j].classList.length == 1) {
              squares[k - 1][j].classList.add(squares[k][j].classList[1]);
              squares[k][j].classList.remove(squares[k][j].classList[1]);
            }
            if (squares[k - 1][j].classList.length > 1) {
              if (
                squares[k - 1][j].classList[1] == squares[k][j].classList[1]
              ) {
                squares[k - 1][j].classList.add(
                  classes[classes.indexOf(squares[k][j].classList[1]) + 1]
                );
                squares[k - 1][j].classList.remove(squares[k][j].classList[1]);
                squares[k][j].classList.remove(squares[k][j].classList[1]);
                score_count += Math.pow(
                  2,
                  classes.indexOf(squares[k - 1][j].classList[1]) + 1
                );
              }
            }
          }
        }
      }
    }
  } else if (this == down_btn) {
    for (let i = 2; i >= 0; i--) {
      for (let j = 0; j < squares.length; j++) {
        if (squares[i][j].classList.length > 1) {
          for (let k = i; k < 3; k++) {
            if (squares[k + 1][j].classList.length == 1) {
              squares[k + 1][j].classList.add(squares[k][j].classList[1]);
              squares[k][j].classList.remove(squares[k][j].classList[1]);
            }
            if (squares[k + 1][j].classList.length > 1) {
              if (
                squares[k + 1][j].classList[1] == squares[k][j].classList[1]
              ) {
                squares[k + 1][j].classList.add(
                  classes[classes.indexOf(squares[k][j].classList[1]) + 1]
                );
                squares[k + 1][j].classList.remove(squares[k][j].classList[1]);
                squares[k][j].classList.remove(squares[k][j].classList[1]);
                score_count += Math.pow(
                  2,
                  classes.indexOf(squares[k + 1][j].classList[1]) + 1
                );
              }
            }
          }
        }
      }
    }
  }
  score.innerText = score_count;
  if (best_score.innerText < score_count) {
    best_score.innerText = score_count;
  }
  spawnSquare();
  let status = checkGameStatus();
  let answer = game_over(status);
}

//check for game over
function checkGameStatus() {
  let game_over = true;
  let game_win = false;

  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares.length; j++) {
      //check if there is a 2048 square
      if (squares[i][j].classList.length > 1) {
        if (squares[i][j].classList[1] == classes[10]) {
          game_win = true;
          game_over = false;
          return [game_over, game_win];
        }
      }
    }
  }

  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares.length; j++) {
      //if there is an empty square, game continues
      if (squares[i][j].classList.length == 1) {
        game_over = false;
        break;
      }
    }
  }
  //check for matches horizontally
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < 3; j++) {
      //if the square is not empty and the one beside it is also not empty, check if they are the same
      if (
        squares[i][j].classList.length > 1 &&
        squares[i][j + 1].classList.length > 1
      ) {
        if (squares[i][j].classList[1] == squares[i][j + 1].classList[1]) {
          game_over = false;
          break;
        }
      }
    }
  }

  //check for matches vertically
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < squares.length; j++) {
      //if the square is not empty and the one below it is also not empty, check if they are the same
      if (
        squares[i][j].classList.length > 1 &&
        squares[i + 1][j].classList.length > 1
      ) {
        if (squares[i][j].classList[1] == squares[i + 1][j].classList[1]) {
          game_over = false;
          break;
        }
      }
    }
  }

  return [game_over, game_win];
}

//display game over screen
function game_over(status) {
  if (status[1]) {
    message.innerText = "You Win!";
    final_score.innerText = score_count;
    final_screen.classList.toggle("win_screen");
    final_screen.classList.toggle("show");
    final_screen.classList.toggle("hidden");
  }
  if (status[0]) {
    message.innerText = "Game Over";
    final_score.innerText = score_count;
    final_screen.classList.toggle("loose_screen");
    final_screen.classList.toggle("show");
    final_screen.classList.toggle("hidden");
  }
}

//start the game
setupBoard();
