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

	box.interactive = true;
	box.buttonMode = true;

	box.on("pointerdown", ()=>{
		console.log(`${name} pointerdown`);
	});

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

const testGraphic = new PIXI.Graphics();
testGraphic.name = "testGraphic";
testGraphic.beginFill(0xffffff);
testGraphic.moveTo(0, 0);
testGraphic.lineTo(300, 0);
testGraphic.lineTo(150, 220);
testGraphic.lineTo(0, 0);
testGraphic.endFill();

testGraphic.addChild(box1);
testGraphic.addChild(box2);
testGraphic.addChild(box3);

app.stage.addChild(testGraphic);
testGraphic.x = 50;
testGraphic.y = 50;

testGraphic.interactive = true;
testGraphic.buttonMode = true;

testGraphic.on("pointerdown", ()=>{
	console.log(`testGraphic pointerdown`);
});

// console.log("testGraphic.children.length: ", testGraphic.children.length);

const gui = new dat.GUI();
gui.add(testGraphic, "interactive").onChange(function(){
	console.log('testGraphic.interactive: ', testGraphic.interactive);
});
gui.add(testGraphic, "interactiveChildren").onChange(function(){
	console.log('testGraphic.interactiveChildren: ', testGraphic.interactiveChildren);
});

console.log('testGraphic.interactive: ', testGraphic.interactive);
console.log('testGraphic.interactiveChildren: ', testGraphic.interactiveChildren);
