var canvas=document.querySelector("canvas");
var ctx=canvas.getContext("2d");
canvas.width=500;
canvas.height=500;

var game={
	brickArray:[],
	ballX:50,
	ballY:50,
	ballSpeedX:10,
	ballSpeedY:10,
	score:0,
	barX:canvas.width/2-50,
	barY:canvas.height-10,
	init:function(){
		ctx.fillStyle="lightblue";
		ctx.font="30px Arial";
		this.ballX=50;
		this.ballY=350;
		this.score=0;
		this.ballSpeedX=10;
		this.ballSpeedY=10;
		this.barX=canvas.width/2-50;
		this.barY=canvas.height-20;
		this.brickArray=[{x:20,y:10},{x:140,y:10},{x:260,y:10},{x:380,y:10},{x:80,y:40},{x:200,y:40},{x:320,y:40},{x:140,y:70},{x:260,y:70},{x:200,y:100}];  
	},
	draw:function(){
		ctx.fillRect(this.ballX,this.ballY,10,10);
		ctx.fillRect(this.barX,this.barY,200,10);
		for(var i=0;i<this.brickArray.length;i++){
			ctx.fillRect(this.brickArray[i].x,this.brickArray[i].y,100,20);
		}
		ctx.fill();
	},
	update:function(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillText(this.score,10,canvas.height-10);
		this.ballX+=this.ballSpeedX;
		this.ballY+=this.ballSpeedY;
		this.checkColisionWalls();
		this.checkColisionBricks();
		this.checkColisionBar();
		this.draw();
		//console.log(this.ballX+" "+this.ballY);
	},
	checkColisionWalls:function(){
		if(this.ballX<10)
			this.ballSpeedX=-this.ballSpeedX;
		if(this.ballY<10)
			this.ballSpeedY=-this.ballSpeedY;
		if(this.ballX+20>canvas.width)
			this.ballSpeedX=-this.ballSpeedX;
		if(this.ballY+20>canvas.height)
			this.init();
	},
	checkColisionBricks:function(){
		for(var i=0;i<this.brickArray.length;i++){
			//if((this.ballX==this.brickArray[i].x || this.ballX+50==this.brickArray[i].x) && (this.ballY==this.brickArray[i].y || this.ballY+50==this.brickArray[i].y))
				//alert("lose");
			var b=this.brickArray[i];
			if(this.ballX > b.x && this.ballX < b.x+100 && this.ballY > b.y && this.ballY < b.y+20) {
                this.brickArray.splice(this.brickArray.indexOf(this.brickArray[i]),1);
                this.ballSpeedY=-this.ballSpeedY;
                this.score+=10;
                if(this.brickArray==0)
                	this.brickArray=[{x:20,y:10},{x:140,y:10},{x:260,y:10},{x:380,y:10},{x:80,y:40},{x:200,y:40},{x:320,y:40},{x:140,y:70},{x:260,y:70},{x:200,y:100}];  
            }
		}
	},
	checkColisionBar:function(){
		if(this.ballX >= this.barX && this.ballX < this.barX+200 && this.ballY >= this.barY && this.ballY < this.barY+10) {
			this.ballSpeedY=-this.ballSpeedY;
		}
	}
};

game.init();
setInterval(function(){
	game.draw();
	game.update();
},20);

function mouseMoveHandler(e) {
	   var relativeX = e.clientX - canvas.offsetLeft;
	   if(relativeX > 0 && relativeX < canvas.width) {
	       game.barX = relativeX - 100;
	   }
}
document.addEventListener("mousemove", mouseMoveHandler, false);

console.log("first commit");