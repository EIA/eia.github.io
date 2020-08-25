const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const createBox = ()=>{
	const box = new PIXI.Graphics();
	box.beginFill(0xff9900);
	box.drawRect(-50, -50, 100, 100);
	box.endFill();
	return box;
};


const box1 = createBox();
app.stage.addChild(box1);
box1.x = app.screen.width / 2;
box1.y = app.screen.height / 2;
TweenMax.to(box1, 3, {y:app.screen.height / 2 - 100, yoyo: true, repeat:-1, ease:Strong.easeIn});