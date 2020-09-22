const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);

  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
};

onresize();


const gui = new dat.GUI();
const controller = {
	bunnyAlpha: 1
};
gui.add(controller, 'bunnyAlpha', 0, 1, 0.01).onChange(guiHandler);

function guiHandler(){
	console.log("controller.: ", controller.bunnyAlpha);
	bunny.alpha = controller.bunnyAlpha;
};