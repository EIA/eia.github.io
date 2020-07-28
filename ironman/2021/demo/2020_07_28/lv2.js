const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

function createBox(color, w, h, name){
	const boxContainer = new PIXI.Container();
	boxContainer.name = name;
	const box = new PIXI.Graphics();
	box.beginFill(color);
	box.drawRect(0, 0, 100, 100);
	box.endFill();

	const infoStyle = new PIXI.TextStyle({
		fontSize: 12,
		fill: 0xffffff
	});
	const info = new PIXI.Text(name, infoStyle);
	info.x = 5;
	info.y = 5;
	boxContainer.addChild(box, info);

	return boxContainer;
};


const box1 = createBox(0xff0000, 100, 100, 'box1');
const box2 = createBox(0xff9900, 100, 100, 'box2');
const box3 = createBox(0xff0000, 100, 100, 'box3');
box1.x = 0;
box1.y = 0;
box2.x = 50;
box2.y = 70;
box3.x = 0;
box3.y = 140;

const boxGraphic = new PIXI.Graphics();
boxGraphic.beginFill(0x999999);
boxGraphic.moveTo(0, 0);
boxGraphic.lineTo(300, 0);
boxGraphic.lineTo(150, 220);
boxGraphic.lineTo(0, 0);
boxGraphic.endFill();

boxGraphic.addChild(box1);
boxGraphic.addChild(box2);
boxGraphic.addChild(box3);

app.stage.addChild(boxGraphic);
boxGraphic.x = 50;
boxGraphic.y = 50;