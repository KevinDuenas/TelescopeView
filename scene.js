let scene, camera, renderer, skyboxGeo, skybox;

let skyboxImage = "corona";

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    45,
    30000
  );
  camera.position.set(1200, -250, 2000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "canvas";
  document.body.appendChild(renderer.domElement);

  skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  skybox = new THREE.Mesh(skyboxGeo);
  scene.add(skybox);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enabled = true;
  controls.minDistance = 700;
  controls.maxDistance = 1500;

  const materialArray = createMaterialArray(skyboxImage);
  skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);

  animate();
}

function animate() {
  skybox.rotation.x += 0.005;
  skybox.rotation.y += 0.005;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

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

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
