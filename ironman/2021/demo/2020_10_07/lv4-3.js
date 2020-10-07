const app = new PIXI.Application({
  width: 400,
  height: 400,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio,
  autoResize: true
});
document.body.appendChild(app.view);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
bunny.istweening = false;
bunny.anchor.set(0.5);

bunny.x = 200;
bunny.y = 200;

app.stage.addChild(bunny);

let btn;

function tweenBunny(){
  console.log("tweenBunny");
  if (bunny.istweening === true) {return};
  gsap.to(bunny, 
  {
  	duration: 1,
  	x: Math.random() * 400,
    y: Math.random() * 400,
  	onStart:()=>{
      bunny.istweening = true;
      btn.disable();
      console.log("bunny.istweening: ", bunny.istweening);
    },
  	onComplete:()=>{
      bunny.istweening = false;
      
      btn.enable();
      console.log("bunny.istweening: ", bunny.istweening);
    }
  });
};

const createBtn = () => {
  const btnContainer = new PIXI.Container();
  const btnGraphic = new PIXI.Graphics();
  btnGraphic.beginFill(0xff9900);
  btnGraphic.drawRect(0, 0, 60, 30);
  btnGraphic.endFill();
  btnContainer.addChild(btnGraphic);

  const btnText = new PIXI.Text("", {fontSize: 20, fontFamily: 'Noto Sans TC', fontWeight:'300'});
  btnContainer.addChild(btnText);

  btnContainer.setText = function(text){
    btnText.text = text;
    btnText.x = (btnGraphic.width - btnText.width) * 0.5;
    btnText.y = (btnGraphic.height - btnText.height) * 0.5;
  };

  btnContainer.enable = function(){
    btnContainer.buttonMode = true;
    btnContainer.interactive = true;
    //
    btnText.style.fill = 0x0;
    //
    btnGraphic.clear();
    btnGraphic.beginFill(0xff9900);
    btnGraphic.drawRect(0, 0, 60, 30);
    btnGraphic.endFill();
  };

  btnContainer.disable = function(){
    btnContainer.buttonMode = false;
    btnContainer.interactive = false;
    //
    btnText.style.fill = 0xaaaaaa;
    //
    btnGraphic.clear();
    btnGraphic.beginFill(0xdddddd);
    btnGraphic.drawRect(0, 0, 60, 30);
    btnGraphic.endFill();
  };

  btnContainer.on("pointerdown", ()=>{
    tweenBunny();
  });

  btnContainer.enable();

  return btnContainer;
};

setTimeout(()=>{
  btn = createBtn();
  app.stage.addChild(btn);
  btn.x = 20;
  btn.y = 20;
  btn.setText("test");
}, 1000);