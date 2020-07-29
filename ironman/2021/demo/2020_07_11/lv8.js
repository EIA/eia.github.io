const app = new PIXI.Application({ width: 800, height:600, backgroundColor: 0x1099bb });
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
	fill: 0x0,
	fontSize: 14
};

const textField = new PIXI.Text("", textFieldStyle);
textField.x = 550;
textField.y = 150;

let text = "";

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

//////////// gui ////////////

const gui = new dat.GUI();

//////////// stageBoard ////////////
let stageBoard = createBoard("StageBoard", 700, 500, 0xdddddd, 1);
stageBoard.x = 50;
stageBoard.y = 50;
app.stage.addChild(stageBoard);

stageBoard.on("pointerdown", function(){
	setMsg("StageBoard pointerdown");
});

stageBoard.interactive = true;






//////////// subBoard ////////////
let subBoard = createBoard("SubBoard", 400, 300, 0xff9900, 1);
subBoard.x = 100;
subBoard.y = 100;
app.stage.addChild(subBoard);

subBoard.on("pointerdown", function(){
	setMsg("SubBoard pointerdown");
});

subBoard.interactive = true;




//////////// subBoardChild ////////////
let subBoardChild = createBoard("SubBoardChild", 300, 200, 0xff0000, 1);
subBoardChild.x = 50;
subBoardChild.y = 50;
subBoard.addChild(subBoardChild);

subBoardChild.on("pointerdown", function(){
	setMsg("SubBoardChild pointerdown");
});

subBoardChild.interactive = true;



//////////// GUI Setting ////////////
const stageBoardGUI = gui.addFolder('StageBoard');
stageBoardGUI.add(stageBoard, "interactive");
stageBoardGUI.add(stageBoard, "interactiveChildren");
stageBoardGUI.add(stageBoard, "visible");
stageBoardGUI.add(stageBoard, "renderable");
stageBoardGUI.add(stageBoard, "alpha", 0, 1, 0.01);
stageBoardGUI.open();

const subBoardGUI = gui.addFolder('SubBoard');
subBoardGUI.add(subBoard, "interactive");
subBoardGUI.add(stageBoard, "interactiveChildren");
subBoardGUI.add(subBoard, "visible");
subBoardGUI.add(subBoard, "renderable");
subBoardGUI.add(subBoard, "alpha", 0, 1, 0.01);
subBoardGUI.open();

const subBoardChildGUI = gui.addFolder('SubBoardChild');
subBoardChildGUI.add(subBoard, "interactive");
subBoardChildGUI.add(stageBoard, "interactiveChildren");
subBoardChildGUI.add(subBoard, "visible");
subBoardChildGUI.add(subBoard, "renderable");
subBoardChildGUI.add(subBoard, "alpha", 0, 1, 0.01);
subBoardChildGUI.open();




app.stage.setChildIndex(textField, app.stage.children.length-1);