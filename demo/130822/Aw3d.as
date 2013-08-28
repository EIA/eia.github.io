package project.page {
	import away3d.containers.*;
	import away3d.controllers.*;
	import away3d.debug.*;
	import away3d.entities.*;
	import away3d.events.*;
	import away3d.filters.BloomFilter3D;
	import away3d.library.assets.*;
	import away3d.lights.*;
	import away3d.materials.*;
	import away3d.materials.lightpickers.*;
	import away3d.materials.methods.*;
	import away3d.primitives.*;
	import away3d.utils.*;
	import com.greensock.TweenMax;
	import com.greensock.easing.*;
	
	import flash.display.*;
	import flash.events.*;
	import flash.geom.*;
	import flash.utils.*;
	/**
	 * ...
	 * @author eia
	 */
	 
	public class Aw3d extends Sprite
	{
		
		
		//engine variables
		private var _view:View3D;
		private var _cameraController:HoverController;
		
		//signature variables
		private var _signature:Sprite;
		private var _signatureBitmap:Bitmap;
		
		//light objects
		private var _light:DirectionalLight;
		private var _lightPicker:StaticLightPicker;
		private var _direction:Vector3D;
		
		//material objects
		private var _groundMaterial:TextureMaterial;
		
		//navigation variables
		private var _move:Boolean = false;
		private var _lastPanAngle:Number;
		private var _lastTiltAngle:Number;
		private var _lastMouseX:Number;
		private var _lastMouseY:Number;
		
		private var _meshCount:uint;

		
		private var _sphereMesh:Mesh;
		private var _cubes:Array = [];
		private var _cubesPosition:Array = [];
		
		
		
		
		public function Aw3d() 
		{
			addEventListener(Event.ADDED_TO_STAGE, _adh);
		}
		
		private function _adh(evt:Event):void {
			removeEventListener(Event.ADDED_TO_STAGE, _adh);
			init();
		}
		
		private function init():void 
		{
			initEngine();			
			initLights();		
			initObjects();
			initListeners();
		}
		
		private function initObjects():void 
		{
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			
			_meshCount		= 0;
			
			
			//setup the view
			_view = new View3D();
			
			addChild(_view);
			_view.filters3d = [new BloomFilter3D(15, 15, 0.3, 4, 3)];
			_view.antiAlias = 4;
			
			//setup the camera for optimal shadow rendering
			_view.camera.lens.far = 21000;
			
			//setup controller to be used on the camera
			//_cameraController = new HoverController(_view.camera, null, 45, 20, 200, 10);
			_cameraController = new HoverController(_view.camera, null, 45, 20, 2000, 10);

			_light = new DirectionalLight(-1, -1, 1);
			_direction = new Vector3D(-1, -1, 1);
			_lightPicker = new StaticLightPicker([_light]);
			_view.scene.addChild(_light);
			
			_view.antiAlias = 4;
			
			
			//setup the scene
			var testSp:SphereGeometry = new SphereGeometry(500, 16, 12);
			_sphereMesh = new Mesh(testSp, new ColorMaterial(0xff0000,.1));
			//_view.scene.addChild(_sphereMesh);
			_anaMesh();
		
			
			
			var floor:WireframePlane = new WireframePlane(2000, 2000, 20, 20, 0x1f1f1f, 1, WireframePlane.ORIENTATION_XZ);
			floor.y = -550;
			_view.scene.addChild(floor);
			
			
			
			
			
			//add stats panel
			addChild(new AwayStats(_view));
		
			//add listeners
			addEventListener(Event.ENTER_FRAME, onEnterFrame);
			
		}
		

		
		
		
		
		
		
		
		private function onStageMouseLeave(e:Event):void 
		{
			_move = false;
			stage.removeEventListener(Event.MOUSE_LEAVE, onStageMouseLeave);
		}
		
		private function onEnterFrame(e:Event):void 
		{
			
			_lastPanAngle = _cameraController.panAngle;
			_lastTiltAngle = _cameraController.tiltAngle;
			_lastMouseX = stage.mouseX;
			_lastMouseY = stage.mouseY;
			_move = true;
			
			_light.direction = _direction;
			_view.render();
			
			_cameraController.panAngle ++;
			_cameraController.update();
			
		}
		
		
		
		private function _anaMesh():void {
			var i:uint;
			var j:uint;
			var length:uint;
			var mesh:Mesh = _sphereMesh;
			var _linesSegmentSet:SegmentSet = new SegmentSet();
			_view.scene.addChild(_linesSegmentSet);
			//
			length = mesh.subMeshes[0].indexData.length;
			for (i = 0; i < length; i++ ) {
				if (i % 3 == 0) {

					var addCubeGeometry:CubeGeometry = new CubeGeometry(20, 20, 20);
					//var addMesh:Mesh = new Mesh(addCubeGeometry, new ColorMaterial(0xff0000,.3));
					var addMesh:Mesh = new Mesh(addCubeGeometry, new ColorMaterial(0xffffff,1));
						addMesh.x = mesh.subMeshes[0].vertexData[mesh.subMeshes[0].indexData[i + 1] * 3 + 0];
						addMesh.y = mesh.subMeshes[0].vertexData[mesh.subMeshes[0].indexData[i + 1] * 3 + 1];
						addMesh.z = mesh.subMeshes[0].vertexData[mesh.subMeshes[0].indexData[i + 1] * 3 + 2];
					//
					_view.scene.addChild(addMesh);
					_cubes.push(addMesh);
					_cubesPosition.push(new Vector3D(addMesh.x, addMesh.y, addMesh.z));
					addMesh.x = 0;
					addMesh.y = 0;
					addMesh.z = 0;
				}					
			}
			
			
			var tmpMesh:Mesh;
			var tmpVector3D:Vector3D;
			
			length = _cubes.length;
			for (i = 0; i < length; i++ ) {
				tmpMesh		= _cubes[i] as Mesh;
				tmpVector3D	= _cubesPosition[i] as Vector3D;
				TweenMax.to(tmpMesh, 3, { delay:.01 * i, x:tmpVector3D.x, y:tmpVector3D.y, z:tmpVector3D.z, ease:Back.easeOut, yoyo:true, repeat: -1,
											onUpdate:_tweenMaxUpdate,
											onUpdateParams:[tmpMesh, i]
				});
			}
		}
		private function _tweenMaxUpdate($mesh:Mesh, $id:uint):void {
			var tmpPercent:Number = $mesh.x / (_cubesPosition[$id] as Vector3D).x;
			//
			var tmpR:uint = tmpPercent * 256;
			var tmpG:uint = tmpPercent * 256;
			var tmpB:uint = tmpPercent * 256;
			($mesh.material as ColorMaterial).color =	tmpR * 256 * 256 +
														tmpG * 256*.5 +
														tmpB;
			
			
		}
		
		
		private function _anaPosition():void {
			var i:uint;
			var length:uint;
			var tmpMesh:Mesh;
			
			length = _cubes.length;
			for (i = 0; i < length; i++ ) {
				tmpMesh = _cubes[i] as Mesh;
				tmpMesh.x = _sphereMesh.subMeshes[0].vertexData[_sphereMesh.subMeshes[0].indexData[i + 0] * 3 + 0];
				tmpMesh.y = _sphereMesh.subMeshes[0].vertexData[_sphereMesh.subMeshes[0].indexData[i + 0] * 3 + 1];
				tmpMesh.z = _sphereMesh.subMeshes[0].vertexData[_sphereMesh.subMeshes[0].indexData[i + 0] * 3 + 2];
			}
		}
			
		private function initListeners():void {
		}
		
		private function initLights():void {
		}
		
		private function initEngine():void {
		}
	}
}