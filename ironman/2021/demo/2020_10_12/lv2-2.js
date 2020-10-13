const app = new PIXI.Application({
    backgroundColor: 0x0,
    autoResize: true,
    resolution: window.devicePixelRatio,
    autoResize: true
});
document.body.appendChild(app.view);

let emitterContainer = new PIXI.Container();
app.stage.addChild(emitterContainer);


let emitterSetting = {
    "alpha": {
        "start": 1,
        "end": 0
    },
    "scale": {
        "start": 1,
        "end": 1,
        "minimumScaleMultiplier": 1
    },
    "color": {
        "start": "#e4f9ff",
        "end": "#3fcbff"
    },
    "speed": {
        "start": 200, //200
        "end": 50, //50
        "minimumSpeedMultiplier": 1
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "maxSpeed": 0,
    "startRotation": {
        "min": 0,
        "max": 360
    },
    "noRotation": false,
    "rotationSpeed": {
        "min": 0,
        "max": 0
    },
    "lifetime": {
        "min": 0.2,
        "max": 0.8
    },
    "blendMode": "normal",
    "frequency": 0.001,
    "emitterLifetime": -1,
    "maxParticles": 500,
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

let emitter = new PIXI.particles.Emitter(

    emitterContainer,

    [
        // "./particles/particle1.png",
        "./particles/particle3.png?v=1",
        "./particles/particle3.png?v=2",
        "./particles/particle3.png?v=3",
        "./particles/particle3.png?v=4",
        "./particles/particle3.png?v=5",
        "./particles/particle2.png",
        "./particles/particle3.png",
        // "./particles/particle4.png",
        // "./particles/particle5.png",
    ],

    emitterSetting
);

// Calculate the current time
var elapsed = Date.now();


// Start emitting
emitter.emit = true;

app.ticker.add((delta) => {
    var now = Date.now();
    // The emitter requires the elapsed
    // number of seconds since the last update
    emitter.update((now - elapsed) * 0.001);
    elapsed = now;

    // Should re-render the PIXI Stage
    // renderer.render(stage);
});


emitter.updateOwnerPos(app.screen.width / 2, app.screen.height / 2);


window.onresize = function (event) {
    var w = window.innerWidth;
    var h = window.innerHeight;

    app.view.style.width = w + "px";
    app.view.style.height = h + "px";
    app.renderer.resize(w, h);

    emitter.resetPositionTracking();
    emitter.updateOwnerPos(app.screen.width / 2, app.screen.height / 2);
};
onresize();