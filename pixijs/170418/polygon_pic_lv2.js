////////////////////////////////////////////////////////////////////////////////////////
window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;
  //this part resizes the canvas but keeps ratio the same
  renderer.view.style.width = w + "px";
  renderer.view.style.height = h + "px";
  //this part adjusts the ratio:
  renderer.resize(w,h);

  App.STAGE_WIDTH = w;
  App.STAGE_HEIGHT = h;

  stage.position.x = renderer.width * .5;
  stage.position.y = renderer.height * .5;

  //hexagonCountW

  // console.log("width: "+renderer.width + " height: "+renderer.height);
  console.log("width: "+renderer.width+ " height: "+renderer.height);




};





////////////////////////////////////////////////////////////////////////////////////////
var App = {
  STAGE_WIDTH: 1200,
  STAGE_HEIGHT: 1000,
  bound_width: 800, //800
  bound_height: 500, //500

  radius: 150,
  halfHexagonWidth: 0,

  hexagonCountW: 0,
  hexagonCountH: 0,

  texture:{
              hana1: null
          },

  ct: 0
}
App.halfHexagonWidth = Math.sin(60 * (Math.PI / 180)) * App.radius;

// var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xEEEEEE});
var renderer = PIXI.autoDetectRenderer(App.STAGE_WIDTH, App.STAGE_HEIGHT,{backgroundColor : 0x222222, antialias: true});

var stage = new PIXI.Container();
	stage.position.x = App.STAGE_WIDTH * .5;
	stage.position.y = App.STAGE_HEIGHT * .5;

var testHexagon = new Hexagon("hana_4");

stage.addChild(testHexagon.container);
testHexagon.container.x = -200;
// testHexagon.container.rotation = 30 * (Math.PI / 180);

// var testTriangle = new Triangle(true);
var testTriangle = new Triangle_Hana_4(true);


stage.addChild(testTriangle.container);
testTriangle.container.x = 200;
// testTriangle.container.rotation = 30 * (Math.PI / 180);



////////////////////////////////////////////////////////////////////////////////////////






//////////////////////////////////////

var gui = new dat.GUI();

var effectController = {
    Rotate: -30,
    Scale: 1,
    X: 0,
    Y: 0
};


gui.add( effectController, "Rotate", -180, 180, 0.01 ).onChange( guiHandler_rotate );
gui.add( effectController, "Scale", 0.1, 3, 0.01 ).onChange( guiHandler_scale );
gui.add( effectController, "X", -300, 300, 0.01 ).onChange( guiHandler_x );
gui.add( effectController, "Y", -300, 300, 0.01 ).onChange( guiHandler_y );




function guiHandler_rotate(){
  testHexagon.setRotation(effectController.Rotate);
  testTriangle.setRotation(effectController.Rotate);
};
function guiHandler_scale(){
  testHexagon.setScale(effectController.Scale);
  testTriangle.setScale(effectController.Scale);
};
function guiHandler_x(){
  testHexagon.setX(effectController.X);
  testTriangle.setX(effectController.X);
};
function guiHandler_y(){
  testHexagon.setY(effectController.Y);
  testTriangle.setY(effectController.Y);
};


////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////








onresize();

animate();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);

    App.ct += 2;

    testHexagon.update();
    testTriangle.update();

}










function hsvToRGB2(hue, saturation, value) {
    var hi;
    var f;
    var p;
    var q;
    var t;

    while (hue < 0) {
    hue += 360;
    }
    hue = hue % 360;

    saturation = saturation < 0 ? 0
    : saturation > 1 ? 1
    : saturation;

    value = value < 0 ? 0
    : value > 1 ? 1
    : value;

    value *= 255;
    hi = (hue / 60 | 0) % 6;
    f = hue / 60 - hi;
    p = value * (1 -           saturation) | 0;
    q = value * (1 -      f  * saturation) | 0;
    t = value * (1 - (1 - f) * saturation) | 0;
    value |= 0;

    switch (hi) {
    case 0:
      return [value, t, p];
    case 1:
      return [q, value, p];
    case 2:
      return [p, value, t];
    case 3:
      return [p, q, value];
    case 4:
      return [t, p, value];
    case 5:
      return [value, p, q];
    }
}