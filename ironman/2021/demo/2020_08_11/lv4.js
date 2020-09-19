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
originGraphic.x = 50;
originGraphic.y = 50;

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);
};

onresize();