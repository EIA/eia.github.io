const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

let animatedSprite;

const loader = PIXI.Loader.shared;
loader.add('bunny', 'assets/basics/bunny.png');
loader.add('bunniesJSON', 'bunnies.json');

loader.load((loader, resources) => {

    console.log("loader: ", loader);
    console.log("resources: ", resources);
    console.log("resources.bunniesJSON: ", resources.bunniesJSON);
    console.log("resources.bunniesJSON.textures: ", resources.bunniesJSON.textures);
    console.log("resources.bunniesJSON.spritesheet: ", resources.bunniesJSON.spritesheet);

    console.log("PIXI.utils.TextureCache: ", PIXI.utils.TextureCache);
    console.log("PIXI.utils.BaseTextureCache: ", PIXI.utils.BaseTextureCache);


	// let sheet = PIXI.Loader.shared.resources["assets/spritesheet.json"].spritesheet;
  	// animatedSprite = new PIXI.AnimatedSprite(sheet.animations["image_sequence"]);

  	animatedSprite = new PIXI.AnimatedSprite(resources.bunniesJSON.spritesheet.animations["bunny"]);
    animatedSprite.animationSpeed = 0.05;
  	app.stage.addChild(animatedSprite);

  	animatedSprite.play();

});