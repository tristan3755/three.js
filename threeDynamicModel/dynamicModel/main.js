import './style.css'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

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
},(xhr) => {
  console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
},
(error) => {
  console.log(error)
})


function animate(){
 
  camera.position.setX(mouseX/1500)
  camera.position.setY(2-mouseY/1500)

let position={x:0}
let target={x:-6}

let position2={y:-5}
let target2={y:-6}


let bouton1=document.getElementById('button')

let fermeture=document.getElementById('fermeture')

let menu=document.querySelector('.menu')

let titre=document.querySelector('.titre')

let position3={x:-6}
let target3={x:0}

let position4={y:-2}
let target4={y:0}


  bouton1.addEventListener('click',()=>{
    bouton1.style.display='none'
    fermeture.style.display='flex'
    menu.style.display='flex'
    titre.style.left='-10vw'
    move1()
  })
  

  function move1(){

    const tween1=new TWEEN.Tween(position).to(target,2000)
    tween1.onUpdate(function(){
      objet.position.x = position.x;
    });
    tween1.easing(TWEEN.Easing.Exponential.Out)
    tween1.start();
    tween1.onComplete(()=>{
      console.log('tween ok')
    })
    
    
    const tween2=new TWEEN.Tween(position2).to(target2,2000)
    tween2.onUpdate(function(){
      objet.rotation.y = position2.y;
    
    });
    tween2.easing(TWEEN.Easing.Exponential.Out)
    tween2.start();
    tween2.onComplete(()=>{
      console.log('tween2 ok')
     
    })
    }


  fermeture.addEventListener('click',()=>{
    bouton1.style.display='flex'
    fermeture.style.display='none'
    menu.style.display='none'
    titre.style.left='2vw'
    moveRetour() 
  })

  function moveRetour(){

    const tween3=new TWEEN.Tween(position3).to(target3,2000)
    tween3.onUpdate(function(){
      objet.position.x = position3.x;
      
    });
    tween3.easing(TWEEN.Easing.Exponential.Out)
    tween3.start();
    const tween4=new TWEEN.Tween(position4).to(target4,2000)
    tween4.onUpdate(function(){
      objet.rotation.y = position4.y;
     
    });
    tween4.easing(TWEEN.Easing.Exponential.Out)
    tween4.start();
    
    }

  TWEEN.update()
  let chargement=document.querySelector('.loading')

  if(objet){
    chargement.style.display="none"
  }

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

/*javascript*/


