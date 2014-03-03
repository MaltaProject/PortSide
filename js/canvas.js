function canvas() 
{
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.5, 1000);
        camera.position.x = 0;
        camera.position.z = 4;
        camera.position.y = 0;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var texture    = new THREE.ImageUtils.loadTexture("data/textures/ship.png");
    var jsonLoader = new THREE.JSONLoader();

    jsonLoader.load('data/models/ship.js', addModelToScene);        
    var render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    render();
    
    function addModelToScene( geometry, materials ) 
    {
        var material = new THREE.MeshBasicMaterial({map:texture});
        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
    }
}


