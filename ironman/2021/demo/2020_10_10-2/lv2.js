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
let emitter = null;


app.ticker.add((delta) => {
    if (emitter){
        // emitter.update((now - elapsed) * 0.001);
        emitter.update();
    }
});

let config = ({
    "alpha": {
        "start": 0.8,
        "end": 0.1
    },
    "scale": {
        "start": 1,
        "end": 0.3
    },
    "color": {
        "start": "fb1010",
        "end": "f5b830"
    },
    "speed": {
        "start": 200,
        "end": 100
    },
    "startRotation": {
        "min": 0,
        "max": 360
    },
    "rotationSpeed": {
        "min": 0,
        "max": 0
    },
    "lifetime": {
        "min": 0.5,
        "max": 0.5
    },
    "frequency": 0.008,
    "emitterLifetime": 0.31,
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
        "r": 10
    }
});


const emitterContainer = new PIXI.Container();
emitterContainer.name = 'particleContainer';
app.stage.addChild(emitterContainer);

let art = ['particle.png'];

emitter = new PIXI.particles.Emitter(
    emitterContainer,
    art,
    config,
);

emitter.emit = true;
// emitter.resetPositionTracking();
emitter.particleConstructor = PIXI.particles.AnimatedParticle;