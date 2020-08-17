const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

function createGradTexture() {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', 100);
	canvas.setAttribute('height', 100);

    const ctx = canvas.getContext('2d');

    /*
    使用 createLinearGradient 並做重複填色時，可能會有問題
    */

    const grd = ctx.createLinearGradient(0, 0, 100, 100);
    grd.addColorStop(0, 'red');
    grd.addColorStop(1, '#ffffff');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 100, 100);

    /*
   ctx.fillStyle = "rgb(200,0,0)";
   ctx.fillRect (0, 0, 50, 50);

   ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
   ctx.fillRect (10, 10, 50, 50);
   */

    return PIXI.Texture.from(canvas);
};

const testGraphic = new PIXI.Graphics();

testGraphic.beginTextureFill({texture: createGradTexture()});
testGraphic.drawRect(0, 0, 600, 600);
testGraphic.endFill();

app.stage.addChild(testGraphic);
