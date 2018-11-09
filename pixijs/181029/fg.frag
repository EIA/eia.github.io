precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 dimensions;
uniform vec4 filterArea;
uniform mat3 mappedMatrix;

uniform float uX;
uniform float uX2;
uniform float uX3;
uniform float uD;
uniform bool uDebugMode;


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
   
  void main() {

    vec2 uv = vTextureCoord;
    float mask = 0.;
    float maskDebug = 0.;

    float d = abs(uD);
    if(d<=0.0001){ d = 0.0; }

    uv = mapCoord(uv) / dimensions;

    mask = Rect(uv, uX - d*0.5, uX + d*.5, -0.4, 1.4, d*0.5);
    maskDebug = mask;

    mask *= d * 0.3;
    maskDebug *= 1.0;

    uv = unmapCoord(uv) * dimensions;
    

    /*
    取中間Height時用 mapCoord 的 uv5
    存圖食用 unmapCoord 的 uv2
    */

    vec2 uv2 = vTextureCoord;
    vec2 uv5 = vTextureCoord;
    uv5 = mapCoord(uv5) / dimensions;

    if(uv5.y > 0.5 ){
        if(uDebugMode == true){
            uv2.x += maskDebug;
        }else{
            uv2.x += mask;
        }
    }else{
        uv2.x += mask;
    }

    vec4 color = vec4(0.0);



    if(uv5.y > 0.5 ){
        if(uDebugMode == true){
            color = texture2D(uSampler, uv2);
            // color = vec4(maskDebug);
            color = mix(color, vec4(maskDebug), 0.5);
        }else{
            color = texture2D(uSampler, uv2);
        }
    }else{
        color = texture2D(uSampler, uv2);
    }
    
    uv5 = unmapCoord(uv5) * dimensions;


    


    gl_FragColor = color;

    if(uDebugMode == true){
        vec2 uv3 = vTextureCoord;
        float testShap = 0.0;
        float testShap2 = 0.0;
        float testShap3 = 0.0;
        uv3 = mapCoord(uv3) / dimensions;


        // v2 //
        testShap = Rect2(uv3, uX - 0.001, uX + 0.001, 0.0, 1.0);
        // testShap = Rect(uv3, uX - 0.01, uX + 0.01, 0.0, 1.0, 0.1);

        testShap2 = Rect2(uv3, uX2 - 0.001, uX2 + 0.001, 0.0, 1.0);
        // testShap2 = Rect(uv3, uX2 - 0.01, uX2 + 0.01, 0.0, 1.0, 0.1);

        testShap3 = Rect2(uv3, uX3 - 0.001, uX3 + 0.001, 0.0, 1.0);
        // testShap3 = Rect(uv3, uX2 - 0.01, uX2 + 0.01, 0.0, 1.0, 0.1);

        uv3 = unmapCoord(uv3) * dimensions;
        gl_FragColor = vec4(mix(vec3(gl_FragColor.xyz), vec3(1.0, 0.0, 0.0), testShap), 1.0);
        gl_FragColor = vec4(mix(vec3(gl_FragColor.xyz), vec3(1.0, 1.0, 0.0), testShap2 * 0.75), 1.0);
        gl_FragColor = vec4(mix(vec3(gl_FragColor.xyz), vec3(1.0, 1.0, 0.0), testShap3 * 0.75), 1.0);

    }


  }