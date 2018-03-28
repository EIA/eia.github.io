var app = new PIXI.Application(800, 600, {backgroundColor : 0x000000, antialias: true, preserveDrawingBuffer:true});
// document.body.appendChild(app.view);
$('.pixi-container').append(app.view);

var windowRadius = 100;
var windowWidth = 100;
var windowHeight = 100;

var mirrorCounts = 12;

var video, videoTexture, videoRadius;
var vWidth = 0, vHeight = 0;
var video_w, video_h;

var videoSquareContainer = new PIXI.Container();
app.stage.addChild(videoSquareContainer);

video = document.getElementById('video');

$(function(){



	navigator.getUserMedia  = navigator.getUserMedia ||
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.msGetUserMedia;

	if (navigator.getUserMedia) {

		var constraints = {
			audio: false,
			// video: true
			video: {
						// width: {ideal: 320}, // iOS 不支援
						// height: {ideal: 320}, // iOS 不支援
						// facingMode: 'user'
						facingMode: 'environment'
			}
		}

		navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
			video.srcObject = stream;
			// video.src = window.URL.createObjectURL(stream); // iOS 不支援
			video.play();

			video_w = $('video').get(0).videoWidth;
			video_h = $('video').get(0).videoHeight;
			videoRadius = Math.ceil(Math.sqrt(video_w * video_w + video_h * video_h));

			setPixi();
			onresize(); //mob

		});

		$('#video').css('display', 'block');



	}else{
		setPixi();
		onresize();
	}

});

function setPixi(){
	onresize();
	buildKaleidoscope();
	
	// --------------- //

}


window.onresize = function (event){

	video_w = $('video').get(0).videoWidth;
	video_h = $('video').get(0).videoHeight;
	videoRadius = Math.ceil(Math.sqrt(video_w * video_w + video_h * video_h));

	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	windowRadius = Math.ceil(Math.sqrt(windowWidth * windowWidth + windowHeight * windowHeight));

  
	app.view.style.width = windowWidth + "px";
	// app.view.style.height = windowHeight + "px";
	// app.renderer.resize(windowWidth,windowHeight);

	app.view.style.height = showVideo?(windowHeight * 0.5 + "px"): (windowHeight + "px");
	app.renderer.resize(windowWidth,showVideo?windowHeight * 0.5:windowHeight);
  
	// app.stage.position.x = app.renderer.width * .5;
	// app.stage.position.y = app.renderer.height * .5;
  
	console.log(
					"[Window] width: " + windowWidth +
					" | height: " + windowHeight +
					" | radius: " + windowRadius
				);
	
	buildKaleidoscope();
  };
  

$(video).on('canplay', function() {

	vWidth			 = $(video).width();
	vHeight			 = $(video).height();
	video.width		 = 320;
	video.height	 = 320;

	video_w = $('video').get(0).videoWidth;
	video_h = $('video').get(0).videoHeight;
	videoRadius = Math.ceil(Math.sqrt(video_w * video_w + video_h * video_h));

	onresize(); // pc

});



function buildKaleidoscope(){
	console.log('buildKaleidoscope');

	videoSquareContainer.removeChildren();

	// var r = E_tool.setSize(video_w, video_h, app.renderer.width, app.renderer.height * 0.5, 'cover');


	// var rotationScale = windowRadius / videoRadius * 0.5;
	// var rotationScale = windowRadius / videoRadius;
	// console.log('rotationScale '+rotationScale);

	var r;
	/* 要用短邊來算 */
	if(video_w > video_h){
		r = E_tool.setSize(video_h, video_h, windowRadius, windowRadius, 'cover');
	}else{
		r = E_tool.setSize(video_w, video_w, windowRadius, windowRadius, 'cover');
	}
	


	for(var i=0; i< mirrorCounts; i++){


		// v1 //
		/*
		maskGraphics.beginFill(0x888888, .5);
		maskGraphics.moveTo(0,0);

		maskGraphics.lineTo(
			Math.cos(-45 * (Math.PI / 180)) * 300,
			Math.sin(-45 * (Math.PI / 180)) * 300
		);
		maskGraphics.lineTo(
			Math.cos(45 * (Math.PI / 180)) * 300,
			Math.sin(45 * (Math.PI / 180)) * 300
		);
		maskGraphics.lineTo( 0, 0 );

		maskGraphics.endFill();
		*/

		// v2 //

		/*
		var sqContainer = new PIXI.Container();
		videoSquareContainer.addChild(sqContainer);


		var videoSprite = new PIXI.Sprite();
		videoTexture = PIXI.Texture.from($('video').get(0));
		videoSprite.setTexture(videoTexture);
		videoSprite.scale.x = videoSprite.scale.y = r.scale;
		videoSprite.x = 0;
		videoSprite.y = 0;
		// videoSprite.x += r.x - i * videoSquareW;
		// videoSprite.y += r.y - j * videoSquareH;

		sqContainer.addChild(videoSprite);

		var posX = windowWidth * 0.5;
		var posY = windowHeight * 0.5 * 0.5;
		var anglePerMirror = 360 / mirrorCounts;


		var maskGraphics = new PIXI.Graphics();
		sqContainer.addChild(maskGraphics);
		maskGraphics.beginFill(0x000000, Math.random()*0.2+0.8);
		maskGraphics.moveTo(posX,posY);

		maskGraphics.lineTo(
			Math.cos(
						anglePerMirror * ( i - 0.5 ) * (Math.PI / 180)) 
						* windowRadius + posX
					,
			Math.sin(
						anglePerMirror * ( i - 0.5 ) * (Math.PI / 180)) 
						* windowRadius
		) + posY;
		maskGraphics.lineTo(
						Math.cos(
							anglePerMirror * ( i + 0.5 ) * (Math.PI / 180)) 
							* windowRadius + posX
						,
						Math.sin(
							anglePerMirror * ( i + 0.5 ) * (Math.PI / 180)) 
							* windowRadius
		) + posY;
		maskGraphics.lineTo( posX, posY );

		maskGraphics.endFill();

		// videoSprite.alpha = Math.random()*0.5+0.5;

		videoSprite.mask = maskGraphics;

		if( i%2 == 0){
			var tmpX = videoSprite.x;
			videoSprite.scale.x *= -1;
			videoSprite.x = windowWidth - tmpX;
		}
		*/

		// v3 //

		//
		//    app.stage > videoSquareContainer > sqContainer (rot) > videoSprite (rot + pos)
		//                                                           maskGraphics (angle 0)
		//
		//

		var sqContainer = new PIXI.Container();
		videoSquareContainer.addChild(sqContainer);


		var videoSprite = new PIXI.Sprite();
		videoTexture = PIXI.Texture.from($('video').get(0));
		videoSprite.setTexture(videoTexture);
		videoSprite.anchor.set(0.5);
		videoSprite.scale.x = videoSprite.scale.y = r.scale;
		videoSprite.x += 0;
		videoSprite.y += 0;	
		// videoSprite.x += r.x - i * videoSquareW;
		// videoSprite.y += r.y - j * videoSquareH;

		sqContainer.addChild(videoSprite);

		var posX = windowWidth * 0.5;
		var posY = showVideo ? windowHeight * 0.5 * 0.5 :  windowHeight * 0.5;
		
		var anglePerMirror = 360 / mirrorCounts;
		videoSquareContainer.x = posX;
		videoSquareContainer.y = posY;

		var maskGraphics = new PIXI.Graphics();
		sqContainer.addChild(maskGraphics);
		// maskGraphics.beginFill(0x000000, Math.random()*0.2+0.8);
		maskGraphics.beginFill(0xffffff, (i+1) * 1 / mirrorCounts);
		maskGraphics.moveTo( 0, 0 );

		maskGraphics.lineTo(
			Math.cos(
						anglePerMirror * ( 0 - 0.5 ) * (Math.PI / 180)) 
						* windowRadius
					,
			Math.sin(
						anglePerMirror * ( 0 - 0.5 ) * (Math.PI / 180)) 
						* windowRadius
		) + posY;
		maskGraphics.lineTo(
						Math.cos(
							anglePerMirror * ( 0 + 0.5 ) * (Math.PI / 180)) 
							* windowRadius
						,
						Math.sin(
							anglePerMirror * ( 0 + 0.5 ) * (Math.PI / 180)) 
							* windowRadius
		) + posY;
		maskGraphics.lineTo( 0, 0 );

		maskGraphics.endFill();

		/* Show Stroke */
		if(showOrigin == true){
			var strokeGraphics = new PIXI.Graphics();
			sqContainer.addChild(strokeGraphics);
			
			if(i == 0){
				strokeGraphics.lineStyle(2, 0xffffff, 1);
			}else{
				strokeGraphics.lineStyle(2, 0xffffff, .1);
			}
			strokeGraphics.moveTo( 0, 0 );

			strokeGraphics.lineTo(
				Math.cos(
							anglePerMirror * ( 0 - 0.5 ) * (Math.PI / 180)) 
							* windowRadius
						,
				Math.sin(
							anglePerMirror * ( 0 - 0.5 ) * (Math.PI / 180)) 
							* windowRadius
			) + posY;
			strokeGraphics.lineTo(
							Math.cos(
								anglePerMirror * ( 0 + 0.5 ) * (Math.PI / 180)) 
								* windowRadius
							,
							Math.sin(
								anglePerMirror * ( 0 + 0.5 ) * (Math.PI / 180)) 
								* windowRadius
			) + posY;
			strokeGraphics.lineTo( 0, 0 );
			strokeGraphics.endFill();
		}
		/* Show Stroke End */



		sqContainer.rotation = anglePerMirror * i * (Math.PI / 180);
		// videoSprite.rotation = anglePerMirror * i * (Math.PI / 180) * -1;

		if(showOrigin == true){
			if(i==0){
			}else{
				videoSprite.alpha = .3;
			}			
		}
		// videoSprite.alpha = Math.random()*0.5+0.5;
		videoSprite.mask = maskGraphics;;

		if( i%2 == 0){
			// videoSprite.scale.x *= -1;
			videoSprite.scale.y *= -1;
		}
		




	}


	$('#ot').html(
		"2338" +
		"</br>" + 
		video_w + ' / '+
		video_h + ' / '+
		app.renderer.width + ' / '+
		app.renderer.height + ' / '+
		"</br>" + 
		videoRadius + ' / '+
		windowRadius + ' / '+
		// rotationScale + 
		"</br>" + 
		// Math.floor(app.renderer.width * rotationScale) + ' / '+
		// Math.floor(app.renderer.height * rotationScale) + ' / '+
		// "</br>" +
		r.x + ' / '+
		r.y + ' / '+
		r.scale +
		"</br>" + 
		Math.floor(videoSquareContainer.children[0].children[0].width) + ' / '+
		Math.floor(videoSquareContainer.children[0].children[0].height) + ' / '+
		Math.floor(videoSquareContainer.children[0].children[1].width) + ' / '+
		Math.floor(videoSquareContainer.children[0].children[1].height)
	);


console.log(r);

}


///////////////////////////////////////////////////

var showEffect = true;
var showVideo = true;
var showOrigin = false;

var gui = new dat.GUI();
var effectController = {
	ShowVideo: showVideo,
	ShowOrigin: showOrigin,
	MirrorCounts: mirrorCounts,
	Capture : exportPic
};
gui.add( effectController, "ShowVideo" ).onChange( showVideoHandler );
gui.add( effectController, "ShowOrigin" ).onChange( showOriginHandler );
gui.add( effectController, 'MirrorCounts', { 4:4, 6:6, 8:8, 10:10, 12:12, 16:16, 20:20, 32:32 } ).onChange( mirrorCountsHandler );
gui.add( effectController, "Capture" );


function showVideoHandler(){
	showVideo = effectController.ShowVideo;
	if(showVideo){
		$('.wrapper .video-container').show();
	}else{
		$('.wrapper .video-container').hide();
	}
	onresize();
}

function showOriginHandler(){
	showOrigin = effectController.ShowOrigin;
	onresize();
}

function mirrorCountsHandler(){
	mirrorCounts = effectController.MirrorCounts;
	onresize();
}

function exportPic(){
	var downloadBtn = document.getElementById("download-btn");
	downloadBtn.href = app.renderer.extract.canvas().toDataURL("image/jpeg");
	downloadBtn.download = "Kaleidoscope";
	downloadBtn.click();
}

///////////////////////////////////////////////////


var E_tool = {

	setSize: function($target_w, $target_h, $container_w, $container_h, $mode){
		var returnValue = {x: 0, y:0, scale: 1};
		console.log(
					'setSize: ' +
					'\t$target_w: ' + $target_w + ', '+
					'\t$target_h: ' + $target_h + ', '+
					'\t$container_w: ' + $container_w + ', '+
					'\t$container_h: ' + $container_h + ', '+
					'\t$mode: ' + $mode
					);
		switch ($mode){
			case 'cover':
							if($target_w / $target_h >= $container_w / $container_h){
								// returnValue.scale = $container_w / $target_w; // contain
								returnValue.scale = $container_h / $target_h; // cover
								}else{
								// returnValue.scale = $container_h / $target_h; // contain
								returnValue.scale = $container_w / $target_w; // cover
							}
							returnValue.x = ($container_w - $target_w * returnValue.scale) * 0.5;
							returnValue.y = ($container_h - $target_h * returnValue.scale) * 0.5;
							break;
			case 'contain':
							if($target_w / $target_h >= $container_w / $container_h){
								returnValue.scale = $container_w / $target_w; // contain
								// returnValue.scale = $container_h / $target_h; // cover
								}else{
								returnValue.scale = $container_h / $target_h; // contain
								// returnValue.scale = $container_w / $target_w; // cover
							}
							returnValue.x = ($container_w - $target_w * returnValue.scale) * 0.5;
							returnValue.y = ($container_h - $target_h * returnValue.scale) * 0.5;
							break;
			default: returnValue.scale = -1;
		}
		if(returnValue.scale == -1){
			alert('Mode Error!');
		}else{
			return returnValue;
		}
	}
}

