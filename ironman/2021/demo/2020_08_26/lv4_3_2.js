const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

let animatedSprite;

const loader = PIXI.Loader.shared;
loader.add('testJSON', 't8.json');

loader.load((loader, resources) => {

    // console.log("loader: ", loader);
    // console.log("resources: ", resources);
    // console.log("resources.testJSON: ", resources.testJSON);
    // console.log("resources.testJSON.textures: ", resources.testJSON.textures);
    console.log("resources.testJSON.spritesheet: ", resources.testJSON.spritesheet);

    // console.log("PIXI.utils.TextureCache: ", PIXI.utils.TextureCache);
    // console.log("PIXI.utils.BaseTextureCache: ", PIXI.utils.BaseTextureCache);


	  // let sheet = PIXI.Loader.shared.resources["assets/spritesheet.json"].spritesheet;
  	// animatedSprite = new PIXI.AnimatedSprite(sheet.animations["image_sequence"]);

  	// animatedSprite = new PIXI.AnimatedSprite(resources.bunniesJSON.spritesheet.animations["bunny"]);
  	// app.stage.addChild(animatedSprite);

  	// animatedSprite.play();


    const tSprite = new PIXI.Sprite(PIXI.utils.TextureCache['t8.png']);
    app.stage.addChild(tSprite);

    // console.log(PIXI.utils.TextureCache['t8.png'] === PIXI.utils.TextureCache['testJSON_image']);
    // true

    // console.log(PIXI.utils.BaseTextureCache['t8.png'] === PIXI.utils.BaseTextureCache['testJSON_image']);

});