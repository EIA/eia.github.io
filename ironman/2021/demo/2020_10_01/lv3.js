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

// console.log('resolution: ', resolution);
// console.log('filterResolution: ', filterResolution);
// console.log('rendererResolution: ', rendererResolution);

const bd = new PIXI.Graphics();
bd.beginFill(0x1099bb);
bd.drawRect(0, 0, 300, 300);
bd.endFill();
app.stage.addChild(bd);

const msg = new PIXI.Text('200x200', {fontSize: 12});
msg.x = 5;
msg.y = 5;
app.stage.addChild(msg);

const testPic = PIXI.Sprite.from('test_200x200.png');

testPic.anchor.set(0.5);
testPic.x = app.screen.width / 2;
testPic.y = app.screen.height / 2;
testPic.scale.x = testPic.scale.y = 0.5;

app.stage.addChild(testPic);

const glowFilter = new PIXI.filters.GlowFilter(16);
glowFilter.padding = 20;

testPic.filters = [glowFilter];

msg.text = msg.text + "\nGlowFilter(16)";