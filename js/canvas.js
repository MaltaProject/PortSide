    var socketio = io.connect("http://198.27.66.228:8080");
    var clock = new THREE.Clock();
    var scene = new THREE.Scene();
    var keyboard = new THREEx.KeyboardState();
    
    var objects = [];
    var projector;
    
    var selected = false; //if a user has an item selected
    var selection; //stores the selected item
    
    var materials = [];
    var geometrys = [];
    
    var active = false; //is the game room active
    
    socketio.on("msgc", function(data) {
			if(typeof objects[data.id] !== 'undefined' || objects[data.id] !== null)
			{
				addModelFS("patrol",data.xpos,data.ypos);
			}
			else
			{
				objects[data.id].position.x = data.xpos;
				objects[data.id].position.y = data.ypos;
			}
	});
	
	socketio.on("msgcm", function(data) {
		removeTweens(objects[data.id]);
		new TWEEN.Tween(objects[data.id].rotation, {override:true}).to( {
			z: (data.angle) }, (data.time/4) )
        .easing( TWEEN.Easing.Linear.None).start();
            
        new TWEEN.Tween(objects[data.id].position, {override:true}).to( {
            x: data.xpos,
			y: data.ypos }, data.time )
        .easing( TWEEN.Easing.Linear.None).start();
	});
	
	socketio.on("players", function(data) {
		if(data == 2)
		{
			obj = document.getElementById("wait");
			document.body.removeChild(obj);
			active = true;
		}
		else if(data < 2 || data > 2 && active == true)
		{
			objects = [];
			w = document.createElement('div');
			w.id = 'wait';
		}
	});

    
    var mouse = { x: 0, y: 0 }, INTERSECTED;

    var camera = new THREE.PerspectiveCamera(120, window.innerWidth/window.innerHeight, 0.5, 100);
        camera.position.set( 0, 0, 20);
        
    projector = new THREE.Projector();

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0x33CCFF, 1);
    document.body.appendChild(renderer.domElement);
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    
    THREEx.WindowResize(renderer, camera);
    
    animate();
	loadShips();
	
	function loadShips()
	{
		var type = 'command';
        var loader = new THREE.JSONLoader(); // init the loader util

        // init loading
        loader.load('data/models/'+type+'.js', function (geometry) {
        // create a new material
        var material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('data/textures/'+type+'.png', anisotropy = 16),  // specify and load the texture
        });
            geometrys.push(geometry);
            materials.push(material);
        });
	}
	
    function addModel(type, x, y)
    {
        var mesh = new THREE.Mesh(
            geometrys[0],
            materials[0]
        );
          
        mesh.position.set(x, y, 0);
          
        scene.add(mesh);
        objects.push(mesh);
        animate();
        sendShip(objects.length-1);
    }
    
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
    
    function animate() 
    {
        requestAnimationFrame( animate );
        render();
        update();
    }
    
    function render() 
    {
        TWEEN.update();
        renderer.render( scene, camera );
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
            
            var angle = Math.atan2(pos.y-selection.position.y,pos.x-selection.position.x); 
            
            var time = (pointDistance(selection.position.x, selection.position.y, pos.x, pos.y))/0.0125;
            
            sendShipMovement(selection.id, pos, time, angle)
            new TWEEN.Tween(selection.rotation, {override:true}).to( {
						z: (angle) }, (time/4) )
            .easing( TWEEN.Easing.Linear.None).start();
            
            new TWEEN.Tween(selection.position, {override:true}).to( {
                        x: pos.x,
						y: pos.y }, time )
            .easing( TWEEN.Easing.Linear.None).start();
            selected = false;
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
    
    function sink(id)
    {
        scene.remove(id[0].object);
        animate();
    }

	//networking block
	
	function sendShip(i) 
	{
			var w = objects[i].position.clone();
			var x = w.x;
			var y = w.y;
			
			var shipdata = {
				id: i,
				xpos: x,
				ypos: y
			}
			socketio.emit("msgs", shipdata);
	}

	function sendShipMovement(selid, pos, time, angle) 
	{
			var i = selid - 3;
			var w = objects[i].position.clone();
			var x = w.x;
			var y = w.y;
			
			var shipdata = {
				id: i,
				time: time,
				angle: angle,
				xpos: pos.x,
				ypos: pos.y
			}
			socketio.emit("msgsm", shipdata);
	}
