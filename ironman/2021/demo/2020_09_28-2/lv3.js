const app = new PIXI.Application({ width: 300, height:300, backgroundColor: 0x1099bb });
document.getElementById("pixiContainer").appendChild(app.view);


const resolution = PIXI.settings.RESOLUTION;
const filterResolution = PIXI.settings.FILTER_RESOLUTION;
const rendererResolution = app.renderer.resolution;

console.log('resolution: ', resolution);
console.log('filterResolution: ', filterResolution);
console.log('rendererResolution: ', rendererResolution);

document.getElementById("resolution").innerText = "resolution: " + resolution;
document.getElementById("filterResolution").innerText = "filterResolution: " + filterResolution;
document.getElementById("rendererResolution").innerText = "rendererResolution: " + rendererResolution;

const testPic = PIXI.Sprite.from('test.png');

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

alert("1433");