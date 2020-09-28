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

let bunnyR, bunnyG, bunnyB;

function startApp() {
    const bunnySpritesheet = PIXI.Loader.shared.resources.bunnies.spritesheet;
    bunnyR = new PIXI.AnimatedSprite(bunnySpritesheet.animations.bunny_r);
    bunnyG = new PIXI.AnimatedSprite(bunnySpritesheet.animations.bunny_g);
    bunnyB = new PIXI.AnimatedSprite(bunnySpritesheet.animations.bunny_b);
    
    bunnyR.x = app.screen.width / 2 - 100;
    bunnyR.y = app.screen.height / 2;
    app.stage.addChild(bunnyR);
    bunnyR.animationSpeed = 0.1;
    bunnyR.play();

    bunnyG.x = app.screen.width / 2;
    bunnyG.y = app.screen.height / 2;
    app.stage.addChild(bunnyG);
    bunnyG.animationSpeed = 0.1;
    bunnyG.play();

    bunnyB.x = app.screen.width / 2 + 100;
    bunnyB.y = app.screen.height / 2;
    app.stage.addChild(bunnyB);
    bunnyB.animationSpeed = 0.1;
    bunnyB.play();


};