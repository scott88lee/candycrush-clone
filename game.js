var gameChar = ['@', 'X', 'A', 'M'];
var shadowBoard = [];
var hMatch = []; //Hmatch vs Vmatch
var vMatch = []; //
var move = [];

function generateBoard(size) {  //Dynamically generate board
  for (var i=0; i<size; i++) {
    
    shadowBoard.push([]);

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
}

function updateDisplay(){
  var divList = document.querySelectorAll('div');
  for (var i=0; i<shadowBoard.length; i++){
    for (var k=0; k<shadowBoard[i].length; k++){
      divList[(i*5)+k].textContent = shadowBoard[i][k];
    }
  }
}

function randomizeShadowBoard(){
  for (var i=0; i<shadowBoard.length; i++){
    for (var k=0; k<shadowBoard[i].length; k++){
      shadowBoard[i][k] = gameChar[Math.floor(Math.random() * 4)];
    }
  }
}

function game() {
 console.log('Hey');
}

function checkBoard(){
  //check row
  for (var i=0; i<shadowBoard.length; i++){
    for (var k=0; k<shadowBoard.length-2; k++){
      if (shadowBoard[i][k] == shadowBoard[i][k+1] && shadowBoard[i][k+1] == shadowBoard[i][k+2]){
        hMatch.push([i,k]);
      }
    }
  }

  for (var i=0; i<shadowBoard.length-2; i++){
    for (var k=0; k<shadowBoard.length; k++){
      if (shadowBoard[i][k] == shadowBoard[i+1][k] && shadowBoard[i+1][k] == shadowBoard[i+2][k]){
        vMatch.push([i,k]);
      }
    }
  }
}  


generateBoard(5); 

