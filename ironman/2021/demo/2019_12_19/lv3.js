const app = new PIXI.Application({ backgroundColor: 0xDDDDDD });
document.body.appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);

const BOX_WH = 120;
const SPACE = BOX_WH * .1;

const LINE1_COUNT = 5;
const LINE2_COUNT = 4;
let line1_W = (LINE1_COUNT * BOX_WH + (LINE1_COUNT - 1) * SPACE);
let line2_W = (LINE2_COUNT * BOX_WH + (LINE2_COUNT - 1) * SPACE);



const box1 = createBox();
box1.x = (BOX_WH + SPACE) * 0 - line1_W * .5 + BOX_WH * .5;
box1.y = (BOX_WH + SPACE) * 0 - BOX_WH *.5 - SPACE * .5;
container.addChild(box1);

const box2 = createBox();
box2.x = (BOX_WH + SPACE) * 1 - line1_W * .5 + BOX_WH * .5;
box2.y = (BOX_WH + SPACE) * 0 - BOX_WH *.5 - SPACE * .5;
container.addChild(box2);

const box3 = createBox();
box3.x = (BOX_WH + SPACE) * 2 - line1_W * .5 + BOX_WH * .5;
box3.y = (BOX_WH + SPACE) * 0 - BOX_WH *.5 - SPACE * .5;
container.addChild(box3);

const box4 = createBox();
box4.x = (BOX_WH + SPACE) * 3 - line1_W * .5 + BOX_WH * .5;
box4.y = (BOX_WH + SPACE) * 0 - BOX_WH *.5 - SPACE * .5;
container.addChild(box4);

const box5 = createBox();
box5.x = (BOX_WH + SPACE) * 4 - line1_W * .5 + BOX_WH * .5;
box5.y = (BOX_WH + SPACE) * 0 - BOX_WH *.5 - SPACE * .5;
container.addChild(box5);



const box6 = createBox();
box6.x = (BOX_WH + SPACE) * 0 - line2_W * .5 + BOX_WH * .5;
box6.y = (BOX_WH + SPACE) * 0 + BOX_WH *.5 + SPACE * .5;
container.addChild(box6);

const box7 = createBox();
box7.x = (BOX_WH + SPACE) * 1 - line2_W * .5 + BOX_WH * .5;
box7.y = (BOX_WH + SPACE) * 0 + BOX_WH *.5 + SPACE * .5;
container.addChild(box7);

const box8 = createBox();
box8.x = (BOX_WH + SPACE) * 2 - line2_W * .5 + BOX_WH * .5;
box8.y = (BOX_WH + SPACE) * 0 + BOX_WH *.5 + SPACE * .5;
container.addChild(box8);

const box9 = createBox();
box9.x = (BOX_WH + SPACE) * 3 - line2_W * .5 + BOX_WH * .5;
box9.y = (BOX_WH + SPACE) * 0 + BOX_WH *.5 + SPACE * .5;
container.addChild(box9);


function createBox(){
	var box = new PIXI.Graphics();
	box.beginFill(0x0);
	box.drawRect(BOX_WH * -.5, BOX_WH * -.5, BOX_WH, BOX_WH);
	box.endFill();
	return box;
}






window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);

  app.stage.position.x = app.renderer.width * .5;
  app.stage.position.y = app.renderer.height * .5;

};
onresize();