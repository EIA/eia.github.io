const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


function createBunny(){
    const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
    bunny.anchor.set(0.5);
    return bunny;
};



const loader = PIXI.Loader.shared;
loader.add('assets/basics/bunny.png');

loader.load((loader, resources) => {
    console.log('complete');
    startApp();
});

function startApp(){
    setInterval(() => {
        const bunny = createBunny();
        bunny.x = Math.random() * app.screen.width;
        bunny.y = Math.random() * app.screen.height;

        app.stage.addChild(bunny);
    }, 1000);
};