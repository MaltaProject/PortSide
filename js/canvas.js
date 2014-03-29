    //three.js control 
    var clock = new THREE.Clock();
    var scene = new THREE.Scene();

    //3DObject array
    objects = [];
    
    
	//socket.io bind
	socketio = io.connect("http://198.27.66.228:8080"); 
    
    //Three.js projector for raycasting
    var projector = new THREE.Projector();
    
    var selected = false; //if a user has an item selected
    var selection; //stores the selected item
    
    //for caching models and textures
    var materials = [];
    var geometrys = [];
    
    //socket.io user processing
    socketio.on("msgc", function(data) { netship(data) } );
	socketio.on("msgcm", function(data) { netmove(data) });
	socketio.on("players", function(data) { netconnect(data) });

    //for raycasting
    var mouse = { x: 0, y: 0 }, INTERSECTED;
	
	//Three.js camera set to the user aspect ratio
    var camera = new THREE.PerspectiveCamera(120, window.innerWidth/window.innerHeight, 0.5, 100);
        camera.position.set( 0, 0, 20); //x,y,z

	//enable webGL rendering
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    //size the canvas
    renderer.setSize(window.innerWidth, window.innerHeight);
    //canvas backround color
    renderer.setClearColor( 0x33CCFF, 1);
    //appent the canvas to the web page
    document.body.appendChild(renderer.domElement);
    //listener for user input from mouse
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    
    //ThreeX canvas resize on browser window resize
    THREEx.WindowResize(renderer, camera);
    
    //start the game loop
    animate();
    //cache the texures, models
	loadShips();
	
	function loadShips() //needs to load all ship models in the future
	{
		var type = 'command';
        var loader = new THREE.JSONLoader(); //init the loader util

        //init loading
        loader.load('data/models/'+type+'.js', function (geometry) {
        //create a new material
        var material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('data/textures/'+type+'.png', anisotropy = 16),  //specify and load the texture
        });
            geometrys.push(geometry);
            materials.push(material);
        });
	}
	
	//adds a model locally
    function addModel(type, x, y)
    {
        var mesh = new THREE.Mesh(
            geometrys[0], //currently only loads one type of ship
            materials[0]
        );
          
        mesh.position.set(x, y, 0); //z = 0 because of 2d plane
          
        scene.add(mesh);
        
        objects.push(mesh); //push to the 3DObject array
        
        animate();
        
        sendShip(objects.length-1); //send ship to the server
    }
    
    //adds model from server 
    function addModelFS(type, x, y)
    {
		var mesh = new THREE.Mesh(
            geometrys[0],
            materials[0]
        );
          
        mesh.position.set(x, y, 0);
          
        scene.add(mesh);
        
        objects.push(mesh);
        
        animate();
        
    }
    
    //basic WebGL animate call
    function animate() 
    {
        requestAnimationFrame( animate );
        
        render();
        
        update();
    }
    
    //basic WebGL render call
    function render() 
    {
        TWEEN.update(); //keep the tween moving
        renderer.render( scene, camera );
    }
    
    //for ship selection
    function onDocumentMouseDown( event ) 
    {
        event.preventDefault();
		
		//generate vector based off mouse position
        var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
        //vector based off of camera position
        projector.unprojectVector( vector, camera );
        //normalize the vector and do raycasring on the two vectors
        var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
        //value of possible interested objects
        var intersects = raycaster.intersectObjects( objects );
 
        if(selected == true)
        {	
			//mouse vector
            var mousevec = new THREE.Vector3(
            ( event.clientX / window.innerWidth ) * 2 - 1,
            - ( event.clientY / window.innerHeight ) * 2 + 1,
            0.5 );
            
            //normalize the mouse vector compared to camera
            projector.unprojectVector( mousevec, camera );
            
			//direction of click from vector manipulation
            var dir = mousevec.sub( camera.position ).normalize();
            var distance = - camera.position.z / dir.z;
            var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
            
            //angle from starting point
            var angle = Math.atan2(pos.y-selection.position.y,pos.x-selection.position.x); 
            
            //calculate the time it should take for the tween to complete, needs to by based oof of ship type in the future
            var time = (pointDistance(selection.position.x, selection.position.y, pos.x, pos.y))/0.0125;
            
            //send tween to server
            sendShipMovement(selection.id, pos, time, angle)
            
            //angle tween
            new TWEEN.Tween(selection.rotation, {override:true}).to( { //overide set to true to prevent glitching in in tweens
						z: (angle) }, (time/4) )
            .easing( TWEEN.Easing.Linear.None).start();
            
            //position tween
            new TWEEN.Tween(selection.position, {override:true}).to( {
                        x: pos.x,
						y: pos.y }, time )
            .easing( TWEEN.Easing.Linear.None).start();
            selected = false;
        }
        //check if a ship has been clicked
        else if ( intersects.length > 0 ) 
        {
			//allows the next click to be an order to a ship
            selected = true;
            //allocate the 3DObject to allow movement
            selection = intersects[0].object;
        }
        else
        {
			//reset the selection system
            selected = false;
        }
    }
    
    //removes ships from screen
    function sink(id) //takes a 3DObject as argument
    {
		//remove from scene
        scene.remove(id[0].object); 
        animate();
    }
	
	
