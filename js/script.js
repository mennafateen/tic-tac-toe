var tiles = document.getElementsByClassName("tile"); // array of tiles in order appeared in the html
var buttons = document.getElementsByClassName("button");
var state = [0,0,0,0,0,0,0,0,0];
var done = false;
var running = true;
var human = false;
var computer = true;
var humanval = -1, compval = 1;
var winBoard = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
];
function reset() {
	for (var i = 0; i < 9; i++) {
		tiles[i].style.background = "#fff";
		state[i] = 0;
	}
	done = false;
	document.getElementById("win").style.color = "#111";
	//p.style.color = "#fff";
	//buttons[0].style.width = "0";
}
function claim(clicked) {
	if (done) return;
	console.log(done);
	for (var i = 0; i < 9; i++) {
		if (tiles[i] == clicked && state[i] == 0) { // ok to claim
			set(i, human);
			callAI();
		}
	}
	for (var i = 0; i < 9; i++) {
		if (state[i] == 0) return;
	}
	document.getElementById("win").innerHTML = "Phew, it's a tie!";
	document.getElementById("win").style.color = "#fff";
}

function set(index, player) {
	console.log("hello from" + player);	
	if (done) return;
	if (state[index] == 0) {
		if (player == human) {
			tiles[index].style.background = "#ffb6c1"; 
			state[index] = humanval;
		}
		else if (player == computer) {
			tiles[index].style.background = "#999";
			state[index] = compval;
		}
		if (checkWin(state, player)) {
			done = true;
			document.getElementById("win").innerHTML = "Snooze, you lose!";
			document.getElementById("win").style.color = "#fff";

		}
	}
}

function callAI() {
	aiturn(state, 0, computer);

}

function checkWin(board, player) {
	var value = player == human ? humanval : compval;
	for (var i = 0; i < 8; i++) {
		var win = true;
		for (var j = 0; j < 3; j++) {
			if (board[winBoard[i][j]] != value) {
				win = false;
				break;
			}
		}
		if (win) return true;
	} 
	return false;
}

function checkFull(board) {
	for (var i = 0; i < 9; i++) {
		if (board[i] == 0) 
			return false;
	}
	return true;
}

function aiturn(board, depth, player) {
	if (checkWin(board, !player)) return depth - 10;
	if (checkFull(board)) return 0;
	var value = player == human ? humanval : compval;
	
	var max = -Infinity;
	var index = 0;
	
	for (var i = 0; i < 9; i++) {
		if (board[i] == 0) {
			var newboard = board.slice(); // copy of current board;
			newboard[i] = value;

			var moveval = -aiturn(newboard, depth + 1, !player);

			if (moveval > max) {
				max = moveval;
				index = i;
			}
		}
	}

	if (depth == 0)
		set(index, computer);
	return max;
}
//w/ kpkiller tutorial help