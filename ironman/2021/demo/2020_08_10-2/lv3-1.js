const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


const style1 = new PIXI.TextStyle({ fontSize: 24 });
const style2 = new PIXI.TextStyle({ fontSize: 48 });

const testText1 = new PIXI.Text('test 測試: 1', style1);
testText1.x = 50;
testText1.y = 50;
app.stage.addChild(testText1);

const testText2 = new PIXI.Text('test 測試: 2', style1);
testText2.x = 50;
testText2.y = 100;
testText2.scale.x = 2;
testText2.scale.y = 2;
app.stage.addChild(testText2);

const testText3 = new PIXI.Text('test 測試: 3', style2);
testText3.x = 50;
testText3.y = 200;
app.stage.addChild(testText3);


const style4 = new PIXI.TextStyle({ fontSize: 24 });
const testText4 = new PIXI.Text('test 測試: 4', style4 );
testText4.x = 350;
testText4.y = 50;
style4.fontSize = 96;
app.stage.addChild(testText4);

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);
};

onresize();