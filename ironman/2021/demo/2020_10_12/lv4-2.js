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
    "blendMode": "normal",
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

let emitter = new PIXI.particles.Emitter(

    emitterContainer,

    [PIXI.Texture.from('particle.png')],

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

    let targetSpeed;
    if (isPress === true){
        targetSpeed = maxSpeed;
    }else{
        targetSpeed = minSpeed;
    };
    rotSpeed += (targetSpeed - rotSpeed) / 32;
    // console.log(rotSpeed);

    emitter.rotation += rotSpeed;
    const radius = 100;
    const rot = emitter.rotation / (180 / Math.PI);
    emitter.updateOwnerPos(
        app.screen.width / 2 + Math.cos(rot) * radius,
        app.screen.height / 2 + Math.sin(rot) * radius
    );

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

    hitArea.setSize();

    
};
onresize();


// const gui = new dat.GUI();
// gui.add(emitter, 'rotation', 0, 360, 0.01).listen();

let maxSpeed = 27;
let minSpeed = 1; // 1
let rotSpeed = minSpeed;
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
        // emitter.rotation = radian * (180 / Math.PI) + 90;
    });

    hitArea.on("pointerdown", () => {
        isPress = true;
    });
    hitArea.on("pointerup", () => {
        isPress = false;
    });
    return hitArea;
}