var gameChar = ['@', 'X', 'A', 'M'];
var shadowBoard = [];
var hMatch = []; //Hmatch vs Vmatch
var vMatch = []; //
var move = [];

function generateBoard(size) {  //Dynamically generate board
  for (var i=0; i<size; i++) {
    
    shadowBoard.push([]);  // [[A,@,X,M,A],[]]

    for (var k=0; k<size; k++) {

      //Box factory
      var box = document.createElement('div');
      
      box.row = i;
      box.col = k;
      box.gameValue = gameChar[Math.floor(Math.random() * 4)];
      shadowBoard[i].push(box.gameValue);
      
      box.style.display = "inline-block";
      box.style.border = "2px solid black";
      box.style.height = "100px";
      box.style.width = "100px";
      box.textContent = box.gameValue;
      document.body.appendChild(box);

      //Adds listeners to every button
      box.addEventListener('click', game);
    }
    var br = document.createElement('br');
    document.body.appendChild(br);
    //Creates break for the next row
  }
  game();
}

function updateDisplay(){
  var divList = document.querySelectorAll('div');
  for (var i=0; i<shadowBoard.length; i++){
    for (var k=0; k<shadowBoard[i].length; k++){
      divList[(i*5)+k].textContent = shadowBoard[i][k];
    }
  }
}

function randomizeBoard(){
  for (var i=0; i<shadowBoard.length; i++){
    for (var k=0; k<shadowBoard[i].length; k++){
      //if (shadowBoard[i][k] == ' '){
        shadowBoard[i][k] = gameChar[Math.floor(Math.random() * 4)];
      //}
    }
  }
}

function fillHoles(){
  for (var i=0; i<shadowBoard.length; i++){
    for (var k=0; k<shadowBoard[i].length; k++){
      if (shadowBoard[i][k] == ' '){
        shadowBoard[i][k] = gameChar[Math.floor(Math.random() * 4)];
        vMatch = [];
        hMatch = [];
      }
    }
  }
}

function game() {
  if (move.length < 2){
    move.push([this.row,this.col]);
    console.log(move);
  } else if (move.length == 2){
    console.log(move);
    var tempX = shadowBoard[move[0][0]][move[0][0]];
    var tempY = shadowBoard[move[0][0]][move[0][1]];
    shadowBoard[move[0][0]][move[0][0]] = shadowBoard[move[1][0]][move[1][0]];
    shadowBoard[move[0][0]][move[0][1]] = shadowBoard[move[1][0]][move[1][1]];
    shadowBoard[move[1][0]][move[1][0]] = tempX;
    shadowBoard[move[1][0]][move[1][1]] = tempY;
    move = [];
  }

  do {
    checkBoard();
    clearMatches();
    updateDisplay();
    fillHoles();
    setTimeout(updateDisplay, 400);
  } while ( checkBoard() );
}

function checkBoard(){
  //check row
  for (var i=0; i<shadowBoard.length; i++){
    for (var k=0; k<shadowBoard.length-2; k++){
      if (shadowBoard[i][k] == shadowBoard[i][k+1] && shadowBoard[i][k+1] == shadowBoard[i][k+2]){
        hMatch.push([i,k]);
        return true;
      }
    }
  }

  for (var i=0; i<shadowBoard.length-2; i++){
    for (var k=0; k<shadowBoard.length; k++){
      if (shadowBoard[i][k] == shadowBoard[i+1][k] && shadowBoard[i+1][k] == shadowBoard[i+2][k]){
        vMatch.push([i,k]);
        return true;
      }
    }
  }
}  

function clearMatches() {
  for (var i=0; i<hMatch.length; i++){
    shadowBoard[hMatch[i][0]][hMatch[i][1]] = ' ';
    shadowBoard[hMatch[i][0]][hMatch[i][1]+1] = ' ';
    shadowBoard[hMatch[i][0]][hMatch[i][1]+2] = ' ';
  }
  for (var i=0; i<vMatch.length; i++){
    shadowBoard[vMatch[i][0]][vMatch[i][1]] = ' ';
    shadowBoard[vMatch[i][0]+1][vMatch[i][1]] = ' ';
    shadowBoard[vMatch[i][0]+2][vMatch[i][1]] = ' ';
  }
}

generateBoard(5); 

