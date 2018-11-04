precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 dimensions;
uniform vec4 filterArea;
uniform mat3 mappedMatrix;

uniform bool uShowUV;
uniform bool uTestMask;
uniform bool uTestShap;
uniform float uX;
uniform float uD;


float Circle(vec2 uv, vec2 p, float r, float blur){
    float d = length(uv-p);
    float c = smoothstep(r, r-blur, d);

    return c;
}


float Band2(float t, float start, float end){
    float step1 = step(t, start);
    float step2 = step(t, end);
    return step1-step2;
}
float Rect2(vec2 uv, float left, float right, float bottom , float top){
	float  band1 = Band2(uv.x, left, right);
    float  band2 = Band2(uv.y, bottom, top);
    
    /*相交 = 用乘的*/
    return band1 * band2;
}



float Band(float t, float start, float end, float blur){
    float step1 = smoothstep(start - blur, start + blur, t);
    float step2 = smoothstep(end - blur, end + blur, t);
    return step1-step2;
}

float Rect(vec2 uv, float left, float right, float bottom , float top, float blur){
	float  band1 = Band(uv.x, left, right, blur);
    float  band2 = Band(uv.y, bottom, top, blur);
    
    /*相交 = 用乘的*/
    return band1 * band2;
}

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

  // vec2 warpAmount = vec2( 2.0 / 34.0, 1.0 / 16.0 );
  // vec2 warpAmount = vec2( 1.0 / 1.0, 1.0 / 1.0 );
  vec2 warpAmount = vec2( 1.0 / 4.0, 1.0 / 32.0 );

  vec2 warp(vec2 pos)
  {
    pos = pos * 2.0 - 1.0;
    pos *= vec2(
      1.0 + (pos.y * pos.y) * warpAmount.x,
      1.0 + (pos.x * pos.x) * warpAmount.y
    );
    return pos * 0.5 + 0.5;
  }
   
  void main() {

    vec2 uv = vTextureCoord;
    // vec3 tmp = vec3(vTextureCoord.xy, 1.0) * mappedMatrix;
    // vec2 uv = tmp.xy;

    float mask = 0.;
    float d = abs(uD);
    if(d<=0.0001){
        d = 0.0;
    }
    uv = mapCoord(uv) / dimensions;
    mask = Rect(uv, uX - d, uX + d, -0.4, 1.4, d*0.6);
    
    if(uTestMask == true){
        mask *= 1.0;
    }else{
        // mask *= 0.1;
        // mask *= d * 0.5;
        mask *= d * 0.3;
    }

    uv = unmapCoord(uv) * dimensions;
    gl_FragColor = vec4(mask);




    vec2 uv2 = vTextureCoord;
    // vec3 tmp2 = vec3(vTextureCoord.xy, 1.0) * mappedMatrix;
    // vec2 uv2 = tmp2.xy;
    uv2 = mapCoord(uv2) / dimensions;
    uv2.x += mask;
    

    // 重複的部分轉過來
    // 1.1 ~ 2.0
    // 0.9 ~ 0.0

    // -0.1 ~ -1.0
    // -0.9	~  0.0
    if(uv2.x < 0.0){ uv2.x = -1.0 - uv2.x; }
    if(uv2.x > 1.0){ uv2.x = 2.0 - uv2.x; }
    if(uv2.y < 0.0){ uv2.y = -1.0 - uv2.y; }
    if(uv2.y > 1.0){ uv2.y = 2.0 - uv2.y; }

    uv2 = unmapCoord(uv2) * dimensions;

    vec4 color = texture2D(uSampler, uv2);
    

    if(uShowUV == true){
        gl_FragColor = color;
    }

    if(uTestShap == true){
        vec2 uv3 = vTextureCoord;
        float testShap = 0.0;
        uv3 = mapCoord(uv3) / dimensions;

        // v1 //
        testShap = Circle(uv3, vec2(uX, 0.5), abs(uD+0.02), .01);

        // v2 //
        testShap = Rect2(uv3, uX - 0.001, uX + 0.001, 0.0, 1.0);
        // testShap = Rect(uv3, uX - 0.01, uX + 0.01, 0.0, 1.0, 0.1);

        uv3 = unmapCoord(uv3) * dimensions;
        gl_FragColor = vec4(mix(vec3(gl_FragColor.xyz), vec3(1.0, 1.0, 0.0), testShap), 1.0);
    }


    //////////////////////////////////////////////////////////////////////////////////

    /*
    vec2 uv3 = vTextureCoord;
    vec4 clearColor = texture2D(uSampler, uv3);
    gl_FragColor = clearColor;
    */

  }