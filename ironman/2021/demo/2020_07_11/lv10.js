const app = new PIXI.Application({ width: 800, height:600, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);



//////////// createBoard ////////////

const boardTextStyle = {
	fill: 0x0,
	fontSize: 14
};

const msgFieldStyle = {
	fill: 0x0,
	fontSize: 14
};

function createBoardObj(boardName, w, h, color, alpha){
	const board = new PIXI.Container();
	board.name = boardName;
	const boardGraphics = new PIXI.Graphics();
	boardGraphics.name = "boardGraphics";
	boardGraphics.beginFill(color, alpha);
	boardGraphics.drawRect(0, 0, w, h);
	boardGraphics.endFill();
	board.addChild(boardGraphics);

	const textContainer = new PIXI.Container();
	textContainer.name = "textContainer";
	const boardTextField = new PIXI.Text(boardName, boardTextStyle);
	boardTextField.name = "boardTextField";
	boardTextField.x = 10;
	boardTextField.y = 10;
	textContainer.addChild(boardTextField);

	const outputTextField = new PIXI.Text("", msgFieldStyle);
	outputTextField.name = "outputTextField";
	outputTextField.x = 10;
	outputTextField.y = 10;
	textContainer.addChild(outputTextField);

	board.setMsg = function(msg){
		outputTextField.text = msg;
		outputTextField.x = boardTextField.x + boardTextField.width + 10;
		outputTextField.y = 10;
		TweenMax.set(outputTextField, {alpha:1});
		TweenMax.to(outputTextField, 1, {alpha:0, ease:Strong.easeIn});
	};

	return {board: board, textContainer: textContainer};
};


//////////// gui ////////////

const gui = new dat.GUI();

//////////// stageBoard ////////////
let stageBoardObj = createBoardObj("StageBoard", 700, 500, 0xdddddd, 1);
let stageBoard = stageBoardObj.board;
stageBoard.x = 50;
stageBoard.y = 50;
app.stage.addChild(stageBoard);

stageBoard.on("pointerdown", function(){
	stageBoard.setMsg("pointerdown");
});

stageBoard.interactive = true;






//////////// subBoard ////////////
let subBoardObj = createBoardObj("SubBoard", 600, 300, 0xff9900, 1);
let subBoard = subBoardObj.board;
subBoard.x = 100;
subBoard.y = 100;
app.stage.addChild(subBoard);

subBoard.on("pointerdown", function(){
	subBoardObj.setMsg("pointerdown");
});

subBoard.interactive = true;




//////////// subBoardChild ////////////
let subBoardChildObj = createBoardObj("SubBoardChild", 500, 200, 0xff0000, 1);
let subBoardChild = subBoardChildObj.board;
subBoardChild.x = 50;
subBoardChild.y = 50;
subBoard.addChild(subBoardChild);

subBoardChild.on("pointerdown", function(){
	subBoardChildObj.setMsg("pointerdown");
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




// app.stage.setChildIndex(subBoardChild, app.stage.children.length-1);
// app.stage.setChildIndex(subBoard, app.stage.children.length-1);
// app.stage.setChildIndex(stageBoard, app.stage.children.length-1);