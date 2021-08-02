var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xEEEEEE});

var stage = new PIXI.Container();


animate();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}