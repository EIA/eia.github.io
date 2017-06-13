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

  // stage.position.x = renderer.width * .5;
  // stage.position.y = renderer.height * .5;

  


};


var App = {
  STAGE_WIDTH: 1200,
  STAGE_HEIGHT: 1000
}

var hitCounts = 0;

var countsTxt = document.getElementById("counts");
var barP = document.getElementById("barP");
var content = document.getElementById("content");

if(device =="mobile"){
    content.classList.add('mobile');
}


////////////////////////////////////////////////////////////////////////////////////////


var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xEEEEEE, antialias: true});

var stage = new PIXI.Container();
var dotsContainer = new PIXI.Container();
    stage.addChild(dotsContainer);

var dots = [];
var dotCount = 0;
var totalCounts = 60; //800 x 600

/*var lineContainer = new PIXI.Container();
    stage.addChild(lineContainer);*/

var lineContainer = new PIXI.Graphics();
    stage.addChild(lineContainer);




onresize();

if(device =="pc"){
    totalCounts = renderer.width * renderer.height / 8000;
}else{
    totalCounts = renderer.width * renderer.height / 24000;
}


function buildDot(){

    // var randomRad = (Math.random()*3+1); //1~4
    var randomRad = (Math.random()*7+1); //1~8
    if(device=="mobile"){
        randomRad = Math.floor(randomRad*2.5);
    }

    var dot = new PIXI.Graphics();
        // dot.beginFill(0x000000, 0.3);
        // dot.beginFill(0xffffff, ((5 - randomRad) / 4) * 0.3);
        dot.beginFill(0xffffff, 0.5);
        dot.drawCircle(0, 0, randomRad);
        dot.endFill();

    // v1 //
    // dot.tint = Math.floor(Math.random()*0xffffff);

    // v2 //
    var tgr = Math.floor(Math.random()*128) + 128;
    dot.tint = tgr*256*256 +tgr * 256 + tgr;

    // v3 //
    // var colorArray = hsvToRGB2(Math.random()*360, .5, 1);
    // var fillColor = colorArray[0] * 256 * 256 + colorArray[1] * 256 + colorArray[2];
    // dot.tint = fillColor;



        dot.e_data = {
                            // sX: Math.ceil(Math.random()*5), //1~6
                            // sY: Math.ceil(Math.random()*5) //1~6
                            // sX: Math.ceil(Math.random()*3) * (Math.random()>0.5? -1: 1),
                            // sY: Math.ceil(Math.random()*3) * (Math.random()>0.5? -1: 1),
                            
                            // sX: Math.random()*2 * (Math.random()>0.5? -1: 1),
                            // sY: Math.random()*2 * (Math.random()>0.5? -1: 1),

                            sX: Math.random() * randomRad * 0.4 * (Math.random()>0.5? -1: 1),
                            sY: Math.random() * randomRad * 0.4 * (Math.random()>0.5? -1: 1),
                            radius: randomRad
                        };

    if(device=="mobile"){
        dot.e_data.sX *= 0.6;
        dot.e_data.sY *= 0.6;
    }

    dotsContainer.addChild(dot);

    // dot.position.x = renderer.width * .5;
    // dot.position.y = renderer.height * .5;

    dot.position.x = Math.floor(Math.random()*renderer.width);
    dot.position.y = Math.floor(Math.random()*renderer.height);

    dots.push(dot);
    dotCount = dots.length;

}

for(var i = 0; i < totalCounts; i++ ){
    buildDot();
};


animate();
function animate() {
    requestAnimationFrame(animate);


    // lineContainer.removeChildren();
    lineContainer.clear();

    // console.log('--------------');

    for(var i = 0; i < dotCount; i++ ){

        var tmpDot = dots[i];
        // console.log("i: " + i);




        for(var j = i+1; j < dotCount; j++ ){
            // console.log(" j: " + j);
            var tmpDot2 = dots[j];

            // 碰撞 //

            if(
                /* 兩點距離 */
                Math.sqrt(
                    (tmpDot2.position.x - tmpDot.position.x)*
                    (tmpDot2.position.x - tmpDot.position.x)+
                    (tmpDot2.position.y - tmpDot.position.y)*
                    (tmpDot2.position.y - tmpDot.position.y)
                ) <
                /* 兩點速度 */
                Math.sqrt(
                    (tmpDot2.e_data.sX - tmpDot.e_data.sX)*
                    (tmpDot2.e_data.sX - tmpDot.e_data.sX)+
                    (tmpDot2.e_data.sY - tmpDot.e_data.sY)*
                    (tmpDot2.e_data.sY - tmpDot.e_data.sY)
                ) +
                /* 兩點半徑 */
                (tmpDot.e_data.radius + tmpDot.e_data.radius)

            ){
                // console.log("!");
                /*
                tmpDot.e_data.sX *= -1;
                tmpDot2.e_data.sX *= -1;
                tmpDot.e_data.sY *= -1;
                tmpDot2.e_data.sY *= -1;
                */
               if(tmpDot.e_data.sX < 0 && tmpDot2.e_data.sX < 0){
               }else if(tmpDot.e_data.sX > 0 && tmpDot2.e_data.sX > 0){
               }else{
                    tmpDot.e_data.sX *= -1;
                    tmpDot2.e_data.sX *= -1;
                    var colorArray = [];
                    var fillColor = 0;
                    colorArray = hsvToRGB2(Math.random()*360, .9, 0.8);
                    fillColor = colorArray[0] * 256 * 256 + colorArray[1] * 256 + colorArray[2];
                    tmpDot.tint = fillColor;
                    colorArray = hsvToRGB2(Math.random()*360, .9, 0.8);
                    fillColor = colorArray[0] * 256 * 256 + colorArray[1] * 256 + colorArray[2];
                    tmpDot2.tint = fillColor;

                    tmpDot.e_data.sX =  tmpDot.e_data.sX > 0 ? Math.random() * tmpDot.e_data.radius * 0.4 : Math.random() * tmpDot.e_data.radius * 0.4 * -1;
                    tmpDot2.e_data.sX =  tmpDot2.e_data.sX > 0 ? Math.random() * tmpDot2.e_data.radius * 0.4 : Math.random() * tmpDot2.e_data.radius * 0.4 * -1;
                    if(device=="mobile"){
                        tmpDot.e_data.sX *= 0.6;
                        tmpDot2.e_data.sX *= 0.6;
                    }

                    // tmpDot.e_data.radius = (Math.random()*3+1); //1~4
                    if(device=="mobile"){
                        // tmpDot.e_data.radius = Math.floor(tmpDot.e_data.radius*2.5);
                    }else{
                        tmpDot.e_data.radius = (Math.random()*7+1); //1~8
                    }
                    tmpDot.clear();
                    tmpDot.beginFill(0xffffff, 0.5);
                    tmpDot.drawCircle(0, 0, tmpDot.e_data.radius);
                    tmpDot.endFill();

                    // tmpDot2.e_data.radius = (Math.random()*3+1); //1~4
                    tmpDot2.e_data.radius = (Math.random()*7+1); //1~8
                    tmpDot2.clear();
                    tmpDot2.beginFill(0xffffff, 0.5);
                    tmpDot2.drawCircle(0, 0, tmpDot2.e_data.radius);
                    tmpDot2.endFill();

                    hitCounts ++;
                    updateBar();
               }
               if(tmpDot.e_data.sY < 0 && tmpDot2.e_data.sY < 0){
               }else if(tmpDot.e_data.sY > 0 && tmpDot2.e_data.sY > 0){
               }else{
                    tmpDot.e_data.sY *= -1;
                    tmpDot2.e_data.sY *= -1;
                    var colorArray = [];
                    var fillColor = 0;
                    colorArray = hsvToRGB2(Math.random()*360, .9, 0.8);
                    fillColor = colorArray[0] * 256 * 256 + colorArray[1] * 256 + colorArray[2];
                    tmpDot.tint = fillColor;
                    colorArray = hsvToRGB2(Math.random()*360, .9, 0.8);
                    fillColor = colorArray[0] * 256 * 256 + colorArray[1] * 256 + colorArray[2];
                    tmpDot2.tint = fillColor;

                    tmpDot.e_data.sY =  tmpDot.e_data.sY > 0 ? Math.random() * tmpDot.e_data.radius * 0.4 : Math.random() * tmpDot.e_data.radius * 0.4 * -1;
                    tmpDot2.e_data.sY =  tmpDot2.e_data.sY > 0 ? Math.random() * tmpDot2.e_data.radius * 0.4 : Math.random() * tmpDot2.e_data.radius * 0.4 * -1;
                    if(device=="mobile"){
                        tmpDot.e_data.sY *= 0.6;
                        tmpDot2.e_data.sY *= 0.6;
                    }

                    // tmpDot.e_data.radius = (Math.random()*3+1); //1~4                    
                    if(device=="mobile"){
                        // tmpDot.e_data.radius = Math.floor(tmpDot.e_data.radius*2.5);
                    }else{
                        tmpDot.e_data.radius = (Math.random()*7+1); //1~8
                    }
                    tmpDot.clear();
                    tmpDot.beginFill(0xffffff, 0.5);
                    tmpDot.drawCircle(0, 0, tmpDot.e_data.radius);
                    tmpDot.endFill();

                    // tmpDot2.e_data.radius = (Math.random()*3+1); //1~4
                    tmpDot2.e_data.radius = (Math.random()*7+1); //1~8
                    tmpDot2.clear();
                    tmpDot2.beginFill(0xffffff, 0.5);
                    tmpDot2.drawCircle(0, 0, tmpDot2.e_data.radius);
                    tmpDot2.endFill();

                    hitCounts ++;
                    updateBar();
               }


            }

        }
        // 碰撞 //










        if(tmpDot.position.x + tmpDot.e_data.sX > renderer.width + tmpDot.e_data.sX ){
            // v1 //
            tmpDot.e_data.sX = tmpDot.e_data.sX*-1;
            // v2 //
            // tmpDot.position.x = 0 - tmpDot.e_data.sX;
        }else if(tmpDot.position.x + tmpDot.e_data.sX < 0 - tmpDot.e_data.sX){
            // v1 //
            tmpDot.e_data.sX = tmpDot.e_data.sX*-1;
            // v2 //
            // tmpDot.position.x = renderer.width + tmpDot.e_data.sX;
        }

        if(tmpDot.position.y + tmpDot.e_data.sY > renderer.height){
            // v1 //
            tmpDot.e_data.sY = tmpDot.e_data.sY*-1;
            // v2 //
            // tmpDot.position.y = 0 - tmpDot.e_data.sY;
        }else if(tmpDot.position.y + tmpDot.e_data.sY < 0 - tmpDot.e_data.sY){
            // v1 //
            tmpDot.e_data.sY = tmpDot.e_data.sY*-1;
            // v2 //
            // tmpDot.position.y = renderer.height + tmpDot.e_data.sY;
        }


        tmpDot.position.x += tmpDot.e_data.sX;
        tmpDot.position.y += tmpDot.e_data.sY;



        var tmpCount = dotCount - i - 1;
        for(var j = i+1; j < dotCount; j++ ){
            // console.log(" j: " + j);
            var tmpDot2 = dots[j];
            var dis =   Math.sqrt(
                            (tmpDot2.position.x - tmpDot.position.x)*
                            (tmpDot2.position.x - tmpDot.position.x)+
                            (tmpDot2.position.y - tmpDot.position.y)*
                            (tmpDot2.position.y - tmpDot.position.y)
                        );
            /////////////////////////////////////////
            if(
                /* 兩點距離 */
                dis <
                /* 兩點速度 */
                100
            ){

                /*
                var line = new PIXI.Graphics();
                // line.lineStyle(0.5, 0x000000, 1);
                line.lineStyle(1, 0x000000, (100 - dis) / 100);
                // console.log(dis);
                line.moveTo(tmpDot.position.x, tmpDot.position.y);
                line.lineTo(tmpDot2.position.x, tmpDot2.position.y);
                lineContainer.addChild(line);
                */
                if(device == "pc"){
                    lineContainer.lineStyle(1, 0x000000, (100 - dis) * .01 * 0.5);
                }else{
                    lineContainer.lineStyle(4, 0x000000, (100 - dis) * .01 * 0.5);
                }
                
                lineContainer.moveTo(tmpDot.position.x, tmpDot.position.y);
                lineContainer.lineTo(tmpDot2.position.x, tmpDot2.position.y);


            }
            
        }











    }

    renderer.render(stage);

}





function updateBar(){

    var pt = Math.floor(hitCounts*.05);
    
    // console.log(pt);

    if(pt <10){
        countsTxt.innerText = String("0"+pt);
        barP.style.width = String(pt+'%');
    }else if(pt <100){
        countsTxt.innerText = String(pt);
        barP.style.width = String(pt+'%');
    }else{
        hitCounts = 0;
    }
};







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