const app = new PIXI.Application({ width: 375, height:667, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


console.log("PIXI.utils.isMobile.apple.device: ", PIXI.utils.isMobile.apple.device);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');

bunny.anchor.set(0.5);


bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

bunny.interactive = true;

bunny.on("pointerdown", ()=>{
	// console.log('pd');
});

bunny.on("pointerup", ()=>{
	// console.log('pu');
});


bunny.on("click", ()=>{
	// console.log('ck');
});

bunny.on("pointermove", ()=>{
	console.log('pointermove');
});