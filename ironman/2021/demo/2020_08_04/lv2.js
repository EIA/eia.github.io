const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


const outputBox = document.getElementById("ot");

outputBox.onpointerover = (event) => {
  console.log('Pointer moved in');
};


function createHoverBox(){
	const container = new PIXI.Container();
	const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
	bunny.anchor.set(.5);
	bunny.scale.set(3);
	bunny.defaultY = 18;
	bunny.hoverY = -30;
	const box = new PIXI.Graphics();
	box.beginFill(0xff9900, .95);
	box.drawRect(-50, 0, 100, 100);
	box.endFill();

	container.addChild(bunny, box);

	container.interactive = true;
	container.buttonMode = true;

	TweenMax.set(bunny, {y: bunny.defaultY});
	container.on("mouseover", ()=>{
		console.log("mouseover");
		outputBox.innerText = "mouseover";
		TweenMax.to(bunny, .3, {y: bunny.hoverY, ease:Strong.easeOut});
	});
	container.on("mouseout", ()=>{
		console.log("mouseout");
		outputBox.innerText = "mouseout";
		TweenMax.to(bunny, .3, {y: bunny.defaultY, ease:Strong.easeOut});
	});


	container.on("pointerdown", ()=>{
		console.log("pointerdown");
		outputBox.innerText = "pointerdown";
		TweenMax.to(bunny, .3, {y: bunny.hoverY, ease:Strong.easeOut});
	});
	container.on("pointerup", ()=>{
		console.log("pointerup");
		outputBox.innerText = "pointerup";
		TweenMax.to(bunny, .3, {y: bunny.defaultY, ease:Strong.easeOut});
	});

	container.on("pointerover", ()=>{
		console.log("pointerover");
		outputBox.innerText = "pointerover";
		TweenMax.to(bunny, .3, {y: bunny.hoverY, ease:Strong.easeOut});
	});
	container.on("pointerout", ()=>{
		console.log("pointerout");
		outputBox.innerText = "pointerout";
		TweenMax.to(bunny, .3, {y: bunny.defaultY, ease:Strong.easeOut});
	});

	return container;
}


const hoverBox1 = createHoverBox();
app.stage.addChild(hoverBox1);


hoverBox1.x = app.screen.width / 2;
hoverBox1.y = app.screen.height / 2;


window.onresize = function (event){
	var w = window.innerWidth;
	var h = window.innerHeight;

	app.view.style.width = w + "px";
	app.view.style.height = h + "px";
	app.renderer.resize(w,h);

	hoverBox1.x = app.screen.width / 2;
	hoverBox1.y = app.screen.height / 2;
};

onresize();