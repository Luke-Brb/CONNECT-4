var board = [[' ', ' ', ' ', ' ', ' ', ' ', ' '],
 [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
   [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
     [' ', ' ', ' ', ' ', ' ', ' ', ' ']];
var currentPlayer = '1';
var isGameFinished = 0;

window.onload = function() {
	var player = document.getElementById('player');
	var joc = document.getElementById('joc');
	var board = "";
	for (var i = 0; i < 6; ++i) {
		board += '<div class = "same-line">';
		for (var j = 0; j < 7; ++j) {
			board += '<div class = "cell" id  = "' + i + j + '" onclick="place(' + i + ', ' + j + ')" ></div>';
		}
		board += '</div>'; 
	}
	player.innerHTML = currentPlayer;
	joc.innerHTML = board;
};
function place(i, j) {
	if (isGameFinished) {
		alert("GAME OVER");
		return;
	}
	if (board[i][j] != ' ') {
		alert("The cell is already occupied!");
		return;
	}
	if (i < 5 && board[i + 1][j] == ' ') {
		alert("Illegal move!");
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
function gameFinished() {
	var winner = '-';
	var freeCells = 0;
	var count = 0;
	var test;  // it saves the element found most often (ie 3 times or 3 valid pairs after consecutive comparisons)

	//  The main diagonal 0.0 -> 5.5 and two parallels down 1.0 -> 5.4 / 2.0 -> 5.3 are traversed
  	for (var x = 0; x < 3; ++x) {  
	    count = 0;
	    test = 3; 
	    for (var i = x; i < 6; ++i) {
	      	var j = i - x;
	      	if (board[i][j] != ' ') {  // we look for the first element (0,0) and if it exists, we check it
	        	if (test == board[i][j]) {  // on the first search, we save the first element found when traversing the board on the main diagonal
	        	                            //  and on the second valid search we check if the next element is found immediately
	        		                        // is equal to the previous element (in the beginning 'test'=3, a value different from '1' and '2' sought)
	        	++count;    //  it means that I found the first element of the 3 comparisons
		        } else {      // if the next element is different from the initial one
		          count = 0;  // the counter is reset if a different element appears
		          test = board[i][j];  // and the found element is saved for the next comparison...
		        }                      //...the first element and subsequently the others equal in wave to the first
	      	} else {        // if the next element does not have the value '1' or '2' (it is empty space), then
	        	count = 0;    // the counter is reset for a new search
	        	test = 3;     // 'test' is reset (it returns to the default value for 'test')
	      	}
	      	if (count == 3) {  // if we have 3 successive valid comparisons
	        	winner = test;  // we also have the value of the winner (element '1 or '2)
	        }
	    }
    }
    //  The second main diagonal is traversed 0.1 -> 5.6 and two parallels upwards 0.2 -> 4.6 / 0.3 -> 3.6
    for (var x = 1; x < 4; ++x) {  
	    count = 0;
	    var test = 3;  
	    for (var i = 0; i <= 6 - x; ++i) {
	      	var j = i + x;
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
    //  Cross the secondary diagonal 0.6 -> 5.1 and two parallels down 1.6 -> 5.2 / 2.6 -> 5.3
    for (var x = 0; x < 3; ++x) {  
	    count = 0;
	    var c = x;
	    var test = 3;  
	    for (var i = x; i < 6; ++i) {
	      	var j = 6 - i + x;
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
    //  The second secondary diagonal 0.5 -> 5.0 is traversed and two parallels upwards 0.4 -> 4.0 / 0.3 -> 3.0
    for (var x = 1; x < 4; ++x) {  
	    count = 0;
	    var test = 3; 
	    for (var i = 0; i <= 6 - x; ++i) {
	      	var j = 6 - i - x;
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
    // The elements of the game board are checked horizontally
    for (var i = 0; i < 6; ++i) {   
		for (var z = 0; z < 4; ++z) {     
			count = 0;                    
			for (var j = z + 1; j <= 3 + z; ++j) {
				if (board[i][z] == board[i][j] && board[i][z] != ' ') {
					++count;
				}
			}
			if (count == 3) {
				winner = board[i][z];
			}
		}
	}
	//The elements of the game board are checked vertically
	for (var j = 0; j < 7; ++j) {           
		for (var z = 0; z < 3; ++z) {
			count = 0;
			for (var i = z + 1; i <= 3 + z; ++i) {
				if (board[z][j] == board[i][j] && board[z][j] != ' ') {
					++count;
				}
			}
			if (count == 3) {
				winner = board[z][j];
			}
		}
	}
	// The entire game board is scanned and checked to see if there are any free positions
	for (var i = 0; i < 6; ++i) {
		for (var j = 0; j < 7; ++j) {
			if (board[i][j] == ' ')  {
				freeCells = 1;
			}
		}
	}
	if (winner == '1') {
		isGameFinished = 1;
		alert("Player 1 a castigat");
		return;
	}
	if (winner == '2') {
		isGameFinished = 1;
		alert("Player 2 a castigat");
		return;
	}
	if (freeCells == 0) {
		isGameFinished = 1;
	}
}