const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);



//////////// createBoard ////////////

const boardTextStyle = {
	fill: 0x0,
	fontSize: 12
};

function createBoard(boardName, w, h, color, alpha){
	const board = new PIXI.Container();
	board.name = boardName;
	const boardGraphics = new PIXI.Graphics();
	boardGraphics.beginFill(color, alpha);
	boardGraphics.drawRect(0, 0, w, h);
	boardGraphics.endFill();
	board.addChild(boardGraphics);

	const boardTextField = new PIXI.Text(boardName, boardTextStyle);
	boardTextField.x = 10;
	boardTextField.y = 10;
	board.addChild(boardTextField);

	return board;
};




//////////// TEXT ////////////

const textFieldStyle = {
	fill: 0xffffff,
	fontSize: 14
};

const textField = new PIXI.Text("", textFieldStyle);
textField.x = 400;
textField.y = 50;

let text = `
`;

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
let mainBoard = createBoard("MainBoard", 300, 300, 0xdddddd, 1);
mainBoard.x = 10;
mainBoard.y = 10;
app.stage.addChild(mainBoard);

mainBoard.on("pointerdown", function(){
	setMsg("MainBoard pointerdown");
});

mainBoard.interactive = true;

const mainBoardGUI = gui.addFolder('MainBoard');
mainBoardGUI.add(mainBoard, "interactive");
mainBoardGUI.add(mainBoard, "visible");
mainBoardGUI.add(mainBoard, "renderable");
mainBoardGUI.add(mainBoard, "alpha", 0, 1, 0.01);
mainBoardGUI.open();


window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);
};

onresize();