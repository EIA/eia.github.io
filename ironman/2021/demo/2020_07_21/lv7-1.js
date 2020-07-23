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

const box1 = createBox(0xff0000, 100, 100, "box1");
const box2 = createBox(0xff9900, 100, 100, "box2");

box1.x = 20;
box1.y = 20;
box2.x = 70;
box2.y = 90;

app.stage.addChild(box1);
app.stage.addChild(box2);

app.stage.children.forEach((child, index)=>{
	console.log(index, child.name);
});