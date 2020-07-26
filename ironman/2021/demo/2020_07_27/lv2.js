const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

let controller = {
	counts: 1
};

const stats = new Stats();
stats.domElement.style.position = "absolute";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);

const gui = new dat.GUI();
gui.add(controller, "counts", [1, 10, 100, 1000, 10000]).onChange(guiHandler);
function guiHandler(){
	bunnyContainer.removeChildren();
	for(let i = 0; i< controller.counts; i++){
		createBunny();
	};
};


const bunnyContainer = new PIXI.Container();
app.stage.addChild(bunnyContainer);

function createBunny(){
	const bunny = PIXI.Sprite.from('assets/basics/bunny.png');

	bunny.anchor.set(0.5);
	bunny.x = Math.random()* app.screen.width;
	bunny.y = Math.random()* app.screen.height;

	bunnyContainer.addChild(bunny);

	TweenMax.to(bunny, 1, {x:bunny.x+100, yoyo:true, repeat:-1, ease:Strong.easeInOut});
};







app.ticker.add((delta) => {
    stats.begin();
    stats.end();
});


guiHandler();
