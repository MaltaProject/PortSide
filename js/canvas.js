    var clock = new THREE.Clock();
    var scene = new THREE.Scene();
    var keyboard = new THREEx.KeyboardState();
    var objects = [];
    var projector;
    var selected = false; //if a user has an item selected
    var selection; //stores the selected item
    
    var mouse = { x: 0, y: 0 }, INTERSECTED;

    var camera = new THREE.PerspectiveCamera(120, window.innerWidth/window.innerHeight, 0.5, 100);
        camera.position.set( 0, 0, 20);
        
    projector = new THREE.Projector();

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    
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
        TWEEN.update();
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
    
    function onDocumentMouseDown( event ) 
    {
        event.preventDefault();

        var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
        projector.unprojectVector( vector, camera );

        var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

        var intersects = raycaster.intersectObjects( objects );

        if(selected == true)
        {
            var mousevec = new THREE.Vector3(
            ( event.clientX / window.innerWidth ) * 2 - 1,
            - ( event.clientY / window.innerHeight ) * 2 + 1,
            0.5 );
            
            projector.unprojectVector( mousevec, camera );

            var dir = mousevec.sub( camera.position ).normalize();

            var distance = - camera.position.z / dir.z;

            var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
            
            var angle = Math.atan2(pos.y,pos.x); //need to store current angle of ship
            
            new TWEEN.Tween(selection.rotation ).to( {
						z: angle }, 4000 )
            .easing( TWEEN.Easing.Linear.None).start();
            
            new TWEEN.Tween(selection.position).to( {
                        x: pos.x,
						y: pos.y }, 8000 )
            .easing( TWEEN.Easing.Linear.None).start();
            selected = false;
            console.log(event.clientX + "--" + event.clientY);
        }
        else if ( intersects.length > 0 ) 
        {
            selected = true;
            selection = intersects[0].object;
        }
        else
        {
            selected = false;
        }
    }



//LSALB5
