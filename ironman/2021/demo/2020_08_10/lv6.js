const app = new PIXI.Application({ backgroundColor: 0xeeeeee });
document.body.appendChild(app.view);

/*
let text = `This is a long and
Honorificabilitudinitatibus califragilisticexpialidocious Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu
グレートブリテンおよび北アイルランド連合王国という言葉は本当に長い言葉
`;
*/

let text = `This is a long and Honorificabilitudinitatibus califragilisticexpialidocious Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu

グレートブリテンおよび北アイルランド連合王国という言葉は本当に長い言葉`;

const wordWrapWidth = 500;

const style = new PIXI.TextStyle({
	fontSize: 20,
    breakWords: false,
    fill: ['#000'],
    wordWrap: true,
    wordWrapWidth: wordWrapWidth,
    lineHeight: 30,
    letterSpacing: 1,
});

const richText = new PIXI.Text(text, style);
richText.x = 50;
richText.y = 100;

app.stage.addChild(richText);

const testGraphics = new PIXI.Graphics();
app.stage.addChildAt(testGraphics, 0);
const stroke = new PIXI.Graphics();
app.stage.addChildAt(stroke, 0);

const gui = new dat.GUI();
gui.add(richText.style, 'breakWords').onChange(function(){
	setStrokeAndGraphics();
});


setStrokeAndGraphics();

function setStrokeAndGraphics(){

	let textAreaW = richText.width;
	let textAreaH = richText.height;

	testGraphics.clear();
	testGraphics.beginFill(0xffffff, .3);
	testGraphics.drawRect(0, 0, textAreaW, textAreaH);
	testGraphics.endFill();
	testGraphics.position = richText.position;

	stroke.clear();
	stroke.lineStyle(1, 0x0);
	stroke.drawRect(0, 0, wordWrapWidth + 20, textAreaH + 20);
	stroke.x = richText.x - 10;
	stroke.y = richText.y - 10;
};