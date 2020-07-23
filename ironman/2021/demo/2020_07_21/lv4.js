const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

function createBox(color, alpha, name){
	const box = new PIXI.Graphics();
	box.name = name;
	box.beginFill(color, alpha);
	box.drawRect(0, 0, 100, 100);
	box.endFill();
	box.interactive = true;
	box.on("pointerdown", function(){
		console.log(name);
	});
	return box;
};


const box1 = createBox(0xff0000, 1, 'box1');
const box2 = createBox(0xff9900, 1, 'box2');
const box3 = createBox(0xff0000, 1, 'box3');
const box4 = createBox(0xff9900, 1, 'box4');
const box5 = createBox(0xff0000, 1, 'box5');

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

app.stage.children.forEach((child, index)=>{
	console.log(index, child.name);
});

console.log('---');

// console.log("app.stage.setChildIndex(box3, 5);");
// app.stage.setChildIndex(box3, 5); // 不可以大於 length

// console.log("app.stage.setChildIndex(box3, -1);");
// app.stage.setChildIndex(box3, -1); // 不可以小於 0

/* v2
console.log("app.stage.setChildIndex(box1, 4);");
app.stage.setChildIndex(box1, 4); // 最上層

console.log("app.stage.setChildIndex(box5, 0);");
app.stage.setChildIndex(box5, 0); // 最下層

console.log("app.stage.setChildIndex(box4, 0);");
app.stage.setChildIndex(box4, 0); // 最下層
*/


app.stage.children.forEach((child, index)=>{
	if(index ===2){
		app.stage.setChildIndex(box3, 4); // 最上層
	}
	console.log(index, child.name);
});