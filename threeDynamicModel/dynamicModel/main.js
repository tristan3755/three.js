import './style.css'
import * as TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'
/*import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'*/
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { Mesh } from 'three'

/*const THREE=require('three')*/
const gltfLoader=new GLTFLoader()

const scene=new THREE.Scene()


let camera=new THREE.PerspectiveCamera(5,window.innerWidth/window.innerHeight,0.1,1000)

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

/*interraction*/
let mouseX=0
let mouseY=0

let targetX=0
let targetY=0

let valueWindowHalfX= window.innerWidth/2
let valueWindowHalfY=window.innerHeight/2

document.addEventListener('mousemove',(e)=>{
mouseX=(e.clientX-valueWindowHalfX)
mouseY=(e.clientY-valueWindowHalfY)
/*console.log(mouseX,mouseY)*/
})

targetX=mouseX*0.05
targetY=mouseY*0.05

camera.position.set(0,0,185)

let objet

gltfLoader.load('scene.gltf',(gltf)=>{
  objet=gltf.scene
 scene.add(objet) 
 
})

let position={x:0}
let target={x:-6}

function move1(){

const tween1=new TWEEN.Tween(position).to(target,4000)
tween1.onUpdate(function(){
  objet.position.x = position.x;
});
tween1.easing(TWEEN.Easing.Elastic.InOut)
tween1.start();
}

let bouton1=document.getElementById('button')
bouton1.addEventListener('click',()=>{


  move1()

   /* objet.position.x=-6
    objet.rotation.y=-6*/
  })

function animate(){
 
camera.position.setX(mouseX/1500)
camera.position.setY(2-mouseY/1500)

TWEEN.update()
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


