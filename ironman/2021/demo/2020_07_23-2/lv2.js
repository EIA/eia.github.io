const app = new PIXI.Application({ width:100, height: 100, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


const container = new PIXI.Container();
container.name = "container";
app.stage.addChild(container);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
bunny.name = "bunny";
container.addChild(bunny);

setTimeout(function(){
	container.scale.x = 1.5;
}, 1000);