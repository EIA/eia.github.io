/*

  container > triangleMC > triangleContainer > graphic1
                                             > triangle2
                                             > dot
                         > triangleMask

*/
Triangle_Hana_1 = function($debug){

  this.texture = PIXI.Texture.fromImage('assets/hana/hana_1_2.png');

  this.container = new PIXI.Container();

  this.triangleMC = new PIXI.Container();
  this.container.addChild(this.triangleMC);

  this.triangleContainer = new PIXI.Container();
  this.triangleMC.addChild(this.triangleContainer);

  this.triangleMask = new PIXI.Graphics();
  this.triangleMask.beginFill(0xffffff, .3);
  this.triangleMask.moveTo(0, 0);
  this.triangleMask.lineTo(Math.cos(60 * (-.5) * (Math.PI / 180)) * App.radius, Math.sin(60 * (-.5) * (Math.PI / 180)) * App.radius);
  this.triangleMask.lineTo(Math.cos(60 * ( .5) * (Math.PI / 180)) * App.radius, Math.sin(60 * ( .5) * (Math.PI / 180)) * App.radius);
  this.triangleMask.lineTo(0, 0);
  this.triangleMask.endFill();
  this.triangleMC.addChild(this.triangleMask);

  this.hana_1 = new PIXI.Sprite(this.texture);
  this.triangleContainer.addChild(this.hana_1);
  this.hana_1.rotation = -30 * (Math.PI / 180); // from 63 * -.5
  this.hana_1.x = -150;
  this.hana_1.y = -40;
  // this.hana_1.anchor.set(0.55);
  // this.hana_1.scale.x = 0.62;
  // this.hana_1.scale.y = 0.62;

  this.triangle2 = new PIXI.Graphics();
  // this.triangle2.beginFill(0xffffff, 0.1);
  this.triangle2.beginFill(0xff0000, 0.1);
  this.triangle2.moveTo(0, 0);
  this.triangle2.lineTo(Math.cos(60 * (-.5) * (Math.PI / 180)) * App.radius, Math.sin(60 * (-.5) * (Math.PI / 180)) * App.radius);
  this.triangle2.lineTo(Math.cos(60 * ( .5) * (Math.PI / 180)) * App.radius, Math.sin(60 * ( .5) * (Math.PI / 180)) * App.radius);
  this.triangle2.lineTo(0, 0);
  this.triangle2.scale.x = 1;
  this.triangle2.scale.y = 1;
  this.triangleContainer.addChild(this.triangle2);
  this.triangle2.alpha = 0;

  this.triangleContainer.mask = this.triangleMask;
  if($debug == true){
    this.triangleContainer.mask = null;
    this.triangleMask.alpha = 0;
    this.triangle2.alpha = 1;
  }
}

Triangle_Hana_1.prototype = {
  constructor: Triangle_Hana_1,
  update:function(){
    // console.log("update");

    var ctRange = Math.sin(App.ct * (Math.PI / 180));
    var ctPercent = ctRange * 0.5+0.5;
    // console.log("ctRange: "+ctRange);

    var ctRange2 = Math.sin(App.ct*0.5 * (Math.PI / 180));
    var ctPercent2 = ctRange2 * 0.5+0.5;
    // console.log("ctRange: "+ctRange);

    // Math.sin(-30 * (Math.PI / 180));
    // this.hana_1.x = -150 + 150 * ctPercent2;
    // this.hana_1.y = -40 + 40 * ctPercent2;

    this.hana_1.x = 0 + Math.sin(45 * (Math.PI / 180)) * -250 * (1-ctPercent2);
    this.hana_1.y = 0 + Math.sin(45 * (Math.PI / 180)) * -50 * (1-ctPercent2);

    // this.hana_1.x = Math.sin(30 * (Math.PI / 180)) * -170 * (1-ctPercent2) + Math.sin(30 * (Math.PI / 180)) * -300;
    // this.hana_1.y = Math.cos(30 * (Math.PI / 180)) * -170 * (1-ctPercent2) + Math.cos(30 * (Math.PI / 180)) * -300;

    this.hana_1.scale.x = 1- 0.72 * ctPercent2;
    this.hana_1.scale.y = 1- 0.72 * ctPercent2;
  },
  setX:function($x){
  },
  setY:function($y){
  },
  setRotation:function($rotate){
  },
  setScale:function($scale){
  }
};
