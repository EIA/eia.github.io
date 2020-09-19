const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


const style1 = new PIXI.TextStyle({
	fontSize: 24
});

const testText1 = new PIXI.Text('test 測試: 1', style1);
testText1.x = 50;
testText1.y = 50;
app.stage.addChild(testText1);

const testText2 = new PIXI.Text('test 測試: 2', style1);
testText2.x = 50;
testText2.y = 150;
testText2.scale.x = 2;
testText2.scale.y = 2;
app.stage.addChild(testText2);


const style2 = new PIXI.TextStyle({
	fontSize: 48
});
const testText3 = new PIXI.Text('test 測試: 3', style2);
testText3.x = 50;
testText3.y = 250;
app.stage.addChild(testText3);


// -----
const svg1 = PIXI.Sprite.from('control.svg');
svg1.x = 400;
svg1.y = 50;
app.stage.addChild(svg1);

const svg2 = PIXI.Sprite.from('control.svg');
svg2.x = 400;
svg2.y = 250;
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