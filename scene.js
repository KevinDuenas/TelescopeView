
function createPathStrings(filename) {
  const basePath = "./public/";
  const baseFilename = basePath + filename;
  const fileType = ".png";
  const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
  const pathStings = sides.map((side) => {
    console.log(baseFilename + "_" + side + fileType);
    return baseFilename + "_" + side + fileType;
  });
  return pathStings;
}

function createMaterialArray(filename) {
  const skyboxImagepaths = createPathStrings(filename);
  const materialArray = skyboxImagepaths.map((image) => {
    let texture = new THREE.TextureLoader().load(image);
    return texture;
  });
  return materialArray;
}

function createMaterialArray(filename) {
  const skyboxImagepaths = createPathStrings(filename);
  const materialArray = skyboxImagepaths.map((image) => {
    let texture = new THREE.TextureLoader().load(image);
    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }); // <---
  });
  return materialArray;
}

let skyboxMesh

const skybox = () => {
  let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  let skybox = new THREE.Mesh(skyboxGeo);

  const materialArray = createMaterialArray("corona");
  skyboxGeo = new THREE.BoxGeometry(25000, 25000, 25000);
  skybox = new THREE.Mesh(skyboxGeo, materialArray);
  skyboxMesh = skybox
  scene.add(skybox);

}

const scene = new THREE.Scene();
const clock = new THREE.Clock();

//Camara
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  45,
  30000
);
camera.position.set(1200, -250, 2000);

//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = "canvas";
document.body.appendChild(renderer.domElement);

// Venus
const venusTexture = new THREE.TextureLoader().load('./textures/venus.jpg');
const venusGeometry = new THREE.SphereGeometry( 400, 400, 400 );
const venusMaterial = new THREE.MeshLambertMaterial({map: venusTexture});
const venus = new THREE.Mesh( venusGeometry, venusMaterial );
venus.position.set(5000,4000,4000);
scene.add( venus );

// Jupiter
const jupiterTexture = new THREE.TextureLoader().load('./textures/jupiter.jpg');
const jupiterGeometry = new THREE.SphereGeometry( 400, 400, 400 );
const jupiterMaterial = new THREE.MeshLambertMaterial({map: jupiterTexture});
const jupiter = new THREE.Mesh( jupiterGeometry, jupiterMaterial );
jupiter.position.set(-5000,1000,200);
scene.add( jupiter );

// Mars
const marsTexture = new THREE.TextureLoader().load('./textures/mars.jpg');
const marsGeometry = new THREE.SphereGeometry( 400, 400, 400 );
const marsMaterial = new THREE.MeshLambertMaterial({map: marsTexture});
const mars = new THREE.Mesh( marsGeometry, marsMaterial );
mars.position.set(-500,8000,-4000);
scene.add( mars );

// Mercury
const mercuryTexture = new THREE.TextureLoader().load('./textures/mercury.jpg');
const mercuryGeometry = new THREE.SphereGeometry( 400, 800, 400 );
const mercuryMaterial = new THREE.MeshLambertMaterial({map: mercuryTexture});
const mercury = new THREE.Mesh( mercuryGeometry, mercuryMaterial );
mercury.position.set(-10000,-4025,200);
scene.add( mercury );

// Neptune
const neptuneTexture = new THREE.TextureLoader().load('./textures/neptune.jpg');
const neptuneGeometry = new THREE.SphereGeometry( 900, 900, 900 );
const neptuneMaterial = new THREE.MeshLambertMaterial({map: neptuneTexture});
const neptune = new THREE.Mesh( neptuneGeometry, neptuneMaterial );
neptune.position.set(-2500,250,-4500);
scene.add( neptune );

// Uranus
const uranusTexture = new THREE.TextureLoader().load('./textures/uranus.jpg');
const uranusGeometry = new THREE.SphereGeometry( 700, 700, 700 );
const uranusMaterial = new THREE.MeshLambertMaterial({map: uranusTexture});
const uranus = new THREE.Mesh( uranusGeometry, uranusMaterial );
uranus.position.set(4820,250,-8000);
scene.add( uranus );

// Sun
const sunTexture = new THREE.TextureLoader().load('./textures/sun.jpg');
const sunGeometry = new THREE.SphereGeometry( 3000, 3000, 3000 );
const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture});
const sun = new THREE.Mesh(sunGeometry, sunMaterial );
sun.position.set(-3000,10000,5000);
scene.add( sun );


// Comet
const fire = new VolumetricFire(fireWidth = 500, fireHeight = 1000, fireDepth = 500, sliceSpacing = 400, camera);
fire.mesh.position.set(-5000,400,1000);
fire.mesh.rotation.x = 5
scene.add(fire.mesh);

const geometry = new THREE.SphereGeometry( 50, 50, 50 );
const material = new THREE.MeshLambertMaterial();
const rock = new THREE.Mesh( geometry, material );
rock.position.set(-5000,500,1000);
//scene.add(rock);


//controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.minDistance = 1500;
controls.maxDistance = 12000;
controls.update()


const listener = new THREE.AudioListener();

const sound = () => {
  const soundM = new THREE.Audio(listener);
  const audioLoaderM = new THREE.AudioLoader();
  audioLoaderM.load('./sound/space.wav', function(buffer) {
    soundM.setBuffer(buffer);
    soundM.setLoop(true);
    soundM.setVolume(0.4);
    soundM.play();
  });
};

//Lights
const lightGeneral = new THREE.AmbientLight( 0x545252 ); 
scene.add(lightGeneral);

const sunLight = new THREE.PointLight( 0xFAD7A0 , 1, 0, 2 ); 
sunLight.position.set(-3000,10000,5000);
scene.add(sunLight);

const width = 1000;
const height = 1000;
const intensity = 100;
const rectLight = new THREE.RectAreaLight( 0xFAD7A0, intensity,  width, height );
rectLight.position.set(1200, -250, 2000);
rectLight.lookAt(-3000,4250,200);
scene.add( rectLight )

//Init Skybox
skybox()

//Init music
sound()
camera.add(listener)

let t = 0
function render() {
  t += 0.001;    
  requestAnimationFrame(render);
  venus.rotation.y += 0.003;
  jupiter.rotation.y += 0.002
  mars.rotation.y += 0.002
  mercury.rotation.y += 0.002
  sun.rotation.y += 0.002
  sun.rotation.x += 0.001
  fire.update(clock.getElapsedTime())
  fire.mesh.position.x = 10000*Math.cos(t) + 0;
  fire.mesh.position.z = 10000*Math.sin(t) + 0;

  skyboxMesh.rotation.y -= 0.0001
  renderer.render(scene, camera);
}

render();