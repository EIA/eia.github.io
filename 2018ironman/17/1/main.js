var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);


var arcContainer = new PIXI.Container();
app.stage.addChild(arcContainer);
arcContainer.position.x = app.renderer.width * 0.5;
arcContainer.position.y = app.renderer.height * 0.5;



var t = new PIXI.Graphics();
var totalCount = 360;
for(var i = 0;i< totalCount; i++){
	var colorArray = hsvToRGB2( i * 360 / totalCount, 1, 1);
	var color = colorArray[0] * 65536 + colorArray[1] * 256 + colorArray[2];

	var arcGraphic = new PIXI.Graphics();
		arcGraphic.beginFill(color, 1);
		arcGraphic.arc( 0, 0, 200, (0) * (Math.PI / 180), (1) * (Math.PI / 180) );
		arcGraphic.endFill();


		arcGraphic.beginFill(color, 1);
		arcGraphic.moveTo(0, 0);
		arcGraphic.lineTo(0, 200);
		arcGraphic.lineTo(Math.sin( 2 * (Math.PI / 180)) * 200, Math.cos( 2 * (Math.PI / 180)) * 200);
		arcGraphic.lineTo(0, 0);
		arcGraphic.endFill();

		arcGraphic.rotation = i * (Math.PI / 180);
		arcContainer.addChild(arcGraphic);
}





function hsvToRGB2(hue, saturation, value) {
	var hi;
	var f;
	var p;
	var q;
	var t;

	while (hue < 0) {
	hue += 360;
	}
	hue = hue % 360;

	saturation = saturation < 0 ? 0
	: saturation > 1 ? 1
	: saturation;

	value = value < 0 ? 0
	: value > 1 ? 1
	: value;

	value *= 255;
	hi = (hue / 60 | 0) % 6;
	f = hue / 60 - hi;
	p = value * (1 -           saturation) | 0;
	q = value * (1 -      f  * saturation) | 0;
	t = value * (1 - (1 - f) * saturation) | 0;
	value |= 0;

	switch (hi) {
	case 0:
	  return [value, t, p];
	case 1:
	  return [q, value, p];
	case 2:
	  return [p, value, t];
	case 3:
	  return [p, q, value];
	case 4:
	  return [t, p, value];
	case 5:
	  return [value, p, q];
	}
}