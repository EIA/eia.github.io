const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;
loader.add({
    name: 'bunnies',
    url: 'bunnies9.json',
});

loader.load((loader, resources) => {
    console.log("loader: ", loader, " resources: ", resources);
    startApp();
});

let bunnyR, bunnyHelfAlpha;

function startApp() {
    const bunnySpritesheet = PIXI.Loader.shared.resources.bunnies.spritesheet;
    bunnyR = new PIXI.AnimatedSprite(bunnySpritesheet.animations.bunny_r);
    
    bunnyR.x = app.screen.width / 2 - 50;
    bunnyR.y = app.screen.height / 2;
    app.stage.addChild(bunnyR);
    bunnyR.animationSpeed = 0.1;
    bunnyR.play();

    bunnyHelfAlpha = new PIXI.Sprite(bunnySpritesheet.textures['halfAlphaBunny.png']);
    bunnyHelfAlpha.x = app.screen.width / 2 + 50;
    bunnyHelfAlpha.y = app.screen.height / 2;
    app.stage.addChild(bunnyHelfAlpha);

};