var isFB = (navigator.userAgent.toLowerCase().indexOf("fb") != -1); // FB App
var isLine = (navigator.userAgent.toLowerCase().indexOf("line") != -1); // Line App
// alert("isFB: "+isFB+" isLine: "+isLine+" again: "+again);


if( isFB == true){
  openAlert();
}else if( isLine == true){
  openAlert();
}else{
}

function openAlert(){
  alert("建議使用Google Chrome / Safari");
}

////////////////////////////////////////////////////////////////////////////////////////

var device;
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  device = 'mobile';
} else {
  device = 'pc';
}

function deviceHandler(){
	if(device == "pc"){
	  stage.scale.x = 1;
	  stage.scale.y = 1;
	}else{
	  stage.scale.x = 2;
	  stage.scale.y = 2;  
	}
}

////////////////////////////////////////////////////////////////////////////////////////

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;
  //this part resizes the canvas but keeps ratio the same
  renderer.view.style.width = w + "px";
  renderer.view.style.height = h + "px";
  //this part adjusts the ratio:
  renderer.resize(w,h);

  STAGE_WIDTH = w;
  STAGE_HEIGHT = h;

  stage.position.x = renderer.width * .5;
  stage.position.y = renderer.height * .5;

  //
  // ballDiameter = STAGE_WIDTH > STAGE_HEIGHT ? STAGE_WIDTH : STAGE_HEIGHT;
  ballDiameter = STAGE_WIDTH > STAGE_HEIGHT ? STAGE_HEIGHT : STAGE_WIDTH;

  ballDiameter -= 20;

  rebuildObjs();
};

////////////////////////////////////////////////////////////////////////////////////////

var STAGE_WIDTH = 800;
var STAGE_HEIGHT = 600;


// var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xEEEEEE});
var renderer = PIXI.autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT,{backgroundColor : 0x181310, antialias: true});

var stage = new PIXI.Container();
	stage.position.x = STAGE_WIDTH * .5;
	stage.position.y = STAGE_HEIGHT * .5;

var STAGE_WIDTH = renderer.width;
var STAGE_HEIGHT = renderer.height

var objContainers = [];
var balls = [];

var objCount = 11;

var ballDiameter;

	// ballDiameter = STAGE_WIDTH > STAGE_HEIGHT ? STAGE_WIDTH : STAGE_HEIGHT;
	ballDiameter = STAGE_WIDTH > STAGE_HEIGHT ? STAGE_HEIGHT : STAGE_WIDTH;

	ballDiameter -= 20;

var tk = 0;

function buildObjs(){

	for(var i=1; i< objCount + 1; i++){

		// console.log(i);

		var objContainer = new PIXI.Container();
		var objLine = new PIXI.Graphics();
		var ball = new PIXI.Graphics();

		if(i == 1){
			ball.beginFill(0xff0000, 1);
		} else if(i == 2){
			ball.beginFill(0x8ecf4c, 1);
		} else {
			ball.beginFill(0xffffff, .7);
		}
		// ball.drawCircle(0, 0, 10);
		ball.drawCircle(0, 0, ballDiameter*.02);
		ball.endFill();

		ball.position.x = 0;
		ball.position.y = 0;
		ball.name = "ball";

		// objContainer.x = STAGE_WIDTH * .5;
		// objContainer.y = STAGE_HEIGHT * .5;
		objContainer.x = 0;
		objContainer.y = 0;

		objLine.lineStyle ( 1, 0xffffff , 0.3);
		objLine.moveTo( ballDiameter * -0.5, 0);
		objLine.lineTo( ballDiameter * 0.5, 0);

		objContainer.addChild(objLine);
		objContainer.addChild(ball);

		objContainer.rotation = (180 / objCount) * (i-1) * (Math.PI / 180);


		objContainers.push(objContainer);
		balls.push(ball);

		stage.addChild(objContainer);

	}
}





function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
    //
    tk ++;
    if(tk == 360) { tk = 0; };
    // ball.x = ballDiameter * Math.sin(tk  / (180 / Math.PI)) * 0.5;
    // 
    for(var i=1; i < objCount + 1; i++){
    	//v1
	    // this['objContainer' + i].getChildByName("ball").x = ballDiameter * Math.sin(tk  / (180 / Math.PI)) * 0.5;
	    // 
	    //v2
	    // objContainers[i-1].getChildByName("ball").x = ballDiameter * Math.sin(( tk + (180 / objCount) * i )  / (180 / Math.PI)) * 0.5;
	    // 
	    balls[i-1].x = ballDiameter * Math.sin(( tk + (180 / objCount) * i )  / (180 / Math.PI)) * 0.5;
	}
}


//////////////////////////////////////
var gui = new dat.GUI();

var effectController = {
    objCount: objCount
};

/* http://workshop.chromeexperiments.com/examples/gui/ */
gui.add( effectController, "objCount", 3, 15, 1 ).onChange( countChanger );

function countChanger(){
	rebuildObjs();
};


buildObjs();
onresize();
animate();


function rebuildObjs(){
    for(var i=0; i < objCount; i++){
    	stage.removeChildAt(0);
    };

	objCount = effectController.objCount;
    objContainers = [];
    balls = [];
    buildObjs();	
}