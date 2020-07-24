const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


const container = new PIXI.Container();
app.stage.addChild(container);

const bunny = PIXI.Sprite.from('assets/basics/bunny.png');
container.addChild(bunny);


const bunnyMask = new PIXI.Graphics();
bunnyMask.beginFill(0xff9900);
bunnyMask.drawRect(0, 0, 26, 20);


setTimeout(function(){

	/*
		
		

		
		

		可是容器的高度還是 26 x37

		兔子再遮遮罩
		容器的高度才會是 20 x37		

	*/


	console.log('一個空容器，裡頭裝一個 26 x 37 的兔子');
	console.log('兔子寬與高：', bunny.width, bunny.height);

	console.log('做一個 26 x 20 的遮罩');
	console.log('遮罩遮了容器');
	console.log('看起來是 26 x 20 半隻兔子');
	container.mask = bunnyMask;

	console.log('兔子寬與高：', bunny.width, bunny.height);
	console.log('容器寬與高：', container.width, container.height);

	console.warn('容器與兔子都不是遮罩的高度！！！');

	// bunny.mask = bunnyMask;
	// console.log('遮罩遮了兔子');
	// console.log('兔子寬與高：', bunny.width, bunny.height);
	// console.log('容器寬與高：', container.width, container.height);
	// console.warn('內容物被遮後，容器的寬高才會改變');

}, 500);







