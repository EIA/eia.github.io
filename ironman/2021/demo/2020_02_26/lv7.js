const app = new PIXI.Application({ backgroundColor: 0xffffff });
document.body.appendChild(app.view);

const BAR_WIDTH = 200;
const BAR_HEIGHT = 30;
const BAR_ROUND = 12;
const BAR_MARGIN = 6;
const BAR_COLOR = 0x1099bb


function createBar(){
	const bar = new PIXI.Container();
	const barStoke = new PIXI.Graphics();
	const barBody = new PIXI.Graphics();

	bar.addChild(barStoke);
	bar.addChild(barBody);

	barStoke.lineStyle(2, BAR_COLOR);
	barStoke.drawRoundedRect(- BAR_MARGIN , - BAR_MARGIN, BAR_WIDTH + BAR_MARGIN * 2, BAR_HEIGHT + BAR_MARGIN * 2, BAR_ROUND);

	bar.setPercentage = function(percentage){
		barBody.clear();
		barBody.beginFill(BAR_COLOR);
		barBody.drawRoundedRect(
			0, 0, 
			BAR_WIDTH * percentage, // 寬
			BAR_HEIGHT, // 高
			BAR_ROUND // 圓角
		);
		barBody.endFill();
	};

	bar.setPercentage(1);

	return bar;
};


const bar1 = createBar();
app.stage.addChild(bar1);
bar1.setPercentage(1);
bar1.x = 100;
bar1.y = 100;

const bar2 = createBar();
app.stage.addChild(bar2);
bar2.setPercentage(0.5);
bar2.x = 340;
bar2.y = 100;

const bar3 = createBar();
app.stage.addChild(bar3);
bar3.setPercentage(0);
bar3.x = 580;
bar3.y = 100;





