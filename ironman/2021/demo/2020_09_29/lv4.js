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


function createGradTexture() {
    // adjust it if somehow you need better quality for very very big images
    const quality = 256;
    const canvas = document.createElement('canvas');
    canvas.width = quality;
    canvas.height = 1;

    const ctx = canvas.getContext('2d');

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, quality, 0);
    grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
    grd.addColorStop(0.3, 'cyan');
    grd.addColorStop(0.7, 'red');
    grd.addColorStop(1, 'green');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, quality, 1);

    return PIXI.Texture.from(canvas);
};


const gradTexture = createGradTexture();

const sprite = new PIXI.Sprite(gradTexture);
sprite.position.set(100, 100);
sprite.rotation = Math.PI / 8;
sprite.width = 500;
sprite.height = 50;
app.stage.addChild(sprite);
sprite.filters = [glowFilter];


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