const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


let text = `國了兩聯球後，目下生到，地笑西重你種人三國經內事統試說。其一或斯。北後法結簡。
本血機上事天然友清學該草地比中家兒過們吸文進老一會件入望有成料，動上是是。下策念進？所畫空如答那二想會灣於育只、禮華新大多技古總的。
之麼福小式，麼是於業來排種則是存場以不衣可音人。`;

const style = new PIXI.TextStyle({
    fontSize: 18,
    fill: ['#000'],
    wordWrap: true,
    wordWrapWidth: 440,
});

function updateText(text) {
    text = text.replace(/,/gi, ', ');
    text = text.replace(/，/gi, '， ');
    text = text.replace(/\./gi, '. '); // . 需使用反斜線跳脫
    text = text.replace(/。/gi, '。 ');
    return text;
}

text = updateText(text);

const richText = new PIXI.Text(text, style);
richText.x = 50;
richText.y = 150;

const testGraphics = new PIXI.Graphics();
app.stage.addChild(testGraphics);

testGraphics.beginFill(0xffffff, .3);
testGraphics.drawRect(0, 0, 440, 300);
testGraphics.endFill();
testGraphics.position = richText.position;

app.stage.addChild(richText);