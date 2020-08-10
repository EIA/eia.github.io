const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


let text = `國了兩聯球後，目下生到，地笑西重你種人三國經內事統試說。其一或斯。北後法結簡。
本血機上事天然友清學該草地比中家兒過們吸文進老一會件入望有成料，動上是是。下策念進？所畫空如答那二想會灣於育只、禮華新大多技古總的。
之麼福小式，麼是於業來排種則是存場以不衣可音人。`;

const style = new PIXI.TextStyle({
    
    fill: ['#000'],
    wordWrap: true,
    wordWrapWidth: 440,
});

const richText = new PIXI.Text(text, style);
richText.x = 50;
richText.y = 50;

app.stage.addChild(richText);