const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');

bunny.anchor.set(0.5);

app.stage.addChild(bunny);


gsap.to(bunny, 
{
	duration: 1,
	x: 100,
	ease:"none",
	onStart:()=>{console.log("Start");},
	onComplete:()=>{console.log("Complete");}
});

setTimeout(()=>{
	gsap.to(bunny, {duration: 1, x: 100, ease:"none"});	
}, 900);


window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);

  app.stage.position.x = app.renderer.width * .5;
  app.stage.position.y = app.renderer.height * .5;

};

onresize();