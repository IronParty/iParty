var r = [];
var g = [];
var b = [];
var x1 = [];
var y1 = [];
var confettiSize = [];
var confettipaque = [];
var numflakes = 1500;
var d1 = [];

function setup() {
  noStroke();
  if (window.innerWidth > 1000) numflakes = numflakes * 5;

  createCanvas(window.innerWidth, window.innerHeight);
  for (var i = 0; i < numflakes; i++) {
    x1[i] = random(0, window.innerWidth);
    y1[i] = random(-window.innerHeight, 0);
 var col = round(random(0, 2));
             if (col == 0) {r[i] = 255; g[i] = 0; b[i] = 0;}
    if (col == 1) {r[i] = 255; g[i] = 255; b[i] = 255;}
    if (col == 2) {r[i] = 0; g[i] = 0; b[i] = 255;}
    

    confettiSize[i] = random(1, 9);
    d1[i] = random(-4, 4);
    confettipaque[i] = random(90, 255);
  }
}

function draw() {
 
  background(0);
  drawConfetti();
}

function drawConfetti() {
  noStroke();
  for (var i = 0; i < numflakes; i++) {
    fill(r[i], g[i], b[i], confettipaque[i]);
    rect(x1[i], y1[i], confettiSize[i], confettiSize[i]  + random(-5, 1));
  
    y1[i] = y1[i] + random(-1, 20);
    y1[i] = y1[i] + 2;
    x1[i] = x1[i] + d1[i];

    if (y1[i] > window.innerHeight) {
      y1[i] = 0;
    }
    if (x1[i] > window.innerWidth || x1[i] < 0) {
      x1[i] = random(0, window.innerWidth);
    }
  }
}