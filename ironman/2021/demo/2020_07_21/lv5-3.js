const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

function createBox(color, w, h, name){
	const boxContainer = new PIXI.Container();
	boxContainer.name = name;
	const box = new PIXI.Graphics();
	box.beginFill(color);
	box.drawRect(0, 0, 100, 100);
	box.endFill();
	box.interactive = true;
	box.on("pointerdown", function(){
		console.log(name);
	});

	
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
const box4 = createBox(0xff9900, 100, 100, 'box4');
const box5 = createBox(0xff0000, 100, 100, 'box5');

box1.x = 100;
box2.x = 150;
box3.x = 100;
box4.x = 150;
box5.x = 100;

box1.y = 100;
box2.y = 170;
box3.y = 240;
box4.y = 310;
box5.y = 380;



app.stage.addChild(box1);
app.stage.addChild(box2);
app.stage.addChild(box3);
app.stage.addChild(box4);
app.stage.addChild(box5);


console.log("app.stage.sortableChildren = true;");
// app.stage.sortableChildren = true;

// box2.zIndex = 500;


app.stage.children.forEach((child, index)=>{
	if(index===1){
		child.zIndex = -700;
	}
	console.log(index, child.name, child.zIndex);
});


app.stage.children.forEach((child, index)=>{
	console.log(index, child.name, child.zIndex);
});


// app.stage.sortChildren();



