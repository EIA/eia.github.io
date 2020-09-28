const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;
loader.add({
    name: 'bunniesJSON',
    url: 'bunnies.json',
});




// loader.onStart.add((loader, resource) => {
//     console.log("onStart: ", loader, resource)
// });
// loader.onError.add((loader, resource) => {
//     console.log("onError: ", loader, resource)
// });
loader.onLoad.add((loader, resource) => {
    console.log("onLoad: ", loader, resource)
});
// loader.onProgress.add((loader, resource) => {
//     console.log("onProgress: ", loader, resource)
// });
// loader.onComplete.add((loader, resource) => {
//     console.log("onComplete: ", loader, resource)
// })

loader.load((loader, resources) => {
    console.log("loader: ", loader, " resources: ", resources);
});