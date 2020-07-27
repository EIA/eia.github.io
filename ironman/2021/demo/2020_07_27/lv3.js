const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

let controller = {
	counts: 1,
	FPS: 60
};

const stats = new Stats();
stats.domElement.style.position = "absolute";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);

const gui = new dat.GUI();
gui.add(controller, "counts", [1, 10, 100, 1000, 10000, 30000]).onChange(guiHandler);
gui.add(controller, "FPS", [1, 10, 30, 60, 100]).onChange(FPSUpdateHandler);
function guiHandler(){
	bunnyContainer.removeChildren();
	for(let i = 0; i< controller.counts; i++){
		createBunny();
	};
};

function FPSUpdateHandler(){
	// gsap.ticker.fps(30);
	gsap.ticker.fps(controller.FPS);
}




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




window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);
};
onresize();

app.ticker.stop();


gsap.ticker.lagSmoothing(1000, 16);

// Now, we use 'tick' from gsap
gsap.ticker.add(() => {
    app.ticker.update();
});

app.ticker.add((delta) => {
    stats.begin();
    stats.end();
});


guiHandler();
