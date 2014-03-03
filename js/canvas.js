function canvas() 
{
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.PlaneGeometry(5, 5);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var square = new THREE.Mesh(geometry, material);
    scene.add(square);

    camera.position.z = 5;

    var render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    render();
}
