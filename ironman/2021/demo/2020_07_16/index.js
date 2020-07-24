const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunnies = [];

createBunny = function(){
	const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
	bunny.anchor.set(0.5);
	bunny.x = Math.random() * app.screen.width;
	bunny.y = Math.random() * app.screen.height;
	app.stage.addChild(bunny);
	bunnies.push(bunny);
	return bunny;
};

app.ticker.add((delta) => {
	bunnies.forEach((bunny)=>{
		bunny.rotation += 0.1 * delta;
	});
});

createBunny();

window.onmessage = function(e) {
	console.log(e.data);
	createBunny();
};

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);
};
onresize();