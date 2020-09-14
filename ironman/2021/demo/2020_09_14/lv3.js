const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);
app.stage.name = 'stage';

const hitBox = new PIXI.Graphics();
app.stage.name = 'hitBox';
hitBox.beginFill(0xff9900);
hitBox.drawRect(-100, -100, 200, 200);
hitBox.endFill();
app.stage.addChild(hitBox);
hitBox.x = app.screen.width / 2;
hitBox.y = app.screen.height / 2;

hitBox.interactive = true;
hitBox.buttonMode = true;
hitBox.on('pointerdown', onDragStart);
hitBox.on('pointerup', onDragEnd);
hitBox.on('pointerupoutside', onDragEnd);
hitBox.on('pointermove', onDragMove);



const hitBall = new PIXI.Graphics();
app.stage.name = 'hitBall';
hitBall.beginFill(0xff0000);
hitBall.drawCircle(0, 0, 30);
hitBall.endFill();

app.stage.addChild(hitBall);
hitBall.x = app.screen.width / 2;
hitBall.y = app.screen.height / 2;



function onDragStart(event) {
    console.log('onDragStart');
    this.data = event.data;
    // this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    console.log('onDragEnd');
    // this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove(e) {
    console.log('onDragMove');
    const hit = app.renderer.plugins.interaction.hitTest(e.data.global);
    console.log('hit: ', hit, hit?hit.name:"");
    if (this.dragging && hit && hit === hitBox) {
        const newPosition = this.data.getLocalPosition(this.parent);
        hitBall.x = newPosition.x;
        hitBall.y = newPosition.y;
    }
}



window.onresize = function (event){
	var w = window.innerWidth;
	var h = window.innerHeight;

	app.view.style.width = w + "px";
	app.view.style.height = h + "px";
	app.renderer.resize(w,h);

	hitBox.x = app.screen.width / 2;
	hitBox.y = app.screen.height / 2;

    hitBall.x = app.screen.width / 2;
    hitBall.y = app.screen.height / 2;
};

onresize();