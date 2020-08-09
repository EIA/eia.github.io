const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

let controller = {
	counts: 1,
	FPS: 60,
	useGSAPTicker: false
};

const stats = new Stats();
stats.domElement.style.position = "absolute";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);

const gui = new dat.GUI();
gui.add(controller, "counts", [1, 10, 100, 1000, 10000, 30000]).onChange(guiHandler);
gui.add(controller, "FPS", [1, 10, 30, 60, 100]).onChange(FPSUpdateHandler);
gui.add(controller, "useGSAPTicker").onChange(tickerMethodUpdateHandler);
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

function tickerMethodUpdateHandler(){
	console.log("tickerMethodUpdateHandler: ", controller.useGSAPTicker);
	if(controller.useGSAPTicker){
		app.ticker.stop();
		gsap.ticker.lagSmoothing(1000, 16);
		gsap.ticker.add(gsapTickerUpdate);
	}else{
		app.ticker.start();
		gsap.ticker.remove(gsapTickerUpdate);
	}
}
function gsapTickerUpdate(){
	console.log("gsapTickerUpdate");
	app.ticker.update();
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


app.ticker.add((delta) => {
    stats.begin();
    stats.end();
});


guiHandler();
