// warp shader effect sample not working.
// Effect is more visible in the topleft corner but it should be equal on 4 corners
// vTextureCoord seems to be off???

var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

var PIC_WIDTH = 320, PIC_HEIGHT = 186;

// create filter
var fragSrc = `
  precision mediump float;
  varying vec2 vTextureCoord;
  uniform sampler2D uSampler;
  uniform vec2 dimensions;
uniform vec4 filterArea;

vec2 mapCoord( vec2 coord )
{
    coord *= filterArea.xy;
    coord += filterArea.zw;

    return coord;
}

vec2 unmapCoord( vec2 coord )
{
    coord -= filterArea.zw;
    coord /= filterArea.xy;

    return coord;
}

  vec2 warpAmount = vec2( 2.0 / 34.0, 1.0 / 16.0 );

  vec2 warp(vec2 pos)
  {
    pos = pos * 2.0 - 1.0;
    pos *= vec2(
      1.0 + (pos.y * pos.y) * warpAmount.x,
      1.0 + (pos.x * pos.x) * warpAmount.y
    );
    return pos * 0.5 + 0.5;;
  }
   
  void main() {
    vec2 coord = vTextureCoord;
    coord = mapCoord(coord ) / dimensions;
    coord = warp( coord );
    coord = unmapCoord(coord * dimensions);
    gl_FragColor = texture2D( uSampler, coord );
  }
`.split('\n').reduce( (c, a) => c + a.trim() + '\n' );

var uniforms = { dimensions: { type: 'v2', value: [320, 186] } };
filter = new PIXI.Filter( null, fragSrc, uniforms );
filter.apply = function(filterManager, input, output)
{
  this.uniforms.dimensions[0] = input.sourceFrame.width
  this.uniforms.dimensions[1] = input.sourceFrame.height

  // draw the filter...
  filterManager.applyFilter(this, input, output);
}

// load image
var img = document.getElementById( "grid_img" );
var texture = PIXI.Texture.from( img );
var sprite = new PIXI.Sprite( texture );
app.stage.addChild( sprite );

// apply filter
sprite.filters = [ filter ];



/*
var sprite2 = new PIXI.Sprite( texture );
app.stage.addChild( sprite2 );

sprite2.x = sprite2.y = 200;
sprite2.scale.x = sprite2.scale.y = 2;
sprite2.filters = [ filter ];
sprite2.filterArea = app.screen;
*/

window.onresize = function (event){
  var w = window.innerWidth;
  var h = window.innerHeight;

  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.renderer.resize(w,h);




  var scalePercent;
      if(app.screen.width / app.screen.height > PIC_WIDTH / PIC_HEIGHT ){
        // scalePercent = app.screen.width / PIC_WIDTH; // cover
        scalePercent = app.screen.height / PIC_HEIGHT; // contain
      }else{
        // scalePercent = app.screen.height / PIC_HEIGHT; // cover
        scalePercent = app.screen.width / PIC_WIDTH; // contain
      }


      sprite.width = Math.round(PIC_WIDTH * scalePercent);
      sprite.height = Math.round(PIC_HEIGHT * scalePercent);

      sprite.x = Math.round((sprite.width - app.screen.width) * -.5);
      sprite.y = Math.round((sprite.height - app.screen.height) * -.5);

      sprite.filterArea = app.screen;


};

onresize();