const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;
// loader.add('bunny', 'assets/basics/bunny.png');
loader.add('bunnyJSON', 'bunny.json');
// loader.add('bunnyJSON2', 'bunny.json');
// loader.add('bunnyJSONNoFrame', 'bunny_noFrams.json');

loader.load((loader, resources) => {

    console.log("loader: ", loader);
    console.log("resources: ", resources);
    // console.log("resources.bunny: ", resources.bunny);
    console.log("resources.bunnyJSON: ", resources.bunnyJSON);
    // console.log("resources.bunnyJSONNoFrame: ", resources.bunnyJSONNoFrame);
    
    // console.log("------");
    // console.log("resources.bunnyJSON instanceof PIXI.resources.Resource: ", resources.bunnyJSON instanceof PIXI.resources.Resource);
    // console.log("resources.bunnyJSON.type: ", resources.bunnyJSON.type);
    // console.log("resources.bunnyJSON.type === PIXI.LoaderResource.TYPE.JSON", resources.bunnyJSON.type === PIXI.LoaderResource.TYPE.JSON);

    // console.log("------");
    // console.log("resources.bunnyJSONNoFrame instanceof PIXI.resources.Resource: ", resources.bunnyJSONNoFrame instanceof PIXI.resources.Resource);
    // console.log("resources.bunnyJSONNoFrame.type: ", resources.bunnyJSONNoFrame.type);
    // console.log("resources.bunnyJSONNoFrame.type === PIXI.LoaderResource.TYPE.JSON", resources.bunnyJSONNoFrame.type === PIXI.LoaderResource.TYPE.JSON);

});