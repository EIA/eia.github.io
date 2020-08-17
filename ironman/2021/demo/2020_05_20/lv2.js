const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


const bunny1 = PIXI.Sprite.from('assets/basics/bunny.png');
const bunny2 = PIXI.Sprite.from('assets/basics/bunny.png');
const bunny3 = PIXI.Sprite.from('assets/basics/bunny.png');
const bunny1_2 = PIXI.Sprite.from('assets/basics/bunny.png');
const bunny2_2 = PIXI.Sprite.from('assets/basics/bunny.png');
const bunny3_2 = PIXI.Sprite.from('assets/basics/bunny.png');
const bunny1_3 = PIXI.Sprite.from('assets/basics/bunny.png');
const bunny2_3 = PIXI.Sprite.from('assets/basics/bunny.png');
const bunny3_3 = PIXI.Sprite.from('assets/basics/bunny.png');
const bunny1_4 = PIXI.Sprite.from('assets/basics/bunny.png');
const bunny2_4 = PIXI.Sprite.from('assets/basics/bunny.png');
const bunny3_4 = PIXI.Sprite.from('assets/basics/bunny.png');


const mask1 = PIXI.Sprite.from('g0.png');
const mask2 = PIXI.Sprite.from('g1.png');
const mask3 = PIXI.Sprite.from('g2.png');
const mask1_2 = PIXI.Sprite.from('g0.png');
const mask2_2 = PIXI.Sprite.from('g1.png');
const mask3_2 = PIXI.Sprite.from('g2.png');

bunny1.scale.x = 2;
bunny1.scale.y = 2;
bunny2.scale.x = 2;
bunny2.scale.y = 2;
bunny3.scale.x = 2;
bunny3.scale.y = 2;
bunny1_2.scale.x = 2;
bunny1_2.scale.y = 2;
bunny2_2.scale.x = 2;
bunny2_2.scale.y = 2;
bunny3_2.scale.x = 2;
bunny3_2.scale.y = 2;
bunny1_3.scale.x = 2;
bunny1_3.scale.y = 2;
bunny2_3.scale.x = 2;
bunny2_3.scale.y = 2;
bunny3_3.scale.x = 2;
bunny3_3.scale.y = 2;
bunny1_4.scale.x = 2;
bunny1_4.scale.y = 2;
bunny2_4.scale.x = 2;
bunny2_4.scale.y = 2;
bunny3_4.scale.x = 2;
bunny3_4.scale.y = 2;
app.stage.addChild(bunny1);
app.stage.addChild(bunny2);
app.stage.addChild(bunny3);
app.stage.addChild(bunny1_2);
app.stage.addChild(bunny2_2);
app.stage.addChild(bunny3_2);
app.stage.addChild(bunny1_3);
app.stage.addChild(bunny2_3);
app.stage.addChild(bunny3_3);
app.stage.addChild(bunny1_4);
app.stage.addChild(bunny2_4);
app.stage.addChild(bunny3_4);


bunny1.x = 100;
bunny1.y = 100;
bunny2.x = 100;
bunny2.y = 200;
bunny3.x = 100;
bunny3.y = 300;
bunny1_2.x = 250;
bunny1_2.y = 100;
bunny2_2.x = 250;
bunny2_2.y = 200;
bunny3_2.x = 250;
bunny3_2.y = 300;
bunny1_3.x = 400;
bunny1_3.y = 100;
bunny2_3.x = 400;
bunny2_3.y = 200;
bunny3_3.x = 400;
bunny3_3.y = 300;
bunny1_4.x = 550;
bunny1_4.y = 100;
bunny2_4.x = 550;
bunny2_4.y = 200;
bunny3_4.x = 550;
bunny3_4.y = 300;

mask1.x = 80;
mask1.y = 100;
mask2.x = 80;
mask2.y = 200;
mask3.x = 80;
mask3.y = 300;
mask1.x = 80;
mask1_2.x = 230
mask1_2.y = 100;
mask2_2.x = 230;
mask2_2.y = 200;
mask3_2.x = 230;
mask3_2.y = 300;

bunny1_2.mask = mask1_2;
bunny2_2.mask = mask2_2;
bunny3_2.mask = mask3_2;


app.stage.addChild(mask1);
app.stage.addChild(mask2);
app.stage.addChild(mask3);
app.stage.addChild(mask1_2);
app.stage.addChild(mask2_2);
app.stage.addChild(mask3_2);








const mask1_3_texture = createGradTexture(100, 100, '#000', '#ffffff');
const mask2_3_texture = createGradTexture(100, 100, '#ffffff00', '#ffffffff');
const mask3_3_texture = createGradTexture(100, 100, '#00000000', '#000000ff');
const mask1_4_texture = createGradTexture(100, 100, '#000', '#ffffff');
const mask2_4_texture = createGradTexture(100, 100, '#ffffff00', '#ffffffff');
const mask3_4_texture = createGradTexture(100, 100, '#00000000', '#000000ff');


const mask1_3 = new PIXI.Sprite(mask1_3_texture);
const mask2_3 = new PIXI.Sprite(mask2_3_texture);
const mask3_3 = new PIXI.Sprite(mask3_3_texture);
const mask1_4 = new PIXI.Sprite(mask1_4_texture);
const mask2_4 = new PIXI.Sprite(mask2_4_texture);
const mask3_4 = new PIXI.Sprite(mask3_4_texture);
mask1_3.width = 100;
mask1_3.height = 100;
mask2_3.width = 100;
mask2_3.height = 100;
mask3_3.width = 100;
mask3_3.height = 100;
mask1_4.width = 100;
mask1_4.height = 100;
mask2_4.width = 100;
mask2_4.height = 100;
mask3_4.width = 100;
mask3_4.height = 100;
app.stage.addChild(mask1_3);
app.stage.addChild(mask2_3);
app.stage.addChild(mask3_3);
app.stage.addChild(mask1_4);
app.stage.addChild(mask2_4);
app.stage.addChild(mask3_4);
mask1_3.x = 380;
mask1_3.y = 100;
mask2_3.x = 380;
mask2_3.y = 200;
mask3_3.x = 380;
mask3_3.y = 300;
mask1_4.x = 530;
mask1_4.y = 100;
mask2_4.x = 530;
mask2_4.y = 200;
mask3_4.x = 530;
mask3_4.y = 300;


bunny1_4.mask = mask1_4;
bunny2_4.mask = mask2_4;
bunny3_4.mask = mask3_4;



function createGradTexture(w, h, color1, color2) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, w, 0);
    grd.addColorStop(0, color1);
    grd.addColorStop(1, color2);

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);

    return PIXI.Texture.from(canvas);
}
