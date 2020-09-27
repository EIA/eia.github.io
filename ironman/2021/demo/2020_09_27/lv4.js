const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;
loader.add('assets/basics/bunny.png');
loader.add('assets/basics/bunny.png');

loader.load((loader, resources) => {
    // console.log("loader: ", loader, " resources: ", resources);
    console.log('complete');
});

