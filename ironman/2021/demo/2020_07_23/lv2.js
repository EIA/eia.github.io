const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


const boxContainer1 = new PIXI.Container();
boxContainer1.name = "boxContainer1";
app.stage.addChild(boxContainer1);

const boxContainer2 = new PIXI.Container();
boxContainer2.name = "boxContainer2";
app.stage.addChild(boxContainer2);

const boxContainer3 = new PIXI.Container();
boxContainer3.name = "boxContainer3";
app.stage.addChild(boxContainer3);

boxContainer1.x = 0;
boxContainer2.x = boxContainer1.x + boxContainer1.width;
boxContainer3.x = boxContainer2.x + boxContainer2.width;

const graphic1 = new PIXI.Graphics();
graphic1.beginFill(0xff0000);
graphic1.drawRect(0, 0, 100, 100);
graphic1.endFill();
boxContainer1.addChild(graphic1);

const graphic2 = new PIXI.Graphics();
graphic2.beginFill(0xff9900);
graphic2.drawRect(0, 0, 100, 100);
graphic2.endFill();
boxContainer2.addChild(graphic2);

const graphic3 = new PIXI.Graphics();
graphic3.beginFill(0xff0000);
graphic3.drawRect(0, 0, 100, 100);
graphic3.endFill();
boxContainer3.addChild(graphic3);

console.log("boxContainer1.x: ", boxContainer1.x, " boxContainer1.width: ", boxContainer1.width);
console.log("boxContainer2.x: ", boxContainer2.x, " boxContainer2.width: ", boxContainer1.width);
console.log("boxContainer3.x: ", boxContainer3.x, " boxContainer3.width: ", boxContainer1.width);