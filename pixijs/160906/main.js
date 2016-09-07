var STAGE_WIDTH = 490, STAGE_HEIGHT = 490;
var renderer = PIXI.autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT,{backgroundColor : 0x000000, antialias: true});
var stage = new PIXI.Container();
var clCount = 12; //12
var device;

var isFB = (navigator.userAgent.toLowerCase().indexOf("fb") != -1); // FB App
var isLine = (navigator.userAgent.toLowerCase().indexOf("line") != -1); // Line App
// alert("isFB: "+isFB+" isLine: "+isLine+" again: "+again);


if( isFB == true){
  openAlert();
}else if( isLine == true){
  openAlert();
}else{
}

function openAlert(){
  alert("建議使用Google Chrome / Safari");
}


if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  device = 'mobile';
} else {
  device = 'pc';
}

for (var i = 0; i< clCount; i++) {

  var tweenCircle = new PIXI.Container();
    stage.addChild(tweenCircle);

  var t = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawCircle(0, 0, 13)
    .endFill()
    .generateTexture();

  //Create a custom path
  var path = new PIXI.tween.TweenPath();
  path.arc( 142, 0, 60, 270 * (Math.PI / 180), 91 * (Math.PI / 180) );

  var path2 = new PIXI.tween.TweenPath();
  path2.arc( 142, 0, 60, 90 * (Math.PI / 180), 271 * (Math.PI / 180) );

  //Display the path
  var gPath = new PIXI.Graphics();
  tweenCircle.addChild(gPath);

  var gPath2 = new PIXI.Graphics();
  tweenCircle.addChild(gPath2);

  var ball = new PIXI.Sprite(t);
  ball.anchor.set(0.5);
  var th = i * (360 / clCount);
  var ta = hsvToRGB2(th , 1, 1);
  var tc = ta[0] * 65536 + ta[1] * 256 + ta[2] * 1;
  ball.tint = tc;
  ball.position = path.getPoint(0);

  var ball2 = new PIXI.Sprite(t);
  ball2.anchor.set(0.5);
  var th = (i+1) * (360 / clCount);
  var ta = hsvToRGB2(th , 1, 1);
  var tc = ta[0] * 65536 + ta[1] * 256 + ta[2] * 1;
  ball2.tint = tc;
  ball2.position = path2.getPoint(0);

  /* same color */
  gPath.lineStyle(2, tc, 1);
  gPath.drawPath(path);
  gPath.alpha = 0;
  gPath2.lineStyle(2, tc, 1);
  gPath2.drawPath(path2);
  gPath2.alpha = 0;


  tweenCircle.addChild(ball);
  tweenCircle.addChild(ball2);
  tweenCircle.rotation = 360 / clCount * i * (Math.PI / 180) ;


  var tweenBall = PIXI.tweenManager.createTween(ball);
  tweenBall.time = 2000;
  tweenBall.easing = PIXI.tween.Easing.outQuad();

  tweenBall.loop = true;

  tweenBall.path = path;
  tweenBall.delay = 400 * i;
  tweenBall.start();

  tweenBall.on('update', function(delta){
    var p = this._elapsedTime / this.time; // 0 ~ 1
    var p2 = p * (360 / clCount);
    var tr = this.target.parent.rotation / (Math.PI / 180);

    var ta = hsvToRGB2(tr + p2 , 1, 1);
    var tc = ta[0] * 65536 + ta[1] * 256 + ta[2] * 1;

    this.target.tint = tc;
    
  });
  tweenBall.on('repeat', function(){
    this.delay = 3000;
    this.reset().start();
  });



  var tweenBall2 = PIXI.tweenManager.createTween(ball2);
  tweenBall2.time = 2000;
  tweenBall2.easing = PIXI.tween.Easing.outQuad();

  tweenBall2.loop = true;

  tweenBall2.path = path2;
  tweenBall2.delay = 400 * i;
  tweenBall2.start();

  tweenBall2.on('update', function(delta){
    var p = this._elapsedTime / this.time; // 0 ~ 1
    var p2 = p * (360 / clCount);
    var tr = this.target.parent.rotation / (Math.PI / 180);
        tr += (360 / clCount);

    var ta = hsvToRGB2(tr - p2 , 1, 1);
    var tc = ta[0] * 65536 + ta[1] * 256 + ta[2] * 1;

    this.target.tint = tc;
    
  });
  tweenBall2.on('repeat', function(){
    this.delay = 3000;
    this.reset().start();
  });









  var tc = PIXI.tweenManager.createTween(gPath);

  tc.time = 2000;
  tc.easing = PIXI.tween.Easing.linear();

  tc.loop = true;

  tc.delay = 400 * i;
  tc.start();

  tc.from({alpha:0});
  tc.to({alpha:1});
  tc.pingPong = true;
  tc.on('repeat', function(){
    this.delay = 3000;
    this.reset().start();
  });

  var tc2 = PIXI.tweenManager.createTween(gPath2);

  tc2.time = 2000;
  tc2.easing = PIXI.tween.Easing.linear();

  tc2.loop = true;

  tc2.delay = 400 * i;
  tc2.start();

  tc2.from({alpha:0});
  tc2.to({alpha:1});
  tc2.pingPong = true;
  tc2.on('repeat', function(){
    this.delay = 3000;
    this.reset().start();
  });





};





function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
    PIXI.tweenManager.update();
}

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;
  //this part resizes the canvas but keeps ratio the same
  renderer.view.style.width = w + "px";
  renderer.view.style.height = h + "px";
  //this part adjusts the ratio:
  renderer.resize(w,h);

  STAGE_WIDTH = w;
  STAGE_HEIGHT = h;

  stage.position.x = renderer.width * .5;
  stage.position.y = renderer.height * .5;
};

onresize();
animate();
if(device == "pc"){
  stage.scale.x = 1;
  stage.scale.y = 1;
}else{
  stage.scale.x = 2;
  stage.scale.y = 2;  
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
