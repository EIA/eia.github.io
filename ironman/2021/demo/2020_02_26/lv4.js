const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const BAR_WIDTH = 50;
const BAR_HEIGHT = 170;

const bar = new PIXI.Container();
const barBlack = new PIXI.Graphics();
const barRed = new PIXI.Graphics();

let barRedPercentage = 1;


bar.addChild(barBlack);
bar.addChild(barRed);

barBlack.beginFill(0x000000);
barBlack.drawRect(BAR_WIDTH * -.5, 0, BAR_WIDTH, BAR_HEIGHT * -1);
barBlack.endFill();




app.stage.addChild(bar);
bar.x = 300;
bar.y = 300;


function updateRedBar(scaleY){
	console.log('updateRedBar: ', scaleY)
	barRed.clear();
	barRed.beginFill(0xFF2F2F);
	barRed.drawRoundedRect(
		BAR_WIDTH * -.5, // x
		((BAR_HEIGHT * -1) * scaleY), // y
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

gui.add(controller, 'scaleY', 0, 1, 0.01).onChange(saleChangeHandler);

function saleChangeHandler(){
	barRedPercentage = controller.scaleY;
	updateRedBar(barRedPercentage);
}