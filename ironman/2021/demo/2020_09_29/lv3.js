const app = new PIXI.Application({ backgroundColor: 0x0 });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');

bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

app.ticker.add((delta) => {
    bunny.rotation += 0.01 * delta;
});

// https://pixijs.io/pixi-filters/docs/PIXI.filters.GlowFilter.html
const glowFilter = new PIXI.filters.GlowFilter(32
);
glowFilter.padding = 20;

bunny.filters = [glowFilter];


window.onresize = function (event) {
    var w = window.innerWidth;
    var h = window.innerHeight;

    app.view.style.width = w + "px";
    app.view.style.height = h + "px";
    app.renderer.resize(w, h);

    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;
};

onresize();