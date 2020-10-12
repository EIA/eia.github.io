const app = new PIXI.Application({ backgroundColor: 0x0 });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');

bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

// https://pixijs.io/pixi-filters/docs/PIXI.filters.GlowFilter.html
const glowFilter = new PIXI.filters.GlowFilter(32);
glowFilter.padding = 20;

const sprite = new PIXI.Sprite();
sprite.position.set(100, 100);
// sprite.rotation = Math.PI / 8;
sprite.width = 500;
sprite.height = 50;
app.stage.addChild(sprite);
sprite.filters = [glowFilter];

let gradStartPos = 0;
let count = 0;

app.ticker.add((delta) => {
    bunny.rotation += 0.01 * delta;

    sprite.texture.destroy(true);

    gradStartPos += 0.01;
    if (gradStartPos >= 1) { // 不為 1
        gradStartPos -= 1;
    }

    count += 0.01;
    glowFilter.distance = 15 * Math.sin(count) + 2 + 15;
    // console.log(glowFilter.distance);
    const gradTexture = createGradTexture(gradStartPos, 0.5);
    sprite.texture = gradTexture;
});



bunny.filters = [glowFilter];


function createGradTexture(start, length) {

    let gradType;
    // console.log("start: ", start, " length: ", length);
    if (start + length < 1){
        gradType = 1;
        // console.log("1 - start: ", start, " end: ", start + length);
    }else{
        gradType = 2;
        // console.log("2 - start: ", start, " end: ", 1);
        // console.log("2 - start: ", 0, " end: ", (start + length - 1) );
    }


    // adjust it if somehow you need better quality for very very big images
    const quality = 256;
    const canvas = document.createElement('canvas');
    canvas.width = quality;
    canvas.height = 1;

    const ctx = canvas.getContext('2d');

    /*
    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, quality, 0);
    grd.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    grd.addColorStop(0.3, 'rgba(255, 255, 255, 0.0)');
    grd.addColorStop(0.5, 'rgba(255, 255, 255, 0.0)');
    grd.addColorStop(0.65, 'cyan');
    grd.addColorStop(0.7, 'red');
    grd.addColorStop(1, 'green');
    */

    const grd = ctx.createLinearGradient(0, 0, quality, 0);
    if (gradType === 1) {
        grd.addColorStop(0, `rgba(255, 255, 255, 0`);
        grd.addColorStop(start, `rgba(255, 255, 255, 0`);
        grd.addColorStop(start, `rgba(255, 255, 255, 1)`);
        grd.addColorStop(start + length, `rgba(255, 255, 255, 1)`);
        grd.addColorStop(start + length, `rgba(255, 255, 255, 0`);
    } else {
        grd.addColorStop(0, `rgba(255, 255, 255, 1)`);
        grd.addColorStop((start + length - 1), `rgba(255, 255, 255, 1)`);
        grd.addColorStop((start + length - 1), `rgba(255, 255, 255, 0)`);
        grd.addColorStop(start, `rgba(255, 255, 255, 0)`);
        grd.addColorStop(start, `rgba(255, 255, 255, 1)`);
        grd.addColorStop(1, `rgba(255, 255, 255, 1)`);
    }

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, quality, 1);

    return PIXI.Texture.from(canvas);
};







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
