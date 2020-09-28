const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);


const resolution = PIXI.settings.RESOLUTION;
const filterResolution = PIXI.settings.FILTER_RESOLUTION;
const rendererResolution = app.renderer.resolution;

alert(
    "resolution: " + resolution + "\n" + 
    "filterResolution: " + filterResolution + "\n" +
    "rendererResolution: " + rendererResolution
);
