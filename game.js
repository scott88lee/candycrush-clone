function generateBoard(rows, cols) {  //Dynamically generate board
  for (var i=0; i<rows; i++) {
    for (var k=0; k<cols; k++) {

      //Box factory
      var box = document.createElement('div');
      
      box.row = i;
      box.col = k;

      box.style.display = "inline-block";
      box.style.border = "2px solid black";
      box.style.height = "100px";
      box.style.width = "100px";
      document.body.appendChild(box);

      //Adds listeners to every button
      box.addEventListener('click', game);
    }
    var br = document.createElement('br');
    document.body.appendChild(br);
    //Creates break for the next row
  }
}

function game() {
  console.log('Hey');
}