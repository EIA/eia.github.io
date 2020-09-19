const app = new PIXI.Application({ backgroundColor: 0x1099bb, forceCanvas: false });
document.body.appendChild(app.view);


const COLUMN = 16;
const ROW = 16;
const BOX_WH = 20;

let originGraphic = new PIXI.Graphics();
for(let i = 0; i < COLUMN ; i++){
	let fillAlpha = (COLUMN -1 - i) / (COLUMN -1);
	for(let j = 0; j < ROW; j++){
		const value = (ROW -1 - j) / (ROW -1);
		const fillColor = PIXI.utils.rgb2hex([value, value, value]);
		originGraphic.beginFill(fillColor, fillAlpha);
		originGraphic.drawRect(i * BOX_WH, j * BOX_WH, BOX_WH, BOX_WH);
		originGraphic.endFill();
	};
};
app.stage.addChild(originGraphic);
originGraphic.x = 20; // 50
originGraphic.y = 20; // 50

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
	// TintColor: [ 255, 255, 255 ]
	TintColor: 0xffffff,
	BackgroundColor: 0x1099bb
};
gui.addColor(effectController, 'BackgroundColor').onChange( backgroundColorChangeHandler );
gui.addColor(effectController, 'TintColor').onChange( tintChangeHandler ).listen();

function backgroundColorChangeHandler(){
	app.renderer.backgroundColor = effectController.BackgroundColor;
};

function tintChangeHandler(){
	originGraphic.tint = effectController.TintColor;
};
