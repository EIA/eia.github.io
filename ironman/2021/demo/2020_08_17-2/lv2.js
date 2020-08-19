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




const gradTexture2 = PIXI.Sprite.from(createGradTexture());
app.stage.addChild(gradTexture2);
gradTexture2.x = 175;
gradTexture2.y = 100;
const mask2 = new PIXI.Graphics();
app.stage.addChild(mask2);
mask2.x = 175;
mask2.y = 225;
mask2.lineStyle(2, 0x0);
mask2.drawRect(0, 0, 100, 100);



const gradTexture3 = PIXI.Sprite.from(createGradTexture());
app.stage.addChild(gradTexture3);
gradTexture3.x = 175;
gradTexture3.y = 400;
const mask3 = new PIXI.Graphics();
app.stage.addChild(mask3);
mask3.x = 175;
mask3.y = 400;
mask3.lineStyle(2, 0x0);
mask3.drawRect(0, 0, 100, 100);
gradTexture3.mask = mask3;



const gradTexture4 = new PIXI.Graphics();
app.stage.addChild(gradTexture4);
gradTexture4.x = 300;
gradTexture4.y = 100;
gradTexture4.lineStyle(2, 0xff0000);
gradTexture4.drawRect(0, 0, 100, 100);
const mask4 = PIXI.Sprite.from(createGradTexture2());
app.stage.addChild(mask4);
mask4.x = 300;
mask4.y = 225;


const gradTexture5 = new PIXI.Graphics();
app.stage.addChild(gradTexture5);
gradTexture5.x = 300;
gradTexture5.y = 400;
gradTexture5.lineStyle(2, 0xff0000);
gradTexture5.drawRect(0, 0, 100, 100);
const mask5 = PIXI.Sprite.from(createGradTexture2());
app.stage.addChild(mask5);
mask5.x = 300;
mask5.y = 400;
gradTexture5.mask = mask5;