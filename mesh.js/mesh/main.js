import './style.css'

import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

/*const THREE=require('three')*/
const gltfLoader=new GLTFLoader()

const scene=new THREE.Scene()


let camera=new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,0.1,1000)

const renderer=new THREE.WebGL1Renderer({
  canvas:document.getElementById('back'),
  alpha:true,
  antialias:true,
})

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth,window.innerHeight)
 renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;

/*modèle blender*/

camera.position.set(0,0,1)
/*
const lumiere=new THREE.PointLight(0xffffff,0.5)
lumiere.position.set(25,100,300)
scene.add(lumiere)*/


let objet

gltfLoader.load('scene.gltf',(gltf)=>{
  objet=gltf.scene
  objet.position.y=-7
 scene.add(objet)   
 
})


const controls=new OrbitControls(camera,renderer.domElement)

function animate(){
 
  /*if(objet){
    objet.rotation.y += 0.005
  }*/
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
