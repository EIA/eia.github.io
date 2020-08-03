const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


// const graphicContainer = new PIXI.Container();
// graphicContainer.buttonMode = true;
// graphicContainer.interactive = true;
// graphicContainer.on("pointerdown", ()=>{
// 	console.log("graphicContainer down");
// });
// app.stage.addChild(graphicContainer);






const graphic = new PIXI.Graphics();
graphic.beginFill(0xff0000 ,.7);
graphic.drawRect(0, 0, 100, 100);
graphic.endFill();

graphic.x = 100;
graphic.buttonMode = true;
graphic.interactive = true;
graphic.on("pointerdown", ()=>{
	console.log("graphic down");
});

app.stage.addChild(graphic);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
bunny.buttonMode = true;
bunny.interactive = true;
bunny.on("pointerdown", ()=>{
	console.log("bunny down");
});
graphic.addChild(bunny);


// graphic.interactiveChildren = false;
console.log('interactive：本身');
console.log('interactiveChildren：孩子');