const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);





const hitBox = new PIXI.Graphics();
hitBox.beginFill(0xff9900);
hitBox.drawRect(-100, -100, 200, 200);
hitBox.endFill();
hitBox.interactive = true;
hitBox.buttonMode = true;
app.stage.addChild(hitBox);
hitBox.x = app.screen.width / 2;
hitBox.y = app.screen.height / 2;

hitBox.on('pointermove', onDragMove);
function onDragMove() {
    console.log('pointermove');
};



window.onresize = function (event){
	var w = window.innerWidth;
	var h = window.innerHeight;

	app.view.style.width = w + "px";
	app.view.style.height = h + "px";
	app.renderer.resize(w,h);

	hitBox.x = app.screen.width / 2;
	hitBox.y = app.screen.height / 2;

};

onresize();