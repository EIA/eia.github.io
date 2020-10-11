const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
// bunny.anchor.set(0.5);
// bunny.x = app.screen.width / 2;
// bunny.y = app.screen.height / 2;
// app.stage.addChild(bunny);
// app.ticker.add((delta) => {
//     bunny.rotation += 0.1 * delta;
// });

//
let emitterContainer = new PIXI.Container();
app.stage.addChild(emitterContainer);
let emitter = null;


app.ticker.add((delta) => {
        var now = Date.now();
        // The emitter requires the elapsed
        // number of seconds since the last update
        emitter.update((now - elapsed) * 0.001);
        elapsed = now;

        // Should re-render the PIXI Stage
        // renderer.render(stage);
});


emitter = new PIXI.particles.Emitter(

    // The PIXI.Container to put the emitter in
    // if using blend modes, it's important to put this
    // on top of a bitmap, and not use the root stage Container
    emitterContainer,

    // The collection of particle images to use
    [PIXI.Texture.from('particle.png')],

    // Emitter configuration, edit this to change the look
    // of the emitter
    {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.1,
            "end": 0.01,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#e4f9ff",
            "end": "#3fcbff"
        },
        "speed": {
            "start": 200,
            "end": 50,
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
    }
);

// Calculate the current time
var elapsed = Date.now();


// Start emitting
emitter.emit = true;
