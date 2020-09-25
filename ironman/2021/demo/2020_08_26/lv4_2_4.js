const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

let animatedSprite;

// const loader = PIXI.Loader.shared;
const loader = new PIXI.Loader();

loader.add(
  {
    name: 'bunniesJSON',
    url: 'bunnies.json',
    // onComplete:function(resources){console.log("bunniesJSON onComplete", resources)}
  });

loader.onStart.add((loader, resource) => {
    console.log("onStart: ", loader, resource)
}); // Called when a resource starts loading.
loader.onError.add((loader, resource) => {
            console.log("onError: ", loader, resource)
}); // Called when a resource fails to load.
loader.onLoad.add((loader, resource) => {
            console.log("onLoad: ", loader, resource)
}); // Called when a resource successfully loads.
loader.onProgress.add((loader, resource) => {
            console.log("onProgress: ", loader, resource)
}); // Called when a resource finishes loading (success or fail).
loader.onComplete.add((loader, resource) => {
            console.log("onComplete: ", loader, resource)
})

loader.load();
/*
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
*/