const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    antialias: true,
    resolution: window.devicePixelRatio,
    resizeTo: window,
    autoResize: true
 });
document.body.appendChild(app.view);

const arc = new PIXI.Graphics();
const arc2 = new PIXI.Graphics();
app.stage.addChild(arc);
app.stage.addChild(arc2);

function drawArcs(){
    arc.clear();
    arc
        .lineStyle(10, 0xffffff)
        .arc(
            0,
            0, 90, 0, 270 / (180 / Math.PI));

    arc2.clear();
    arc2
        .lineStyle(10, 0xffffff)
        .arc(0, 0, 15, 0, 270 / (180 / Math.PI));
}
drawArcs();


arc.x = app.renderer.screen.width * 0.5;
arc.y = app.renderer.screen.height * 0.5;
arc2.x = app.renderer.screen.width * 0.5;
arc2.y = app.renderer.screen.height * 0.5;

window.onresize = function(){
    arc.x = app.renderer.screen.width * 0.5;
    arc.y = app.renderer.screen.height * 0.5;
    arc2.x = app.renderer.screen.width * 0.5;
    arc2.y = app.renderer.screen.height * 0.5;
}


const gui = new dat.GUI();
gui.add(PIXI.GRAPHICS_CURVES, 'adaptive').onChange(guiHandler);
gui.add(PIXI.GRAPHICS_CURVES, 'maxLength', 0 , 100, 1).onChange(guiHandler);
gui.add(PIXI.GRAPHICS_CURVES, 'maxSegments', 0 , 8192, 1).onChange(guiHandler);
gui.add(PIXI.GRAPHICS_CURVES, 'minSegments', 0, 8192, 1).onChange(guiHandler);

function guiHandler() {
    console.log("PIXI.GRAPHICS_CURVES update：");
    console.log(PIXI.GRAPHICS_CURVES);
    drawArcs();
};