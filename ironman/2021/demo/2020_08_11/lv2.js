const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// ---
const graphic1 = new PIXI.Graphics();
graphic1.beginFill(0xffffff);
graphic1.drawRect(0, 0, 100, 100);
graphic1.endFill();

app.stage.addChild(graphic1);

graphic1.x = 50;
graphic1.y = 50;

const graphic1_2 = new PIXI.Graphics();
graphic1_2.beginFill(0xffffff);
graphic1_2.drawRect(0, 0, 100, 100);
graphic1_2.endFill();

app.stage.addChild(graphic1_2);

graphic1_2.x = 200;
graphic1_2.y = 50;
graphic1_2.tint = 0xff9900;

const graphic1_3 = new PIXI.Graphics();
graphic1_3.beginFill(0xff9900);
graphic1_3.drawRect(0, 0, 100, 100);
graphic1_3.endFill();

app.stage.addChild(graphic1_3);

graphic1_3.x = 350;
graphic1_3.y = 50;


const orange_box = PIXI.Sprite.from('assets/orange-box.png');
app.stage.addChild(orange_box);

orange_box.x = 500;
orange_box.y = 50;

// ---
const graphic2 = new PIXI.Graphics();
graphic2.beginFill(0x0);
graphic2.drawRect(0, 0, 100, 100);
graphic2.endFill();

app.stage.addChild(graphic2);

graphic2.x = 50;
graphic2.y = 200;

const graphic2_2 = new PIXI.Graphics();
graphic2_2.beginFill(0x0);
graphic2_2.drawRect(0, 0, 100, 100);
graphic2_2.endFill();

app.stage.addChild(graphic2_2);

graphic2_2.x = 200;
graphic2_2.y = 200;
graphic2_2.tint = 0xff9900;

// ---
const graphic3 = new PIXI.Graphics();
graphic3.beginFill(0x888888);
graphic3.drawRect(0, 0, 100, 100);
graphic3.endFill();

app.stage.addChild(graphic3);

graphic3.x = 50;
graphic3.y = 350;

const graphic3_2 = new PIXI.Graphics();
graphic3_2.beginFill(0x888888);
graphic3_2.drawRect(0, 0, 100, 100);
graphic3_2.endFill();

app.stage.addChild(graphic3_2);

graphic3_2.x = 200;
graphic3_2.y = 350;
graphic3_2.tint = 0xff9900;