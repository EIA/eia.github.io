const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

function createBox(){
	const btn = new PIXI.Graphics();
	btn.beginFill(0xff9900);
	btn.drawRect(0, 0, 100, 100);
	btn.endFill();
	return btn;
}

const btn = createBox();
app.stage.addChild(btn);

btn.x = 30;
btn.y = 30;

let msg = "";

btn.on('pointerdown', function(){
	msg = "pointerdown</br>";
	output('pointerdown');
});
btn.on('pointermove', function(){
	msg += "pointermove</br>";
	output('pointermove');
});
btn.on('pointerup', function(){
	msg += "pointerup</br>";
	output('pointerup');
});

btn.interactive = true;

function output(){
	console.log(msg);
	document.getElementById('output').innerHTML = msg;
}




window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);

};

onresize();