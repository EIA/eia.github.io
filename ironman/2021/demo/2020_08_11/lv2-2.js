const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const fontStyle = {
	fontSize: 24
}




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

const row1 = new PIXI.Text('', fontStyle);
row1.text = `左: 0xFFFFFF
右: 0xFFFFFF，tint 0xFF9900`;
row1.x = 350;
row1.y = 50 + 20;
app.stage.addChild(row1);

// ---
const graphic2 = new PIXI.Graphics();
graphic2.beginFill(0x888888);
graphic2.drawRect(0, 0, 100, 100);
graphic2.endFill();

app.stage.addChild(graphic2);

graphic2.x = 50;
graphic2.y = 200;

const graphic2_2 = new PIXI.Graphics();
graphic2_2.beginFill(0x888888);
graphic2_2.drawRect(0, 0, 100, 100);
graphic2_2.endFill();

app.stage.addChild(graphic2_2);

graphic2_2.x = 200;
graphic2_2.y = 200;
graphic2_2.tint = 0xff9900;

const row2 = new PIXI.Text('', fontStyle);
row2.text = `左: 0x888888
右: 0x888888，tint 0xFF9900`;
row2.x = 350;
row2.y = 200 + 20;
app.stage.addChild(row2);

// ---
const graphic3 = new PIXI.Graphics();
graphic3.beginFill(0x0);
graphic3.drawRect(0, 0, 100, 100);
graphic3.endFill();

app.stage.addChild(graphic3);

graphic3.x = 50;
graphic3.y = 350;

const graphic3_2 = new PIXI.Graphics();
graphic3_2.beginFill(0x0);
graphic3_2.drawRect(0, 0, 100, 100);
graphic3_2.endFill();

app.stage.addChild(graphic3_2);

graphic3_2.x = 200;
graphic3_2.y = 350;
graphic3_2.tint = 0xff9900;

const row3 = new PIXI.Text('', fontStyle);
row3.text = `左: 0x000000
右: 0x000000，tint 0xFF9900`;
row3.x = 350;
row3.y = 350 + 20;
app.stage.addChild(row3);

//

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);
};

onresize();