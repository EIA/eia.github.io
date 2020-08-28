const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;
loader.add('bunny', 'assets/basics/bunny.png');

loader.load((loader, resources) => {
    // resources is an object where the key is the name of the resource loaded and the value is the resource object.
    // They have a couple default properties:
    // - `url`: The URL that the resource was loaded from
    // - `error`: The error that happened when trying to load (if any)
    // - `data`: The raw data that was loaded
    // also may contain other properties based on the middleware that runs.

    console.log("loader: ", loader);
    console.log("resources: ", resources);
    // console.log("resources.bunny: ", resources.bunny);
    // console.log("resources.bunny.__proto__: ", resources.bunny.__proto__);

    // https://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable
    console.log("resources.bunny.constructor: ", resources.bunny.constructor); //Resource
    console.log("resources.bunny instanceof PIXI.resources.Resource: ", resources.bunny instanceof PIXI.resources.Resource); //true
    
    

    // console.log(resources.bunny instanceof PIXI.Loader);
    console.log(resources.bunny instanceof PIXI.Texture); // false
    console.log(resources.bunny.texture instanceof PIXI.Texture); // true
    // console.log(resources.bunny instanceof PIXI.utils.EventEmitter);
    

    console.log(PIXI.utils.TextureCache);
    console.log(PIXI.utils.TextureCache.bunny);
    console.log(PIXI.utils.TextureCache['assets/basics/bunny.png']);
    console.log(PIXI.utils.TextureCache.bunny === PIXI.utils.TextureCache['assets/basics/bunny.png']);
    console.log(resources.bunny.texture === PIXI.utils.TextureCache.bunny);

	// console.log("instanceof PIXI.resources.ArrayResource: ", resources.bunny instanceof PIXI.resources.ArrayResource);
	// console.log("instanceof PIXI.resources.BaseImageResource: ", resources.bunny instanceof PIXI.resources.BaseImageResource);
	// console.log("instanceof PIXI.resources.BufferResource: ", resources.bunny instanceof PIXI.resources.BufferResource);
	// console.log("instanceof PIXI.resources.CanvasResource: ", resources.bunny instanceof PIXI.resources.CanvasResource);
	// console.log("instanceof PIXI.resources.CubeResource: ", resources.bunny instanceof PIXI.resources.CubeResource);
	// console.log("instanceof PIXI.resources.ImageBitmapResource: ", resources.bunny instanceof PIXI.resources.ImageBitmapResource);
	// console.log("instanceof PIXI.resources.ImageResource: ", resources.bunny instanceof PIXI.resources.ImageResource);
	// console.log("instanceof PIXI.resources.Resource: ", resources.bunny instanceof PIXI.resources.Resource);
	// console.log("instanceof PIXI.resources.SVGResource: ", resources.bunny instanceof PIXI.resources.SVGResource);
	// console.log("instanceof PIXI.resources.VideoResource: ", resources.bunny instanceof PIXI.resources.VideoResource);
	// console.log("instanceof PIXI.resources.autoDetectResource: ", resources.bunny instanceof PIXI.resources.autoDetectResource);
    
    console.log("resources.bunny.type: ", resources.bunny.type);
    console.log("resources.bunny.type === PIXI.LoaderResource.TYPE.IMAGE", resources.bunny.type === PIXI.LoaderResource.TYPE.IMAGE);


    // instanceof

    // sprites.bunny = new PIXI.TilingSprite(resources.bunny.texture);
    // sprites.spaceship = new PIXI.TilingSprite(resources.spaceship.texture);
    // sprites.scoreFont = new PIXI.TilingSprite(resources.scoreFont.texture);

});