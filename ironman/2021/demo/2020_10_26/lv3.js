const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');

bunny.anchor.set(0.5);
app.stage.addChild(bunny);

bunny.x = 100;
bunny.y = 100;

let tl = new TimelineMax({
    onStart: function () {
        console.log("onStart");
    },
    onComplete: function () {
        console.log("onComplete");
    }

});

tl.set(bunny, { x: 100 });
tl.to(bunny, 5, { x: 700, ease:Linear.easeNone });

function stopTL() {
    tl.seek(100);
};

function stopTL3() {
    tl.pause();
};

function stopTL4() {
    tl.seek(0);
};