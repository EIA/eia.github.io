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

  renderer.view.style.width = w + "px";
  renderer.view.style.height = h + "px";

  renderer.resize(w,h);

  STAGE_WIDTH = w;
  STAGE_HEIGHT = h;

  stage.position.x = renderer.width * .5;
  stage.position.y = renderer.height * .5;
};

////////////////////////////////////////////////////////////////////////////////////////

var STAGE_WIDTH = 800;
var STAGE_HEIGHT = 600;

var ARC_RADIUS = 200;

// var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x000000});
var renderer = PIXI.autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT,{backgroundColor : 0x181310, antialias: true});

var stage = new PIXI.Container();
	stage.position.x = STAGE_WIDTH * .5;
	stage.position.y = STAGE_HEIGHT * .5;

var bdContainer = new PIXI.Container();
	stage.addChild(bdContainer);

var arcsContainers = new PIXI.Container();
	stage.addChild(arcsContainers);

var LINE_WIDTH = 2;
var arcCount = 7;
var totalCount = 120; //360

var loopCount = 0; // loop 6 次


//  v1
var posX = 0;
var posY = 0;


var dotCount = arcCount + 1 ;
var dots = [];

function buildBd(){

	for(var i = 0; i < arcCount; i++){
		var bdLineContainer = new PIXI.Container();
			bdContainer.addChild(bdLineContainer);
			/* 旋轉容器 */
			bdLineContainer.rotation = i * (360 / 6) * (Math.PI / 180);

		////////////////////////////////////////////////////////////////////

		var t = new PIXI.Graphics()
		  .beginFill(0x211c19)
		  .drawRect(0, 0, ARC_RADIUS, LINE_WIDTH)
		  .endFill()
		  .generateTexture();

		var cc = new PIXI.Sprite(t);
			cc.position.x = ARC_RADIUS + LINE_WIDTH * .5;
			cc.rotation = 120 * (Math.PI / 180);
		bdLineContainer.addChild(cc);

		////////////////////////////////////////////////////////////////////

		for(var j = 0; j < arcCount; j++){
			var pathMask = new PIXI.tween.TweenPath();
			pathMask.arc( 0, 0, ((j+1) * ARC_RADIUS / arcCount) + LINE_WIDTH * .5 , 121 * (Math.PI / 180), 239 * (Math.PI / 180) );

			var gPathMask = new PIXI.Graphics();
			bdLineContainer.addChild(gPathMask);

			gPathMask.lineStyle(LINE_WIDTH, 0x211c19, 1);
			gPathMask.drawPath(pathMask);
			gPathMask.position.x = ARC_RADIUS + LINE_WIDTH * .5;
		}
	}


}

function buildLine(){
	for(var i = 0; i < dotCount; i++){
		var t = new PIXI.Graphics()
		  .beginFill(0xffffff)
		  .drawCircle(0, 0, 5)
		  .endFill()
		  .generateTexture();

		var cc = new PIXI.Sprite(t);
		cc.anchor.x = 0.5;
		cc.anchor.y = 0.5;
		// cc.position.x = posX;
		cc.position.x = posX + i * ARC_RADIUS / arcCount;
		cc.position.y = posY;
		arcsContainers.addChild(cc);
		dots.push(cc);
	}

	arcsContainers.rotation = -60 * loopCount * (Math.PI / 180) + 120 * (Math.PI / 180);
	arcsContainers.position.x = Math.cos( 60 * -loopCount  * (Math.PI / 180)) * ARC_RADIUS; //旋轉用
	arcsContainers.position.y = Math.sin( 60 * -loopCount  * (Math.PI / 180)) * ARC_RADIUS; //旋轉用



	for(var j = 0;j< arcCount; j++){



		var arcContainer = new PIXI.Container();
		arcsContainers.addChild(arcContainer);
		arcContainer.name = "arc"+j;

		/* Tween 使用 */
		arcContainer.tempValue1 = 0;

		/* 點與線綁定, 不含原點 */
		arcContainer.dotRef = dots[j+1];

		/* 線的編號, 1 開始 */
		arcContainer.lineNum = j+1;

		//arcContainer.arcHue = getRandomHue();
		var rhArray = hsvToRGB2( j * 360 / arcCount, 1, 1);
		var rc = rhArray[0] * 65536 + rhArray[1] * 256 + rhArray[2];

		arcContainer.arcHue = rc;
		arcContainer.position.x = posX;
		arcContainer.position.y = posY;


		for(var i = 0;i< totalCount; i++){

			var t3 = new PIXI.Graphics();
				t3.beginFill(0xffffff, 1);

				/* 把凸出去的線段伸出去 */
				// t3.arc( 0, 0, ARC_RADIUS, (0) * (Math.PI / 180), (1) * (Math.PI / 180) );
				t3.arc( 0, 0, ARC_RADIUS + LINE_WIDTH*.5, (0) * (Math.PI / 180), (1) * (Math.PI / 180) );
				t3.endFill();

				t3.beginFill(0xffffff, 1);
				t3.moveTo(0, 0);

				/* 把凸出去的線段伸出去 */
				// t3.lineTo(ARC_RADIUS, 0);
				// t3.lineTo(Math.cos( 3 * (Math.PI / 180)) * ARC_RADIUS, Math.sin( 3 * (Math.PI / 180)) * ARC_RADIUS);
				t3.lineTo(ARC_RADIUS + LINE_WIDTH*.5, 0);
				t3.lineTo(Math.cos( 3 * (Math.PI / 180)) * ARC_RADIUS + LINE_WIDTH*.5, Math.sin( 3 * (Math.PI / 180)) * ARC_RADIUS + LINE_WIDTH*.5);

				t3.lineTo(0, 0);
				t3.endFill();

			var cube3 = new PIXI.Sprite(t3.generateTexture());
			arcContainer.addChild(cube3);
			cube3.rotation = i * (Math.PI / 180);
			cube3.alpha = 0;

		}


		/////////////////////////////////////////////////////////////

		var pathMask = new PIXI.tween.TweenPath();
			pathMask.arc( posX, posY, ((j+1) * ARC_RADIUS / arcCount), 0 * (Math.PI / 180), 120 * (Math.PI / 180) );

		var gPathMask = new PIXI.Graphics();
			gPathMask.lineStyle(LINE_WIDTH, 0xff9900, 1);
			gPathMask.drawPath(pathMask);
			gPathMask.alpha = 1;

		arcsContainers.addChild(gPathMask);
		arcContainer.mask = gPathMask;


		var tweenCircle = PIXI.tweenManager.createTween(arcContainer);
		tweenCircle.time = 1100;
		tweenCircle.easing = PIXI.tween.Easing.outQuad();

		tweenCircle.loop = true;
		// tweenCircle.delay = 400;
		tweenCircle.start();

		tweenCircle.from({tempValue1: 0});
		tweenCircle.to({tempValue1: 2});
		// tweenCircle.pingPong  = true;

		tweenCircle.on('update', function(delta){
			//reDrawCircle(this._elapsedTime / this.time);
			reDrawCircle(this.target.tempValue1, this.target);
		});
		tweenCircle.on('repeat', function(){
			//
			// this.target.arcHue = getRandomTint();
			reDrawCircle(0, this.target);
			//
			if(this.target.name == "arc0"){
				loopCount ++;
				loopCount = loopCount %6;

				arcsContainers.rotation = -60 * loopCount * (Math.PI / 180) + 120 * (Math.PI / 180);
				arcsContainers.position.x = Math.cos( 60 * -loopCount  * (Math.PI / 180)) * ARC_RADIUS; //旋轉用
				arcsContainers.position.y = Math.sin( 60 * -loopCount  * (Math.PI / 180)) * ARC_RADIUS; //旋轉用


				for(var i = 1; i < dotCount; i++){
					var dotTarget = dots[i];
					dotTarget.position.x = posX + (i +1)  * ARC_RADIUS / arcCount;
					dotTarget.position.y = posY;
				}
			}
			//
			// this.delay = 3000;
			this.reset().start();
		});

	}
}

function reDrawCircle($value1, $target){
	// console.log("reDrawCircle: "+$value1);
	var reDrawTarget;
	for(var i = 0;i< totalCount; i++){
		reDrawTarget = $target.children[i];

		//////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////
		// v5
		/*
		 * $value1 <=1
		 *       > MAX 裁掉
 		 *       移動MAX 位置 (0~120)
 		 *
 		 * $value1 >1
		 *       < MIN 裁掉
 		 *       移動MIN 位置 (0~120)
 		 */
		var outputValue;
		var alphaRangeStart;
		var alphaRangeEnd;
		if( $value1 <=1 ){
			alphaRangeStart = 0;
			alphaRangeEnd = 120 * $value1;
			if(i > alphaRangeEnd){
				outputValue = 0;
			}else{
				outputValue = (i - alphaRangeStart) / (alphaRangeEnd - alphaRangeStart);
			}
		}else{
			alphaRangeStart = 120 * ( $value1 -1 );
			alphaRangeEnd = 120;
			if(i < alphaRangeStart){
				outputValue = 0;
			}else{
				outputValue = (i - alphaRangeStart) / (alphaRangeEnd - alphaRangeStart);
			}
		}

		reDrawTarget.alpha = outputValue;

		//////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////
		// v4
		/*
		 * $value1 <=1
		 *       < MIN 原色
 		 */
		var outputValue2;
		var tintRangeStart;
		var tintRangeEnd;
		var tintGri = 90; // 色相漸變
		var ta3;
		var tc3;
		if( $value1 <=1 ){
			tintRangeEnd = 120 * $value1;
			tintRangeStart = tintRangeEnd - 70 > 0 ? tintRangeEnd - 70 : 0;
			if(i <= tintRangeStart){
				outputValue2 = 1;
			}else{
				outputValue2 = 1 - (i - tintRangeStart) / (tintRangeEnd - tintRangeStart);
			}
			//v1
			// ta3 = hsvToRGB2( $target.arcHue, outputValue2, 1);

			ta3 = hsvToRGB2( $target.arcHue + i * (tintGri / totalCount), outputValue2, 1);

			tc3 = ta3[0] * 65536 + ta3[1] * 256 + ta3[2];
			reDrawTarget.tint = tc3;
		}else{
		}

	}

	var dotValue = $value1 + 0.01;
	dotValue = dotValue > 1 ? 1 : dotValue;
	$target.dotRef.position.x = Math.cos( dotValue * 120 * (Math.PI / 180)) * ($target.lineNum * 1 / arcCount) * ARC_RADIUS;
	$target.dotRef.position.y = Math.sin( dotValue * 120 * (Math.PI / 180)) * ($target.lineNum * 1 / arcCount) * ARC_RADIUS;

}




buildBd();
buildLine();
deviceHandler();
onresize();
animate();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
    PIXI.tweenManager.update();
}

function getRandomTint(){
	var randomColorArray = hsvToRGB2( getRandomHue(), 1, 1);
	var rc = randomColorArray[0] * 65536 + randomColorArray[1] * 256 + randomColorArray[2];
	return rc;
}

function getRandomHue(){
	return Math.floor(Math.random()*360);
}

function hsvToRGB2(hue, saturation, value) {
	var hi;
	var f;
	var p;
	var q;
	var t;

	while (hue < 0) {
	hue += 360;
	}
	hue = hue % 360;

	saturation = saturation < 0 ? 0
	: saturation > 1 ? 1
	: saturation;

	value = value < 0 ? 0
	: value > 1 ? 1
	: value;

	value *= 255;
	hi = (hue / 60 | 0) % 6;
	f = hue / 60 - hi;
	p = value * (1 -           saturation) | 0;
	q = value * (1 -      f  * saturation) | 0;
	t = value * (1 - (1 - f) * saturation) | 0;
	value |= 0;

	switch (hi) {
	case 0:
	  return [value, t, p];
	case 1:
	  return [q, value, p];
	case 2:
	  return [p, value, t];
	case 3:
	  return [p, q, value];
	case 4:
	  return [t, p, value];
	case 5:
	  return [value, p, q];
	}
}