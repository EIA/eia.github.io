const app = new PIXI.Application({ backgroundColor: 0xDDDDDD });
document.body.appendChild(app.view);

const container = new PIXI.Container();
container.name = 'boxContainer';
app.stage.addChild(container);

const BOX_WH = 120;
const SPACE = BOX_WH * .1;

const LINE1_COUNT = 5;
const LINE2_COUNT = 4;

const isPinterDown = false;

/*

  https://pixijs.download/dev/docs/PIXI.interaction.InteractionManager.html

  PIXI.interaction.InteractionManager
  The interaction manager deals with mouse, touch and pointer events.

  Any DisplayObject can be interactive if its interactive property is set to true.

  This manager also supports multitouch.

  An instance of this class is automatically created by default, and can be found at renderer.plugins.interaction

*/

function createAllBox(){
  let count = 0;
  let line1_W = (LINE1_COUNT * BOX_WH + (LINE1_COUNT - 1) * SPACE);
  let line2_W = (LINE2_COUNT * BOX_WH + (LINE2_COUNT - 1) * SPACE);

  function createBox(name){
    var box = new PIXI.Graphics();
    box.beginFill(0xffffff);
    box.drawRect(BOX_WH * -.5, BOX_WH * -.5, BOX_WH, BOX_WH);
    box.endFill();
    box.tint = 0x0;
    box.interactive = true;
    box.buttonMode = true;
    box.name = name;

    box.on('pointerdown', function(e){
      // console.log(box.name, 'pointerdown');
      box.tint = 0x009900;


      // console.log(e.data);
      // console.log(e.data.getLocalPosition);
      var pos = e.data.getLocalPosition(this.parent);
      console.log('pointerdown', e.data, pos);
    });
    box.on('pointerup', function(){
      console.log(box.name, 'pointerup');
      box.tint = 0x0;
    });
    box.on('pointerupoutside', function(){
      console.log(box.name, 'pointerupoutside');
      box.tint = 0x0;
    });
    box.on('pointerover', function(){
      console.log(box.name, 'pointerover');
      box.tint = 0xff9900;
    });
    box.on('pointerout', function(){
      console.log(box.name, 'pointerout');
      box.tint = 0x0;
    });
    box.on('pointermove', function(){
      // console.log(box.name, 'pointermove');
      // box.tint = 0xff9900;
    });

    box.on('touchstart', function(){
      console.log(box.name, 'touchstart');
    });
    box.on('touchend', function(){
      console.log(box.name, 'touchend');
    });
    box.on('touchcancel', function(){
      console.log(box.name, 'touchcancel');
    });
    box.on('tap', function(){
      console.log(box.name, 'tap');
    });
    box.on('touchendoutside', function(){
      console.log(box.name, 'touchendoutside');
    });
    box.on('touchmove', function(){
      // console.log(box.name, 'touchmove');
    });

    return box;
  }

  for(let i=0;i<LINE1_COUNT;i++){
    count++;
    const box = createBox('1_'+(i));
    box.x = (BOX_WH + SPACE) * i - line1_W * .5 + BOX_WH * .5;
    box.y = (BOX_WH + SPACE) * 0 - BOX_WH *.5 - SPACE * .5;
    container.addChild(box);
  }
  for(let i=0;i<LINE2_COUNT;i++){
    count++; 
    const box = createBox('2_'+(i));
    box.x = (BOX_WH + SPACE) * i - line2_W * .5 + BOX_WH * .5;
    box.y = (BOX_WH + SPACE) * 0 + BOX_WH *.5 + SPACE * .5;
    container.addChild(box);
  }


  container.interactive = true;
  container.on('pointerdown', function(e){
    console.log('pointerdown', e);
    console.log('pointerdown', e.data);
  });
  container.on('pointermove', function(e){
    // var pos = e.data.getLocalPosition(this.parent);
    // console.log('pointermove', e.data, pos);

    // console.log(e);
    // console.log(e.data);

    var target = app.renderer.plugins.interaction.hitTest(e.data.global);
    if(target){
      console.log(target.name);
    }    
  });
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

console.log('app.renderer.plugins.interaction');
console.log(app.renderer.plugins.interaction);

setInterval(function(){
  // console.log(app.renderer.plugins.interaction);
  // console.log(app.renderer.plugins.interaction);
  // console.log(app.renderer.plugins.interaction.mouse.global);
}, 3000)