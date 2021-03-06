const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

let bunny = PIXI.Sprite.from('assets/basics/bunny.png');
bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

// -- DEMO for REMOVE --
// app.stage.removeChild(bunny);
// bunny = undefined;
// console.log('PIXI.utils.TextureCache: ', PIXI.utils.TextureCache);
// console.log('PIXI.utils.TextureCache: ', PIXI.utils.BaseTextureCache);