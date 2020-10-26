const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');

bunny.anchor.set(0.5);
app.stage.addChild(bunny);

bunny.x = 100;
bunny.y = 100;

let tl = new TimelineMax({
    onStart: function () {
    },
    onComplete: function () {
    }

});

tl.set(bunny, { x: 100 });
tl.to(bunny, 1.5, { x: 300 });