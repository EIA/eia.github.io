const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const bunnyL = PIXI.Sprite.from('assets/basics/bunny.png');
bunnyL.anchor.set(0.5);
bunnyL.x = app.screen.width / 2 - 50;
bunnyL.y = app.screen.height / 2;
app.stage.addChild(bunnyL);

const bunnyR = PIXI.Sprite.from('assets/basics/bunny.png');
bunnyR.anchor.set(0.5);
bunnyR.x = app.screen.width / 2 + 50;
bunnyR.y = app.screen.height / 2;
app.stage.addChild(bunnyR);

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);

  bunnyL.x = app.screen.width / 2 - 50;
  bunnyL.y = app.screen.height / 2;

  bunnyR.x = app.screen.width / 2 + 50;
  bunnyR.y = app.screen.height / 2;
};

onresize();


const gui = new dat.GUI();
// gui.add(bunnyL, 'alpha', 0, 1, 0.01);
// gui.add(bunnyR, 'alpha', 0, 1, 0.01);

gui.add(bunnyL, 'alpha', 0, 1, 0.01).name('左邊兔子透明度');
gui.add(bunnyR, 'alpha', 0, 1, 0.01).name('右邊兔子透明度');