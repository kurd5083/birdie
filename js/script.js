var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var inner = document.getElementById('results');
var results = 0;

var bird = new Image();
var bg = new Image(); 
var fg = new Image(); 
var pipeUp = new Image(); 
var pipeBottom = new Image(); 

bird.src = "img/bird.png"; 
bg.src = "img/bg.png";
fg.src = "img/fg.png"; 
pipeUp.src = "img/pipeUp.png"; 
pipeBottom.src = "img/pipeBottom.png";

var gap = 150;
var xPos = 10;
var yPos= 150;
var grav = 1;
var speed = 0;
const g = 0.5;
var pipe = [];
pipe[0] = {
    x : 1000,
    y: 0,
}
console.log(pipe)
function draw(){
    speed += g;
    yPos += (speed / 3);

    ctx.drawImage(bg, 0, 0);
for(var i = 0; i < pipe.length; i++){
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    pipe[i].x--
    if(pipe[i].x == 950){
        pipe.push({
            x : cvs.width,
            y : (Math.random() * pipeUp.height) - pipeUp.height,
        }),
        console.log(pipe);
    }
    if(xPos + bird.width > pipe[i].x 
        && xPos < pipe[i].x + pipeUp.width
        && xPos < pipe[i].x + pipeBottom.width
        && (yPos < pipe[i].y + pipeUp.height
        || yPos + bird.height > pipe[i].y + pipeUp.height + gap) 
        || yPos + bird.height > cvs.height - fg.height){   
            location.reload();
        }
    if(pipe[i].x == 5){
        ++results
        inner.innerHTML = results;
    }

}
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    yPos+=grav;
    requestAnimationFrame(draw);

}
document.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
        speed -= 20;
    }
  });

console.log(cvs.width);
console.log(pipeUp.width);
pipeBottom.onload = draw;