import './style.css'

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'


/*const THREE=require('three')*/
const gltfLoader=new GLTFLoader()

const scene=new THREE.Scene()


let camera=new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,0.1,1000)

const renderer=new THREE.WebGL1Renderer({
  canvas:document.getElementById('back'),
  alpha:true,
  antialias:true
})


camera.position.setZ(400)

camera.position.setY(100)

camera.position.setX(0)


  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth,window.innerHeight)


/*modèle blender*/

gltfLoader.load('scene.gltf',(gltf)=>{
  scene.add(gltf.scene) 
  gltf.scene.position.y += -100;
})

/*modèle blender*/

const lumiere=new THREE.PointLight(0xffffff,0.5)
lumiere.position.set(25,100,300)
scene.add(lumiere)



const controls=new OrbitControls(camera,renderer.domElement)

function animate(){
  requestAnimationFrame(animate)

  controls.update()
 
  renderer.render(scene,camera)
}


animate()

/* resize de la camera*/
window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

};