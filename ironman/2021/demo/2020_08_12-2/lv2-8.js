const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


if (window.confirm("Crash Demo")) { 
}else{
    window.history.go(-1);
}

let cows = 2;
let columns = 4;
let spriteWidth = 100;
let spriteHeight = 100;
let spriteMargin = 20;

window.onresize = function (event){
  let w = window.innerWidth;
  let h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);

  app.stage.removeChildren();
  spriteWidth = (w - spriteMargin *3) / cows;
  spriteHeight = (h - spriteMargin *3) / columns;

  // console.log(cows, columns, spriteWidth, spriteHeight);

  for(let i = 0; i < cows; i++ ){
    for(let j = 0; j < columns; j++ ){
      const sprite = new PIXI.Sprite();
      app.stage.addChild(sprite);
      sprite.x = (spriteMargin + spriteWidth) * i + spriteMargin;
      sprite.y = (spriteMargin + spriteHeight) * j + spriteMargin;
    };
  };
};
onresize();


function createGradTexture(w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');

    const grd = ctx.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, 'red');
    grd.addColorStop(1, '#ffffff');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);

    return PIXI.Texture.from(canvas);
};

setInterval(()=>{
    app.stage.children.forEach((child)=>{
        child.texture.destroy(true);
        child.texture = createGradTexture(spriteWidth, spriteHeight);
    });
}, 160);

