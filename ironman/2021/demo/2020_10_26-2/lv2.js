const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;
loader.add({
    name: 'bunnies',
    url: 'bunnies9.json',
});

loader.load((loader, resources) => {
    // console.log("loader: ", loader, " resources: ", resources);
    startApp();
});


function startApp(){

};

let bunnyContainer = new PIXI.Container();
app.stage.addChild(bunnyContainer);

function createBunnys(){
    const container = new PIXI.Container();
    const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
    const bunny2 = PIXI.Sprite.from('bunny_b_2.png');
    const testText = new PIXI.Text(`Test - ${Math.floor(Math.random()*1000)}`);
    bunny2.x = 30;
    testText.x = 60;
    
    container.addChild(bunny);
    container.addChild(bunny2);
    container.addChild(testText);

    return container;
}

const testBox = new PIXI.Graphics();
testBox.beginFill(0xff9900);
testBox.drawRect(0, 0, 100, 30);
testBox.endFill();
app.stage.addChild(testBox);
testBox.x = 10;
testBox.y = 10;

testBox.interactive = true;
testBox.buttonMode = true;
testBox.on("pointerdown", ()=>{
    const bunnys = createBunnys();
    bunnyContainer.addChild(bunnys);
    bunnys.x = Math.random() * app.screen.width;
    bunnys.y = Math.random() * app.screen.height;
});


const testBox2 = new PIXI.Graphics();
testBox2.beginFill(0xff9900);
testBox2.drawRect(0, 0, 100, 30);
testBox2.endFill();
app.stage.addChild(testBox2);
testBox2.x = 120;
testBox2.y = 10;

testBox2.interactive = true;
testBox2.buttonMode = true;
testBox2.on("pointerdown", ()=>{
    bunnyContainer.removeChildren();
});



const testBox3 = new PIXI.Graphics();
testBox3.beginFill(0xff9900);
testBox3.drawRect(0, 0, 100, 30);
testBox3.endFill();
app.stage.addChild(testBox3);
testBox3.x = 230;
testBox3.y = 10;

testBox3.interactive = true;
testBox3.buttonMode = true;
testBox3.on("pointerdown", ()=>{
    // bunnyContainer.children.forEach((child, index) => {
    //     console.log(index, child);
    //     bunnyContainer.children[0].destroy({children: true});
    // });

    bunnyContainer.destroy({children: true});
    bunnyContainer = new PIXI.Container();
    app.stage.addChild(bunnyContainer);

});