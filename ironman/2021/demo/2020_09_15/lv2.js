const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
bunny.anchor.set(0.5);

bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

bunny.interactive = true;
bunny.buttonMode = true;

bunny.on('pointerdown', (e)=>{
	console.log('pointerdown');
	console.log(e);
	console.log(e.data.originalEvent);
	console.log(e.data.originalEvent.constructor);
});


window.onresize = function (event){
	var w = window.innerWidth;
	var h = window.innerHeight;

	app.view.style.width = w + "px";
	app.view.style.height = h + "px";
	app.renderer.resize(w,h);

	bunny.x = app.screen.width / 2;
	bunny.y = app.screen.height / 2;
};

onresize();