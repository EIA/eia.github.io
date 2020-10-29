const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const lineSprite = new PIXI.Container();
app.stage.addChild(lineSprite);


const glowContainer = new PIXI.Container();
const glowSprite = PIXI.Sprite.from('glow.png');
glowContainer.addChild(glowSprite);
gsap.to(glowContainer, 10, {x: -500, y:-500, ease:Linear.easeNone, repeat: -1});


lineSprite.addChild(glowContainer);

const maskGraphic = new PIXI.Graphics();
maskGraphic.lineStyle(4);
// maskGraphic.beginFill(0x0);
maskGraphic.drawRect(0, 0, 200, 200);
// maskGraphic.endFill();

lineSprite.addChild(maskGraphic);

glowContainer.mask = maskGraphic;

lineSprite.x = app.screen.width * 0.5 - 100;
lineSprite.y = app.screen.height * 0.5 - 100;

const glowFilter = new PIXI.filters.GlowFilter(16);
glowFilter.padding = 20;
lineSprite.filters = [glowFilter];

const gui = new dat.GUI();
const controller = {
    enableFilter: true, 
    enableMask: true
};
gui.add(controller, 'enableFilter').onChange(enableFilterHandler);
gui.add(controller, 'enableMask').onChange(enableMaskHandler);

function enableFilterHandler(){
    if(controller.enableFilter){
        lineSprite.filters = [glowFilter];
    }else{
        lineSprite.filters = [];
    }
}

function enableMaskHandler(){
    if(controller.enableFilter){
        glowContainer.mask = maskGraphic;
        maskGraphic.visible = true;
    }else{
        glowContainer.mask = null;
        maskGraphic.visible = false;
    }
}

window.onresize = function (event) {
    var w = window.innerWidth;
    var h = window.innerHeight;

    app.view.style.width = w + "px";
    app.view.style.height = h + "px";
    app.renderer.resize(w, h);

    lineSprite.x = app.screen.width * 0.5 - 100;
    lineSprite.y = app.screen.height * 0.5 - 100;
};
onresize();