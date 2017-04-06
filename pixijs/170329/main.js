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

  STAGE_WIDTH = w;
  STAGE_HEIGHT = h;

  stage.position.x = renderer.width * .5;
  stage.position.y = renderer.height * .5;

  //

  disableHit.clear();
  disableHit.beginFill(0x000000, .1);
  disableHit.drawRect(STAGE_WIDTH * -.5 ,STAGE_HEIGHT*-.5, STAGE_WIDTH, STAGE_HEIGHT);
  disableHit.endFill();

  // console.log("width: "+renderer.width + " height: "+renderer.height);
  console.log("width: "+renderer.width+ " height: "+renderer.height);




};

////////////////////////////////////////////////////////////////////////////////////////
var cleanChildren = [];
var moveChildren = [];








////////////////////////////////////////////////////////////////////////////////////////


var STAGE_WIDTH = 1200;
var STAGE_HEIGHT = 600;

var bound_width = 800; //800
var bound_height = 500; //500


// var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xEEEEEE});
var renderer = PIXI.autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT,{backgroundColor : 0xEEEEEE, antialias: true});
// var renderer = PIXI.autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT,{backgroundColor : 0x241f1c, antialias: true});

var stage = new PIXI.Container();
	  stage.position.x = STAGE_WIDTH * .5;
	  stage.position.y = STAGE_HEIGHT * .5;


var radius = (device == "pc" ? 50 : 100);
var halfHexagonWidth = Math.sin(60 * (Math.PI / 180)) * radius;

// var halfHexagonWidth = (device == "pc" ? 50 : 100);
// var radius = halfHexagonWidth / Math.sin(60 * (Math.PI / 180));


var triangleContainer = new PIXI.Container();
    triangleContainer.position.y = STAGE_HEIGHT * -.5;

// stage.addChild(triangleContainer);

var hexagonCountW, hexagonCountH;

var hexagonContainer = new PIXI.Container();
stage.addChild(hexagonContainer);

var disableHit = new PIXI.Graphics();
    disableHit.beginFill(0x000000, .1);
    disableHit.drawRect(STAGE_WIDTH * -.5 ,STAGE_HEIGHT*-.5, STAGE_WIDTH, STAGE_HEIGHT);
    disableHit.endFill();
    disableHit.alpha = 0;
    // disableHit.interactive = true;

stage.addChild(disableHit);


var cloneTexture;
var hsvBase;


// var tl = new TimelineMax({onUpdate:updateStats, onComplete:nextTween});
var game_tl = new TimelineMax({onStart: game_tl_start, onComplete:game_tl_complete});



buildBaseHexagon();

function buildBaseHexagon(){
  var baseChildCount = triangleContainer.children.length;
  for(i = 0; i< baseChildCount; i++){
    triangleContainer.removeChildAt(0);
  }
  
  hsvBase = Math.floor(Math.random()*360);
  for(var i=0; i<6;i++){
    var triangle = new PIXI.Graphics();

    var colorArray = hsvToRGB2(hsvBase + i*40, .5, 1);
    var fillColor = colorArray[0] * 256 * 256 + colorArray[1] * 256 + colorArray[2];

    switch(i){
      case 5: fillColor = 0xe3e3e3; break;
      case 4: fillColor = 0xe3e3e3; break;
      case 3: fillColor = 0xbebebe; break;
      case 2: fillColor = 0xbebebe; break;
      case 1: fillColor = 0x9e9e9e; break;
      case 0: fillColor = 0x9e9e9e; break;

    }

      // triangle.beginFill(0xff9900, .3);
      // 
      triangle.lineStyle(1, 0x777777, .05);
      triangle.beginFill(fillColor, 1);


      triangle.moveTo(0, 0);

      triangle.lineTo(Math.cos(60 * (i-0.5) * (Math.PI / 180)) * radius, Math.sin(60 * (i-0.5) * (Math.PI / 180)) * radius);
      triangle.lineTo(Math.cos(60 * (i+0.5) * (Math.PI / 180)) * radius, Math.sin(60 * (i+0.5) * (Math.PI / 180)) * radius);

      triangle.lineTo(0, 0);

      triangle.endFill()

      triangle.beginFill(0x555555, .3);
      triangle.drawCircle(0, 0, 2);
      triangle.drawCircle(Math.cos(60 * (i-0.5) * (Math.PI / 180)) * radius, Math.sin(60 * (i-0.5) * (Math.PI / 180)) * radius, 2);
      triangle.drawCircle(Math.cos(60 * (i+0.5) * (Math.PI / 180)) * radius, Math.sin(60 * (i+0.5) * (Math.PI / 180)) * radius, 2);
      triangle.endFill()

      triangleContainer.addChild(triangle);

      cloneTexture = renderer.generateTexture(triangleContainer);
      // cloneSprite.setTexture(cloneTexture);
      // cloneSprite2.setTexture(cloneTexture);
      // cloneSprite3.setTexture(cloneTexture);
  }
}

/*
var dot = new PIXI.Graphics();
	dot.beginFill(0x000000);
	dot.drawCircle(0,0, 2);
	dot.endFill();

stage.addChild(dot);
*/

var bound = new PIXI.Graphics();
    bound.lineStyle(1, 0x000000);
    bound.drawRect(-250, -250, 500, 500);


stage.addChild(bound);




//////////////////////////////////////
var gui = new dat.GUI();

var effectController = {
    Bound_Width: bound_width,
    Bound_Height: bound_height,
};


gui.add( effectController, "Bound_Width", 10, 1500, 10 ).onChange( guiHandler );
gui.add( effectController, "Bound_Height", 10, 1200, 10 ).onChange( guiHandler );




function guiHandler(){

  bound_width = effectController.Bound_Width;
  bound_height = effectController.Bound_Height;

  bound.clear();
  bound.lineStyle(1, 0x000000, .3);
  bound.drawRect(bound_width * -.5 , bound_height * -.5 , bound_width, bound_height);



  console.log("bound_width: "+ bound_width + " bound_height: " + bound_height);

  hexagonCountW = Math.ceil((bound_width) / (halfHexagonWidth * 2)) +1;
  hexagonCountH = Math.ceil((bound_height - radius) / (radius * 3)) * 2  + 1;


  console.log("hexagonCountW: "+hexagonCountW+" hexagonCountH: "+hexagonCountH);




  buildBaseHexagon();
  rebuildObjs();
  objsIntro();






};

guiHandler();




function rebuildObjs(){
  var hexagonContainerChildCount = hexagonContainer.children.length;
  for(i = 0; i< hexagonContainerChildCount; i++){
    hexagonContainer.removeChildAt(0);
  }

  var wMin;
  var wMax;
  // console.log("wMin: " + wMin + " wMax: " + wMax);

  var hMin, hMax;
  var ot;


  hMin = (hexagonCountH-1) * -.5;
  hMax = hMin + hexagonCountH;
  for(j = hMin; j< hMax; j++){
    console.log("j: "+ j);

    if(j%2 == 0){ // -2, 0, 2
      if(hexagonCountW %2 == 0){
        console.log(" h1 " + (hexagonCountW-1));
        wMin = (hexagonCountW-1 -1 ) * -.5;
        wMax = wMin + hexagonCountW -1;
        ot = "[";
        for(i = wMin; i < wMax; i++){
          // console.log(" \t\t" + i);
          ot += i+", ";
          buildDot(i, j);
        }
        ot += "]";
        // console.log("\t\t "+ ot);
      }else{
        console.log(" h2 " + (hexagonCountW-0));
        wMin = (hexagonCountW-1) * -.5;
        wMax = wMin + hexagonCountW;
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
      if(hexagonCountW %2 == 0){
        console.log(" h3 " + (hexagonCountW-0));
        wMin = (hexagonCountW ) * -.5;
        wMax = wMin + hexagonCountW +1;
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
        console.log(" h4 " + (hexagonCountW-1));
        wMin = (hexagonCountW-1) * -.5;
        wMax = wMin + hexagonCountW;
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

function objsIntro(){

  var hexagonContainerChildCount = hexagonContainer.children.length;
  var target;
  for(i = 0; i< hexagonContainerChildCount; i++){
    target = hexagonContainer.getChildAt(i);

    TweenMax.from(target, 0.9, {
                                  delay: Math.abs(target.e_data.pos.cor_x)*0.1+ Math.abs(target.e_data.pos.cor_y)*0.1,
                                  alpha:0, ease:Strong.easeOut,
                                  onStart:function(){
        /*if(Math.random()>0.75){
          this.target.e_data.colorMode = 1;
        }*/
      }, onUpdate:function(){
        /*if(this.target.e_data.colorMode == 1){
          // console.log(this.progress());
          var colorArray = hsvToRGB2(Math.floor(Math.random()*360)+this.progress() * 360, .5, 1);
          var fillColor = colorArray[0] * 256 * 256 + colorArray[1] * 256 + colorArray[2];
          this.target.tint = fillColor;
        }*/
      }
    });
    /*
    if(Math.random()>0.75){
      TweenMax.from(target, 0.9, {tint: Math.floor(Math.random()*0xffffff), ease:Strong.easeOut});
    }
    */
  }

}


function buildDot($i, $j){
  // console.log("buildDot: "+$i+" "+ $j);
  
  

  var cloneSprite = new PIXI.Sprite();
     cloneSprite.anchor.set(0.5);
     cloneSprite.setTexture(cloneTexture);
     cloneSprite.y = $j * (1.5 * radius);
     cloneSprite.scale.x = 1;
     cloneSprite.scale.y = 1;
     cloneSprite.alpha = 1;
     cloneSprite.e_data = { rot: Math.floor(Math.random()*6), pos: {}, tint_color: 0 };
     cloneSprite.e_data.pos.cor_x = $i;
     cloneSprite.e_data.pos.cor_y = $j;
     
     cloneSprite.e_data.colorMode = 0;
     cloneSprite.rotation = cloneSprite.e_data.rot * 60 * (Math.PI / 180);
  
  var colorArray = hsvToRGB2(cloneSprite.rotation, .5, 1);
  var fillColor = colorArray[0] * 256 * 256 + colorArray[1] * 256 + colorArray[2];

      cloneSprite.e_data.pos.tint_color = fillColor;

  if(Math.abs($j) %2 == 1){
    if($i > 0){
      cloneSprite.x = $i * (halfHexagonWidth * 2) - halfHexagonWidth;
    }else{
      cloneSprite.x = $i * (halfHexagonWidth * 2) + halfHexagonWidth;
    }
  }else{
    cloneSprite.x = $i * (halfHexagonWidth*2);
  }
  

  cloneSprite.interactive = true;
  cloneSprite.buttonMode = true;

  // cloneSprite.on('click', onClick);
  cloneSprite.on('pointertap', onClick);
  // cloneSprite.on('tap', onClick);

  cloneSprite.on('pointerdown', onOver);
  cloneSprite.on('pointerup', onOut).on('pointerupoutside', onOut);
  cloneSprite.on('pointercancel', function(){document.getElementById("ot").value += "\n"+"pointercancel";});

  hexagonContainer.addChild(cloneSprite);

  return cloneSprite;

}

function onClick(e){

  document.getElementById("ot").value += "\n"+"onClick";
  // console.log(e.target);
  var target = e.target;

  console.log(target.e_data.pos.cor_x+" "+ target.e_data.pos.cor_y);

  TweenMax.to(target.scale, 0.5, { x: .5, y: .5, ease:Strong.easeOut});

  target.e_data.rot ++;

  TweenMax.to(target, 0.5, {
                              // rotation: target.rotation + 60 * (Math.PI / 180),
                              rotation:  target.e_data.rot * 60 * (Math.PI / 180),
                              ease:Strong.easeOut});

  onOut(e);
  gameHandler(e);
}

function onOver(e){
  // document.getElementById("ot").value += "\n"+"onOver";
  // console.log(e.target);
  var target = e.target;
  TweenMax.to(target.scale, 0.5, { x: .8, y: .8, ease:Strong.easeOut});

  // TweenMax.to(target, 0.5, {
                              // rotation: Math.floor(Math.random()*6) * 60 * (Math.PI / 180),
                              // ease:Strong.easeOut});
}
function onOut(e){
  // document.getElementById("ot").value += "\n"+"onOut";
  // console.log(e.currentTarget);
  var target = e.currentTarget;
  TweenMax.to(target.scale, 0.5, { x: 1, y: 1, ease:Back.easeOut});
  // TweenMax.to(target, 0.5, {
                              // rotation: Math.floor(Math.random()*6) * 60 * (Math.PI / 180),
                              // ease:Back.easeOut});
}



function gameHandler(e){
  console.log("--------gameHandler--------");

  var target = e.target;

  
  game_tl.clear();
  gameHandler_step1_removeObj(target);
  gameHandler_step2_anaMoveObj();
}



function gameHandler_step1_removeObj($targetObj){

  var target = $targetObj;

  var hexagonContainerChildCount = hexagonContainer.children.length;

  var compareTarget;

  console.log(target+" "+target.x+" "+target.y);

  // console.log("target.e_data.pos.cor_x: "+target.e_data.pos.cor_x);
  // console.log("target.e_data.pos.cor_y: "+target.e_data.pos.cor_y);


  cleanChildren = [];

  for(i = 0; i< hexagonContainerChildCount; i++){
    compareTarget = hexagonContainer.getChildAt(i);

    var dis = Math.sqrt(Math.pow(compareTarget.x - target.x, 2)+Math.pow(compareTarget.y - target.y, 2));
    // console.log("dis: "+dis);
    // if(dis <= radius *2 && dis !=0){
    if(dis <= radius *2){
      //compareTarget.alpha = 0;
      cleanChildren.push(compareTarget);
    }
  }


  var cleanChildCount = cleanChildren.length;
  var cleanChild;
  for(i = 0; i< cleanChildCount; i++){
    // hexagonContainer.removeChild(cleanChildren[i]);
    // 
    cleanChild = cleanChildren[i];

    /*
    TweenMax.to(cleanChild, 0.3, {delay: i *0.1, alpha:0, ease:Strong.easeOut, tint: 0xff0000, onComplete:function(){
      hexagonContainer.removeChild(this.target);
    }});
    */

    game_tl.to(cleanChild, 0.3, {
                                  delay: i *0.1,
                                  alpha:0,
                                  ease:Strong.easeOut,
                                  // tint: 0xff0000,
                                  tint: cleanChild.e_data.tint_color,
                                  // rotation:  (cleanChild.e_data.rot * 60 + 15) * (Math.PI / 180),
                                  onComplete:function(){
        hexagonContainer.removeChild(this.target);
    }}, "game_tl_cl");

    var newBuildDot = buildDot(cleanChild.e_data.pos.cor_x, cleanChild.e_data.pos.cor_y);
    game_tl.from(newBuildDot, .5, {
                                  delay: i *0.1+.5,
                                  alpha:0,
                                  ease:Strong.easeOut,
                                  // tint: newBuildDot.e_data.tint_color,
                                  tint: 0xff0000,
                                  // rotation:  (cleanChild.e_data.rot * 60 + 15) * (Math.PI / 180),
                                  onComplete:function(){
    }}, "game_tl_rb");

  }

}


function game_tl_start(){
  console.log('game_tl_start');
  // TweenMax.to(disableHit, 0.5, { alpha: 1, ease:Strong.easeOut});
  disableHit.interactive = true;
}


function game_tl_complete(){
  console.log('game_tl_complete');
  // TweenMax.to(disableHit, 0.5, { alpha: 0, ease:Strong.easeOut});
  disableHit.interactive = false;
}


function gameHandler_step2_anaMoveObj(){
  console.log('gameHandler_step2_anaMoveObj');
  var cleanChildCount = cleanChildren.length;
  var removeChildrenData = [];
  var addData;
  for(i = 0; i< cleanChildCount; i++){

    addData = {};

    // 欄
    addData.row = cleanChildren[i].e_data.pos.cor_x;
    
    // 列
    addData.column = cleanChildren[i].e_data.pos.cor_y;

    // addData.count

    removeChildrenData.push(addData);
    
    
  }

  console.log(removeChildrenData);

  // moveChildren

}











onresize();
animate();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
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