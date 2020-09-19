const app = new PIXI.Application({ backgroundColor: 0xeeeeee, forceCanvas: false });
document.body.appendChild(app.view);

const colors = PIXI.Sprite.from('./d20.png');
app.stage.addChild(colors);
colors.x = 20;
colors.y = 60;
colors.scale.x = 0.4;
colors.scale.y = 0.4;

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);
};

onresize();

var gui = new dat.GUI();

var effectController = {
	TintColor: 0xffffff
};
gui.addColor(effectController, 'TintColor').onChange( tintChangeHandler );

function tintChangeHandler(){
	colors.tint = effectController.TintColor;
};
