const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


// const graphicContainer = new PIXI.Container();
// graphicContainer.buttonMode = true;
// graphicContainer.interactive = true;
// graphicContainer.on("pointerdown", ()=>{
// 	console.log("graphicContainer down");
// });
// app.stage.addChild(graphicContainer);







const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
bunny.buttonMode = true;
bunny.interactive = true;
bunny.on("pointerdown", ()=>{
	console.log("bunny down");
});
app.stage.addChild(bunny);


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
bunny.addChild(graphic);


bunny.interactiveChildren = false;