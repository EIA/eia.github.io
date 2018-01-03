var isFB = (navigator.userAgent.toLowerCase().indexOf("fb") != -1); // FB App
var isLine = (navigator.userAgent.toLowerCase().indexOf("line") != -1); // Line App
// alert("isFB: "+isFB+" isLine: "+isLine);


if( isFB == true){
  openAlert();
}else if( isLine == true){
  openAlert();
}else{
}

function openAlert(){
  alert("建議使用Google Chrome / Safari");
}

////////////////////////////////////////////////////////////////////////////////////////

var device;
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  device = 'mobile';
} else {
  device = 'pc';
}


////////////////////////////////////////////////////////////////////////////////////////

// var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
var app = new PIXI.Application(800, 600,{backgroundColor : 0xeeeeee, antialias: true});
document.body.appendChild(app.view);

var flower = new Flower({
                              steps: 10,
                              lineColor: 0x777777, // 0x4c
                              lineAlpha: 0.25, // 0.75
                              shapeColor: 0xaaaaaa, // 0xf5 0xff9900
                              shapeAlpha: 0.55, // 0.75
                              duration: 3,
                              showDebugDot: true,
                              showDebugShape: true,
                              debug: false
                            });
var flower2 = new Flower({
                              steps: 3,
                              lineColor: 0x555555, // 0x4c
                              lineAlpha: 0.25, // 0.75
                              shapeColor: 0xcccccc, // 0xf5
                              shapeAlpha: 0.55, // 0.75
                              duration: 3,
                              showDebugDot: true,
                              showDebugShape: true,
                              debug: false
                            });
    flower2.container.scale.x = 0.85;
    flower2.container.scale.y = 0.85;
    flower2.container.rotation = -36 * (Math.PI / 180);

app.stage.addChild(flower.container);
app.stage.addChild(flower2.container);
app.ticker.add(function(delta) {
    flower.update();
    flower2.update();
});


var controller = {
                    lineColor: [77, 77, 77], // 0x4c4c4c
                    lineAlpha: 0.35, // 0.75
                    shapeColor: [255, 153, 0], // 0xf5f5f5
                    shapeAlpha: 0.35, //0.75
                    duration: 3,
          					bloom: bloom,
                    randomBloom: randomBloom,
                    randomColor: randomBloom,
          				}
// var gui = new dat.GUI();
// gui.add(controller, 'lineAlpha', 0, 1, 0.05).onChange( guiHandler );
// gui.addColor(controller, 'lineColor').onChange( guiHandler );
// gui.add(controller, 'shapeAlpha', 0, 1, 0.05).onChange( guiHandler );
// gui.addColor(controller, 'shapeColor').onChange( guiHandler );
// gui.add(controller, 'duration', 0.1, 10, 0.1).onChange( guiHandler );
// gui.add(controller, 'bloom');
// gui.add(controller, 'randomBloom');
// gui.add(controller, 'randomColor');
//
document.getElementById('randomColorButton').onclick = randomBloom;


function bloom(){
	flower.bloom();
  flower2.bloom();
}
function randomBloom(){
  flower.randomBloom();
  flower2.randomBloom();
}
function guiHandler(){
  var updateData = {};
  updateData. lineAlpha = controller.lineAlpha;
  updateData. lineColor = controller.lineColor;
  updateData. shapeAlpha = controller.shapeAlpha;
  updateData. shapeColor = controller.shapeColor;
  updateData. duration = controller.duration;

  flower.updateSetting(updateData);
  flower2.updateSetting(updateData);
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