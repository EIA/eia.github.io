const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


const container = new PIXI.Container();
app.stage.addChild(container);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
container.addChild(bunny);

setTimeout(function(){
	container.width *= 1.5;
}, 1000);


// container.scale.x = 1.5;