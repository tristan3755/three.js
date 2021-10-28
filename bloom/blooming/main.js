import './style.css'

import * as THREE from 'three'

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


/*const THREE=require('three')*/
const gltfLoader=new GLTFLoader()

const scene=new THREE.Scene()

let camera=new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,1,1000)



const renderer=new THREE.WebGL1Renderer({
  canvas:document.getElementById('back'),
  alpha:true,
  antialias:true,
})

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth,window.innerHeight)
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.outputEncoding = THREE.sRGBEncoding;

/*modèle blender*/

camera.position.set(0,0,10)

/*const lumiere=new THREE.AmbientLight(0xffffff,35)
lumiere.position.set(25,100,300)
scene.add(lumiere)*/

let objet
let mixer
let clock
let stats
let composer

clock = new THREE.Clock();

const container = document.getElementById( 'back' );

stats = new Stats();
container.appendChild( stats.dom );

const params = {
	exposure:1,
	bloomStrength: 10.5,
	bloomThreshold: 0,
	bloomRadius: 0.5,
};

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

const renderScene = new RenderPass( scene, camera );


composer = new EffectComposer( renderer );
composer.addPass( renderScene );
composer.addPass( bloomPass );


gltfLoader.load('scene.gltf',(gltf)=>{
  objet=gltf.scene
/*let mesh = objet.children[0]
mesh.scale.set(100,100,100)*/
  if(objet){
	mixer = new THREE.AnimationMixer( objet);
        
    gltf.animations.forEach( ( clip ) => {
      
        mixer.clipAction( clip ).play();
      
    } );
  }

 scene.add(objet)   
 
},(xhr) => {
	console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
	console.log(error)
  })

  
const controls=new OrbitControls(camera,renderer.domElement)

function animate(){
 
const delta = clock.getDelta();
if ( mixer ) mixer.update( delta );
controls.update() 
stats.update();
composer.render();
/*renderer.render(scene,camera)*/
requestAnimationFrame(animate)
}

animate()


/* resize de la camera*/
window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
 
 /*composer.setSize( width, height );*/
};