mainApp = function(){

	var imageSources = {
		root : "images/",
		walkingSprite : "walking.png"
	};

	var version = "0.0.1";
	var canvas = document.getElementById("main-canvas");
	var context = canvas.getContext("2d");

	return {
		imageSources : imageSources,
		version : version,
		context : context,
		canvas : canvas
	};

}();

var rene;
var init = function(){
	rene = new Character("images/walking.png");
	rene.posX = mainApp.canvas.width / 2 ;
	rene.posY = mainApp.canvas.height / 2 ;
	keyboardController.init();
}();


var dir = 0;
var lastCall = 0;
var fpsNode = document.getElementById("fps");
var frameCount = 0;
var mainloop = function(timestamp) {
        
        var delta = (timestamp / 1000) - lastCall;
		lastCall = timestamp / 1000;
		
		if(frameCount % 60 == 0) fpsNode.innerHTML = "FPS: " + (1/delta).toFixed(2);
        rene.state = keyboardController.keypressed;

        if(keyboardController.keydown){
        	//charRenderer.frames = charRenderer.frames % charRenderer.frames_total;
        	//console.log(charRenderer.frames);
        	mainApp.context.clearRect(0, 0, mainApp.canvas.width, mainApp.canvas.height);
        }

        if(rene.state === "LEFT" && keyboardController.keydown){
        	rene.posX-=5;
        }

        if(rene.state === "RIGHT" && keyboardController.keydown){
        	rene.posX+=5;
        }

        if(rene.state === "DOWN" && keyboardController.keydown){
        	rene.posY+=5;
        }

        if(rene.state === "UP" && keyboardController.keydown){
        	rene.posY-=5;
        }

        
        charRenderer.render(mainApp.context, rene);

        if(keyboardController.keydown && frameCount % 10 == 0){
        	
        	//movimiento oscilatorio entre los frames
        	if(charRenderer.frames < charRenderer.frames_total && dir==0)
        	{
        		//dir = 1;
        		charRenderer.frames += 1;
        	}else{
        		dir = 1 ;
        	}

        	if(charRenderer.frames > 0 && dir)
        	{
        		//dir = 0;
        		charRenderer.frames -= 1;
        	}else{
        		dir = 0;
        	}
        }

        frameCount++;
    };

var animFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        null ;

var recursiveAnim = function(lastCall) {
    mainloop(lastCall);
    animFrame( recursiveAnim );
};

// start the mainloop
rene.image.onload = animFrame( recursiveAnim );
