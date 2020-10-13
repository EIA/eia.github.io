const app = new PIXI.Application({
    backgroundColor: 0x0,
    autoResize: true,
    resolution: window.devicePixelRatio,
    autoResize: true
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
    rotSpeed += (targetSpeed - rotSpeed) / 32;
    emitterFrequency += (targetFrequency - emitterFrequency) / 8;
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
let minFrequency = 0.1; // 0.4
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