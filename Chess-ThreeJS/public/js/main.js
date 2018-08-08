/*
    CHESS MASTER SUPREME
    .:Graphicalsssssss:.

*/
////////////////////////////////////////////////////////////////////////// READY RUNNER

$('document').ready(()=>{
    init();
    animate();
});

////////////////////////////////////////////////////////////////////////// VARIABLES

var camera, scene, renderer, controls, 
    light, mesh,
    raycaster, ui, mouse,
    OBJLoader, JSONLoader, manager;

var lights = [];

var playerOneCam = new THREE.Vector3(0,10,15);
var playerTwoCam = new THREE.Vector3(0,10, -15);

var blackMaterial = new THREE.MeshPhongMaterial({
    color: 0x110C11,
    reflectivity: 0.1,
    shininess: 20,
    flatShading: THREE.SmoothShading
});

var whiteMaterial = new THREE.MeshPhongMaterial({
    color: 0xFCF6E3,
    reflectivity: 0.1,
    shininess: 20,
    flatShading: THREE.SmoothShading
});

////////////////////////////////////////////////////////////////////////// INIT

function init() {
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    controls = new THREE.OrbitControls( camera );

    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set( 0, 10, 15 );
    camera.lookAt(0, 0, 0);
    controls.update();

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    scene = new THREE.Scene();

    // Load Objects
    manager = new THREE.LoadingManager();
    JSONLoader = new THREE.JSONLoader(manager);
    JSONLoader.load(
        'models/Pawn.model.json',
        function(geometry, materials){
            var material = materials;
            var object = new THREE.Mesh(geometry, material);
            scene.add(object);
        },
        function(xhr){
            console.log((xhr.loaded/xhr.total * 100) + '% loaded');
        },
        function (error){
            console.log('An error occured')
        }
    );

    createLight();
    createBoard();
    createPieces();
    createUI();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xffffff, 1 );

    // // //
    document.body.appendChild( renderer.domElement );

    document.addEventListener( 'mousedown', onMouseDown, false );
    document.addEventListener( 'contextmenu', onContextMenu, false );
    window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
    //Scene update
    requestAnimationFrame( animate );

    controls.update();
    renderer.render( scene, camera );
}

////////////////////////////////////////////////////////////////////////// INIT CONSTRUCTORS

function raycast(){
    // Raycaster Update
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    for(var i = 0; i<intersects.length; i++){
        intersects[i].object.material.color.set(0xff0000);
    }
}

function createLight(){
    light = new THREE.AmbientLight( 0x404040 );
    scene.add( light );
}

function createBoard(){
    for(let i = 0; i<8; i++){
        for(let j = 0; j<8; j++){
            var geometry = new THREE.BoxGeometry( 1.0, 1.0, 1.0 );
            var material = new THREE.MeshBasicMaterial();
            material.color = new THREE.Color( 1 - i/10, 0 + i/10, 0 + j/(10+i));
        
            mesh = new THREE.Mesh( geometry, material );
            mesh.position.set(i-3.5, 1.0, j-3.5);
            scene.add( mesh );
        }
    }
}

function createPieces(){
    for(var i = 0; i<4; i++){
        let zpos = -3.5 + i;
        if(i > 1){
            zpos = i + 0.5;
        }
        for(var j = 0; j<8; j++){
            var geometry = new THREE.SphereGeometry( 0.1, 0.1, 128 );
            var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
            var sphere = new THREE.Mesh( geometry, material );

            sphere.material.color = new THREE.Color((-4 + j), 0, zpos);
            sphere.position.set((-3.5 + j), 2, zpos);
            scene.add( sphere );
        }
    }
}

function createUI(){

    var o = new THREE.PlaneGeometry(10,10);
    var c = new THREE.MeshBasicMaterial();
    c.color = new THREE.Color(0,1,0);
    ui = new THREE.Mesh(o, c);
    ui.material.side = THREE.DoubleSide;
    ui.position.set(10,1,1);
    ui.rotateY(1);
    scene.add(ui);
}

function updateUI(){

}

////////////////////////////////////////////////////////////////////////// Interactions

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onContextMenu( event ) {
	event.preventDefault();
}

function onMouseMove( event ) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onMouseDown( event ) {
  var mouse = new THREE.Vector2();
    event.preventDefault();
    
    switch ( event.which ) {
        case 1: // left mouse click
            console.log(event.clientX, event.clientY);
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            
            raycast();
            // console.log(mouse);
            // mouse.unproject( camera );
            // console.log(mouse);
            //addPoint( mouse );
        break;
        
        case 3: // right mouse click
            console.log(event.clientX, event.clientY);
            //removeLastPoint();
        break;
    }

}