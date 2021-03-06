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
box1.y = 30;
box2.x = 50;
box2.y = 100;
box3.x = 0;
box3.y = 170;

const textStyle = new PIXI.TextStyle({
	fontSize: 36,
	fill: 0xffffff
});
const textAsContainer = new PIXI.Text("textAsContainer", textStyle);

textAsContainer.addChild(box1);
textAsContainer.addChild(box2);
textAsContainer.addChild(box3);

app.stage.addChild(textAsContainer);
textAsContainer.x = 50;
textAsContainer.y = 50;

textAsContainer.setChildIndex(box3, 0);

console.log("textAsContainer.children.length: ", textAsContainer.children.length);