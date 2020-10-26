const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const BUNNY_MOVE_RED = "bunny_move_red";
const BUNNY_MOVE_GREEN = "bunny_move_green";
const BUNNY_MOVE_BLUE = "bunny_move_blue";


const loader = PIXI.Loader.shared;
loader.add({
    name: 'bunnies',
    url: 'bunnies9.json',
});

loader.load((loader, resources) => {
    // console.log("loader: ", loader, " resources: ", resources);
    startApp();
});

let bunny, tl;

function startApp() {
    console.log("startApp");


    // const bunny = PIXI.Sprite.from('bunny_b_2.png');
    // const bunny = PIXI.Sprite.from('bunny_r_2.png');
    // const bunny = PIXI.Sprite.from('bunny_g_2.png');
    bunny = new PIXI.Sprite();

    bunny.anchor.set(0.5);
    app.stage.addChild(bunny);

    bunny.x = 100;
    bunny.y = 100;

    tl = new TimelineMax({
        onStart: function () {
            console.log("onStart");
        },
        onComplete: function () {
            console.log("onComplete");
        }

    });

    tl.set(bunny, { x: 100 });
    tl.to(bunny, 5, { x: 700, ease:Linear.easeNone });
    tl.pause();

    function setBunnyMove(bunny_move_type) {
        switch (bunny_move_type) {
            case BUNNY_MOVE_RED:
                // bunny.texture.baseTexture.destroy(); // 用 sprite不能 destroy baseTexture
                bunny.texture = PIXI.Texture.from('bunny_r_2.png');
                break;
            case BUNNY_MOVE_GREEN:
                // bunny.texture.baseTexture.destroy(); // 用 sprite不能 destroy baseTexture
                bunny.texture = PIXI.Texture.from('bunny_g_2.png');
                break;
            case BUNNY_MOVE_BLUE:
                // bunny.texture.baseTexture.destroy(); // 用 sprite不能 destroy baseTexture
                bunny.texture = PIXI.Texture.from('bunny_b_2.png');
                break;
        
            default:
                break;
        };
        tl.seek(0);
        tl.play();
    };
    app.setBunnyMove = setBunnyMove;
}



function stopTL() {
    // https://greensock.com/docs/v3/GSAP/Timeline/seek()
    // .seek( position:*, suppressEvents:Boolean ) : self
    // suppressEvents: Boolean
    // (default = true) — If true (the default),
    // no events or callbacks will be triggered when the playhead moves
    // to the new position defined in the timeparameter.
    tl.seek(100); // 停在最後，不觸發 complete 預設 true
};

function stopTL2() {
    tl.seek(100, false); // 停在最後，觸發 complete
};

function stopTL3() {
    tl.pause();
};

function stopTL4() {
    tl.seek(0); // 回到 0，繼續跑
};


function moveRedBunny(){
    app.setBunnyMove(BUNNY_MOVE_RED);
};

function moveGreenBunny(){
    app.setBunnyMove(BUNNY_MOVE_GREEN);
};

function moveBlueBunny(){
    app.setBunnyMove(BUNNY_MOVE_BLUE);
};

function stopBunny() {
    tl.seek(0);
    tl.pause();
    // bunny.texture = PIXI.Texture.EMPTY; // 停止時設定 texture 為空，專案上使用
    bunny.texture = PIXI.Texture.WHITE; // 停止時設定 texture 為白色，Debug 使用
};