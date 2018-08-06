var camera, scene, renderer, controls, 
    light, mesh, ui, mouse,
    raycaster;

var lights = [];

function init() {
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    controls = new THREE.OrbitControls( camera );

    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set( 0, 0, 10 );
    controls.update();

    raycaster = new THREE.Raycaster();
    scene = new THREE.Scene();

    
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
    requestAnimationFrame( animate );

    controls.update();
    renderer.render( scene, camera );
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
    //m.rotateY(1);
    scene.add(ui);
}

function updateUI(){

}

$('document').ready(()=>{
    init();
    animate();
});

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onContextMenu( event ) {
	event.preventDefault();
}

function onMouseDown( event ) {
  var mouse = new THREE.Vector2();
    event.preventDefault();
    
    switch ( event.which ) {
        case 1: // left mouse click
            console.log(event.clientX, event.clientY);
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
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