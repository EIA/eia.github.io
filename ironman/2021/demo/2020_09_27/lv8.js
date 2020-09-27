const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;


function createAnimatedBunny() {
    const spritesheetName = `Spritesheet${Math.random()* 1000}`;
    loader.add(spritesheetName, 'bunnies.json');
    loader.load((loader, resources) => {
        // console.log('complete', resources);
        const bunnySpritesheet = resources[spritesheetName].spritesheet;
        // console.log(bunnySpritesheet);
        const animateBunny = new PIXI.AnimatedSprite(bunnySpritesheet.animations.bunny);
        // console.log(animateBunny);
        animateBunny.animationSpeed = 0.05;
        animateBunny.play();
        // animateBunny.x = Math.random() * app.screen.width;
        // animateBunny.y = Math.random() * app.screen.height;
        animateBunny.x = 100;
        animateBunny.y = 100;
        app.stage.addChild(animateBunny);
    });
};
createAnimatedBunny();



// function startApp(){
//     setInterval(() => {
//         const bunny = createBunny();
//         bunny.x = Math.random() * app.screen.width;
//         bunny.y = Math.random() * app.screen.height;

//         app.stage.addChild(bunny);
//     }, 1000);
// };