const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const BAR_WIDTH = 100;
const BAR_HEIGHT = 160;

const bar = new PIXI.Container();
const barGray = new PIXI.Graphics();
const barBlack = new PIXI.Graphics();
const barRed = new PIXI.Graphics();


bar.addChild(barBlack);
bar.addChild(barGray);
bar.addChild(barRed);

barBlack.beginFill(0x000000);
barBlack.drawRect(BAR_WIDTH * -.5, 0, BAR_WIDTH, BAR_HEIGHT);
barBlack.endFill();

barGray.beginFill(0xcccccc, .3);
barGray.drawRect(BAR_WIDTH * -.5, BAR_HEIGHT * -1, BAR_WIDTH, BAR_HEIGHT);
barGray.endFill();


app.stage.addChild(bar);
bar.x = 300;
bar.y = 300;


function updateRedBar(barHeight){
	// console.log('updateRedBar: ', barHeight)
	barRed.clear();
	barRed.beginFill(0xFF2F2F);
	barRed.drawRoundedRect(
		BAR_WIDTH * -.5, // x
		0, // y
		BAR_WIDTH, // 寬
		barHeight, // 高
		40 // 圓角
	);
	barRed.endFill();
}

updateRedBar(160);





// ---


const gui = new dat.GUI();
const controller = {
	barHeight: 160
}

gui.add(controller, 'barHeight', -160, 160, 0.01).onChange(saleChangeHandler).listen();

function saleChangeHandler(){
	updateRedBar(controller.barHeight);
}

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);
};

onresize();

TweenMax.to(controller, 4, {barHeight: -160, repeat: -1, yoyo:true, ease:Linear.easeNone, onUpdate:()=>{
		saleChangeHandler();
	}
});
