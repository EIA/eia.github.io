const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');

bunny.anchor.set(0.5);

bunny.x = 110;
bunny.y = 250;

app.stage.addChild(bunny);

gsap.to(bunny, {duration: 2, x: 720, ease:"none"});

setTimeout(()=>{
	gsap.to(bunny, {duration: 2, x: 720, ease:"none"});	
}, 1600);


window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);

  

};

onresize();