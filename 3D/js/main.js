var scene, camera, renderer, controls, model, message, render, mesh;

function showInput() {
	var text = document.getElementById("user_input").value;
	console.log(text);
	init(text);
}

function init(test) {

	//Création de la Scène en Three.js
	//Création de la vue en perspective
	//Position de la caméra par rapport au centre
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.z = -12;

	//Création du Renderer en Fullscreen
	var renderer = new THREE.WebGLRenderer({antialias: true, alpha: false});
	renderer.setClearColor("#c9c9c9");
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', function() {
		renderer.setSize(window.innerWidth,window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();
	});

	//Création des points lumineux
	var pointLight = new THREE.PointLight( 0xFFFFFF );
	var pointLight2 = new THREE.PointLight( 0xFFFFFF );
	var pointLight3 = new THREE.PointLight( 0xFFFFFF );
	var pointLight4 = new THREE.PointLight( 0xFFFFFF );

	//Position des quatre points lumineux
	pointLight.position.set(100, 10, 100);
	pointLight2.position.set(-100, 10, -100);
	pointLight3.position.set(-100, 10, 100);
	pointLight4.position.set(100, 10, -100);
	scene.add(pointLight, pointLight2, pointLight3, pointLight4);

	//Autorisation des contrôles clavier/souris
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	//Objet GLTF
	console.log("<-----");
	console.log(test);
	console.log("----->");

	var loader = new THREE.GLTFLoader();
	loader.load('V1/scene.gltf', function(gltf) {
		scene.add(gltf.scene);
		model = gltf.scene;
	})

	var load2 = new THREE.FontLoader();
	load2.load( 'fonts/gentilis_regular.typeface.json', function ( font ) {
		var textGeo = new THREE.TextGeometry( test, {
	        font: font,
	        size: 0.4,
	        height: 0.01,
	        curveSegments: 21,
	        bevelEnabled: false
	    } );

	    var textMaterial = new THREE.MeshPhongMaterial( { color: 0xb5b5b5 } );
	    var mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.set(1, -3, -1.1);
		mesh.rotation.y = Math.PI;
		// mesh.rotation.x = Math.PI / 4;
	    scene.add( mesh );
	} );

	// mesh = new THREE.Mesh(model, geometry);
	// mesh.position.y = 0;
	// scene.add(mesh);
	// var geometry = new THREE.CylinderGeometry(1,1,5,64,64);
	// var material = new THREE.MeshPhongMaterial({color: 0x00f9ff, side:THREE.DoubleSide, wireframe: true});
	// var cone = new THREE.Mesh(geometry, material);
	// scene.add(cone);
	var render = function () {
		requestAnimationFrame(render);
		// mesh.rotation.y += 0.01;
		renderer.render(scene, camera);
	};
	render();
}
