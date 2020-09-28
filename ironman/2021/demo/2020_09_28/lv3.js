const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');

bunny.anchor.set(0.5);

bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

gsap.to(bunny, {
    duration : 1,
    pixi:{
        x: 100,
        scaleX: 2,
        scaleY: 2,
    },repeat: -1,delay: 1, repeatDelay: 1
});