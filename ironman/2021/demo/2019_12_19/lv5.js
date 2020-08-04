const app = new PIXI.Application({ backgroundColor: 0xDDDDDD });
document.body.appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);

const BOX_WH = 120;
const SPACE = BOX_WH * .1;

const LINE1_COUNT = 5;
const LINE2_COUNT = 4;


function createAllBox(){
  let count = 0;
  let line1_W = (LINE1_COUNT * BOX_WH + (LINE1_COUNT - 1) * SPACE);
  let line2_W = (LINE2_COUNT * BOX_WH + (LINE2_COUNT - 1) * SPACE);

  function createBox(){
    var box = new PIXI.Graphics();
    box.beginFill(0xffffff);
    box.drawRect(BOX_WH * -.5, BOX_WH * -.5, BOX_WH, BOX_WH);
    box.endFill();
    box.tint = 0x0;
    box.interactive = true;
    box.buttonMode = true;

    box.on('pointerdown', function(){
      console.log('pd')
      box.tint = 0xff9900;
    });
    box.on('pointerup', function(){
      box.tint = 0x0;
    });
    box.on('pointerupoutside', function(){
      box.tint = 0x0;
    });
    box.on('pointerover', function(){
    });
    box.on('pointerout', function(){
    });
    return box;
  }

  for(let i=0;i<LINE1_COUNT;i++){
    count++;
    const box = createBox();
    box.x = (BOX_WH + SPACE) * i - line1_W * .5 + BOX_WH * .5;
    box.y = (BOX_WH + SPACE) * 0 - BOX_WH *.5 - SPACE * .5;
    container.addChild(box);
  }
  for(let i=0;i<LINE2_COUNT;i++){
    count++; 
    const box = createBox();
    box.x = (BOX_WH + SPACE) * i - line2_W * .5 + BOX_WH * .5;
    box.y = (BOX_WH + SPACE) * 0 + BOX_WH *.5 + SPACE * .5;
    container.addChild(box);
  }

}

createAllBox();



window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);

  app.stage.position.x = app.renderer.width * .5;
  app.stage.position.y = app.renderer.height * .5;

};
onresize();