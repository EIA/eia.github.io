const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;
loader.add('bunny', 'assets/basics/bunny.png');
loader.add('bunniesJSON', 'bunnies.json');

loader.load((loader, resources) => {

    console.log("loader: ", loader);
    console.log("resources: ", resources);
    console.log("resources.bunniesJSON: ", resources.bunniesJSON);
    console.log("resources.bunniesJSON: ", resources.bunniesJSON.textures);

    console.log("PIXI.utils.TextureCache: ", PIXI.utils.TextureCache);
    console.log("PIXI.utils.BaseTextureCache: ", PIXI.utils.BaseTextureCache);

    // const a1 =  new PIXI.TilingSprite(resources.bunny.texture);
    const a1 =  new PIXI.TilingSprite(resources.bunniesJSON.textures['bunny2.png'], 300, 300);
    app.stage.addChild(a1);
});