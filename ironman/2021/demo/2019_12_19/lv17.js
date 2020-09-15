const outputBox = document.getElementById("ot");

const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const container = new PIXI.Container();
container.name = "boxContainer";
app.stage.addChild(container);

const isPhone = PIXI.utils.isMobile.phone;

const BOX_WH = isPhone ? 40 : 120;
const BUNNY_SCALE = isPhone ? 1 : 3;
const SPACE = BOX_WH * .1;

const LINE1_COUNT = 5;
const LINE2_COUNT = 4;

let currentInteractiveTarget = null;

const style = new PIXI.TextStyle({
    fontSize: 48,
    fontWeight: "bold",
    fill: 0xffffff
});

function createAllBox(){
  let count = 0;
  let line1_W = (LINE1_COUNT * BOX_WH + (LINE1_COUNT - 1) * SPACE);
  let line2_W = (LINE2_COUNT * BOX_WH + (LINE2_COUNT - 1) * SPACE);

  function createBox(name){
    let boxContainer = new PIXI.Container();
    boxContainer.name = name;

    let boxGraphic = new PIXI.Graphics();
    boxGraphic.beginFill(0xff9900, .95);
    boxGraphic.drawRect(BOX_WH * -.5, BOX_WH * -.5, BOX_WH, BOX_WH);
    boxGraphic.endFill();
    boxContainer.addChild(boxGraphic);

    const bunny = PIXI.Sprite.from("assets/basics/bunny.png");
    bunny.anchor.set(.5);
    bunny.scale.set(BUNNY_SCALE);
    bunny.defaultY = BOX_WH * -.5 + BOX_WH * 0.15;
    bunny.hoverY = BOX_WH * -.5 - BOX_WH * 0.25;
    boxContainer.addChildAt(bunny, 0);
    bunny.y = bunny.defaultY;

    let boxHit = new PIXI.Graphics();
    boxHit.beginFill(0xff0000, 0.001);
    boxHit.drawRect(BOX_WH * -.5, BOX_WH * -.5, BOX_WH, BOX_WH);
    boxHit.endFill();
    boxContainer.addChild(boxHit);

    boxContainer.interactive = true;
    boxContainer.buttonMode = true;

    boxContainer.on("pointerdown", function(e){
      console.log("pointerdown: ", boxContainer.name);
      outputBox.innerText = `pointerdown: ${boxContainer.name}`;
      currentInteractiveTarget = boxContainer;
      touchHandler();
    });
    boxContainer.on("pointerup", function(){
      console.log("pointerup: ", boxContainer.name);
      outputBox.innerText = `pointerup: ${boxContainer.name}`;
      currentInteractiveTarget = null;
      touchHandler();
    });
    boxContainer.on("pointerupoutside", function(){
      console.log("pointerupoutside: ", boxContainer.name);
      outputBox.innerText = `pointerupoutside: ${boxContainer.name}`;
      currentInteractiveTarget = null;
      touchHandler();
    });

    boxContainer.on("pointermove", function(e){
      let hitBox = app.renderer.plugins.interaction.hitTest(e.data.global);
      if(hitBox){
        if( currentInteractiveTarget !== hitBox ){
          currentInteractiveTarget = hitBox;
          console.log("pointerover: ", boxContainer.name);
          outputBox.innerText = `pointerover: ${boxContainer.name}`;
          touchHandler();
        }
      }else{
        if( currentInteractiveTarget !== null ){
          console.log("pointerout");
          outputBox.innerText = `pointerout`;
          currentInteractiveTarget = null;
          touchHandler();
        }
      }
    });

    boxContainer.over = function(){
      TweenMax.to(bunny,  .3, { y: bunny.hoverY, ease:Strong.easeOut });
    };
    boxContainer.out = function(){
      TweenMax.to(bunny,  .3, { y: bunny.defaultY, ease:Strong.easeOut });
    };

    return boxContainer;
  }

  for(let i=0;i<LINE1_COUNT;i++){
    count++;
    const box = createBox("1_"+(i));
    box.x = (BOX_WH + SPACE) * i - line1_W * .5 + BOX_WH * .5;
    box.y = (BOX_WH + SPACE) * 0 - BOX_WH *.5 - SPACE * .5;
    container.addChild(box);
  }
  for(let i=0;i<LINE2_COUNT;i++){
    count++; 
    const box = createBox("2_"+(i));
    box.x = (BOX_WH + SPACE) * i - line2_W * .5 + BOX_WH * .5;
    box.y = (BOX_WH + SPACE) * 0 + BOX_WH *.5 + SPACE * 5.5;
    container.addChild(box);
  }


}

createAllBox(currentInteractiveTarget);



function touchHandler(){
  // console.log("touchHandler", currentInteractiveTarget)
  container.children.forEach((child, index)=>{
    if(child === currentInteractiveTarget){
      container.setChildIndex(child, container.children.length-1);
      child.over();
    }else{
      child.out();
    }
  })
}









window.onresize = function (event){
  let w = window.innerWidth;
  let h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);

  app.stage.position.x = app.renderer.width * .5;
  app.stage.position.y = app.renderer.height * .5;

};
onresize();

// console.log("app.renderer.plugins.interaction");
// console.log(app.renderer.plugins.interaction);
