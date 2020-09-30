const app = new PIXI.Application({
    width: 300,
    height: 300,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio,
    autoResize: true
});
document.getElementById("pixiContainer").appendChild(app.view);


const resolution = PIXI.settings.RESOLUTION;
const filterResolution = PIXI.settings.FILTER_RESOLUTION;
const rendererResolution = app.renderer.resolution;

console.log('resolution: ', resolution);
console.log('filterResolution: ', filterResolution);
console.log('rendererResolution: ', rendererResolution);

document.getElementById("resolution").innerText = resolution;
document.getElementById("filterResolution").innerText = filterResolution;
document.getElementById("rendererResolution").innerText = rendererResolution;

const bd = new PIXI.Graphics();
bd.beginFill(0xffffff);
bd.drawRect(0, 0, 300, 300);
bd.endFill();
bd.alpha = 0;
app.stage.addChild(bd);
const testPic = PIXI.Sprite.from('test_100x100.png');

testPic.anchor.set(0.5);
testPic.x = app.screen.width / 2;
testPic.y = app.screen.height / 2;

app.stage.addChild(testPic);

/*
window.onresize = function (event) {
    var w = window.innerWidth;
    var h = window.innerHeight;

    app.view.style.width = w + "px";
    app.view.style.height = h + "px";
    app.renderer.resize(w, h);

    testPic.x = app.screen.width / 2;
    testPic.y = app.screen.height / 2;

};

onresize();
*/

function saveImg() {
    app.renderer.extract.canvas(app.stage).toBlob((b) => {
        const a = document.createElement('a');
        document.body.append(a);
        a.download = 'save_src-100x100';
        a.href = URL.createObjectURL(b);
        a.click();
        a.remove();
    }, 'image/png');
};