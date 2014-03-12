    var clock = new THREE.Clock();
    var scene = new THREE.Scene();
    var keyboard = new THREEx.KeyboardState();
    var objects = [];

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.5, 1000);
        camera.position.set( 0, 0, 20);


    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    THREEx.WindowResize(renderer, camera);
    
    animate();

    /*
     * type  gives the type of model to be loaded
     * location  gives the location to draw the model
     * iff gives the team that the ship should be assigned to
     */
    function addModel(type, location, iff)
    {
        var loader = new THREE.JSONLoader(); // init the loader util

        // init loading
        loader.load('data/models/'+type+'.js', function (geometry) {
        // create a new material
        var material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('data/textures/'+type+'.png'),  // specify and load the texture
        });
  
          // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material
        );
          
        
          
        scene.add(mesh);
        objects.push(mesh);
        });
        
    }
    
    function animate() 
    {
        requestAnimationFrame( animate );
        render();
        input();
        update();
    }
    
    function render() 
    {
        renderer.render( scene, camera );
    }
    
    function input()
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
        
        if ( keyboard.pressed("V") )
            addModel("patrol",1,3);
    }
    



