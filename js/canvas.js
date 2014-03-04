    mesh = new THREE.Object3D();
    var clock = new THREE.Clock();
    var scene = new THREE.Scene();
    var keyboard = new THREEx.KeyboardState();
    
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.5, 1000);
        camera.position.x = 0;
        camera.position.z = 17;
        camera.position.y = 0;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    THREEx.WindowResize(renderer, camera);

    var texture    = new THREE.ImageUtils.loadTexture("data/textures/ship.png");
    var jsonLoader = new THREE.JSONLoader();

    jsonLoader.load('data/models/ship.js', addModelToScene);        
    var render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    animate();
    
    function addModelToScene( geometry, materials ) 
    {
        var material = new THREE.MeshBasicMaterial({map:texture});
        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
    }
    
    function animate() 
    {
        requestAnimationFrame( animate );
        render();
        update();
    }
    
    function update()
    {
        var moveDistance = 10 * clock.getDelta(); 

        if ( keyboard.pressed("left") ) 
            mesh.translateX( -1 );
            
        if ( keyboard.pressed("right") ) 
            mesh.translateX(  1 );

        if ( keyboard.pressed("A") )
            mesh.translateX( -moveDistance );
            
        if ( keyboard.pressed("D") )
            mesh.translateX(  moveDistance );
    }
    



