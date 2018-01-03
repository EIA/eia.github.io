/*

  main > flower > petal
  set

*/
/*

  $setting >
  				id
  				steps
  				lineColor
  				lineAlpha
  				shapeColor
  				shapeAlpha
  				duration
                showDebugDot
                showDebugShape
  				debug

  				startX
  				startY
  				cp1x
  				cp1y
  				cp2x
  				cp2y
  				endX
  				endY

*/
/*
	var petalStepsData = [
						{
							targetPercentage: 1,
							currentPercentage: 0
							lineColor: 0x4c4c4c,
							lineAlpha: 0.75,
							shapeColor: 0xf5f5f5,
							shapeAlpha: 0.75,
			  				cp1x,
			  				cp1y,
			  				cp2x,
			  				cp2y
						},...
					]
*/

Petal = function ($setting){

	// console.log($setting);
	// console.log($setting && $setting.shapeColor != null)

	this.id = '-1';
	this.steps = 10;
	this.lineColor = 0x4c;
	this.lineAlpha = 0.35; // 0.75
	this.shapeColor = 0xf5f5f5;
	this.shapeAlpha = 0.35; // 0.75
	this.duration = 3; //3, 1
	this.debug = true;

	if($setting != null && $setting.id != null ){ this.id = $setting.id;	}
	if($setting != null && $setting.steps != null ){ this.steps = $setting.steps;	}
	if($setting != null && $setting.lineColor != null ){ this.lineColor = $setting.lineColor;	}
	if($setting != null && $setting.lineAlpha != null ){ this.lineAlpha = $setting.lineAlpha;	}
	if($setting != null && $setting.shapeColor != null ){ this.shapeColor = $setting.shapeColor;	}
	if($setting != null && $setting.shapeAlpha != null ){ this.shapeAlpha = $setting.shapeAlpha;	}
	if($setting != null && $setting.duration != null ){ this.duration = $setting.duration;	}
	if($setting != null && $setting.showDebugDot != null ){ this.showDebugDot = $setting.showDebugDot; }
	if($setting != null && $setting.showDebugShape != null ){ this.showDebugShape = $setting.showDebugShape; }
	if($setting != null && $setting.debug != null ){ this.debug = $setting.debug; }

	if( this.debug == true){
		console.log('----');
		console.log('this.id: '+this.id);
		console.log('this.steps: '+this.steps);
		console.log('this.lineColor: '+this.lineColor);
		console.log('this.lineAlpha: '+this.lineAlpha);
		console.log('this.shapeColor: '+this.shapeColor);
		console.log('this.shapeAlpha: '+this.shapeAlpha);
		console.log('this.duration: '+this.duration);
		console.log('this.showDebugDot: '+this.showDebugDot);
		console.log('this.showDebugShape: '+this.showDebugShape);
		console.log('this.debug: '+this.debug);
	}

	this.startX = 0;
	this.startY = 0;
	this.cp1x = Math.cos(36 * (Math.PI / 180)) * 300; // 20
	this.cp1y = Math.sin(36 * (Math.PI / 180)) * 300; // 100
	this.cp2x = Math.cos(-36 * (Math.PI / 180)) * 300; // 200
	this.cp2y = Math.sin(-36 * (Math.PI / 180)) * 300; // 100
	this.endX = 0;
	this.endY = 0;
	//
	this.dot1 = {}; // startX, startY
	this.dot2 = {}; // cp1x, cp1y
	this.dot3 = {}; // cp2x, cp2y
	this.dot4 = {}; // endX, endY
	//
	this.petalStepsData = []; // data
	this.stepDotsArray1 = []; // graphics
	this.stepDotsArray2 = []; // graphics
	this.stepPetalsArray = []; // graphics

	this.tl = new TimelineMax({
								// repeat:-1,
								// onUpdate:this.timelineUpdate,
								// onRepeat: this.timelineRepeat,
								// onRepeatParams: [this],
								onComplete:this.timelineComplete,
								onCompleteParams: [this]
							});
	this.tlCount = 0;


	this.initData();
	this.initView();
	this.initController();

	this.bloom();
}

Petal.prototype = {
  constructor: Petal,
  initData: function(){
  	// console.log('initData');

  	this.petalStepsData = [];
	for(var i = 0; i< this.steps; i++){
		var pushData = {};
		pushData.targetPercentage = 1;
		pushData.currentPercentage = 0;

		/*
		var tmpLineColor = Math.floor(this.lineColor * (i) * ( 1 / this.steps));
		pushData.lineColor = tmpLineColor * 65536 + tmpLineColor * 256 + tmpLineColor;
		*/
		pushData.lineColor = this.lineColor;

		pushData.lineAlpha = this.lineAlpha * (i) * ( 1 / this.steps);

		/*
		var tmpShapeColor = Math.floor(this.shapeColor * (i) * ( 1 / this.steps));
		pushData.shapeColor = tmpShapeColor * 65536 + tmpShapeColor * 256 + tmpShapeColor;
		*/
		pushData.shapeColor = this.shapeColor;

		pushData.shapeAlpha = this.shapeAlpha * (i) * ( 1 / this.steps);

		pushData.cp1x = this.startX;
		pushData.cp1y = this.startY;
		pushData.cp2x = this.startX;
		pushData.cp2y = this.startY;

		this.petalStepsData.push(pushData);
	}

	this.petalStepsData[0].lineAlpha = this.lineAlpha;

  },
  initView: function(){
  	// console.log('initView');
  	this.container = new PIXI.Container();

	for(var i=1; i<5; i++){
		this['dot'+i] = new PIXI.Graphics();
		var target = this['dot'+i];
		target.beginFill(0x000000, .05);
		target.drawCircle(0, 0, 5);
		target.endFill();
		if(this.showDebugDot == true) { this.container.addChild(target)};

   		/*
    	target.interactive = true;
   		target.buttonMode = true;
		target
				.on('pointerdown', onDragStart)
		        .on('pointerup', onDragEnd)
		        .on('pointerupoutside', onDragEnd)
		        .on('pointermove', onDragMove);
		*/
	}

	this.dot1.x = this.startX;
	this.dot1.y = this.startY;
	this.dot2.x = this.cp1x;
	this.dot2.y = this.cp1y;
	this.dot3.x = this.cp2x;
	this.dot3.y = this.cp2y;
	this.dot4.x = this.endX;
	this.dot4.y = this.endY;


	/* Draw Dots */
	for(var i = 0; i< this.steps; i++){
		var stepDots1 = new PIXI.Graphics();
			stepDots1.beginFill(
								this.petalStepsData[i].shapeColor,
								this.petalStepsData[i].shapeAlpha
							);
			stepDots1.lineStyle(
								1,
								this.petalStepsData[i].lineColor,
								this.petalStepsData[i].lineAlpha
							);
			stepDots1.drawCircle(0, 0, 2);
			stepDots1.x = Math.floor(this.cp1x * (this.steps-i) * ( 1 / this.steps));
			stepDots1.y = Math.floor(this.cp1y * (this.steps-i) * ( 1 / this.steps));
			stepDots1.endFill();
			if(this.showDebugDot == true) {this.container.addChild(stepDots1)};
			this.stepDotsArray1.push(stepDots1);

		var stepDots2 = new PIXI.Graphics();
			stepDots2.beginFill(
								this.petalStepsData[i].shapeColor,
								this.petalStepsData[i].shapeAlpha
							);
			stepDots2.lineStyle(
								1,
								this.petalStepsData[i].lineColor,
								this.petalStepsData[i].lineAlpha
							);
			stepDots2.drawCircle(0, 0, 2);
			stepDots2.x = Math.floor(this.cp2x * (this.steps-i) * ( 1 / this.steps));
			stepDots2.y = Math.floor(this.cp2y * (this.steps-i) * ( 1 / this.steps));
			stepDots2.endFill();
			if(this.showDebugDot == true) {this.container.addChild(stepDots2)};
			this.stepDotsArray2.push(stepDots2);
	}

	/* Draw Petals */
	for(var i = 0; i< this.steps; i++){
		var stepPetal = new PIXI.Graphics();
		// stepPetal.beginFill(0xff9900, .1);
		// stepPetal.lineStyle(1, 0x333333, .1);
		stepPetal.beginFill(
								this.petalStepsData[i].shapeColor,
								this.petalStepsData[i].shapeAlpha
							);
		stepPetal.lineStyle(
								1,
								this.petalStepsData[i].lineColor,
								this.petalStepsData[i].lineAlpha
							);
		stepPetal.moveTo(this.startX, this.startY);
		/*
		stepPetal.lineTo(
							this.cp1x * (this.steps-i) * ( 1 / this.steps),
							this.cp1y * (this.steps-i) * ( 1 / this.steps)
						);
		stepPetal.lineTo(
							this.cp2x * (this.steps-i) * ( 1 / this.steps),
							this.cp2y * (this.steps-i) * ( 1 / this.steps)
						);
		stepPetal.lineTo(this.endX, this.endY);
		*/
		stepPetal.bezierCurveTo(
									this.cp1x * (this.steps-i) * ( 1 / this.steps),
									this.cp1y * (this.steps-i) * ( 1 / this.steps),
									this.cp2x * (this.steps-i) * ( 1 / this.steps),
									this.cp2y * (this.steps-i) * ( 1 / this.steps),
									this.endX,
									this.endY,
								);

		stepPetal.endFill();
		this.container.addChild(stepPetal);
		this.stepPetalsArray.push(stepPetal);
	}

	var testGraphics = new PIXI.Graphics();
		// testGraphics.beginFill(0xff0000, .3);
		testGraphics.beginFill(0x888888, .1);
		testGraphics.moveTo(0,0);
		testGraphics.lineTo(
								Math.cos(36 * (Math.PI / 180)) * 100,
								Math.sin(36 * (Math.PI / 180)) * 100
							);
		testGraphics.lineTo(
								Math.cos(-36 * (Math.PI / 180)) * 100,
								Math.sin(-36 * (Math.PI / 180)) * 100
							);
		testGraphics.lineTo(0,0);
		testGraphics.endFill();
		if(this.showDebugShape == true) { this.container.addChildAt(testGraphics, 0)};

  },
  initController: function(){
  	// console.log('initController');
  },
  update:function(){
  },
  setX:function($x){
  },
  setY:function($y){
  },
  setRotation:function($rotate){
  },
  setScale:function($scale){
  },
  bloom: function(){
	// console.log('> petal.bloom');
	// console.log(this.petalStepsData);

	this.tl.clear();

	// console.log('bloom');
	// console.log(this.petalStepsData[0]);
	// console.log(this.stepDotsArray1[0]);
	// console.log(this.stepDotsArray1[0].x);

	var randomDelay = Math.random();

	for(var i=0; i< this.steps; i++){



		var target;
		target = this.stepDotsArray1[i];
		target.x = this.dot2.x;
		target.y = this.dot2.y;
		target = this.stepDotsArray2[i];
		target.x = this.dot3.x;
		target.y = this.dot3.y;

		target = this.stepPetalsArray[i];
		target.clear();

		this.petalStepsData[i].currentPercentage =  0;
		// v1
		// TweenLite.to(this.petalStepsData[i], 1, {currentPercentage: 1, ease:Strong.easeOut, onUpdate: function($index, $target){
		// v2
		// this.tl.to(this.petalStepsData[i], Math.random()*this.duration+1, { delay:0.1 *i, yoyo: true, repeat:1, repeatDelay:0.5 * (this.steps - i ), currentPercentage: 1, ease:Strong.easeIn, onUpdate: function($index, $target){
		// v3
		// this.tl.to(this.petalStepsData[i], this.duration+0.1*i, { delay:0.1 *i, yoyo: true, repeat:1, repeatDelay:0.2 * (this.steps - i ), currentPercentage: 1, ease:Strong.easeOut, onUpdate: function($index, $target){
		// v4
		this.tl.to(
					this.petalStepsData[i],
					this.duration + 0.05*i,
								{ delay:0.05 *i + randomDelay,
									yoyo: true,
									repeat:1,
									repeatDelay:0.5 * (this.steps - i ),
									currentPercentage: 1,
									ease:Strong.easeOut,
									onUpdate: function($index, $target){





				// console.log($index);
				// console.log($target);
				// console.log(this.target.currentPercentage);
				var target,
					dot1x,
					dot1y,
					dot2x,
					dot2y;

				// dots //
				target = $target.stepDotsArray1[$index];
				// v1
				// dot1x = $target.cp1x * ($target.steps-$index) * ( 1 / $target.steps) * this.target.currentPercentage;
				// dot1y = $target.cp1y * ($target.steps-$index) * ( 1 / $target.steps) * this.target.currentPercentage;
				// v2
				// dot1x = $target.cp1x * (Math.sin( this.target.currentPercentage * (($target.steps - $index) * 1 / $target.steps) * 90 * (Math.PI / 180)));
				// dot1y = $target.cp1y * (Math.sin( this.target.currentPercentage * (($target.steps - $index) * 1 / $target.steps) * 90 * (Math.PI / 180)));
				// v3
				dot1x = $target.cp1x * (Math.sin( this.target.currentPercentage * (($target.steps - $index) * 1 / $target.steps) * 90 * (Math.PI / 180)))
						+ $target.petalStepsData[$index].cp1x;
				dot1y = $target.cp1y * (Math.sin( this.target.currentPercentage * (($target.steps - $index) * 1 / $target.steps) * 90 * (Math.PI / 180)))
						+ $target.petalStepsData[$index].cp1y;

				target.x = dot1x;
				target.y = dot1y;

				target = $target.stepDotsArray2[$index];
				// v1
				// dot2x = $target.cp2x * ($target.steps-$index) * ( 1 / $target.steps) * this.target.currentPercentage;
				// dot2y = $target.cp2y * ($target.steps-$index) * ( 1 / $target.steps) * this.target.currentPercentage;
				// v2
				// dot2x = $target.cp2x * (Math.sin( this.target.currentPercentage * (($target.steps - $index) * 1 / $target.steps) * 90 * (Math.PI / 180)));
				// dot2y = $target.cp2y * (Math.sin( this.target.currentPercentage * (($target.steps - $index) * 1 / $target.steps) * 90 * (Math.PI / 180)));
				// v3
				dot2x = $target.cp2x * (Math.sin( this.target.currentPercentage * (($target.steps - $index) * 1 / $target.steps) * 90 * (Math.PI / 180)))
						+ $target.petalStepsData[$index].cp2x;
				dot2y = $target.cp2y * (Math.sin( this.target.currentPercentage * (($target.steps - $index) * 1 / $target.steps) * 90 * (Math.PI / 180)))
						+ $target.petalStepsData[$index].cp2y;

				target.x = dot2x;
				target.y = dot2y;

				// petals //
				target = $target.stepPetalsArray[$index];
				target.clear();

				// target.beginFill(0xff9900, .1);
				// target.lineStyle(1, 0x333333, .1);
				target.beginFill(
									$target.petalStepsData[$index].shapeColor,
									$target.petalStepsData[$index].shapeAlpha
								);
				target.lineStyle(
									1,
									$target.petalStepsData[$index].lineColor,
									$target.petalStepsData[$index].lineAlpha
								);
				target.moveTo($target.startX, $target.startY);
				/*
				target.lineTo( dot1x, dot1y	);
				target.lineTo( dot2x, dot2y	);
				target.lineTo( $target.endX, $target.endY);
				*/
				target.bezierCurveTo(
									dot1x,
									dot1y,
									dot2x,
									dot2y,
									$target.endX,
									$target.endY,
								);
				target.endFill();



			}, onUpdateParams:[i, this], onRepeat:function($target){

				// console.log('orp')


			}, onRepeatParams:[this], onUpdateParams:[i, this], onComplete:function($target){

				// console.log('occ')


			}, onCompleteParams:[this]
		}, 'start');
	}
  },
  randomBloom: function($lineColor, $lineAlpha, $shapeColor, $shapeAlpha){

  		/* call from flower.js
        var randomLineColorArray = hsvToRGB2(Math.floor(Math.random()*360), .3, 1);
        var randomLineColor = randomLineColorArray[0] * 256 * 256 + randomLineColorArray[1] * 256 + randomLineColorArray[2];

		var randomShapeColorArray = hsvToRGB2(Math.floor(Math.random()*360), .3, 1);
        var randomShapeColor = randomShapeColorArray[0] * 256 * 256 + randomShapeColorArray[1] * 256 + randomShapeColorArray[2];
		*/

  		this.lineColor = $lineColor;
		this.lineAlpha = $lineAlpha;
		this.shapeColor = $shapeColor;
		this.shapeAlpha = $shapeAlpha;
		this.startX = 0;
		this.startY = 0;
		this.cp1x = Math.cos(36 * (Math.PI / 180)) * 300 + Math.random()*100 - 50;
		this.cp1y = Math.sin(36 * (Math.PI / 180)) * 300 + Math.random()*100 - 50;
		this.cp2x = Math.cos(-36 * (Math.PI / 180)) * 300 + Math.random()*100 - 50;
		this.cp2y = Math.sin(-36 * (Math.PI / 180)) * 300 + Math.random()*100 - 50;
		this.endX = 0;
		this.endY = 0;

		this.initData();
		this.bloom();
  },

  updateSetting: function($setting){

	for(var i=0; i< this.steps; i++){
		var target;
		target = this.stepPetalsArray[i];
		target.clear();
	}

	if($setting && $setting.lineColor){
		this.lineColor = $setting.lineColor[0] * 65536+
						 $setting.lineColor[1] * 256 +
						 $setting.lineColor[2];
	}
	if($setting && $setting.lineAlpha){ this.lineAlpha = $setting.lineAlpha;	}
	if($setting && $setting.shapeColor){
		this.shapeColor = $setting.shapeColor[0] * 65536+
						 $setting.shapeColor[1] * 256 +
						 $setting.shapeColor[2];
	}
	if($setting && $setting.shapeAlpha){ this.shapeAlpha = $setting.shapeAlpha;	}
	if($setting && $setting.duration){ this.duration = $setting.duration; }

	console.log('---- updateSetting ----');
	console.log('this.id: '+this.id);
	console.log('this.steps: '+this.steps);
	console.log('this.lineColor: '+this.lineColor);
	console.log('this.lineAlpha: '+this.lineAlpha);
	console.log('this.shapeColor: '+this.shapeColor);
	console.log('this.shapeAlpha: '+this.shapeAlpha);
	console.log('this.duration: '+this.duration);
	console.log('this.debug: '+this.debug);

	this.initData();

  },
  timelineUpdate:function(){
  },
  timelineRepeat:function($target){

  	console.log('timelineRepeat');
  },
  timelineComplete:function($target){
	// console.log('----');
  	// console.log('timelineComplete');

  	$target.tlCount ++;
  	// console.log('tlCount: '+$target.tlCount);

	for(var i=0; i< this.steps; i++){
		$target.petalStepsData[i].cp1x = $target.stepDotsArray1[i].x;
		$target.petalStepsData[i].cp1y = $target.stepDotsArray1[i].y;
		$target.petalStepsData[i].cp2x = $target.stepDotsArray2[i].x;
		$target.petalStepsData[i].cp2y = $target.stepDotsArray2[i].y;
	}



	$target.cp1x = Math.cos(36 * (Math.PI / 180)) * 300 + Math.random()*100 - 50;
	$target.cp1y = Math.sin(36 * (Math.PI / 180)) * 300 + Math.random()*100 - 50;
	$target.cp2x = Math.cos(-36 * (Math.PI / 180)) * 300 + Math.random()*100 - 50;
	$target.cp2y = Math.sin(-36 * (Math.PI / 180)) * 300 + Math.random()*100 - 50;
	//
  	$target.dot2.x = $target.cp1x;
  	$target.dot2.y = $target.cp1y;
  	$target.dot3.x = $target.cp2x;
  	$target.dot3.y = $target.cp2y;
	//
	$target.initData();
	$target.bloom();

  }
};