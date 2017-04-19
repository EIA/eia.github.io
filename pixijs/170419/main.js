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

  // App.bound_width = App.STAGE_WIDTH - 200;
  // App.bound_height = App.STAGE_HEIGHT - 200;
  
  App.bound_width = App.STAGE_WIDTH - 200;
  App.bound_height = App.STAGE_HEIGHT - 200;

  stage.position.x = renderer.width * .5;
  stage.position.y = renderer.height * .5;

  wBd.clear();
  wBd.beginFill(0xeaeaea);
  wBd.drawRect(App.STAGE_WIDTH * -.5 ,App.STAGE_HEIGHT*-.5, App.STAGE_WIDTH, App.STAGE_HEIGHT);
  wBd.endFill();

  // App.hexagonCountW = Math.ceil((App.bound_width) / (App.halfHexagonWidth * 2)) +1;
  // App.hexagonCountH = Math.ceil((App.bound_height - App.radius) / (App.radius * 3)) * 2  + 1;

  // rebuildObjs();

  // console.log("width: "+renderer.width+ " height: "+renderer.height);
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

  currentTl:0,
  ct: 0
}
App.halfHexagonWidth = Math.sin(60 * (Math.PI / 180)) * App.radius;

var title_b = document.getElementById("title_b");
var title_w = document.getElementById("title_w");


// var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xEEEEEE});
var renderer = PIXI.autoDetectRenderer(App.STAGE_WIDTH, App.STAGE_HEIGHT,{backgroundColor : 0x222222, antialias: true});

var stage = new PIXI.Container();
    stage.position.x = App.STAGE_WIDTH * .5;
    stage.position.y = App.STAGE_HEIGHT * .5;

    if(device=="mobile"){
      stage.scale.x = 1.5;
      stage.scale.y = 1.5;
      title_b.className += " m";
      title_w.className += " m";
    }else{

    }
////////////////////

var wBd = new PIXI.Graphics();
    wBd.beginFill(0xeaeaea);
    wBd.drawRect(App.STAGE_WIDTH * -.5 ,App.STAGE_HEIGHT*-.5, App.STAGE_WIDTH, App.STAGE_HEIGHT);
    wBd.endFill();
    wBd.alpha = 0;
    stage.addChild(wBd);

var scene1 = new PIXI.Container();
    stage.addChild(scene1);

var hexagon_1_1 = new Hexagon("hana_3");
    scene1.addChild(hexagon_1_1.container);
    scene1.alpha = 0;

///////

var scene2 = new PIXI.Container();
    stage.addChild(scene2);
var hexagon_2_1 = new Hexagon("hana_1");
    hexagon_2_1.container.x = -300;
scene2.addChild(hexagon_2_1.container);

var hexagon_2_2 = new Hexagon("hana_1");
    hexagon_2_2.container.x = 0;
scene2.addChild(hexagon_2_2.container);

var hexagon_2_3 = new Hexagon("hana_1");
    hexagon_2_3.container.x = 300;
scene2.addChild(hexagon_2_3.container);
scene2.alpha = 0;

///////

var scene3 = new PIXI.Container();
    stage.addChild(scene3);
var hexagon_3_1 = new Hexagon("hana_4");
scene3.addChild(hexagon_3_1.container);

scene3.alpha = 0;

///////
onresize();
if(App.hexagonCountW > App.hexagonCountH){

}else{

}
var bd_range = App.bound_width > App.bound_height ? App.bound_width : App.bound_height;
// App.hexagonCountW = Math.ceil((App.bound_width) / (App.halfHexagonWidth * 2)) +1;
// App.hexagonCountH = Math.ceil((App.bound_height - App.radius) / (App.radius * 3)) * 2  + 1;

App.hexagonCountW = Math.ceil((bd_range) / (App.halfHexagonWidth * 2)) +1;
App.hexagonCountH = Math.ceil((bd_range - App.radius) / (App.radius * 3)) * 2  + 1;

var scene4 = new PIXI.Container();
    stage.addChild(scene4);
var scene4hexagonContainer = new PIXI.Container();
scene4.addChild(scene4hexagonContainer);

scene4.alpha = 0;

var scene4hexasArray = [];
rebuildObjs();

////////////////////////////////////////////////////////////////////////////////////////

var tl = new TimelineMax({onUpdate:updateStats, onComplete:nextTween});
      tl.set(title_b, {autoAlpha:0});
      tl.set(title_w, {autoAlpha:0});
function updateStats(){

}

function nextTween(){
  // console.log("nextTween");
  if(App.currentTl +1 >=4){
    App.currentTl = 0;
  }else{
    App.currentTl ++;
  }
  // console.log("App.currentTl: "+ App.currentTl);

  switch(App.currentTl){
    case 0:
      tl.clear();
      tl.to(scene1, 1, {alpha:1}, "start");
      tl.to(wBd, 1, {alpha:1}, "start");
      tl.to(title_b, 2, {autoAlpha:0}, "start");
      tl.to(title_w, 2, {autoAlpha:1}, "start");
      tl.set(hexagon_1_1.container, {rotation:15 * (Math.PI / 180)}, "start");
      tl.to(hexagon_1_1.container, 2, {rotation:0, ease:Strong.easeOut}, "start");
      tl.to(hexagon_1_1.container, 2, {rotation:-15 * (Math.PI / 180), ease:Strong.easeIn}, "end+=3");
      tl.to(scene1, 1, {alpha:0}, "end+=3");
      tl.to(wBd, 2, {alpha:0}, "end+=3");
      tl.to(title_b, 2, {autoAlpha:0}, "end+=3");
      tl.to(title_w, 2, {autoAlpha:0}, "end+=3");
      break;
    case 1:
      tl.clear();
      tl.set(scene2, {alpha:0});
      tl.set(hexagon_2_1.container, {alpha:0, y:-50});
      tl.set(hexagon_2_2.container, {alpha:0});
      tl.set(hexagon_2_3.container, {alpha:0, y:50});

      tl.to(scene2, 1, {alpha:1}, "start");
      tl.to(hexagon_2_1.container, 1, {alpha:1}, "start");
      tl.to(hexagon_2_2.container, 1, {alpha:1}, "start");
      tl.to(hexagon_2_3.container, 1, {alpha:1}, "start");
      tl.to(title_b, 2, {autoAlpha:1}, "start");
      tl.to(title_w, 2, {autoAlpha:0}, "start");
      tl.to(hexagon_2_1.container, 2, {y:0, ease:Strong.easeOut}, "start");
      tl.to(hexagon_2_3.container, 2, {y:0, ease:Strong.easeOut}, "start");

      tl.to(scene2, 1, {alpha:0}, "end+=3");
      tl.to(hexagon_2_1.container, 1, {y:50, alpha:0, ease:Strong.easeIn}, "end+=3");
      tl.to(hexagon_2_2.container, 1, {alpha:0}, "end+=3");
      tl.to(hexagon_2_3.container, 1, {y:-50, alpha:0, ease:Strong.easeIn}, "end+=3");
      tl.to(title_b, 2, {autoAlpha:0}, "end+=3");
      tl.to(title_w, 2, {autoAlpha:0}, "end+=3");
      break;
    case 2:
      tl.clear();
      tl.to(scene3, 1, {alpha:1}, "start");
      tl.to(wBd, 1, {alpha:1}, "start");
      tl.to(title_b, 2, {autoAlpha:1}, "start");
      tl.to(title_w, 2, {autoAlpha:0}, "start");
      tl.to(scene3, 2, {alpha:0}, "end+=3");
      tl.to(wBd, 2, {alpha:0}, "end+3=");
      tl.to(title_b, 2, {autoAlpha:0}, "end+=3");
      tl.to(title_w, 2, {autoAlpha:0}, "end+=3");
      break;
    case 3:
      tl.clear();
      tl.to(scene4, 2, {alpha:1}, "start");
      tl.to(title_b, 2, {autoAlpha:0}, "start");
      tl.to(title_w, 2, {autoAlpha:1}, "start");
      tl.to(scene4, 2, {alpha:0}, "end+=5");
      tl.to(title_b, 2, {autoAlpha:0}, "end+=5");
      tl.to(title_w, 2, {autoAlpha:0}, "end+=5");

      var scene4hexasArrayCount = scene4hexasArray.length;
      for(i = 0; i< scene4hexasArrayCount; i++){
        TweenMax.set(scene4hexasArray[i].container, {alpha:0});
        TweenMax.set(scene4hexasArray[i].container.scale, {x:0.7, y:0.7});
        if(Math.random()>.3){
        }else{
          continue;
        }
        if(scene4hexasArray[i].container.x == 0 && scene4hexasArray[i].container.y == 0){
          continue;
        }

        /*
        var tmpDelay = Math.random()*1.5;
        var tmpDuration = 1+Math.random()*1.5;
        TweenMax.to(scene4hexasArray[i].container, tmpDuration, {delay:tmpDelay, rotation:0, alpha:1, ease:Strong.easeOut});
        TweenMax.to(scene4hexasArray[i].container.scale, tmpDuration, {delay:tmpDelay, x:1, y:1, ease:Strong.easeOut});
        */
        target = scene4hexasArray[i].container;
        var tmpDelay = Math.abs(target.e_data.pos.cor_x)*0.3+ Math.abs(target.e_data.pos.cor_y)*0.3 - 0.4 + Math.random()*0.1;
        TweenMax.to(scene4hexasArray[i].container, 1.5, {delay:tmpDelay, rotation:0, alpha:1, ease:Strong.easeIn});
        TweenMax.to(scene4hexasArray[i].container.scale, 1.5, {delay:tmpDelay, x:1, y:1, ease:Strong.easeInOut});


      }
      break;
  }

}

////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////



function rebuildObjs(){
  var scene4hexagonContainerChildCount = scene4hexagonContainer.children.length;
  for(i = 0; i< scene4hexagonContainerChildCount; i++){
    scene4hexagonContainer.removeChildAt(0);
  }
  scene4hexasArray = [];

  var wMin;
  var wMax;
  // console.log("wMin: " + wMin + " wMax: " + wMax);

  var hMin, hMax;
  var ot;


  hMin = (App.hexagonCountH-1) * -.5;
  hMax = hMin + App.hexagonCountH;
  for(j = hMin; j< hMax; j++){
    // console.log("j: "+ j);

    if(j%2 == 0){ // -2, 0, 2
      if(App.hexagonCountW %2 == 0){
        // console.log(" h1 " + (App.hexagonCountW-1));
        wMin = (App.hexagonCountW-1 -1 ) * -.5;
        wMax = wMin + App.hexagonCountW -1;
        ot = "[";
        for(i = wMin; i < wMax; i++){
          // console.log(" \t\t" + i);
          ot += i+", ";
          buildDot(i, j);
        }
        ot += "]";
        // console.log("\t\t "+ ot);
      }else{
        // console.log(" h2 " + (App.hexagonCountW-0));
        wMin = (App.hexagonCountW-1) * -.5;
        wMax = wMin + App.hexagonCountW;
        ot = "[";
        for(i = wMin; i < wMax; i++){
          // console.log(" \t\t" + i);
          ot += i+", ";
          buildDot(i, j);
        }
        ot += "]";
        // console.log("\t\t "+ ot);
      }
    }else{ // -3, -1, 1, 3
      if(App.hexagonCountW %2 == 0){
        // console.log(" h3 " + (App.hexagonCountW-0));
        wMin = (App.hexagonCountW ) * -.5;
        wMax = wMin + App.hexagonCountW +1;
        ot = "[";
        for(i = wMin; i < wMax; i++){
          if(i == 0){ continue; };
          // console.log(" \t\t" + i);
          ot += i+", ";
          buildDot(i, j);
        }
        ot += "]";
        // console.log("\t\t "+ ot);
      }else{
        // console.log(" h4 " + (App.hexagonCountW-1));
        wMin = (App.hexagonCountW-1) * -.5;
        wMax = wMin + App.hexagonCountW;
        ot = "[";
        for(i = wMin; i < wMax; i++){
          if(i == 0){ continue; };
          // console.log(" \t\t" + i);
          ot += i+", ";
          buildDot(i, j);
        }
        ot += "]";
        // console.log("\t\t "+ ot);
      }
    }

  }


}

function buildDot($i, $j){
  // console.log("buildDot: "+$i+" "+ $j);
  
  var hexagon = new Hexagon("hana_1");
     // hexagon.container.anchor.set(0.5);
     // hexagon.container.setTexture(cloneTexture);
     hexagon.container.y = $j * (1.5 * App.radius);
     hexagon.container.scale.x = 1;
     hexagon.container.scale.y = 1;
     hexagon.container.alpha = 1;
     // hexagon.container.e_data = { rot: Math.floor(Math.random()*6), pos: {}, tint_color: 0 };
     hexagon.container.e_data = { rot: 0, pos: {}, tint_color: 0 };
     hexagon.container.e_data.pos.cor_x = $i;
     hexagon.container.e_data.pos.cor_y = $j;
     
     hexagon.container.e_data.colorMode = 0;
     hexagon.container.rotation = hexagon.container.e_data.rot * 60 * (Math.PI / 180);

  
  var colorArray = hsvToRGB2(hexagon.container.rotation, .5, 1);
  var fillColor = colorArray[0] * 256 * 256 + colorArray[1] * 256 + colorArray[2];

      // hexagon.e_data.pos.tint_color = fillColor;

  if(Math.abs($j) %2 == 1){
    if($i > 0){
      hexagon.container.x = $i * (App.halfHexagonWidth * 2) - App.halfHexagonWidth;
    }else{
      hexagon.container.x = $i * (App.halfHexagonWidth * 2) + App.halfHexagonWidth;
    }
  }else{
    hexagon.container.x = $i * (App.halfHexagonWidth*2);
  }
  

  // hexagon.container.interactive = true;
  // hexagon.container.buttonMode = true;

  scene4hexagonContainer.addChild(hexagon.container);
  scene4hexasArray.push(hexagon);

}







////////////////////////////////////////////////////////////////////////////////////////




animate();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);

    App.ct += 2;


    hexagon_1_1.update();

    hexagon_2_1.update();
    hexagon_2_2.update();
    hexagon_2_3.update();;

    hexagon_3_1.update();


    var scene4hexasArrayCount = scene4hexasArray.length;
    for(i = 0; i< scene4hexasArrayCount; i++){
      scene4hexasArray[i].update();
    }

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