let board = [[' ', ' ', ' ', ' ', ' ', ' ', ' '],
 [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
   [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
     [' ', ' ', ' ', ' ', ' ', ' ', ' ']];
let currentPlayer = '1';
let isGameFinished = 0;
let freeCells = 0;
let winner = '-';
let contFreeCell = 0;
let numRows = 6;
let numColumns = 7;
let numPairs = 4;
window.onload = function() {
	let player = document.getElementById('player');
	let joc = document.getElementById('joc');
	let message = "Anticipate the teammate's moves!";
	let alert = document.getElementById('alertMessage'); // gets the div element with the id "alert" (from index.html)
	let board = "";
	for (let i = 0; i < numRows; ++i) {
		board += '<div class = "same-line">';
		for (let j = 0; j < numColumns; ++j) {
			board += '<div class = "cell" id  = "' + i + j + '" onclick="place(' + i + ', ' + j + ')" ></div>';
		}
		board += '</div>';
	}
	player.innerHTML = currentPlayer;
	joc.innerHTML = board;
	alert.innerHTML = message;
	alertMessage.classList.add("show");
};

function place(i, j) {
	let count = 0;
	let test;  // it saves the element found most often (ie 3 times or 3 valid numPairss after consecutive comparisons)
	if (isGameFinished) {
		message = "GAME OVER";
		showAlert(message);
		return;
	}
	if (board[i][j] != ' ') {
		message = "The cell is already occupied!";
		showAlert(message);
		return;
	}
	if (i < 5 && board[i + 1][j] == ' ') {
		message = "Illegal move!";
		showAlert(message);
		return;
	}
	board[i][j] = currentPlayer;
	const cell = document.getElementById(`${i}${j}`); // Apply player color to the selected cell
	if (currentPlayer == '1') {
		cell.classList.add("blue");
    currentPlayer = '2';
    player.innerHTML = currentPlayer;
	} else {
    cell.classList.add("red");
    currentPlayer = '1';
    player.innerHTML = currentPlayer;
	}
  cell.innerHTML = board[i][j];
  gameFinished();
}

function showAlert() {
	alert = document.getElementById('alertMessage');
	alert.innerHTML = message;
	alertMessage.classList.add("show");
	// hide the message after a few seconds
  setTimeout(function() {
  alertMessage.classList.remove("show");
  }, 2000);
}

function checkLines() {
	mainDiagOne();
	mainDiagTwo();
	secondDiagOne();
	secondDiagTwo();
	horzCheck();
	vertCheck();
}

function mainDiagOne() {
	//  The main diagonal 0.0 -> 5.5 and two parallels down 1.0 -> 5.4 / 2.0 -> 5.3 are traversed
  for (let x = 0; x < 3; ++x) {
    count = 0;
    test = 3; 
    for (let i = x; i < numRows; ++i) {
      let j = i - x;
      if (board[i][j] != ' ') {       // we look for the first element (0,0) and if it exists, we check it
        if (test == board[i][j]) {  // on the first search, we save the first element found when traversing the board on the main diagonal
                                    //  and on the second valid search we check if the next element is found immediately
                                  // is equal to the previous element (in the beginning 'test'=3, a value different from '1' and '2' sought)
        ++count;      //  it means that I found the first element of the 3 comparisons
        } else {      // if the next element is different from the initial one
          count = 0;  // the counter is reset if a different element appears
          test = board[i][j];  // and the found element is saved for the next comparison...
        }                      //...the first element and subsequently the others equal in wave to the first
      } else {          // if the next element does not have the value '1' or '2' (it is empty space), then
        count = 0;    // the counter is reset for a new search
        test = 3;     // 'test' is reset (it returns to the default value for 'test')
      }
      if (count == 3) {  // if we have 3 successive valid comparisons
        winner = test;  // we also have the value of the winner (element '1 or '2)
      }
    }
  }
}

function mainDiagTwo() {
  //  The second main diagonal is traversed 0.1 -> 5.6 and two parallels upwards 0.2 -> 4.6 / 0.3 -> 3.6
  for (let x = 1; x < numPairs; ++x) {
    count = 0;
    let test = 3;
    for (let i = 0; i <= numRows - x; ++i) {
      let j = i + x;
      if (board[i][j] != ' ') {
        if (test == board[i][j]) {
        ++count;
        } else {
          count = 0;
          test = board[i][j];
        }
      } else {
        count = 0;
        test = 3;
      }
      if (count == 3) {
        winner = test;
      }
    }
  }
}

function secondDiagOne() {
//  Cross the secondary diagonal 0.6 -> 5.1 and two parallels down 1.6 -> 5.2 / 2.6 -> 5.3
  for (let x = 0; x < 3; ++x) {
    count = 0;
    let c = x;
    let test = 3;  
    for (let i = x; i < numRows; ++i) {
      let j = numRows - i + x;
      a = i;
      b = j;
      if (board[i][j] != ' ') {
        if (test == board[i][j]) {
        ++count;
        } else {
          count = 0;
          test = board[i][j];
        } 
      } else {
        count = 0;
        test = 3;
      }
      if (count == 3) {
        winner = test;
      }
    }
  }
}

function secondDiagTwo() {
  //  The second secondary diagonal 0.5 -> 5.0 is traversed and two parallels upwards 0.4 -> 4.0 / 0.3 -> 3.0
  for (let x = 1; x < numRows; ++x) {
    count = 0;
    let test = 3;
    for (let i = 0; i <= numRows - x; ++i) {
      let j = numRows - i - x;
      if (board[i][j] != ' ') {
        if (test == board[i][j]) {
        ++count;
        } else {
          count = 0;
          test = board[i][j];
        }
      } else {
        count = 0;
        test = 3;
      }
      if (count == 3) {
        winner = test;
      }
    }
  }
}

function horzCheck() {
    // The elements of the game board are checked horizontally
    for (let i = 0; i < numRows; ++i) {
		for (let z = 0; z < numPairs; ++z) {
			count = 0;
			for (let j = z + 1; j <= 3 + z; ++j) {
				if (board[i][z] == board[i][j] && board[i][z] != ' ') {
					++count;
				}
			}
			if (count == 3) {
				winner = board[i][z];
			}
		}
	}
}

function vertCheck() {
	//The elements of the game board are checked vertically
	for (let j = 0; j < numColumns; ++j) {
		for (let z = 0; z < 3; ++z) {
			count = 0;
			for (let i = z + 1; i <= 3 + z; ++i) {
				if (board[z][j] == board[i][j] && board[z][j] != ' ') {
					++count;
				}
			}
			if (count == 3) {
				winner = board[z][j];
			}
		}
	}
}

function cellLeft() {
	// The entire game board is scanned and checked to see if there are any free positions
	freeCells = 0;
	for (let i = 0; i < numRows; ++i) {
		for (let j = 0; j < numColumns; ++j) {
			if (board[i][j] == ' ') {
				freeCells = 1;
			}
		}
	}
}

function gameFinished() {
	checkLines();
	if (winner == '1') {
		isGameFinished = 1;
		message = "Player 1 WON";
		showAlert(message);
		return;
	}
	if (winner == '2') {
		isGameFinished = 1;
		message = "Player 2 WON";
		showAlert(message);
		return;
	}
	cellLeft();
	if (freeCells == 0) {
		isGameFinished = 1;
		message = "Moves unavailable!";
		alert = document.getElementById('alertMessage');
		alert.innerHTML = message;
		alertMessage.classList.add("show");
		return;
	}
}
