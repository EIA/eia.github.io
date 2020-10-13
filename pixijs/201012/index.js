let maxSpeed = 27;
let minSpeed = 12; // 1
let rotSpeed = minSpeed;

let maxFrequency = 0.001;
let minFrequency = 0.1; // 0.4
let emitterFrequency = minFrequency;

let emitterMaxRadius = 100;
let emitterMinRadius = 0;
let emitterRadius = emitterMinRadius;

let centerCircleMaxRadius = 93; //100
let centerCircleMinRadius = 30;
let centerCircleRadius = centerCircleMinRadius;

let maxCircleAlpha = 1;
let minCircleAlpha = 0;
let circleAlpha = minCircleAlpha;

let maxBunnyScale = 4;
let minBunnyScale = 3;
let bunnyScale = minBunnyScale;


let isPress = false;




const app = new PIXI.Application({
    backgroundColor: 0x0,
    autoResize: true,
    resolution: window.devicePixelRatio
});
document.body.appendChild(app.view);

let emitterContainer = new PIXI.Container();
app.stage.addChild(emitterContainer);

const hitArea = createHitArea();
app.stage.addChild(hitArea);


const centerCircle = createCenterCircle();
app.stage.addChild(centerCircle);
centerCircle.x = app.screen.width / 2;
centerCircle.y = app.screen.height / 2;
centerCircle.alpha = circleAlpha;
const glowFilter = new PIXI.filters.GlowFilter(32, 10, 0, 0xfef6b3);
glowFilter.padding = 20;
centerCircle.filters = [glowFilter];

const bunnyContainer = new PIXI.Container();
app.stage.addChild(bunnyContainer);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
bunny.anchor.set(0.5);
gsap.to(bunny, {
    y:-5, 
    duration: 3,
    yoyo: true,
    repeat: -1,
    yoyoEase: Strong.easeOut,
    ease:Strong.easeOut
});

// const bunnyGlowFilter = new PIXI.filters.GlowFilter(8, 4, 0, 0x487193);
// bunnyGlowFilter.padding = 20;
// bunny.filters = [bunnyGlowFilter];

bunny.scale.x = bunnyScale;
bunny.scale.y = bunnyScale;

bunnyContainer.addChild(bunny);

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
        "end": "f5ba78"
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

    [PIXI.Texture.from('particle.png?v=1')],

    emitterSetting
);

let emitter2 = new PIXI.particles.Emitter(

    emitterContainer,

    [PIXI.Texture.from('particle.png?v=1')],

    emitterSetting
);
emitter2.rotation = 120;

let emitter3 = new PIXI.particles.Emitter(

    emitterContainer,

    [PIXI.Texture.from('particle.png?v=1')],

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

    let targetSpeed, targetFrequency, targetRadius, targetAlpha, targetCircleRadius, targetBunnyScale;
    if (isPress === true){
        targetSpeed = maxSpeed;
        targetFrequency = maxFrequency;
        targetRadius = emitterMaxRadius;
        targetAlpha = maxCircleAlpha;
        targetCircleRadius = centerCircleMaxRadius;
        targetBunnyScale = maxBunnyScale;
    }else{
        targetSpeed = minSpeed;
        targetFrequency = minFrequency;
        targetRadius = emitterMinRadius;
        targetAlpha = minCircleAlpha;
        targetCircleRadius = centerCircleMinRadius;
        targetBunnyScale = minBunnyScale;
    };
    rotSpeed += (targetSpeed - rotSpeed) / 32;
    emitterFrequency += (targetFrequency - emitterFrequency) / 8;
    emitterRadius += (targetRadius - emitterRadius) / 12;
    bunnyScale += (targetBunnyScale - bunnyScale) / 12;
    

    if (isPress === true){
        circleAlpha += (targetAlpha - circleAlpha) / 16;
        centerCircleRadius += (targetCircleRadius - centerCircleRadius) / 32;
    }else{
        circleAlpha += (targetAlpha - circleAlpha) / 2;
        centerCircleRadius += (targetCircleRadius - centerCircleRadius) / 64;
    }
    

    emitter1.rotation += rotSpeed;
    emitter2.rotation += rotSpeed;
    emitter3.rotation += rotSpeed;
    centerCircle.alpha = circleAlpha;
    bunny.scale.x = bunnyScale;
    bunny.scale.y = bunnyScale;


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

    centerCircle.updateSize(centerCircleRadius);
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

    bunnyContainer.x = app.screen.width / 2;
    bunnyContainer.y = app.screen.height / 2;
    centerCircle.x = app.screen.width / 2;
    centerCircle.y = app.screen.height / 2;

    hitArea.setSize();

    
};
onresize();




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


function createCenterCircle() {
    const circle = new PIXI.Graphics();
    circle.beginFill(0xffffff);
    circle.drawCircle(0, 0, 100, 100);
    circle.endFill();
    circle.updateSize = (radius) => {
        circle.clear();
        circle.beginFill(0xffffff);
        circle.drawCircle(0, 0, radius, radius);
        circle.endFill();
    }

    return circle;
}
