const app = new PIXI.Application({ backgroundColor: 0x1099bb, forceCanvas: false });
document.body.appendChild(app.view);


const COLUMN = 16;
const ROW = 16;
const BOX_WH = 20;

let originGraphic = new PIXI.Graphics();
function drawGraphic(colorArray){
	originGraphic.clear();
	for(let i = 0; i < COLUMN ; i++){
		const value1 = i / (COLUMN -1);
		for(let j = 0; j < ROW; j++){
			const value2 = (ROW -1 - j) / (ROW -1);
			const fillGray = PIXI.utils.rgb2hex([value2, value2, value2]);

			originGraphic.beginFill(fillGray);
			originGraphic.drawRect(i * BOX_WH, j * BOX_WH, BOX_WH, BOX_WH);
			originGraphic.endFill();


			const fillColorR = colorArray[0] * value2;
			const fillColorG = colorArray[1] * value2;
			const fillColorB = colorArray[2] * value2;
			const fillColor = PIXI.utils.rgb2hex([fillColorR/256, fillColorG/256, fillColorB/256]);
			originGraphic.beginFill(fillColor, value1);
			originGraphic.drawRect(i * BOX_WH, j * BOX_WH, BOX_WH, BOX_WH);
			originGraphic.endFill();
		};
	};
};
drawGraphic([1, 1, 1]);

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
	FillColor: [ 255, 0, 0 ],
	TintColor: 0xffffff,
	BackgroundColor: 0x1099bb
};
gui.addColor(effectController, 'BackgroundColor').onChange( backgroundColorChangeHandler );
gui.addColor(effectController, 'FillColor').onChange( fillColorChangeHandler );
gui.addColor(effectController, 'TintColor').onChange( tintChangeHandler );

function backgroundColorChangeHandler(){
	app.renderer.backgroundColor = effectController.BackgroundColor;
};

function fillColorChangeHandler(){
	// originGraphic.tint = effectController.FillColor;
	drawGraphic(effectController.FillColor);
};
fillColorChangeHandler();

function tintChangeHandler(){
	originGraphic.tint = effectController.TintColor;
};
