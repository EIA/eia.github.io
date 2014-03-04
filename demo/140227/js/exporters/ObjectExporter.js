/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.ObjectExporter = function () {};

THREE.ObjectExporter.prototype = {

	constructor: THREE.ObjectExporter,

	parse: function ( object ) {

		// console.log( object );

		var output = {
			metadata: {
				version: 4.3,
				type: 'Object',
				generator: 'ObjectExporter'
			}
		};

		//

		var geometries = {};
		var geometryExporter = new THREE.GeometryExporter();
		var bufferGeometryExporter = new THREE.BufferGeometryExporter();

		var parseGeometry = function ( geometry ) {

			if ( output.geometries === undefined ) {

				output.geometries = [];

			}

			if ( geometries[ geometry.uuid ] === undefined ) {

				var data = {};

				data.uuid = geometry.uuid;

				if ( geometry.name !== "" ) data.name = geometry.name;

				if ( geometry instanceof THREE.PlaneGeometry ) {

					data.type = 'PlaneGeometry';
					data.width = geometry.width;
					data.height = geometry.height;
					data.widthSegments = geometry.widthSegments;
					data.heightSegments = geometry.heightSegments;

				} else if ( geometry instanceof THREE.CubeGeometry ) {

					data.type = 'CubeGeometry';
					data.width = geometry.width;
					data.height = geometry.height;
					data.depth = geometry.depth;
					data.widthSegments = geometry.widthSegments;
					data.heightSegments = geometry.heightSegments;
					data.depthSegments = geometry.depthSegments;

				} else if ( geometry instanceof THREE.CircleGeometry ) {

					data.type = 'CircleGeometry';
					data.radius = geometry.radius;
					data.segments = geometry.segments;

				} else if ( geometry instanceof THREE.CylinderGeometry ) {

					data.type = 'CylinderGeometry';
					data.radiusTop = geometry.radiusTop;
					data.radiusBottom = geometry.radiusBottom;
					data.height = geometry.height;
					data.radialSegments = geometry.radialSegments;
					data.heightSegments = geometry.heightSegments;
					data.openEnded = geometry.openEnded;

				} else if ( geometry instanceof THREE.SphereGeometry ) {

					data.type = 'SphereGeometry';
					data.radius = geometry.radius;
					data.widthSegments = geometry.widthSegments;
					data.heightSegments = geometry.heightSegments;
					data.phiStart = geometry.phiStart;
					data.phiLength = geometry.phiLength;
					data.thetaStart = geometry.thetaStart;
					data.thetaLength = geometry.thetaLength;

				} else if ( geometry instanceof THREE.IcosahedronGeometry ) {

					data.type = 'IcosahedronGeometry';
					data.radius = geometry.radius;
					data.detail = geometry.detail;

				} else if ( geometry instanceof THREE.TorusGeometry ) {

					data.type = 'TorusGeometry';
					data.radius = geometry.radius;
					data.tube = geometry.tube;
					data.radialSegments = geometry.radialSegments;
					data.tubularSegments = geometry.tubularSegments;
					data.arc = geometry.arc;

				} else if ( geometry instanceof THREE.TorusKnotGeometry ) {

					data.type = 'TorusKnotGeometry';
					data.radius = geometry.radius;
					data.tube = geometry.tube;
					data.radialSegments = geometry.radialSegments;
					data.tubularSegments = geometry.tubularSegments;
					data.p = geometry.p;
					data.q = geometry.q;
					data.heightScale = geometry.heightScale;

				} else if ( geometry instanceof THREE.BufferGeometry ) {

					data.type = 'BufferGeometry';
					data.data = bufferGeometryExporter.parse( geometry );

					delete data.data.metadata;

				} else if ( geometry instanceof THREE.Geometry ) {

					data.type = 'Geometry';
					data.data = geometryExporter.parse( geometry );

					delete data.data.metadata;

				}

				geometries[ geometry.uuid ] = data;

				output.geometries.push( data );

			}

			return geometry.uuid;

		};

		//

		var materials = {};
		var materialExporter = new THREE.MaterialExporter();

		var parseMaterial = function ( material ) {

			if ( output.materials === undefined ) {

				output.materials = [];

			}

			if ( materials[ material.uuid ] === undefined ) {

				var data = materialExporter.parse( material );

				delete data.metadata;

				materials[ material.uuid ] = data;

				output.materials.push( data );

			}

			return material.uuid;

		};

		//

		var parseObject = function ( object ) {

			var data = {};

			data.uuid = object.uuid;

			if ( object.name !== '' ) data.name = object.name;
			if ( JSON.stringify( object.userData ) !== '{}' ) data.userData = object.userData;
			if ( object.visible !== true ) data.visible = object.visible;

			if ( object instanceof THREE.Scene ) {

				data.type = 'Scene';

			} else if ( object instanceof THREE.PerspectiveCamera ) {

				data.type = 'PerspectiveCamera';
				data.fov = object.fov;
				data.aspect = object.aspect;
				data.near = object.near;
				data.far = object.far;

			} else if ( object instanceof THREE.OrthographicCamera ) {

				data.type = 'OrthographicCamera';
				data.left = object.left;
				data.right = object.right;
				data.top = object.top;
				data.bottom = object.bottom;
				data.near = object.near;
				data.far = object.far;

			} else if ( object instanceof THREE.AmbientLight ) {

				data.type = 'AmbientLight';
				data.color = object.color.getHex();

			} else if ( object instanceof THREE.DirectionalLight ) {

				data.type = 'DirectionalLight';
				data.color = object.color.getHex();
				data.intensity = object.intensity;

			} else if ( object instanceof THREE.PointLight ) {

				data.type = 'PointLight';
				data.color = object.color.getHex();
				data.intensity = object.intensity;
				data.distance = object.distance;

			} else if ( object instanceof THREE.SpotLight ) {

				data.type = 'SpotLight';
				data.color = object.color.getHex();
				data.intensity = object.intensity;
				data.distance = object.distance;
				data.angle = object.angle;
				data.exponent = object.exponent;

			} else if ( object instanceof THREE.HemisphereLight ) {

				data.type = 'HemisphereLight';
				data.color = object.color.getHex();
				data.groundColor = object.groundColor.getHex();

			} else if ( object instanceof THREE.Mesh ) {

				data.type = 'Mesh';
				data.geometry = parseGeometry( object.geometry );
				data.material = parseMaterial( object.material );

			} else if ( object instanceof THREE.Sprite ) {

				data.type = 'Sprite';
				data.material = parseMaterial( object.material );

			} else {

				data.type = 'Object3D';

			}

			data.matrix = object.matrix.toArray();

			if ( object.children.length > 0 ) {

				data.children = [];

				for ( var i = 0; i < object.children.length; i ++ ) {

					data.children.push( parseObject( object.children[ i ] ) );

				}

			}

			return data;

		}

		output.object = parseObject( object );

		return output;

	}

}
