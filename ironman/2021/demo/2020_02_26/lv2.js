const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const BAR_WIDTH = 50;
const BAR_HEIGHT = 170;

const bar = new PIXI.Container();
const barBlack = new PIXI.Graphics();
const barRed = new PIXI.Graphics();

bar.addChild(barBlack);
bar.addChild(barRed);

barBlack.beginFill(0x000000);
barBlack.drawRect(BAR_WIDTH * -.5, 0, BAR_WIDTH, BAR_HEIGHT * -1);
barBlack.endFill();


barRed.beginFill(0xFF2F2F);
barRed.drawRect(BAR_WIDTH * -.5, 0, BAR_WIDTH, BAR_HEIGHT * -1);
barRed.endFill();


bar.x = 300;
bar.y = 300;


app.stage.addChild(bar);



// ---


const gui = new dat.GUI();
const controller = {
	scaleY: 1
}

gui.add(controller, 'scaleY', 0, 1, 0.01).onChange(saleChangeHandler);

function saleChangeHandler(){
	barRed.scale.y = controller.scaleY;
}