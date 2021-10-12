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

camera.position.setY(400)

camera.position.setX(0)


  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth,window.innerHeight)


/*modèle blender*/

gltfLoader.load('./blender/scene.gltf',(gltf)=>{
  scene.add(gltf.scene)
})

/*modèle blender*/


/*const figureGeometrique=new THREE.TorusGeometry(10,3,16,100)*/
/*const material=new THREE.MeshBasicMaterial({color:0XF2980b9,wireframe:true}) agit sans lumière*/
/*const material=new THREE.MeshStandardMaterial({color:0XF2980b9,wireframe:true})
const geometriePlusMaterial=new THREE.Mesh(figureGeometrique,material)

scene.add(geometriePlusMaterial)*/


const lumiere=new THREE.PointLight(0xffffff,4)
lumiere.position.set(25,25,25)
scene.add(lumiere)

/*var dirLight = new THREE.DirectionalLight( 0xffffff, -15.8 );
scene.add( dirLight );*/

/*const lightHelper=new THREE.PointLightHelper(lumiere,15,0xffffff)
scene.add(lightHelper)*/

const controls=new OrbitControls(camera,renderer.domElement)

function animate(){
  requestAnimationFrame(animate)

  /*gltf.rotation.x += 0.01  
  gltf.rotation.y += 0.01  
  gltf.rotation.z += 0.01  */

  controls.update()

  renderer.render(scene,camera)
}


animate()