// geting canvas by Boujjou Achraf
let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");

//making the canvas full screen
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//chinese characters - taken from the unicode charset
let matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
//converting the string into an array of single characters
matrix = matrix.split("");

let fontSize = 10;
let columns = canvas.width / fontSize; //number of columns for the rain
//an array of drops - one per column
let drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for (let x = 0; x < columns; x++)
  drops[x] = 1;

//drawing the characters
const draw = function() {
//Black BG for the canvas
  //translucent BG to show trail
  canvasContext.fillStyle = "rgba(0, 0, 0, 0.04)";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = "#f4427d";//green text
  canvasContext.font = fontSize + "px arial";
  //looping over drops
  for (let i = 0; i < drops.length; i++) {
    //a random chinese character to print
    let text = matrix[Math.floor(Math.random() * matrix.length)];
    //x = i * fontSize, y = value of drops[i]*fontSize
    canvasContext.fillText(text, i * fontSize, drops[i] * fontSize);
    //sending the drop back to the top randomly after it has crossed the screen
    //adding a randomness to the reset to make the drops scattered on the Y axis
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    //incrementing Y coordinate
    drops[i]++;
  }
};

setInterval(draw, 35);
