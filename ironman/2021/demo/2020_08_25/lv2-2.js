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
box1.x = app.screen.width / 2 - 120;
box1.y = app.screen.height / 2;
gsap.to(box1, {duration:3, y:app.screen.height / 2 - 100, yoyo: true, repeat:-1, ease:Strong.easeIn});
// box1.alpha = 0;

const box2 = createBox();
app.stage.addChild(box2);
box2.x = app.screen.width / 2;
box2.y = app.screen.height / 2;
gsap.to(box2, {duration:3, y:app.screen.height / 2 - 100, yoyo: true, repeat:-1, ease:Strong.easeIn, yoyoEase:Strong.easeOut});
// box2.alpha = 0;

const box3 = createBox();
app.stage.addChild(box3);
box3.x = app.screen.width / 2 + 120;
box3.y = app.screen.height / 2;
gsap.to(box3, {duration:3, y:app.screen.height / 2 - 100, yoyo: true, repeat:-1, ease:Strong.easeOut, yoyoEase:Strong.easeOut});
// box3.alpha = 0;