const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const glowContainer = new PIXI.Container();
const glowSprite = PIXI.Sprite.from('glow.png');
glowContainer.addChild(glowSprite);
gsap.to(glowContainer, 10, {x: -500, y:-500, ease:Linear.easeNone, repeat: -1});

glowContainer.x = app.screen.width / 2;
glowContainer.y = app.screen.height / 2;

app.stage.addChild(glowContainer);