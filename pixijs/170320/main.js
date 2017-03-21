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

function deviceHandler(){
    if(device == "pc"){
      stage.scale.x = 1;
      stage.scale.y = 1;
    }else{
      stage.scale.x = 2;
      stage.scale.y = 2;  
    }
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
  // bigCircleRadius = STAGE_WIDTH > STAGE_HEIGHT ? STAGE_WIDTH : STAGE_HEIGHT;
  bigCircleRadius = STAGE_WIDTH > STAGE_HEIGHT ? STAGE_HEIGHT : STAGE_WIDTH;
  bigCircleRadius *= .5;

  bigCircleRadius -= 60; //-20

  //
  updateSetting();
  rebuildObjs();

};

////////////////////////////////////////////////////////////////////////////////////////

var STAGE_WIDTH = 800;
var STAGE_HEIGHT = 600;


// var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xEEEEEE});
// var renderer = PIXI.autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT,{backgroundColor : 0x181310, antialias: true, preserveDrawingBuffer:true});
var renderer = PIXI.autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT,{backgroundColor : 0x241f1c, antialias: true, preserveDrawingBuffer:true});

// var renderer = PIXI.autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT,{backgroundColor : 0x302722, antialias: true, preserveDrawingBuffer:true });
    renderer.view.id = "PixiJS-Spirograph";

// var renderer = PIXI.autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT,{backgroundColor : 0xcccccc, antialias: true});

var stage = new PIXI.Container();
    stage.position.x = STAGE_WIDTH * .5;
    stage.position.y = STAGE_HEIGHT * .5;

var bigCircle = new PIXI.Graphics();
var bigCircleRadius = 250;

    bigCircle.beginFill(0xffffff);
    bigCircle.drawCircle(0, 0, bigCircleRadius);
    bigCircle.endFill();

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

var runCircle = new PIXI.Graphics();
var runCircleRadius = 70;
    runCircle.beginFill(0xff0000, .3);
    runCircle.drawCircle(0, 0, runCircleRadius);
    runCircle.endFill();

var dotCircle = new PIXI.Graphics();
var dotCircleRadius = 5;
    dotCircle.beginFill(0x000000);
    dotCircle.drawCircle(0, 0, dotCircleRadius);
    dotCircle.endFill();

var dotCircleTrack = new PIXI.Graphics();
    dotCircleTrack.beginFill(0xffffff, .5);
    dotCircleTrack.drawCircle(0, 0, dotCircleRadius + 4);
    dotCircleTrack.endFill();

var lineGraphics = new PIXI.Graphics();


var runRadius = bigCircleRadius - runCircleRadius;
var dotRunRadius1 = 50;

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

var runCircle2 = new PIXI.Graphics();
var runCircleRadius2 = 70;
    runCircle2.beginFill(0xff0000, .3);
    runCircle2.drawCircle(0, 0, runCircleRadius2);
    runCircle2.endFill();

var dotCircle2 = new PIXI.Graphics();
var dotCircleRadius2 = 3;
    dotCircle2.beginFill(0x000000);
    dotCircle2.drawCircle(0, 0, dotCircleRadius2);
    dotCircle2.endFill();

var dotCircleTrack2 = new PIXI.Graphics();
    dotCircleTrack2.beginFill(0xffffff, .5);
    dotCircleTrack2.drawCircle(0, 0, dotCircleRadius2 + 4);
    dotCircleTrack2.endFill();

var lineGraphics2 = new PIXI.Graphics();


var runRadius2 = bigCircleRadius - runCircleRadius2;
var dotRunRadius2 = 50;



///////////////////// FOR GUI /////////////////////

var runCirclePercent_bigCircle = 0.13; // 0.15
var runCirclePercent2_bigCircle = 0.61; // 0.3
var dotPercent_runCircle = .59; // .12
var dotPercent2_runCircle2 = .3; // .25
var gear1visible = true;
var gear2visible = true;
var gear1colorMode = true;
var gear2colorMode = true;

///////////////////// FOR GUI /////////////////////



var tk = 0;
var tk2 = 0;
var speed = 1;

stage.addChild(bigCircle);

stage.addChild(runCircle);
stage.addChild(lineGraphics);
runCircle.addChild(dotCircle);
stage.addChild(dotCircleTrack);

stage.addChild(runCircle2);
stage.addChild(lineGraphics2);
runCircle2.addChild(dotCircle2);
stage.addChild(dotCircleTrack2);









//////////////////////////////////////
var gui = new dat.GUI();

var effectController = {
    Gear1_Radius: runCirclePercent_bigCircle,
    Gear1_Dot_Position: dotPercent_runCircle,
    Gear1_Visible: gear1visible,
    Gear1_Color: gear1colorMode,
    Gear2_Radius: runCirclePercent2_bigCircle,
    Gear2_Dot_Position: dotPercent2_runCircle2,
    Gear2_Visible: gear2visible,
    Gear2_Color: gear2colorMode,
    Speed: speed,
    Exporting : exportPic
};

function exportPic(){
  // window.open(document.getElementById("PixiJS-Spirograph").toDataURL());

  var downloadBtn = document.getElementById("download-btn");
      downloadBtn.href = document.getElementById("PixiJS-Spirograph").toDataURL();
      downloadBtn.download = "PixiJS-Spirograph";
      downloadBtn.click();
}


/* http://workshop.chromeexperiments.com/examples/gui/ */
gui.add( effectController, "Gear1_Radius", 0.05, 1.3, .01 ).onChange( guiHandler );
gui.add( effectController, "Gear1_Dot_Position", 0.05, 1.3, .01 ).onChange( guiHandler );
gui.add( effectController, "Gear1_Visible" ).onChange( gearsVisibleHandler );
gui.add( effectController, "Gear1_Color" ).onChange( guiHandler );
gui.add( effectController, "Gear2_Radius", 0.05, 1.3, .01 ).onChange( guiHandler );
gui.add( effectController, "Gear2_Dot_Position", 0.01, 1.3, .01 ).onChange( guiHandler );
gui.add( effectController, "Gear2_Visible" ).onChange( gearsVisibleHandler );
gui.add( effectController, "Gear2_Color" ).onChange( guiHandler );
gui.add( effectController, "Speed", 0.5, 4, .5 ).onChange( speedChanger );
gui.add( effectController, "Exporting", 0, 100, .1 ).onChange( guiHandler );


function gearsVisibleHandler(){
  gear1visible = effectController.Gear1_Visible;
  gear2visible = effectController.Gear2_Visible;
  //
  runCircle.alpha = gear1visible;
  dotCircleTrack.alpha = gear1visible;
  runCircle2.alpha = gear2visible;
  dotCircleTrack2.alpha = gear2visible;
}

function speedChanger(){
  speed = effectController.Speed;
}

function guiHandler(){

  runCirclePercent_bigCircle = effectController.Gear1_Radius;
  runCirclePercent2_bigCircle = effectController.Gear2_Radius;

  dotPercent_runCircle = effectController.Gear1_Dot_Position;
  dotPercent2_runCircle2 = effectController.Gear2_Dot_Position;

  gear1colorMode = effectController.Gear1_Color;
  gear2colorMode = effectController.Gear2_Color;




  updateSetting();
  rebuildObjs();
  // console.log(effectController);
};

function updateSetting(){
  ///////////////////////////////////////////////////////////////////
  runCircleRadius = bigCircleRadius * runCirclePercent_bigCircle;

  ///////////////////////////////////////////////////////////////////
  runCircleRadius2 = bigCircleRadius * runCirclePercent2_bigCircle;

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  runRadius = bigCircleRadius - runCircleRadius;
  dotRunRadius1 = runCircleRadius * dotPercent_runCircle;

  runRadius2 = bigCircleRadius - runCircleRadius2;
  dotRunRadius2 = runCircleRadius2 * dotPercent2_runCircle2;

}

function rebuildObjs(){

    // console.log("rebuildObjs");

    bigCircle.clear();
    bigCircle.beginFill(0xffffff, .1);
    bigCircle.drawCircle(0, 0, bigCircleRadius);
    bigCircle.endFill();

    runCircle.clear()
    runCircle.beginFill(0x000000, .15);
    runCircle.drawCircle(0, 0, runCircleRadius);
    runCircle.endFill();
    
    runCircle2.clear()
    runCircle2.beginFill(0x000000, .1);
    runCircle2.drawCircle(0, 0, runCircleRadius2);
    runCircle2.endFill();

    tk = 0;
    lineGraphics.clear();
    tk2 = 0;
    lineGraphics2.clear();
}


onresize();
updateSetting();
animate();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
    //
    if(tk == 0){


        lineGraphics.lineStyle(10, 0x000000, 0);
        lineGraphics.moveTo(
                                    // 中球位置 //
                                    runCircle.x + 
                                    // 小球位置 //
                                    Math.cos(tk  * ( bigCircleRadius / dotRunRadius1 ) * -1 / (180 / Math.PI) * ( dotRunRadius1 / runCircleRadius) ) * tmpX -
                                    Math.sin(tk  * ( bigCircleRadius / dotRunRadius1 ) * -1 / (180 / Math.PI) * ( dotRunRadius1 / runCircleRadius) ) * tmpY
                                    , 

                                    // 中球位置 //
                                    runCircle.y + 
                                    // 小球位置 //
                                    Math.sin(tk  * ( bigCircleRadius / dotRunRadius1 ) * -1 / (180 / Math.PI) * ( dotRunRadius1 / runCircleRadius) ) * tmpX +
                                    Math.cos(tk  * ( bigCircleRadius / dotRunRadius1 ) * -1 / (180 / Math.PI) * ( dotRunRadius1 / runCircleRadius) ) * tmpY

                                );



        lineGraphics2.lineStyle(10, 0x000000, 0);
        lineGraphics2.moveTo(
                                    // 中球位置 //
                                    runCircle2.x + 
                                    // 小球位置 //
                                    Math.cos(tk2  * ( bigCircleRadius / dotRunRadius2 ) * -1 / (180 / Math.PI) * ( dotRunRadius2 / runCircleRadius2) ) * tmpX2 -
                                    Math.sin(tk2  * ( bigCircleRadius / dotRunRadius2 ) * -1 / (180 / Math.PI) * ( dotRunRadius2 / runCircleRadius2) ) * tmpY2
                                    , 

                                    // 中球位置 //
                                    runCircle2.y + 
                                    // 小球位置 //
                                    Math.sin(tk2  * ( bigCircleRadius / dotRunRadius2 ) * -1 / (180 / Math.PI) * ( dotRunRadius2 / runCircleRadius2) ) * tmpX2 +
                                    Math.cos(tk2  * ( bigCircleRadius / dotRunRadius2 ) * -1 / (180 / Math.PI) * ( dotRunRadius2 / runCircleRadius2) ) * tmpY2

                                );



    }
    //
    tk += speed; //1
    if(tk >= 6000) {
      tk = 0;
      lineGraphics.clear();
    };
    // if(tk == 360) { tk = 0; };
    tk2 += speed; //1
    if(tk2 >= 6000) {
      tk2 = 0;
      lineGraphics2.clear();
    };
    // if(tk2 == 360) { tk2 = 0; };


    var lineColorArray;
    var lineColor, lineAlpha, lineWidth;


    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    runCircle.x = Math.cos( tk / (180 / Math.PI)) * runRadius;
    runCircle.y = Math.sin( tk / (180 / Math.PI)) * runRadius;


    dotCircle.x = Math.cos( tk / (180 / Math.PI)) * dotRunRadius1;
    dotCircle.y = Math.sin( tk / (180 / Math.PI)) * dotRunRadius1;


    runCircle.rotation = tk  * ( bigCircleRadius / runCircleRadius ) * -1 / (180 / Math.PI);
    
    var tmpX = dotCircle.x;
    var tmpY = dotCircle.y;



    dotCircleTrack.x = runCircle.x + 
                   Math.cos(tk  * ( bigCircleRadius / dotRunRadius1 ) * -1 / (180 / Math.PI) * ( dotRunRadius1 / runCircleRadius) ) * tmpX -
                   Math.sin(tk  * ( bigCircleRadius / dotRunRadius1 ) * -1 / (180 / Math.PI) * ( dotRunRadius1 / runCircleRadius) ) * tmpY;

    dotCircleTrack.y = runCircle.y + 
                   Math.sin(tk  * ( bigCircleRadius / dotRunRadius1 ) * -1 / (180 / Math.PI) * ( dotRunRadius1 / runCircleRadius) ) * tmpX +
                   Math.cos(tk  * ( bigCircleRadius / dotRunRadius1 ) * -1 / (180 / Math.PI) * ( dotRunRadius1 / runCircleRadius) ) * tmpY;


    if(gear1colorMode){
        lineColorArray = hsvToRGB2(tk2, .7, 1);
        lineColor = lineColorArray[0] * 256 * 256 + lineColorArray[1] * 256 + lineColorArray[2];
    }else{
        lineColor = 0xffffff;
    }
    if(tk <= 1){
      lineAlpha = 0;
    } else{
      if(gear1colorMode){
        // lineAlpha = .5;
        lineAlpha = .8;
      }else{
        // lineAlpha = .25;
        lineAlpha = .6;
      }
    }
    if(device == "pc"){
      // lineWidth = 5 + Math.floor(bigCircleRadius * 0.005);
      lineWidth = 4;
    }else{
      lineWidth = 8;
    }


    // lineGraphics.lineStyle(5, lineColor, .9);
    // lineGraphics.lineStyle(5, lineColor, .5);
    // lineGraphics.lineStyle(5, lineColor, lineAlpha);
    lineGraphics.lineStyle(lineWidth, lineColor, lineAlpha);
    lineGraphics.lineTo(
                                // 中球位置 //
                                runCircle.x + 
                                // 小球位置 //
                                Math.cos(tk  * ( bigCircleRadius / dotRunRadius1 ) * -1 / (180 / Math.PI) * ( dotRunRadius1 / runCircleRadius) ) * tmpX -
                                Math.sin(tk  * ( bigCircleRadius / dotRunRadius1 ) * -1 / (180 / Math.PI) * ( dotRunRadius1 / runCircleRadius) ) * tmpY
                                , 

                                // 中球位置 //
                                runCircle.y + 
                                // 小球位置 //
                                Math.sin(tk  * ( bigCircleRadius / dotRunRadius1 ) * -1 / (180 / Math.PI) * ( dotRunRadius1 / runCircleRadius) ) * tmpX +
                                Math.cos(tk  * ( bigCircleRadius / dotRunRadius1 ) * -1 / (180 / Math.PI) * ( dotRunRadius1 / runCircleRadius) ) * tmpY

                            );









    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    runCircle2.x = Math.cos( tk2 / (180 / Math.PI)) * runRadius2;
    runCircle2.y = Math.sin( tk2 / (180 / Math.PI)) * runRadius2;


    dotCircle2.x = Math.cos( tk2 / (180 / Math.PI)) * dotRunRadius2;
    dotCircle2.y = Math.sin( tk2 / (180 / Math.PI)) * dotRunRadius2;


    runCircle2.rotation = tk2  * ( bigCircleRadius / runCircleRadius2 ) * -1 / (180 / Math.PI);
    
    var tmpX2 = dotCircle2.x;
    var tmpY2 = dotCircle2.y;



    dotCircleTrack2.x = runCircle2.x + 
                   Math.cos(tk2  * ( bigCircleRadius / dotRunRadius2 ) * -1 / (180 / Math.PI) * ( dotRunRadius2 / runCircleRadius2) ) * tmpX2 -
                   Math.sin(tk2  * ( bigCircleRadius / dotRunRadius2 ) * -1 / (180 / Math.PI) * ( dotRunRadius2 / runCircleRadius2) ) * tmpY2;

    dotCircleTrack2.y = runCircle2.y + 
                   Math.sin(tk2  * ( bigCircleRadius / dotRunRadius2 ) * -1 / (180 / Math.PI) * ( dotRunRadius2 / runCircleRadius2) ) * tmpX2 +
                   Math.cos(tk2  * ( bigCircleRadius / dotRunRadius2 ) * -1 / (180 / Math.PI) * ( dotRunRadius2 / runCircleRadius2) ) * tmpY2;


    if(gear2colorMode){
        lineColorArray = hsvToRGB2(tk2, .7, 1);
        lineColor = lineColorArray[0] * 256 * 256 + lineColorArray[1] * 256 + lineColorArray[2];
    }else{
        lineColor = 0xffffff;
    }
    if(tk2 <= 1){
      lineAlpha = 0;
    } else{
      if(gear1colorMode){
        // lineAlpha = .6;
        lineAlpha = .9;
      }else{
        // lineAlpha = .3;
        lineAlpha = .7;
      }
    }
    if(device == "pc"){
      // lineWidth = 2 + Math.floor(bigCircleRadius * 0.005);
      lineWidth = 2;
    }else{
      lineWidth = 4;
    }

    // lineGraphics2.lineStyle(5, lineColor, .9);
    // lineGraphics2.lineStyle(2, lineColor, .6);
    // lineGraphics2.lineStyle(2, lineColor, lineAlpha);
    lineGraphics2.lineStyle(lineWidth, lineColor, lineAlpha);
    lineGraphics2.lineTo(
                                // 中球位置 //
                                runCircle2.x + 
                                // 小球位置 //

                                Math.cos(tk2  * ( bigCircleRadius / dotRunRadius2 ) * -1 / (180 / Math.PI) * ( dotRunRadius2 / runCircleRadius2) ) * tmpX2 -
                                Math.sin(tk2  * ( bigCircleRadius / dotRunRadius2 ) * -1 / (180 / Math.PI) * ( dotRunRadius2 / runCircleRadius2) ) * tmpY2
                                , 

                                // 中球位置 //
                                runCircle2.y + 
                                // 小球位置 //
                                Math.sin(tk2  * ( bigCircleRadius / dotRunRadius2 ) * -1 / (180 / Math.PI) * ( dotRunRadius2 / runCircleRadius2) ) * tmpX2 +
                                Math.cos(tk2  * ( bigCircleRadius / dotRunRadius2 ) * -1 / (180 / Math.PI) * ( dotRunRadius2 / runCircleRadius2) ) * tmpY2

                            );









    // console.log(tk);


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