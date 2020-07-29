const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);



//////////// createBoard ////////////

const boardTextStyle = {
	fill: 0x0,
	fontSize: 12
};

function createBoard(boardName, w, h, color, alpha){
	const board = new PIXI.Container();
	board.defaultColor = color;
	board.defaultWidth = w;
	board.defaultHeight = h;
	board.name = boardName;
	const boardGraphics = new PIXI.Graphics();
	boardGraphics.lineStyle(10, 0x0);
	boardGraphics.beginFill(color, alpha);
	boardGraphics.drawRect(0, 0, w, h);
	boardGraphics.endFill();
	board.addChild(boardGraphics);

	const boardTextField = new PIXI.Text(boardName, boardTextStyle);
	boardTextField.x = 10;
	boardTextField.y = 10;
	board.addChild(boardTextField);

	board.setGraphicFill = function(alpha){
		board.fillAlpha = alpha;
		console.log(`${boardName} clear & redraw: `, board.fillAlpha);
		boardGraphics.clear();
		boardGraphics.lineStyle(10, 0x0);
		boardGraphics.beginFill(board.defaultColor, board.fillAlpha);
		boardGraphics.drawRect(0, 0, board.defaultWidth, board.defaultHeight);
		boardGraphics.endFill();
	};

	board.fillAlpha = alpha;

	return board;
};




//////////// TEXT ////////////

const textFieldStyle = {
	fill: 0xffffff,
	fontSize: 14
};

const textField = new PIXI.Text("", textFieldStyle);
textField.x = 250;
textField.y = 330;

let text = ``;

textField.text = text;
app.stage.addChild(textField);


//////////// setMsg ////////////
function setMsg(msg){
	text = msg;
	console.log(text);
	textField.text = text;
	TweenMax.set(textField, {alpha:1});
	TweenMax.to(textField, 1, {alpha:0, ease:Strong.easeIn});
};

//////////// mainBoardGui ////////////

const gui = new dat.GUI();

//////////// Init ////////////
let leftTransparentGraphic = createBoard("graphicAlpha0", 300, 300, 0xdddddd, 1);
leftTransparentGraphic.x = 10;
leftTransparentGraphic.y = 10;
leftTransparentGraphic.alpha = 0;
app.stage.addChild(leftTransparentGraphic);

leftTransparentGraphic.on("pointerdown", function(){
	setMsg("leftTransparentGraphic pointerdown");
});

leftTransparentGraphic.interactive = true;
leftTransparentGraphic.buttonMode = true;


let rightTransparentGraphic = createBoard("graphicFillAlpha0", 300, 300, 0xdddddd, 0);
rightTransparentGraphic.x = 360;
rightTransparentGraphic.y = 10;
app.stage.addChild(rightTransparentGraphic);

rightTransparentGraphic.on("pointerdown", function(){
	setMsg("rightTransparentGraphic pointerdown");
});

rightTransparentGraphic.interactive = true;
rightTransparentGraphic.buttonMode = true;




const leftGraphicGUI = gui.addFolder('LeftGraphicGUI');
leftGraphicGUI.add(leftTransparentGraphic, "alpha", 0, 1, 0.1);
leftGraphicGUI.open();

const rightGraphicGUI = gui.addFolder('RightGraphicGUI');
rightGraphicGUI.add(rightTransparentGraphic, "fillAlpha", 0, 1, 0.1).onChange(rightTransparentGraphicHandler);
rightGraphicGUI.open();

function rightTransparentGraphicHandler(){
	rightTransparentGraphic.setGraphicFill(rightTransparentGraphic.fillAlpha);
}

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);
};

onresize();