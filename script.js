import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { TextureLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

  //*** Textura do Ceu ***//
  const loader = new THREE.TextureLoader();
loader.load('images/sky.png', function(texture) {
  scene.background = texture;
});

  // 1. Cena
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // céu azul

  // 2. Câmara
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 5);
  const cameraOfset = new THREE.Vector3(0, 3, 6)

  // 3. Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // 4. Luzes
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(15, 30, 15);
  directionalLight.castShadow = true;
  
  //Configuração da "câmara" de sombras: define o tamanho da área do mundo que terá sombras
  directionalLight.shadow.camera.left = -20;
  directionalLight.shadow.camera.right = 20;
  directionalLight.shadow.camera.top = 20;
  directionalLight.shadow.camera.bottom = -20;
  
  //Resolução do mapa de sombras
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;

  scene.add(directionalLight);
  

// 5. Chão redondo com textura, carregar a textura PRIMEIRO

const groundTexture = new THREE.TextureLoader().load('images/ground.jpg');
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(25, 25);

// 5.2. Criar geometria
const groundGeometry = new THREE.CircleGeometry(25, 64);

// 5.3. Criar material usando a textura
const groundMaterial = new THREE.MeshStandardMaterial({
  map: groundTexture,
  side: THREE.DoubleSide
});

// 5.4. Criar o mesh
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);



// 6. Boneco LEGO
  const lego = new THREE.Group();
  scene.add(lego);

//***** Torso do LEGO ****//
  const torsoGeometry = new THREE.BoxGeometry(1, 1.5, 0.6);
  const legoMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700, // amarelo LEGO
    roughness: 0.1,
    metalness: 0.0
    });

const torso = new THREE.Mesh(torsoGeometry, legoMaterial);
torso.position.y = 1.75; // levanta do chão
torso.castShadow = true;

lego.add(torso);

//*** Pivot do pescoço ***//
const neckPivot = new THREE.Group();
neckPivot.position.y = 0.9; // topo do torso
torso.add(neckPivot);

//*** Cabeça ***//
const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
const head = new THREE.Mesh(headGeometry, legoMaterial);
head.position.y = 0.4; // metade da altura da cabeça
head.castShadow = true;

neckPivot.add(head);

//*** Olho esquerdo ***//
const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16); // esfera pequena
const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(-0.2, 0.1, 0.41); // frente da cabeça
head.add(leftEye);

//*** Olho direito ***//
const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.position.set(0.2, 0.1, 0.41);
head.add(rightEye);

//*** Boca ***//
const mouthGeometry = new THREE.BoxGeometry(0.4, 0.08, 0.05);
const mouthMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
mouth.position.set(0, -0.2, 0.41);
head.add(mouth);


//*** Ombro esquerdo (pivot) ***//
const leftShoulderPivot = new THREE.Group();
leftShoulderPivot.position.set(-0.65, 0.6, 0);
torso.add(leftShoulderPivot);

//*** Braço esquerdo ***//
const armGeometry = new THREE.BoxGeometry(0.3, 1, 0.3);
const leftArm = new THREE.Mesh(armGeometry, legoMaterial);
leftArm.position.y = -0.5; // desce o braço a partir do ombro
leftArm.castShadow = true;

leftShoulderPivot.add(leftArm);

//*** Ombro direito (pivot) ***//
const rightShoulderPivot = new THREE.Group();
rightShoulderPivot.position.set(0.65, 0.6, 0);
torso.add(rightShoulderPivot);

//*** Braço direito ***//
const rightArm = new THREE.Mesh(armGeometry, legoMaterial);
rightArm.position.y = -0.5;
rightArm.castShadow = true;

rightShoulderPivot.add(rightArm);

//*** Anca esquerda (pivot) ***//
const leftHipPivot = new THREE.Group();
leftHipPivot.position.set(-0.3, -0.75, 0);
torso.add(leftHipPivot);

//*** Perna esquerda ***//
const legGeometry = new THREE.BoxGeometry(0.4, 1, 0.4);
const leftLeg = new THREE.Mesh(legGeometry, legoMaterial);
leftLeg.position.y = -0.5; // desce a perna
leftLeg.castShadow = true;

leftHipPivot.add(leftLeg);

//*** Anca direita (pivot) ***//
const rightHipPivot = new THREE.Group();
rightHipPivot.position.set(0.3, -0.75, 0);
torso.add(rightHipPivot);

//*** Perna direita ***//
const rightLeg = new THREE.Mesh(legGeometry, legoMaterial);
rightLeg.position.y = -0.5;
rightLeg.castShadow = true;

rightHipPivot.add(rightLeg);



// 7. Funcao para vereficar as colisões
function checkCollision(object, objects) {
  const playerBox = new THREE.Box3().setFromObject(lego);

  for (const tree of trees) {
    const trunkBox = tree.userData.worldBox;

    if (playerBox.intersectsBox(trunkBox)) {
      return true;
    }
  }
  return false;
}

// 8. Controles de Movimento
 const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

let isWalking = false;
const speed = 0.12;
const rotationSpeed = 0.06;
let walkTime = 0.0;


window.addEventListener('keydown', (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = false;
  }
});

// 9. Loop de renderização
  let blinkTime = 0;

function animate() {
  requestAnimationFrame(animate);

  blinkTime += 0.10;
// Piscar a cada 3 segundos
const blinkSpeed = 3; // segundos
const blink = Math.sin(blinkTime) > 0.95; 
leftEye.scale.y = blink ? 0.1 : 1;
rightEye.scale.y = blink ? 0.1 : 1;


  isWalking = false;

  if (keys.ArrowUp) {
    const previousPosition = lego.position.clone();

    lego.translateZ(-speed);
    if(checkCollision(lego, trees)){
      lego.position.copy(previousPosition); // volta a posicao anterior
    }else{
      isWalking = true
    }
  }

  if (keys.ArrowDown) {
    const previousPosition = lego.position.clone();

    lego.translateZ(speed);
    if(checkCollision(lego, trees)){
      lego.position.copy(previousPosition);
    }else{
      isWalking = true;
    }
  }

  if (keys.ArrowLeft) {
    lego.rotation.y += rotationSpeed;
  }

  if (keys.ArrowRight) {
    lego.rotation.y -= rotationSpeed;
  }

  if (isWalking) {
  walkTime += speed * 2.5

  leftShoulderPivot.rotation.x = Math.sin(walkTime) * 0.5;
  rightShoulderPivot.rotation.x = -Math.sin(walkTime) * 0.5;

  leftHipPivot.rotation.x = -Math.sin(walkTime) * 0.5;
  rightHipPivot.rotation.x = Math.sin(walkTime) * 0.5;
} 
else { // Voltar à posição neutra quando parado
  leftShoulderPivot.rotation.x = 0;
  rightShoulderPivot.rotation.x = 0;
  leftHipPivot.rotation.x = 0;
  rightHipPivot.rotation.x = 0;
}
//--- Camera 3ª pessoa ---//
const posicaoDesejada = lego.position.clone();
posicaoDesejada.add(cameraOfset.clone().applyQuaternion(lego.quaternion));

// Movimento da camera
camera.position.lerp(posicaoDesejada, 0.1);

camera.lookAt(lego.position)  // A camera olha sempre para o boneco

directionalLight.position.set(
  lego.position.x +15,
  lego.position.y +30,
  lego.position.z +15
);
directionalLight.target = lego // A Luz aponta sempre para o lego

  renderer.render(scene, camera);
}
animate();

// Funcao para gerar arvores no cenario 
function createTree() {
    const tree = new THREE.Group();
  
    // Tronco
    const trunkHeight = 3;
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, trunkHeight, 12);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = trunkHeight /2; // tronco começa no chão
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    tree.add(trunk);
    tree.userData.trunk = trunk;
  
    // Copa (folhas)
    const leavesHeight = 3
    const leavesGeometry = new THREE.ConeGeometry(1, leavesHeight, 12);;
    const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.y =  trunkHeight + leavesHeight / 2; // topo do tronco
    leaves.castShadow = true;
    leaves.receiveShadow = true;
    tree.add(leaves);

    return tree;
    
  };

/* Colocar varias arvores aleatoriamente */
const numTrees = 30;
const trees = [];

for (let i = 0; i < numTrees; i++) {
  const tree = createTree();

  const x = (Math.random() - 0.5) * 50;
  const z = (Math.random() - 0.5) * 50;

  const scale = 1.8 + Math.random() * 0.7;
  tree.scale.set(scale, scale, scale);
  tree.position.set(x, 0, z);

  tree.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(tree.userData.trunk);
  tree.userData.worldBox = box;


  tree.position.set(x, 0, z);

  scene.add(tree);
  trees.push(tree);
}