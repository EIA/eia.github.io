const app = new PIXI.Application({ width: 300, height: 250, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');

bunny.anchor.set(0.5);

bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

bunny.on('added', ()=>{
	console.log('bunny added');
});

app.stage.addChild(bunny);