/*

  container > triangle1
            > triangle2
            > triangle3
            > triangle4
            > triangle5
            > triangle6

*/
Hexagon = function($type){
  switch($type){
    case "hana_1":
                    this.triangle1 = new Triangle_Hana_1();
                    this.triangle2 = new Triangle_Hana_1();
                    this.triangle3 = new Triangle_Hana_1();
                    this.triangle4 = new Triangle_Hana_1();
                    this.triangle5 = new Triangle_Hana_1();
                    this.triangle6 = new Triangle_Hana_1();
                    break;
    case "hana_2":
                    this.triangle1 = new Triangle_Hana_2();
                    this.triangle2 = new Triangle_Hana_2();
                    this.triangle3 = new Triangle_Hana_2();
                    this.triangle4 = new Triangle_Hana_2();
                    this.triangle5 = new Triangle_Hana_2();
                    this.triangle6 = new Triangle_Hana_2();
                    break;
    case "hana_3":
                    this.triangle1 = new Triangle_Hana_3();
                    this.triangle2 = new Triangle_Hana_3();
                    this.triangle3 = new Triangle_Hana_3();
                    this.triangle4 = new Triangle_Hana_3();
                    this.triangle5 = new Triangle_Hana_3();
                    this.triangle6 = new Triangle_Hana_3();
                    break;
    case "hana_4":
                    this.triangle1 = new Triangle_Hana_4();
                    this.triangle2 = new Triangle_Hana_4();
                    this.triangle3 = new Triangle_Hana_4();
                    this.triangle4 = new Triangle_Hana_4();
                    this.triangle5 = new Triangle_Hana_4();
                    this.triangle6 = new Triangle_Hana_4();
                    break;
    default:
                    alert("Hexagon ERROR");
  }
  


  this.container = new PIXI.Container();
  this.container.addChild(this.triangle1.container);
  this.container.addChild(this.triangle2.container);
  this.container.addChild(this.triangle3.container);
  this.container.addChild(this.triangle4.container);
  this.container.addChild(this.triangle5.container);
  this.container.addChild(this.triangle6.container);

  this.triangle1.container.rotation = 0 * 60 * (Math.PI / 180);
  this.triangle2.container.rotation = 1 * 60 * (Math.PI / 180);
  this.triangle3.container.rotation = 2 * 60 * (Math.PI / 180);
  this.triangle4.container.rotation = 3 * 60 * (Math.PI / 180);
  this.triangle5.container.rotation = 4 * 60 * (Math.PI / 180);
  this.triangle6.container.rotation = 5 * 60 * (Math.PI / 180);

  this.triangle2.container.scale.y = -1;
  this.triangle4.container.scale.y = -1;
  this.triangle6.container.scale.y = -1;
}

Hexagon.prototype = {
  constructor: Hexagon,
  update:function(){
    // console.log("update");
    this.triangle1.update();
    this.triangle2.update();
    this.triangle3.update();
    this.triangle4.update();
    this.triangle5.update();
    this.triangle6.update();
  },
  setX:function($x){
    this.triangle1.setX($x);
    this.triangle2.setX($x);
    this.triangle3.setX($x);
    this.triangle4.setX($x);
    this.triangle5.setX($x);
    this.triangle6.setX($x);
  },
  setY:function($y){
    this.triangle1.setY($y);
    this.triangle2.setY($y);
    this.triangle3.setY($y);
    this.triangle4.setY($y);
    this.triangle5.setY($y);
    this.triangle6.setY($y);
  },
  setRotation:function($rotate){
    this.triangle1.setRotation($rotate);
    this.triangle2.setRotation($rotate);
    this.triangle3.setRotation($rotate);
    this.triangle4.setRotation($rotate);
    this.triangle5.setRotation($rotate);
    this.triangle6.setRotation($rotate);
  },
  setScale:function($scale){
    this.triangle1.setScale($scale);
    this.triangle2.setScale($scale);
    this.triangle3.setScale($scale);
    this.triangle4.setScale($scale);
    this.triangle5.setScale($scale);
    this.triangle6.setScale($scale);
  }
};
