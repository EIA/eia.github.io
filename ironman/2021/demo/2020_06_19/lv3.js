const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const container1 = new PIXI.Container();
container1.name = "container1";
app.stage.addChild(container1);
const box1 = new PIXI.Graphics();
box1.name = "box1";
box1.beginFill(0xff0000);
box1.drawRect(0, 0, 100, 150);
box1.endFill();
const mask1 = new PIXI.Graphics();
mask1.name = "mask1";
mask1.beginFill(0x0);
mask1.drawRect(0, 0, 100, 100);
mask1.endFill();

container1.addChild(box1);
container1.addChild(mask1);
container1.x = 50;
container1.y = 100;
box1.mask = mask1;
console.log("container1.height: ", container1.height);


const container2 = new PIXI.Container();
container2.name = "container2";
app.stage.addChild(container2);
const box2 = new PIXI.Graphics();
box2.name = "box2";
box2.beginFill(0xff0000);
box2.drawRect(0, 0, 100, 150);
box2.endFill();

const mask2 = new PIXI.Graphics();
mask2.name = "mask2";
mask2.beginFill(0x0);
mask2.drawRect(0, 0, 100, 100);
mask2.endFill();

container2.addChild(box2);
app.stage.addChild(mask2);

container2.x = 200;
container2.y = 100;
mask2.x = 200;
mask2.y = 100;
container2.mask = mask2;

console.log("container2.height: ", container2.height);