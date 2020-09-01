const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


const loader = PIXI.Loader.shared;
function createBunny(){
	loader.add({
	name: `bunny?v=${Math.random()*10000000}`,
    url: `assets/basics/bunny.png?v=${Math.random()*10000000}`,
		onComplete:function(resource){
			const bunny = PIXI.Sprite.from(resource.texture);
			bunny.anchor.set(0.5);

			bunny.x = Math.random() * app.screen.width;
			bunny.y = Math.random() * app.screen.height;

			app.stage.addChild(bunny);
		}
	});

	loader.load();
};

createBunny();
setTimeout(createBunny, 20000);

// PIXI.Loader.shared.resources
// PIXI.utils.TextureCache
// PIXI.utils.BaseTextureCache