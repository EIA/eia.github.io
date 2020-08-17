const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

function createGradTexture() {
    const canvas = document.createElement('canvas');
    // canvas.width = 100;
    // canvas.height = 100;

    const ctx = canvas.getContext('2d');

    const grd = ctx.createLinearGradient(0, 0, 0, 100);
    grd.addColorStop(0, 'red');
    grd.addColorStop(1, '#ffffff');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 100, 100);

    return PIXI.Texture.from(canvas);
};

const gradTexture = createGradTexture();

const sprite = new PIXI.Sprite(gradTexture);
app.stage.addChild(sprite);
sprite.x = 50;
sprite.y = 50;