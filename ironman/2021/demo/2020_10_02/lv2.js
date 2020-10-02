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
arc
    .lineStyle(10, 0xffffff)
    .arc(
        0,
        0, 90, 0, 270 / (180 / Math.PI));
app.stage.addChild(arc);

const arc2 = new PIXI.Graphics();
arc2
    .lineStyle(10, 0xffffff)
    .arc(0, 0, 15, 0, 270 / (180 / Math.PI));
app.stage.addChild(arc2);

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