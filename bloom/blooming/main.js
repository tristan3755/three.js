import './style.css'

import * as THREE from 'three'

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

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

const lumiere=new THREE.PointLight(0xffffff,5)
lumiere.position.set(25,100,300)
scene.add(lumiere)


let objet
let mixer
let clock
clock = new THREE.Clock();

gltfLoader.load('scene.gltf',(gltf)=>{
  objet=gltf.scene

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
renderer.render(scene,camera)
requestAnimationFrame(animate)
}

animate()


/* resize de la camera*/
window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

};