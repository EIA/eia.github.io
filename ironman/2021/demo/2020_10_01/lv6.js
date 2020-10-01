const app = new PIXI.Application({
    width: 300,
    height: 300,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio,
    autoResize: true
});
document.getElementById("pixiContainer").appendChild(app.view);


console.log('PIXI.settings.FILTER_RESOLUTION: ', PIXI.settings.FILTER_RESOLUTION);
console.log('- 更改 PIXI.settings.FILTER_RESOLUTION 為：', window.devicePixelRatio);
PIXI.settings.FILTER_RESOLUTION = window.devicePixelRatio;
console.log('PIXI.settings.FILTER_RESOLUTION: ', PIXI.settings.FILTER_RESOLUTION);

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

console.log("- 建立 GlowFilter 實體");
const glowFilter = new PIXI.filters.GlowFilter(16);
glowFilter.padding = 20;

testPic.filters = [glowFilter];

msg.text += "\nGlowFilter(16)";
msg.text += "\nresolution: " + PIXI.settings.FILTER_RESOLUTION;