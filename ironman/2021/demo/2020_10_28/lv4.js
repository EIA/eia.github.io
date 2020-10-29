const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const lineSprite = new PIXI.Container();
app.stage.addChild(lineSprite);


const glowContainer = new PIXI.Container();
const glowSprite = PIXI.Sprite.from('glow.png');
glowContainer.addChild(glowSprite);
gsap.to(glowContainer, 10, {x: -500, y:-500, ease:Linear.easeNone, repeat: -1});


lineSprite.addChild(glowContainer);

const maskGraphic = new PIXI.Graphics();
maskGraphic.lineStyle(4);
// maskGraphic.beginFill(0x0);
maskGraphic.drawRect(0, 0, 200, 200);
// maskGraphic.endFill();

lineSprite.addChild(maskGraphic);

glowContainer.mask = maskGraphic;

lineSprite.x = app.screen.width * 0.5;
lineSprite.y = app.screen.height * 0.5;

const glowFilter = new PIXI.filters.GlowFilter(16);
glowFilter.padding = 20;
lineSprite.filters = [glowFilter];