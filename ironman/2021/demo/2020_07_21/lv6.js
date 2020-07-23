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


console.log("app.stage.sortDirty: ", app.stage.sortDirty);
console.log("app.stage.sortChildren");
app.stage.sortChildren()
console.log("app.stage.sortDirty: ", app.stage.sortDirty);


const box1 = createBox(0xff0000, 1, 'box1');
app.stage.addChild(box1);
box1.x = 100;
box1.y = 100;
console.log("app.stage.addChild(box)");
console.log("app.stage.sortDirty: ", app.stage.sortDirty);


const box2 = createBox(0xff9900, 1, 'box2');
app.stage.addChild(box2);
box2.x = 150;
box2.y = 170;
console.log("app.stage.addChild(box)");
console.log("app.stage.sortDirty: ", app.stage.sortDirty);


app.stage.children.forEach((child, index)=>{
	console.log(index, child.name);
});