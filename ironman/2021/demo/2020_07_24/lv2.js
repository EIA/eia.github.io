const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunnyLeft = PIXI.Sprite.from('assets/basics/bunny.png');
bunnyLeft.anchor.set(0.5);
bunnyLeft.x = app.screen.width / 2 - 100;
bunnyLeft.y = app.screen.height / 2;

const bunnyRight = PIXI.Sprite.from('assets/basics/bunny.png');
bunnyRight.pivot.set(13, 18.5);
bunnyRight.x = app.screen.width / 2 + 100;
bunnyRight.y = app.screen.height / 2;

app.stage.addChild(bunnyLeft);
app.stage.addChild(bunnyRight);

app.ticker.add((delta) => {
    bunnyLeft.rotation += 0.1 * delta;
    bunnyRight.rotation += 0.1 * delta;
});
