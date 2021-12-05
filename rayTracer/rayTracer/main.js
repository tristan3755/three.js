import './style.css'

import * as THREE from 'three'
import gsap from 'gsap'

const scene=new THREE.Scene()

const container=document.getElementById('divThree')

let camera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.1,5000)

const renderer=new THREE.WebGL1Renderer({
  canvas:container,
  alpha:true,
 antialias:true,
})
/*rycaster*/
const raycaster = new THREE.Raycaster()

/*objet*/
const geometry=new THREE.PlaneBufferGeometry(1.2,1.7)

/*texture*/

const texturesLoader=new THREE.TextureLoader()

let tableauImg=[
  {
    url:'art3.jpg',
    x:1,
    y:0
  },
  {
    url:'art1.jpg',
    x:1.5,
    y:-2
  },
  {
    url:'art2.jpg',
    x:1,
    y:-4
  },
  {
    url:'art4.jpg',
    x:1.5,
    y:-6
  },
]

for(let i in tableauImg){
const materials=new THREE.MeshBasicMaterial({
  map:texturesLoader.load('./'+tableauImg[i].url)
})

const lesImg=new THREE.Mesh(geometry,materials)
lesImg.position.set(tableauImg[i].x,tableauImg[i].y)
scene.add(lesImg)

}

let objetsScene=[]

scene.traverse((objet)=>{
  if(objet.isMesh){
    objetsScene.push(objet)
  }
})
console.log(objetsScene)

renderer.setPixelRatio(container.devicePixelRatio)
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.7;
/*renderer.toneMapping = THREE.ReinhardToneMapping;*/
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.autoClear = false;

camera.position.set(0,0,5)

/*const controls=new OrbitControls(camera,renderer.domElement)*/
/*controls.minDistance=500
controls.maxDistance=1500*/
let yScroll=0
let positionScroll=0

window.addEventListener('wheel',(event)=>{
console.log(event.deltaY)
yScroll=event.deltaY*-0.0009
console.log(yScroll)
})

const souris= new THREE.Vector2()

window.addEventListener('mousemove',(e)=>{
  souris.x=e.clientX/window.innerWidth * 2 - 1
  souris.y=-(e.clientY/window.innerHeight )* 2 + 1
})

function animate(){
 /* controls.update()*/ 
 positionScroll+=yScroll
 yScroll*=0.9
/*raycaster*/

raycaster.setFromCamera(souris,camera)

const intersections=raycaster.intersectObjects(objetsScene)

/*intersection.forEach((i)=>{
  console.log('ok')
})*/

for(const intersection of intersections){
  console.log('ok2')
  gsap.to(intersection.object.scale,{x:1.4,y:1.4})
  gsap.to(intersection.object.rotation,{y:-0.4})
  gsap.to(intersection.object.position,{z:0.5})
}

for(const object of objetsScene){
  if(!intersections.find(intersection=>intersection.object===object)){
    gsap.to(object.scale,{x:1,y:1})
    gsap.to(object.rotation,{y:0})
    gsap.to(object.position,{z:0})
  }
}

 /*camera.position.y=positionScroll*/
 camera.position.y=THREE.MathUtils.clamp(positionScroll,-5,1)
  renderer.render(scene,camera)
  requestAnimationFrame(animate)
  
  }
    
    animate()