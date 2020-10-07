const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');

bunny.anchor.set(0.5);

app.stage.addChild(bunny);


const bunny2 = PIXI.Sprite.from('assets/basics/bunny.png');

bunny2.anchor.set(0.5);

app.stage.addChild(bunny2);
bunny2.y = 50;



gsap.to(bunny, {duration: 1, x: 100, y:100, ease:"none", onComplete: function(){
	console.log('c');
}});

setTimeout(()=>{
  // gsap.killTweensOf(bunny, {x: true, y: true});
  // gsap.killTweensOf(bunny, {x: true});
  gsap.killTweensOf(bunny);
  gsap.set(bunny, {x: -100, onComplete: function(){console.log("s")}});
}, 500);


gsap.to(bunny2, {duration: 1, x: 100, ease:"none"});

// setTimeout(()=>{
//   gsap.killTweensOf(bunny, "x");
//   gsap.set(bunny, {x: -100});
// }, 500);


// TweenMax.to(bunny, 1, {x: 100});

// setTimeout(()=>{
//   TweenMax.set(bunny, {x: -100});
// }, 500);


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