const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

function createGradTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;

    const ctx = canvas.getContext('2d');

    const grd = ctx.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, 'red');
    grd.addColorStop(1, '#ffffff');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 100, 100);

    return PIXI.Texture.from(canvas);
};

function createGradTexture2() {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;

    const ctx = canvas.getContext('2d');

    const grd = ctx.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, '#ffffff');
    grd.addColorStop(1, '#000000');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 100, 100);

    return PIXI.Texture.from(canvas);
};

//


const gradTexture1_1 = PIXI.Sprite.from(createGradTexture());
app.stage.addChild(gradTexture1_1);
gradTexture1_1.x = 50;
gradTexture1_1.y = 100;

const gradTexture1_2 = PIXI.Sprite.from(createGradTexture());
app.stage.addChild(gradTexture1_2);
gradTexture1_2.x = 175;
gradTexture1_2.y = 100;
const mask1_2 = new PIXI.Graphics();
app.stage.addChild(mask1_2);
mask1_2.x = 175;
mask1_2.y = 100;
mask1_2.lineStyle(2, 0x0);
mask1_2.drawRect(0, 0, 100, 100);

const gradTexture1_3 = PIXI.Sprite.from(createGradTexture());
app.stage.addChild(gradTexture1_3);
gradTexture1_3.x = 300;
gradTexture1_3.y = 100;
const mask1_3 = new PIXI.Graphics();
app.stage.addChild(mask1_3);
mask1_3.x = 300;
mask1_3.y = 100;
mask1_3.lineStyle(2, 0x0);
mask1_3.drawRect(0, 0, 100, 100);
gradTexture1_3.mask = mask1_3;


//

const gradTexture2_1 = new PIXI.Graphics();
app.stage.addChild(gradTexture2_1);
gradTexture2_1.x = 50;
gradTexture2_1.y = 300;
gradTexture2_1.lineStyle(2, 0xff0000);
gradTexture2_1.drawRect(0, 0, 100, 100);


const gradTexture2_2 = new PIXI.Graphics();
app.stage.addChild(gradTexture2_2);
gradTexture2_2.x = 175;
gradTexture2_2.y = 300;
gradTexture2_2.lineStyle(2, 0xff0000);
gradTexture2_2.drawRect(0, 0, 100, 100);
const mask2_2 = PIXI.Sprite.from(createGradTexture2());
app.stage.addChild(mask2_2);
mask2_2.x = 175;
mask2_2.y = 300;


const gradTexture2_3 = new PIXI.Graphics();
app.stage.addChild(gradTexture2_3);
gradTexture2_3.x = 300;
gradTexture2_3.y = 300;
gradTexture2_3.lineStyle(2, 0xff0000);
gradTexture2_3.drawRect(0, 0, 100, 100);
const mask2_3 = PIXI.Sprite.from(createGradTexture2());
app.stage.addChild(mask2_3);
mask2_3.x = 300;
mask2_3.y = 300;
gradTexture2_3.mask = mask2_3;