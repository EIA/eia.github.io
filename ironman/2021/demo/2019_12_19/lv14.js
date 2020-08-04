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

let currentInteractiveTarget = null;


const style = new PIXI.TextStyle({
    fontSize: 36,
    fontWeight: 'bold',
    fill: 0xffffff
});

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
    box.name = name;

    var textBox = new PIXI.Graphics();
    textBox.beginFill(0x0);
    textBox.drawRect(BOX_WH * -.3, BOX_WH * -.2, BOX_WH*.6, BOX_WH*.4);
    textBox.endFill();
    box.addChild(textBox);
    textBox.y = 0;
    textBox.alpha = 0.1;
    box.textBox = textBox;

    var text = new PIXI.Text('1', style);
    textBox.addChild(text);
    text.x = text.width*-.5;
    text.y = text.height*-.5;

    var boxHit = new PIXI.Graphics();
    boxHit.beginFill(0xff0000, 0.001);
    boxHit.drawRect(BOX_WH * -.5, BOX_WH * -.5, BOX_WH, BOX_WH);
    boxHit.endFill();
    boxHit.interactive = true;
    boxHit.buttonMode = true;
    box.addChild(boxHit);

    boxHit.on('pointerdown', function(e){
      var pos = e.data.getLocalPosition(this.parent);
      console.log('pointerdown', e.data, pos);
    });
    boxHit.on('pointerup', function(){
      console.log(box.name, 'pointerup');
      select(box.name);
      currentInteractiveTarget = null;
      touchHandler();
    });
    boxHit.on('pointerupoutside', function(){
      console.log(box.name, 'pointerupoutside');
      currentInteractiveTarget = null;
      touchHandler();
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
  container.on('pointermove', function(e){
    // var pos = e.data.getLocalPosition(this.parent);
    // console.log('pointermove', e.data, pos);

    // console.log(e);
    // console.log(e.data);

    // console.log(app.renderer.plugins.interaction.hitTest(e.data.global));
    // console.log(app.renderer.plugins.interaction.hitTest(e.data.global).parent);
    // console.log(app.renderer.plugins.interaction.hitTest(e.data.global).parent.name);

    var hit = app.renderer.plugins.interaction.hitTest(e.data.global);
    if(hit && hit.parent){
      var target = hit.parent;
      if( target !== currentInteractiveTarget){
          currentInteractiveTarget = target;
          // console.log(target.name);
          // overHandler(currentInteractiveTarget);
          touchHandler();
      }else{
      }
    }
  });




}

createAllBox(currentInteractiveTarget);

function select(name){
  console.log('select: ', name);
}



function touchHandler(){
  console.log('touchHandler', currentInteractiveTarget)

  container.children.forEach((child, index)=>{

    if(child === currentInteractiveTarget){
      TweenMax.to(child,  .6, { pixi: { tint: 0xff9900 }, ease:Strong.easeOut });
      TweenMax.to(child.textBox,  .6, { alpha:1, y: BOX_WH * -.6, ease:Strong.easeOut, onComplete:function(){
      }});
    }else{
      TweenMax.to(child,  .6, { pixi: { tint: 0x0 }, ease:Strong.easeOut });
      TweenMax.to(child.textBox,  .6, { alpha:0.3, y: 0, ease:Strong.easeOut });
    }
  })
}









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

// console.log('app.renderer.plugins.interaction');
// console.log(app.renderer.plugins.interaction);
