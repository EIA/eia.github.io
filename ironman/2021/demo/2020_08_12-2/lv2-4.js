const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

function createGradTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;

    const startColor = PIXI.utils.hex2string(Math.floor(Math.random()*16777216));
    const endColor = PIXI.utils.hex2string(Math.floor(Math.random()*16777216));

    const ctx = canvas.getContext('2d');

    const grd = ctx.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, `${startColor}`);
    grd.addColorStop(1, `${endColor}`);
    
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 100, 100);

    return PIXI.Texture.from(canvas);
};

setInterval(()=>{
    const gradTexture = createGradTexture();
    const sprite = new PIXI.Sprite(gradTexture);
    app.stage.addChild(sprite);
    sprite.x = Math.random() * (app.screen.width - 100);
    sprite.y = Math.random() * (app.screen.height - 100);
}, 1000);

