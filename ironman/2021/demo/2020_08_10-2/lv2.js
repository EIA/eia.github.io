const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


let text = `test 測試`;
const style1 = new PIXI.TextStyle({
	fontSize: 24
});

const testText1 = new PIXI.Text(text, style1);
testText1.x = 50;
testText1.y = 50;
app.stage.addChild(testText1);

const testText2 = new PIXI.Text(text, style1);
testText2.x = 50;
testText2.y = 150;
testText2.scale.x = 2;
testText2.scale.y = 2;
app.stage.addChild(testText2);


const style2 = new PIXI.TextStyle({
	fontSize: 48
});
const testText3 = new PIXI.Text(text, style2);
testText3.x = 50;
testText3.y = 250;
app.stage.addChild(testText3);