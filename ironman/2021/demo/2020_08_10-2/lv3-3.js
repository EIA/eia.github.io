const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

let testText = 'test 測試';
const testTextStyle = new PIXI.TextStyle({ fontSize: 24 });

const testText1 = new PIXI.Text(testText, testTextStyle);
testText1.x = 50;
testText1.y = 50;
app.stage.addChild(testText1);

const testText2 = new PIXI.Text(testText, testTextStyle);
testText2.x = 50;
testText2.y = 100;
app.stage.addChild(testText2);

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);
};

onresize();