const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
p1wins = 0;
p2wins = 0;
game = false;
function run(){
  draw(0,0,p1wins,p2wins)
  if (!game){
    guesses = document.getElementById("guess").value
    turn = 0;
    p1scr = 0;
    p2scr = 0;
    game = true;
    window.requestAnimationFrame(go);
  }
}
function draw(p1scr,p2scr,p1wins,p2wins){
  context.fillStyle = "#fadf7f";
  context.fillRect(0,0,canvas.width,canvas.height)

  context.fillStyle = "#403f4c";
  context.font = "bold " + canvas.width/12 +"px Arial";

  context.textBaseline="hanging";
  context.textAlign="start";
  context.fillText("Player 1: " + p1scr,0,0)
  context.textBaseline="bottom";
  context.fillText("Player 1: " + p1wins,0,canvas.height)

  context.textBaseline="hanging";
  context.textAlign="end";
  context.fillText("Player 2: " + p2scr,canvas.width,0)
  context.textBaseline="bottom";
  context.fillText("Player 2: " + p2wins,canvas.width,canvas.height)
}
function coin(x,y,face){
  context.beginPath();
  context.arc(x, y, canvas.width/6, 0, 2 * Math.PI, false);
  context.fill();
  context.fillStyle = "#eafdf8";
  context.textBaseline="middle";
  context.textAlign="center";
  context.font = "bold " + canvas.width/6 +"px Arial";
  context.fillText(face,x,y)
}
function flip(){
  return Math.floor(Math.random()*2) == 0 ? "T" :"H";
}
function go(){
  draw(p1scr,p2scr,p1wins,p2wins)
  if (turn == 0){
    result = flip()
    coin(canvas.width/2,canvas.height/2,result)
    if(result == "H"){
      p1scr++
    }
  } else if (turn == 1) {
    failed = false
      for (i = 0;i <= guesses;i++){
        result = flip()
        if (result == "T"){
          failed=true
        }
      }
      if(!failed){
        p2scr += Math.pow(2,guesses-1)
      }
    }

  turn = 1 - turn
  if (p1scr > 100){
    p1wins++
    draw(p1scr,p2scr,p1wins,p2wins)
    coin(canvas.width/2,canvas.height/2,1)
    game = false
  } else if (p2scr > 100){
    p2wins++
    draw(p1scr,p2scr,p1wins,p2wins)
    coin(canvas.width/2,canvas.height/2,2)
    game = false
  }
  if (game){
    window.requestAnimationFrame(go);
  }
}
draw(0,0,p1wins,p2wins)
coin(canvas.width/2,canvas.height/2,flip())
