function Observable() {
    this.subscribers = [];
}
Observable.prototype.subscribe = function (callback) {
    this.subscribers.push(callback);
}
Observable.prototype.next = function () {
    this.subscribers.forEach(function (s) {
        s();
    });
}


var animateObserver = new Observable();

var scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.classList.add("background-canvas");
document.querySelector(".home--background-canvas").appendChild(renderer.domElement);

var mouseX = 0;
var mouseY = 0;


var spriteSources = [
    "001-mobile-phone.png",
    "002-headphones.png",
    "003-diskette.png",
    "004-grid-world.png",
    "006-telegram-logo.png",
    "005-coffee.png",
    "007-clock-circular-outline.png",
    "photo-camera.png"
];

function drawImage(src) {
    var texture = new THREE.TextureLoader().load(src);
    var material = new THREE.SpriteMaterial({ map: texture, color: 0xffffff, fog: true });
    var sprite = new THREE.Sprite(material);
    sprite.position.x = Math.random() * 2 - 1;
    sprite.position.y = Math.random() * 2 - 1;
    sprite.position.z = Math.random() * 2 - 1;
    sprite.position.normalize();
    sprite.position.multiplyScalar(Math.random() * 10 + 600);
    sprite.scale.multiplyScalar(20);

    scene.add(sprite);

    return sprite;
}


var images = [];
for (var i = 0; i < 100; i++) {
    var imageSource = spriteSources[Math.min(
        Math.max(
            0,
            Math.floor(Math.random() * spriteSources.length)
        ),
        spriteSources.length - 1
    )];
    images.push(drawImage('app/background-canvas/img/' + imageSource));
}

function updateImages() {
    images.forEach(function (i) {
        // i.position.x += Math.random() - 0.5;
        // i.position.y += Math.random() - 0.5;
        // // i.position.z += 0.07;
    });
}
animateObserver.subscribe(updateImages);


// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({ color: 0x999999 });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// function rotateCube() {
//     cube.rotation.x += 0.1;
//     cube.rotation.y += 0.1;
// }

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
}

function onDocumentTouchStart(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - window.innerWidth / 2;
        mouseY = event.touches[0].pageY - window.innerHeight / 2;
    }
}

function onDocumentTouchMove(event) {
    if (event.touches.length == 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - window.innerWidth / 2;
        mouseY = event.touches[0].pageY - window.innerHeight / 2;
    }
}

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('touchstart', onDocumentTouchStart, false);
document.addEventListener('touchmove', onDocumentTouchMove, false);
window.addEventListener('resize', onWindowResize, false);

(function () {
    function animate() {
        animateObserver.next();
        requestAnimationFrame(animate);

        camera.position.x += (mouseX - camera.position.x) * .05;
        camera.position.y += (- mouseY - camera.position.y) * .05;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
    animate();
})();


