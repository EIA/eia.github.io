/*

  main > flower > petal
  set

*/

Flower = function($flowerSetting){

  this.petals = []; // 花瓣數
  if($flowerSetting && $flowerSetting.petalCount){
    this.petalCount = $flowerSetting.petalCount;
  }else{
    this.petalCount = 5;
  }

  this.container = new PIXI.Container();

  for(var i = 0; i < this.petalCount; i++){

    var petalSettingData;

    if($flowerSetting){
      petalSettingData = $flowerSetting;
      petalSettingData.id = String(i);
    }else{
      petalSettingData = {
                              id: String(i),
                              steps: 10,
                              lineColor: 0x777777, // 0x4c
                              lineAlpha: 0.25, // 0.75
                              shapeColor: 0xff9900, // 0xf5
                              shapeAlpha: 0.55, // 0.75
                              duration: 3,
                              showDebugDot: true,
                              showDebugShape: true,
                              debug: true
                            };
    }

  	var addPetal = new Petal(petalSettingData);
  	this.container.addChild(addPetal.container);
  	this.petals.push(addPetal);
  	//
  	// this.petal1.container.rotation = 0 * 60 * (Math.PI / 180);
  	// this.petal1.container.rotation = 1 * 60 * (Math.PI / 180);
  	//

    addPetal.container.rotation = i * (360 / this.petalCount) * (Math.PI / 180);
  	// addPetal.container.rotation = i * (360 / this.petalCount) * (Math.PI / 180) +
  								  // (Math.random()*20-10) * (Math.PI / 180);

    // if(Math.random()>0.5){
     	// addPetal.container.scale.y = -1;
    // }

  }

  	/*
	var testGraphics = new PIXI.Graphics();
		testGraphics.beginFill(0xff0000, .7);
		testGraphics.drawCircle(0, 0, 5);
		testGraphics.endFill();
		this.container.addChild(testGraphics);
    */

}

Flower.prototype = {
  constructor: Flower,
  update:function(){
    // console.log("update");
    for(var i = 0; i < this.petalCount; i++){
    	var target = this.petals[i];
    	target.update();
    }
  },
  setX:function($x){
  	/* // TO DO
    this.petal1.setX($x);
    this.petal2.setX($x);
    this.petal3.setX($x);
    this.petal4.setX($x);
    this.petal5.setX($x);
    this.petal6.setX($x);
    */
  },
  setY:function($y){
  	/* // TO DO
    this.petal1.setY($y);
    this.petal2.setY($y);
    this.petal3.setY($y);
    this.petal4.setY($y);
    this.petal5.setY($y);
    this.petal6.setY($y);
    */
  },
  setRotation:function($rotate){
  	/* // TO DO
    this.petal1.setRotation($rotate);
    this.petal2.setRotation($rotate);
    this.petal3.setRotation($rotate);
    this.petal4.setRotation($rotate);
    this.petal5.setRotation($rotate);
    this.petal6.setRotation($rotate);
    */
  },
  setScale:function($scale){
  	/* // TO DO
    this.petal1.setScale($scale);
    this.petal2.setScale($scale);
    this.petal3.setScale($scale);
    this.petal4.setScale($scale);
    this.petal5.setScale($scale);
    this.petal6.setScale($scale);
    */
  },
  bloom: function(){
    // console.log('flower.bloom');
    for(var i = 0; i < this.petalCount; i++){
      var target = this.petals[i];
      target.bloom();
    }
  },
  randomBloom: function(){
    // console.log('flower.randomBloom');
    // 
    var randomLineColorFlag = Math.floor(Math.random()*360);
    var randomShapeColorFlag = Math.floor(Math.random()*360);

    var randomLineAlpha = Math.random()*0.5+0.4;
    var randomShapeAlpha = Math.random()*0.5+0.4;

    for(var i = 0; i < this.petalCount; i++){
      var target = this.petals[i];
      var tmpRandomLineColorFlag = randomLineColorFlag+Math.random()*30-15;
          if(tmpRandomLineColorFlag >= 360){ tmpRandomLineColorFlag -= 360;};
          if(tmpRandomLineColorFlag < 0){ tmpRandomLineColorFlag += 360;};
      var randomLineColorArray = hsvToRGB2(tmpRandomLineColorFlag, .3, 1);
      var randomLineColor = randomLineColorArray[0] * 256 * 256 + randomLineColorArray[1] * 256 + randomLineColorArray[2];

      var tmpRandomShapeColorFlag = randomShapeColorFlag+Math.random()*30-15;
          if(tmpRandomShapeColorFlag >= 360){ tmpRandomShapeColorFlag -= 360;};
          if(tmpRandomShapeColorFlag < 0){ tmpRandomShapeColorFlag += 360;};
      var randomShapeColorArray = hsvToRGB2(tmpRandomShapeColorFlag, .3, 1);
      var randomShapeColor = randomShapeColorArray[0] * 256 * 256 + randomShapeColorArray[1] * 256 + randomShapeColorArray[2];
      target.randomBloom(
                            randomLineColor,
                            randomLineAlpha,
                            randomShapeColor,
                            randomShapeAlpha
                          );
    }
  },
  updateSetting: function($setting){
    for(var i = 0; i < this.petalCount; i++){
      var target = this.petals[i];
      target.updateSetting($setting);
    }
  }
};