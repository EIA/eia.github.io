const app = new PIXI.Application({ backgroundColor: 0xDDDDDD });
document.body.appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);

const box1 = createBox();
box1.x = 0;
box1.y = -25 - 5;
container.addChild(box1);

const box2 = createBox();
box2.x = 0 - 50 - 10;
box2.y = -25 - 5;
container.addChild(box2);

const box3 = createBox();
box3.x = 0 - 50 - 10 - 50 - 10;
box3.y = -25 - 5;
container.addChild(box3);

const box4 = createBox();
box4.x = 0 + 50 + 10;
box4.y = -25 - 5;
container.addChild(box4);

const box5 = createBox();
box5.x = 0 + 50 + 10 + 50 + 10;
box5.y = -25 - 5;
container.addChild(box5);

const box6 = createBox();
box6.x = 25 + 5;
box6.y = 25 + 5;
container.addChild(box6);

const box7 = createBox();
box7.x = 25 + 5 + 50 + 10;
box7.y = 25 + 5;
container.addChild(box7);

const box8 = createBox();
box8.x = -25 - 5;
box8.y = 25 + 5;
container.addChild(box8);

const box9 = createBox();
box9.x = -25 - 5 - 50 - 10;
box9.y = 25 + 5;
container.addChild(box9);


function createBox(){
	var box = new PIXI.Graphics();
	box.beginFill(0x0);
	box.drawRect(-25, -25, 50, 50);
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