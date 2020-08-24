const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


const bunny = PIXI.Sprite.from('assets/basics/bunny.png');


bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;
app.stage.addChild(bunny);

const texture1 = PIXI.Texture.from('assets/basics/bunny.png');


console.log('-----------');
console.log('bunny.texture === texture1: ', bunny.texture === texture1);
console.log('bunny.texture.baseTexture === texture1.baseTexture: ', bunny.texture.baseTexture === texture1.baseTexture);

console.log(PIXI.utils.TextureCache);
console.log(PIXI.utils.BaseTextureCache);


const texture2 = PIXI.Texture.from('assets/basics/bunny.png?v=2');

console.log('-----------');
console.log('texture2 === texture1: ', texture2 === texture1);
console.log('texture2.baseTexture === texture1.baseTexture: ', texture2.baseTexture === texture1.baseTexture);

console.log(PIXI.utils.TextureCache);
console.log(PIXI.utils.BaseTextureCache);

console.log('-----------');
// new PIXI.Texture('assets/basics/bunny.png'); // Wrong, 沒有這個寫法
const testBaseTexture = new PIXI.BaseTexture('assets/basics/bunny.png?v=3');
// console.log(testBaseTexture);
const texture3 = new PIXI.Texture(testBaseTexture);
const texture4 = new PIXI.Texture(testBaseTexture);
console.log('texture4 === texture3: ', texture4 === texture3);
console.log('texture4.baseTexture === texture3.baseTexture: ', texture4.baseTexture === texture3.baseTexture);

console.log(PIXI.utils.TextureCache);
console.log(PIXI.utils.BaseTextureCache);

/*
用 new PIXI.Texture 與 new PIXI.BaseTexture 建立 Texture / BaseTexture 時
不會加入快取
PIXI.Texture.addToCache(texture4, "test4");
PIXI.BaseTexture.addToCache(testBaseTexture, "123456");
*/