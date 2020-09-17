const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const BAR_WIDTH = 50;
const BAR_HEIGHT = 170;

const bar = new PIXI.Container();
const barGray = new PIXI.Graphics();
const barBlack = new PIXI.Graphics();
const barRed = new PIXI.Graphics();

let barRedPercentage = 1;


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


function updateRedBar(scaleY){
	// console.log('updateRedBar: ', scaleY)
	barRed.clear();
	barRed.beginFill(0xFF2F2F);
	barRed.drawRoundedRect(
		BAR_WIDTH * -.5, // x
		0, // y
		BAR_WIDTH, // 寬
		(BAR_HEIGHT * scaleY), // 高
		20 // 圓角
	);
	barRed.endFill();
}

updateRedBar(barRedPercentage);





// ---


const gui = new dat.GUI();
const controller = {
	scaleY: barRedPercentage
}

gui.add(controller, 'scaleY', -1, 1, 0.01).onChange(saleChangeHandler).listen();

function saleChangeHandler(){
	barRedPercentage = controller.scaleY;
	updateRedBar(barRedPercentage);
}

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);
};

onresize();


// controller.scaleY = -1;


TweenMax.to(controller, 2, {scaleY: -1, repeat: -1, yoyo:true, ease:Linear.easeNone, onUpdate:()=>{
		saleChangeHandler();
	}
});
