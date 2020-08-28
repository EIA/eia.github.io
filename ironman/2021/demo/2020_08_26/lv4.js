const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;
// loader.add('bunny', 'assets/basics/bunny.png');
loader.add('bunnyJSON', 'bunnies.json');

loader.load((loader, resources) => {

    console.log("loader: ", loader);
    console.log("resources: ", resources);
    console.log("resources.bunnyJSON: ", resources.bunnyJSON);

    console.log("PIXI.utils.TextureCache: ", PIXI.utils.TextureCache);
    console.log("PIXI.utils.BaseTextureCache: ", PIXI.utils.BaseTextureCache);
});