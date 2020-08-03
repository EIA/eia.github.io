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

	btn.startPressTime = new Date();
	btn.pressTime = 0;
	btn.isHold = false;
	btn.interval = setInterval(function(){ 
		const upDate = new Date();
		btn.pressTime = upDate.getTime() - btn.startPressTime.getTime();
		if(btn.pressTime >= 300 && btn.isHold === false){
			btn.isHold = true;
			msg += `btn.isHold: ${btn.isHold}</br>`;
			output();
		}

	}, 50);

	msg = `pointerdown: ${btn.pressTime}</br>`;
	output();
});
btn.on('pointermove', function(){
	msg += `pointermove: ${btn.pressTime}</br>`;
	output();
});
btn.on('pointerup', function(){
	const upDate = new Date();
	console.log('up: ', upDate.getTime());
	btn.pressTime = upDate.getTime() - btn.startPressTime.getTime();
	btn.isHold = false;

	msg = `pointerup: ${btn.pressTime}</br>`;
	output();
	if(btn.interval){
		clearInterval(btn.interval);	
	};
	if(btn.pressTime < 300){
		msg += `btn.pressTime < 300, go to game</br>`;
	}else{
		msg += `btn.pressTime > 300</br>`;
	}
	output();
});

btn.interactive = true;

function output(){
	// console.log(msg);
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