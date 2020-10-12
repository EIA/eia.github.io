const app = new PIXI.Application({ backgroundColor: 0x0 });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');

bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

const containerInner = new PIXI.Container();
containerInner.x = app.screen.width * 0.5;
containerInner.y = app.screen.height * 0.5;
app.stage.addChild(containerInner);


// https://pixijs.io/pixi-filters/docs/PIXI.filters.GlowFilter.html
const glowFilter = new PIXI.filters.GlowFilter(32);
glowFilter.padding = 20;

const spriteTopInner = new PIXI.Sprite();
spriteTopInner.width = 500;
spriteTopInner.height = 10;
spriteTopInner.x = -250;
spriteTopInner.y = -250;
containerInner.addChild(spriteTopInner);
spriteTopInner.filters = [glowFilter];

const spriteRightInner = new PIXI.Sprite();
spriteRightInner.width = 500;
spriteRightInner.height = 10;
spriteRightInner.x = 250;
spriteRightInner.y = -250;
spriteRightInner.angle = 90;
containerInner.addChild(spriteRightInner);
spriteRightInner.filters = [glowFilter];

const spriteBottomInner = new PIXI.Sprite();
spriteBottomInner.width = 500;
spriteBottomInner.height = 10;
spriteBottomInner.x = 250;
spriteBottomInner.y = 250;
spriteBottomInner.angle = 180;
containerInner.addChild(spriteBottomInner);
spriteBottomInner.filters = [glowFilter];

const spriteLeftInner = new PIXI.Sprite();
spriteLeftInner.width = 500;
spriteLeftInner.height = 10;
spriteLeftInner.x = -250;
spriteLeftInner.y = 250;
spriteLeftInner.angle = -90;
containerInner.addChild(spriteLeftInner);
spriteLeftInner.filters = [glowFilter];









const containerOutter = new PIXI.Container();
containerOutter.x = app.screen.width * 0.5;
containerOutter.y = app.screen.height * 0.5;
containerOutter.angle = -45;
app.stage.addChild(containerOutter);

const spriteTopOutter = new PIXI.Sprite();
spriteTopOutter.width = 600;
spriteTopOutter.height = 10;
spriteTopOutter.x = -300;
spriteTopOutter.y = -300;
containerOutter.addChild(spriteTopOutter);
spriteTopOutter.filters = [glowFilter];

const spriteRightOutter = new PIXI.Sprite();
spriteRightOutter.width = 600;
spriteRightOutter.height = 10;
spriteRightOutter.x = 300;
spriteRightOutter.y = -300;
spriteRightOutter.angle = 90;
containerOutter.addChild(spriteRightOutter);
spriteRightOutter.filters = [glowFilter];

const spriteBottomOutter = new PIXI.Sprite();
spriteBottomOutter.width = 600;
spriteBottomOutter.height = 10;
spriteBottomOutter.x = 300;
spriteBottomOutter.y = 300;
spriteBottomOutter.angle = 180;
containerOutter.addChild(spriteBottomOutter);
spriteBottomOutter.filters = [glowFilter];

const spriteLeftOutter = new PIXI.Sprite();
spriteLeftOutter.width = 600;
spriteLeftOutter.height = 10;
spriteLeftOutter.x = -300;
spriteLeftOutter.y = 300;
spriteLeftOutter.angle = -90;
containerOutter.addChild(spriteLeftOutter);
spriteLeftOutter.filters = [glowFilter];













let gradStartPos = 0;
let count = 0;

app.ticker.add((delta) => {
    bunny.rotation += 0.01 * delta;

    spriteTopInner.texture.destroy(true);
    spriteRightInner.texture.destroy(true);
    spriteBottomInner.texture.destroy(true);
    spriteLeftInner.texture.destroy(true);


    spriteTopOutter.texture.destroy(true);
    spriteRightOutter.texture.destroy(true);
    spriteBottomOutter.texture.destroy(true);
    spriteLeftOutter.texture.destroy(true);

    gradStartPos += 0.01;
    if (gradStartPos >= 1) { // 不為 1
        gradStartPos -= 1;
    }

    count += 0.01;
    // glowFilter.distance = 15 * Math.sin(count) + 2 + 15; // 不 tween glowFilter，怪

    
    // console.log(glowFilter.distance);
    const gradTexture = createGradTexture(gradStartPos, 0.5);
    spriteTopInner.texture = gradTexture;
    spriteRightInner.texture = gradTexture;
    spriteBottomInner.texture = gradTexture;
    spriteLeftInner.texture = gradTexture;

    spriteTopOutter.texture = gradTexture;
    spriteRightOutter.texture = gradTexture;
    spriteBottomOutter.texture = gradTexture;
    spriteLeftOutter.texture = gradTexture;
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

    containerInner.x = app.screen.width * 0.5;
    containerInner.y = app.screen.height * 0.5;
    containerOutter.x = app.screen.width * 0.5;
    containerOutter.y = app.screen.height * 0.5;

    

    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;
};

onresize();
