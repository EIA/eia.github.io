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
		boardGraphics.clear();
		boardGraphics.lineStyle(10, 0x0);
		boardGraphics.beginFill(board.defaultColor, board.fillAlpha);
		boardGraphics.drawRect(0, 0, board.defaultWidth, board.defaultHeight);
		boardGraphics.endFill();
	};
	board.setTitle = function(title){
		boardTextField.text = title;
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
textField.x = 175;
textField.y = 180;

let text = ``;

textField.text = text;
app.stage.addChild(textField);


//////////// setMsg ////////////
function setMsg(msg){
	text = msg;
	console.log(text);
	textField.text = text;
	const textFieldX = textField.width *-0.5 + 175;
	TweenMax.set(textField, {alpha:1, x: textFieldX});
	TweenMax.to(textField, 1, {alpha:0, ease:Strong.easeIn});
};

//////////// mainBoardGui ////////////

const gui = new dat.GUI();

//////////// Init ////////////
let leftGraphic = createBoard("leftGraphic", 150, 150, 0xdddddd, 1);
leftGraphic.x = 10;
leftGraphic.y = 10;
leftGraphic.alpha = 1;
app.stage.addChild(leftGraphic);

leftGraphic.on("pointerdown", function(){
	setMsg("leftGraphic pointerdown");
});

leftGraphic.interactive = true;
leftGraphic.buttonMode = true;


let rightGraphic = createBoard("rightGraphic", 150, 150, 0xdddddd, 1);
rightGraphic.x = 210;
rightGraphic.y = 10;
app.stage.addChild(rightGraphic);

rightGraphic.on("pointerdown", function(){
	setMsg("rightGraphic pointerdown");
});

rightGraphic.interactive = true;
rightGraphic.buttonMode = true;




const leftGraphicGUI = gui.addFolder('LeftGraphicGUI');
leftGraphicGUI.add(leftGraphic, "alpha", 0, 1, 0.1).onChange(leftGraphicHandler);;
leftGraphicGUI.open();

function leftGraphicHandler(){
	leftGraphic.setTitle(`alpha: ${leftGraphic.alpha.toFixed(1)}`);
};
leftGraphicHandler();


const rightGraphicGUI = gui.addFolder('RightGraphicGUI');
rightGraphicGUI.add(rightGraphic, "fillAlpha", 0, 1, 0.1).onChange(rightGraphicHandler);
rightGraphicGUI.open();

function rightGraphicHandler(){
	rightGraphic.setGraphicFill(rightGraphic.fillAlpha);
	rightGraphic.setTitle(`fillAlpha: ${rightGraphic.fillAlpha.toFixed(1)}`);
};
rightGraphicHandler();

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);
};

onresize();