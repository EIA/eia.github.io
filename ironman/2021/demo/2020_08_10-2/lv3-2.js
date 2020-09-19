const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);



// -----
const svg1 = PIXI.Sprite.from('control.svg');
svg1.x = 50;
svg1.y = 50;
app.stage.addChild(svg1);

const svg2 = PIXI.Sprite.from('control.svg');
svg2.x = 250;
svg2.y = 50;
svg2.scale.x = 2;
svg2.scale.y = 2;
app.stage.addChild(svg2);

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);
};

onresize();