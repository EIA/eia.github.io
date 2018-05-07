var app = new PIXI.Application(800, 600, {backgroundColor: 0x1099bb, antialias: true});
document.body.appendChild(app.view);

var tk = 0;


var bearContainer = new PIXI.Container();
app.stage.addChild(bearContainer);

var lineGraphic = new PIXI.Graphics;
bearContainer.addChild(lineGraphic);

app.stage.x = app.renderer.width * 0.5;
app.stage.y = app.renderer.height * 0.5;

var eyeGraphic = new PIXI.Graphics();
bearContainer.addChild(eyeGraphic);
eyeGraphic.beginFill(0x000000, 1);
eyeGraphic.drawCircle(-60, -45, 10);
eyeGraphic.drawCircle( 60, -45, 10);
eyeGraphic.scale.y = 0.85;
// eyeGraphic.visible = false;


var tearGraphic = new PIXI.Graphics();
bearContainer.addChild(tearGraphic);
tearGraphic.beginFill(0x53caf6)
tearGraphic.drawCircle()
tearGraphic.drawCircle( 70, -32, 8);
tearGraphic.visible = false;

var cryGraphic = new PIXI.Graphics();
bearContainer.addChild(cryGraphic);
cryGraphic.lineStyle(10, 0x000000, 1);
cryGraphic.moveTo(-75, -37);
cryGraphic.lineTo(-45, -43);
cryGraphic.moveTo(45, -43);
cryGraphic.lineTo(75, -37);
cryGraphic.visible = false;




var noseGraphic = new PIXI.Graphics();
bearContainer.addChild(noseGraphic);
noseGraphic.beginFill(0x000000, 1);
noseGraphic.drawCircle(0, 0, 13);
noseGraphic.scale.y = 0.85;

var topEarsBackGraphic = new PIXI.Graphics();
bearContainer.addChild(topEarsBackGraphic);
topEarsBackGraphic.beginFill(0xffffff, 1);
topEarsBackGraphic.drawCircle(-85, -129, 25);
topEarsBackGraphic.drawCircle( 85, -129, 25);
topEarsBackGraphic.scale.y = 0.9;


var topEarsFrontGraphic = new PIXI.Graphics();
bearContainer.addChildAt(topEarsFrontGraphic, 0);
topEarsFrontGraphic.lineStyle(20, 0x000000, .75);
topEarsFrontGraphic.drawCircle(-85, -129, 25);
topEarsFrontGraphic.drawCircle( 85, -129, 25);
topEarsFrontGraphic.scale.y = 0.9;


var mouseSpriteL = new PIXI.Graphics();
app.stage.addChild(mouseSpriteL);
mouseSpriteL.beginFill(0xff0000, 1);
mouseSpriteL.drawCircle(0, 0, 60);
mouseSpriteL.endFill();
mouseSpriteL.alpha = 0;
mouseSpriteL.x = mouseSpriteL.defaultX = -150; // -100
mouseSpriteL.y = mouseSpriteL.defaultY = 30;
mouseSpriteL.maxX = -100;
mouseSpriteL.minX = -400;

var mouseSpriteR = new PIXI.Graphics();
app.stage.addChild(mouseSpriteR);
mouseSpriteR.beginFill(0xff0000, 1);
mouseSpriteR.drawCircle(0, 0, 60);
mouseSpriteR.endFill();
mouseSpriteR.alpha = 0;
mouseSpriteR.x = mouseSpriteR.defaultX = 150; // -100
mouseSpriteR.y = mouseSpriteR.defaultY = 30;
mouseSpriteL.maxX = 100;
mouseSpriteL.minX = 400;

mouseSpriteL.interactive = mouseSpriteL.buttonMode = true;
mouseSpriteL.on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

mouseSpriteR.interactive = mouseSpriteR.buttonMode = true;
mouseSpriteR.on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);



function onDragStart(e){
	// console.log('onDragStart');
	// console.log(e);


    this.data = e.data;
    this.alpha = 0.3;
    this.dragging = true;
	eyeGraphic.visible = false;
    cryGraphic.visible = true;
    tearGraphic.visible = true;
}

function onDragEnd(e) {
	// console.log('onDragEnd');
	// console.log(e);

    this.alpha = 0;

    if(e){
	    this.dragging = false;
	    this.data = null;
	    TweenMax.to(this, 0.35, {delay:0, x: this.defaultX, y:this.defaultY, ease:Back.easeOut});

    	eyeGraphic.visible = true;
    	cryGraphic.visible = false;
    	tearGraphic.visible = false;
    }else{
	    this.dragging = false;
 		this.data = null;
    }
}

function onDragMove(e) {
    if (this.dragging == true) {
    	// console.log('onDragMove');
		// console.log(e);

        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;


        // console.log(newPosition.x + ' '+ newPosition.y);
        // console.log(this.x + ' '+ this.y);
        // console.log(this.maxX + ' '+ this.minX);

        if( this.x > this.maxX){
		    this.dragging = false;
	 		this.data = null;
        	onDragEnd(null);
        	TweenMax.to(this, 0.35, {delay:0, x: this.defaultX, y:this.defaultY, ease:Back.easeOut});

        	eyeGraphic.visible = true;
        	cryGraphic.visible = false;
        	tearGraphic.visible = false;
        }
        if( this.x < this.minX){
		    this.dragging = false;
	 		this.data = null;
        	onDragEnd(null);
        	TweenMax.to(this, 0.35, {delay:0, x: this.defaultX, y:this.defaultY, ease:Back.easeOut});

        	eyeGraphic.visible = true;
        	cryGraphic.visible = false;
        	tearGraphic.visible = false;
        }

    }
}







app.ticker.add(function(delta) {
	tk += 1;
	// console.log(tk);
	// console.log(Math.sin(tk * (Math.PI / 180)));
	
	var tmpPg = Math.sin(tk * (Math.PI / 180));
	lineGraphic.clear();
	lineGraphic.lineStyle(20, 0x000000, .75);
	lineGraphic.beginFill(0xffffff, 1);
	lineGraphic.moveTo(-100, -100);
	// lineGraphic.lineTo( 100, -100);

	/* 頭頂 */
	lineGraphic.quadraticCurveTo( 
									0,
									-160,
									100,
									-100
								);
	
	/*
	lineGraphic.quadraticCurveTo(
									100 + tmpPg * 100 + 20,
									0 + 30,
									100,
									100
								);
	*/
	lineGraphic.quadraticCurveTo(
									mouseSpriteR.x,
									0 + 30 + ((mouseSpriteR.y - 30) / (app.renderer.height * 0.5)) * 100,
									100,
									100
								);

	lineGraphic.lineTo(-100, 100);

	/*
	lineGraphic.quadraticCurveTo(
									-100 + tmpPg * -100 - 20,
									0 + 30,
									-100,
									-100
								);
	*/
	lineGraphic.quadraticCurveTo(
									mouseSpriteL.x,
									0 + 30 + ((mouseSpriteL.y - 30) / (app.renderer.height * 0.5)) * 100,
									-100,
									-100
								);


});



window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);

  app.stage.position.x = app.renderer.width * .5;
  app.stage.position.y = app.renderer.height * .5;

  if(mouseSpriteL){
	mouseSpriteL.maxX = -100;
	mouseSpriteL.minX = -400;
  }

  if(mouseSpriteR){
	mouseSpriteR.maxX = 400;
	mouseSpriteR.minX = 100;
  }

};

onresize();