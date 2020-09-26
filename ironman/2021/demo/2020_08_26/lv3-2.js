const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;
loader.add('bunniesJSON', 'bunnies.json');
loader.add('bunniesJSONNoFrame', 'bunnies_noFrams.json');

loader.load((loader, resources) => {

    console.log("loader: ", loader, " resources: ", resources);
    
    
    
    console.log("------");
    console.log("resources.bunniesJSON: ", resources.bunniesJSON);
    console.log("resources.bunniesJSON instanceof PIXI.resources.Resource: ", resources.bunniesJSON instanceof PIXI.resources.Resource);
    console.log("resources.bunniesJSON.type: ", resources.bunniesJSON.type);
    console.log("resources.bunniesJSON.type === PIXI.LoaderResource.TYPE.JSON", resources.bunniesJSON.type === PIXI.LoaderResource.TYPE.JSON);

    console.log("------");
    console.log("resources.bunniesJSONNoFrame: ", resources.bunniesJSONNoFrame);
    console.log("resources.bunniesJSONNoFrame instanceof PIXI.resources.Resource: ", resources.bunniesJSONNoFrame instanceof PIXI.resources.Resource);
    console.log("resources.bunniesJSONNoFrame.type: ", resources.bunniesJSONNoFrame.type);
    console.log("resources.bunniesJSONNoFrame.type === PIXI.LoaderResource.TYPE.JSON", resources.bunniesJSONNoFrame.type === PIXI.LoaderResource.TYPE.JSON);

    /* it's work */
    // const bunny = new PIXI.Sprite(resources.bunny.texture);
    // app.stage.addChild(bunny);
    // console.log("bunny: ", bunny);

});