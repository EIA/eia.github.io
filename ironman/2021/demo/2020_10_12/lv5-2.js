const app = new PIXI.Application({
    backgroundColor: 0x0,
    autoResize: true,
    resolution: window.devicePixelRatio,
    autoResize: true,
    antialias: true
});
document.body.appendChild(app.view);

let emitterContainer = new PIXI.Container();
app.stage.addChild(emitterContainer);

const hitArea = createHitArea();
app.stage.addChild(hitArea);

let emitterSetting = {
    "alpha": {
        "start": 1,
        "end": 0.31
    },
    "scale": {
        "start": 0.1, // 0.5
        "end": 0.4 // 1
    },
    "color": {
        "start": "ffffff",
        "end": "9ff3ff"
    },
    "speed": {
        "start": 600,
        "end": 200
    },
    "acceleration": {
        "x": 0,
        "y": 2000
    },
    "startRotation": {
        "min": 260,
        "max": 280
    },
    "rotationSpeed": {
        "min": 0,
        "max": 0
    },
    "lifetime": {
        "min": 0.25,
        "max": 0.5
    },
    "blendMode": "add", // "normal"
    "frequency": 0.001,
    "emitterLifetime": 0,
    "maxParticles": 1000,
    "pos": {
        "x": 0,
        "y": 0
    },
    "addAtBack": false,
    "spawnType": "circle",
    "spawnCircle": {
        "x": 0,
        "y": 0,
        "r": 0
    }
};

let emitter1 = new PIXI.particles.Emitter(

    emitterContainer,

    [PIXI.Texture.from('particle.png')],

    emitterSetting
);

let emitter2 = new PIXI.particles.Emitter(

    emitterContainer,

    [PIXI.Texture.from('particle.png')],

    emitterSetting
);
emitter2.rotation = 120;

let emitter3 = new PIXI.particles.Emitter(

    emitterContainer,

    [PIXI.Texture.from('particle.png')],

    emitterSetting
);
emitter3.rotation = -120;

// Calculate the current time
var elapsed = Date.now();


// Start emitting
emitter1.emit = false;
emitter2.emit = false;
emitter3.emit = false;

app.ticker.add((delta) => {
    
    var now = Date.now();
    // The emitter requires the elapsed
    // number of seconds since the last update
    emitter1.update((now - elapsed) * 0.001);
    emitter2.update((now - elapsed) * 0.001);
    emitter3.update((now - elapsed) * 0.001);
    elapsed = now;

    // Should re-render the PIXI Stage
    // renderer.render(stage);

    let targetSpeed, targetFrequency, targetRadius;
    if (isPress === true){
        targetSpeed = maxSpeed;
        targetFrequency = maxFrequency;
        targetRadius = maxRadius;
    }else{
        targetSpeed = minSpeed;
        targetFrequency = minFrequency;
        targetRadius = minRadius;
    };
    rotSpeed += (targetSpeed - rotSpeed) / 8;
    emitterFrequency += (targetFrequency - emitterFrequency) / 4;
    emitterRadius += (targetRadius - emitterRadius) / 12;

    emitter1.rotation += rotSpeed;
    emitter2.rotation += rotSpeed;
    emitter3.rotation += rotSpeed;

    // 加上亂數看起來比較自然一些
    // emitter1.rotation += (Math.random() * -10) + 5;
    // emitter2.rotation += (Math.random() * -10) + 5 - 13;
    // emitter3.rotation += (Math.random() * -10) + 5 - 7;

    // console.log("emitter1.rotation: " + emitter1.rotation);
    emitter1.frequency = emitterFrequency;
    emitter2.frequency = emitterFrequency;
    emitter3.frequency = emitterFrequency;


    
    const rot1 = emitter1.rotation / (180 / Math.PI);
    emitter1.updateOwnerPos(
        app.screen.width / 2 + Math.cos(rot1) * emitterRadius,
        app.screen.height / 2 + Math.sin(rot1) * emitterRadius
    );

    const rot2 = emitter2.rotation / (180 / Math.PI);
    emitter2.updateOwnerPos(
        app.screen.width / 2 + Math.cos(rot2) * emitterRadius,
        app.screen.height / 2 + Math.sin(rot2) * emitterRadius
    );

    const rot3 = emitter3.rotation / (180 / Math.PI);
    emitter3.updateOwnerPos(
        app.screen.width / 2 + Math.cos(rot3) * emitterRadius,
        app.screen.height / 2 + Math.sin(rot3) * emitterRadius
    );

    // console.log("emitter1: ", emitter1.rotation, rot1);
    // console.log("emitter2: ", emitter2.rotation, rot2);
    // console.log("emitter3: ", emitter3.rotation, rot3);
});


emitter1.updateOwnerPos(app.screen.width / 2, app.screen.height / 2);
emitter2.updateOwnerPos(app.screen.width / 2, app.screen.height / 2);
emitter3.updateOwnerPos(app.screen.width / 2, app.screen.height / 2);


window.onresize = function (event) {
    var w = window.innerWidth;
    var h = window.innerHeight;

    app.view.style.width = w + "px";
    app.view.style.height = h + "px";
    app.renderer.resize(w, h);

    emitter1.resetPositionTracking();
    emitter1.updateOwnerPos(app.screen.width / 2, app.screen.height / 2);
    emitter2.resetPositionTracking();
    emitter2.updateOwnerPos(app.screen.width / 2, app.screen.height / 2);
    emitter3.resetPositionTracking();
    emitter3.updateOwnerPos(app.screen.width / 2, app.screen.height / 2);

    hitArea.setSize();

    
};
onresize();

// const gui = new dat.GUI();
// gui.add(emitter, 'rotation', 0, 360, 0.01).listen();

let maxSpeed = 27;
let minSpeed = 12; // 1
let rotSpeed = minSpeed;

let maxFrequency = 0.001;
let minFrequency = 0.01; // 0.4
let emitterFrequency = minFrequency;

let maxRadius = 100;
let minRadius = 0;
let emitterRadius = minRadius;

let isPress = false;


function createHitArea(){
    const hitArea = new PIXI.Graphics();
    hitArea.setSize = function () {
        hitArea.clear();
        hitArea.beginFill(0xff0000);
        hitArea.drawRect(0, 0, app.screen.width, app.screen.height);
        hitArea.endFill();
        hitArea.alpha = 0;
    };
    hitArea.setSize();

    hitArea.interactive = true;
    hitArea.buttonMode = true;
    hitArea.on("pointermove", (e) => {
        const pointCoordinate = e.data.getLocalPosition(hitArea);
        // console.log("pm: ", pointCoordinate);

        const xDist = pointCoordinate.x - app.screen.width * .5;
        const yDist = pointCoordinate.y - app.screen.height * .5;

        // 留意使用方式為 Math.atan2(y, x); y 在前
        // const radian = Math.atan2(yDist, xDist);
        // console.log("radian: ", radian, radian * (180 / Math.PI));
        // emitter1.rotation = radian * (180 / Math.PI) + 90;
    });

    hitArea.on("pointerdown", () => {
        isPress = true;
        emitter1.emit = true;
        emitter2.emit = true;
        emitter3.emit = true;
    });
    hitArea.on("pointerup", () => {
        isPress = false;
        emitter1.emit = false;
        emitter2.emit = false;
        emitter3.emit = false;
    });
    return hitArea;
}

/////////


let sqOutterWidth = 432 * .6;
let sqInnerWidth = 300 * .6;


const containerInner = new PIXI.Container();
containerInner.x = app.screen.width * 0.5;
containerInner.y = app.screen.height * 0.5;
app.stage.addChild(containerInner);


// https://pixijs.io/pixi-filters/docs/PIXI.filters.GlowFilter.html
const glowFilter = new PIXI.filters.GlowFilter(32); // 32
glowFilter.padding = 20;

const spriteTopInner = new PIXI.Sprite();
spriteTopInner.width = sqInnerWidth;
spriteTopInner.height = 2;
spriteTopInner.x = -sqInnerWidth * .5;
spriteTopInner.y = -sqInnerWidth * .5;
containerInner.addChild(spriteTopInner);
spriteTopInner.filters = [glowFilter];

const spriteRightInner = new PIXI.Sprite();
spriteRightInner.width = sqInnerWidth;
spriteRightInner.height = 2;
spriteRightInner.x = sqInnerWidth * .5;
spriteRightInner.y = -sqInnerWidth * .5;
spriteRightInner.angle = 90;
containerInner.addChild(spriteRightInner);
spriteRightInner.filters = [glowFilter];

const spriteBottomInner = new PIXI.Sprite();
spriteBottomInner.width = sqInnerWidth;
spriteBottomInner.height = 2;
spriteBottomInner.x = sqInnerWidth * .5;
spriteBottomInner.y = sqInnerWidth * .5;
spriteBottomInner.angle = 180;
containerInner.addChild(spriteBottomInner);
spriteBottomInner.filters = [glowFilter];

const spriteLeftInner = new PIXI.Sprite();
spriteLeftInner.width = sqInnerWidth;
spriteLeftInner.height = 2;
spriteLeftInner.x = -sqInnerWidth * .5;
spriteLeftInner.y = sqInnerWidth * .5;
spriteLeftInner.angle = -90;
containerInner.addChild(spriteLeftInner);
spriteLeftInner.filters = [glowFilter];









const containerOutter = new PIXI.Container();
containerOutter.x = app.screen.width * 0.5;
containerOutter.y = app.screen.height * 0.5;
containerOutter.angle = -45;
app.stage.addChild(containerOutter);
containerOutter.alpha = 0.7;

const spriteTopOutter = new PIXI.Sprite();
spriteTopOutter.width = sqOutterWidth;
spriteTopOutter.height = 1;
spriteTopOutter.x = sqOutterWidth * .5;
spriteTopOutter.y = sqOutterWidth * .5;
spriteTopOutter.angle = 180;
containerOutter.addChild(spriteTopOutter);
spriteTopOutter.filters = [glowFilter];

const spriteRightOutter = new PIXI.Sprite();
spriteRightOutter.width = sqOutterWidth;
spriteRightOutter.height = 1;
spriteRightOutter.x = -sqOutterWidth * .5;
spriteRightOutter.y = sqOutterWidth * .5;
spriteRightOutter.angle = 270;
containerOutter.addChild(spriteRightOutter);
spriteRightOutter.filters = [glowFilter];

const spriteBottomOutter = new PIXI.Sprite();
spriteBottomOutter.width = sqOutterWidth;
spriteBottomOutter.height = 1;
spriteBottomOutter.x = -sqOutterWidth * .5;
spriteBottomOutter.y = -sqOutterWidth * .5;
spriteBottomOutter.angle = 0;
containerOutter.addChild(spriteBottomOutter);
spriteBottomOutter.filters = [glowFilter];

const spriteLeftOutter = new PIXI.Sprite();
spriteLeftOutter.width = sqOutterWidth;
spriteLeftOutter.height = 1;
spriteLeftOutter.x = sqOutterWidth * .5;
spriteLeftOutter.y = -sqOutterWidth * .5;
spriteLeftOutter.angle = 90;
containerOutter.addChild(spriteLeftOutter);
spriteLeftOutter.filters = [glowFilter];




let gradStartPos = 0;
let gradLengthInner = 0.5;
let gradLengthOutter = 0.2;
let count = 0;

app.ticker.add((delta) => {

    spriteTopInner.texture.destroy(true);
    spriteRightInner.texture.destroy(true);
    spriteBottomInner.texture.destroy(true);
    spriteLeftInner.texture.destroy(true);


    spriteTopOutter.texture.destroy(true);
    spriteRightOutter.texture.destroy(true);
    spriteBottomOutter.texture.destroy(true);
    spriteLeftOutter.texture.destroy(true);

    gradStartPos += 0.03;
    if (gradStartPos >= 1) { // 不為 1
        gradStartPos -= 1;
    }
    if (gradStartPos <= 0) { // 不為 1
        gradStartPos += 1;
    }

    gradLengthInner += 0.003;
    if (gradLengthInner >= 1) { // 不為 1
        gradLengthInner -= 1;
    }

    gradLengthOutter += 0.001;
    if (gradLengthOutter >= 1) { // 不為 1
        gradLengthOutter -= 1;
    }


    count += 0.01;
    // glowFilter.distance = 15 * Math.sin(count) + 2 + 15; // 不 tween glowFilter，怪

    containerInner.angle -= 0.3;
    containerOutter.angle += 0.7;
    
    // console.log(glowFilter.distance);
    // const gradTexture = createGradTexture(gradStartPos, 0.5);
    const gradTextureInner = createGradTexture(gradStartPos, gradLengthInner);
    spriteTopInner.texture = gradTextureInner;
    spriteRightInner.texture = gradTextureInner;
    spriteBottomInner.texture = gradTextureInner;
    spriteLeftInner.texture = gradTextureInner;

    const gradTextureOutter = createGradTexture(gradStartPos, gradLengthOutter);
    spriteTopOutter.texture = gradTextureOutter;
    spriteRightOutter.texture = gradTextureOutter;
    spriteBottomOutter.texture = gradTextureOutter;
    spriteLeftOutter.texture = gradTextureOutter;

    let targetScale, currentScale;
    let targetAlpha, currentAlpha;
    if(isPress){
        targetScale = 0.5;
        targetAlpha = 1;
    }else{
        targetScale = 1;
        targetAlpha = 0.5;
    };
    currentScale = containerInner.scale.x;
    currentScale += (targetScale - currentScale) / 4;
    containerInner.scale.x = currentScale;
    containerInner.scale.y = currentScale;
    containerOutter.scale.x = currentScale;
    containerOutter.scale.y = currentScale;

    currentAlpha = containerInner.alpha;
    currentAlpha += (targetAlpha - currentAlpha) / 4;
    containerInner.alpha = currentAlpha;
    containerOutter.alpha = currentAlpha;
});




function createGradTexture(start, length) {

    let gradType;
    if (start + length < 1){
        gradType = 1;
    }else{
        gradType = 2;
    }


    const quality = 256;
    const canvas = document.createElement('canvas');
    canvas.width = quality;
    canvas.height = 1;

    const ctx = canvas.getContext('2d');

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

