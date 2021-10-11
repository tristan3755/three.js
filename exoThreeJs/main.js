import './style.css'

import * as THREE from 'three'
import { TorusGeometry } from 'three'

/*const THREE=require('three')*/

const scene=new THREE.Scene()

const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

const renderer=new THREE.WebGL1Renderer({
  canvas:document.getElementById('back')
})


camera.position.setZ(30)

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth,window.innerHeight)


const figureGeometrique=new THREE.TorusGeometry(10,3,16,100)
/*const material=new THREE.MeshBasicMaterial({color:0XF2980b9,wireframe:true}) agit sans lumière*/
const material=new THREE.MeshStandardMaterial({color:0XF2980b9,wireframe:true})
const geometriePlusMaterial=new THREE.Mesh(figureGeometrique,material)

scene.add(geometriePlusMaterial)


const lumiere=new THREE.PointLight(0xffffff)
lumiere.position.set(5,5,5)
scene.add(lumiere)

function animate(){
  requestAnimationFrame(animate)

  geometriePlusMaterial.rotation.x += 0.01  
  geometriePlusMaterial.rotation.y += 0.01  
  geometriePlusMaterial.rotation.z += 0.01  


  renderer.render(scene,camera)
}


animate()