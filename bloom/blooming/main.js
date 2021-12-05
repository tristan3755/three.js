import './style.css'

import * as THREE from 'three'
import hoverEffect from 'hover-effect'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {FXAAShader} from 'three/examples/jsm/shaders/FXAAShader.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';


/*const THREE=require('three')*/
const gltfLoader=new GLTFLoader()

const scene=new THREE.Scene()

let back=document.getElementById('back')

let camera=new THREE.PerspectiveCamera(55,back.clientWidth/back.clientHeight,0.1,3000)



const renderer=new THREE.WebGL1Renderer({
  canvas:document.getElementById('back'),
  alpha:true,
 antialias:true,
})

  renderer.setPixelRatio(back.devicePixelRatio)
  renderer.setSize(back.clientWidth,back.clientHeight)
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.autoClear = false;
 


/*modèle blender*/

camera.position.set(0,0,10)

const lumiere=new THREE.AmbientLight(0xffffff,10)
lumiere.position.set(0,0,150)
scene.add(lumiere)

let objet
let mixer
let clock
let stats
let composer
let fxaaPass

clock = new THREE.Clock();

const container = document.getElementById( 'back' );

stats = new Stats();
container.appendChild( stats.dom );

const params = {
	exposure:0,
	bloomStrength: 1.5,
	bloomThreshold: 0,
	bloomRadius: 0.2,
};

const bloomPass = new UnrealBloomPass( new THREE.Vector2( back.clientWidth, back.clientHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;



const renderScene = new RenderPass( scene, camera );
fxaaPass = new ShaderPass( FXAAShader );

const copyPass = new ShaderPass( CopyShader );


composer = new EffectComposer( renderer );
composer.addPass( renderScene );
composer.addPass( bloomPass );
composer.addPass(fxaaPass)
composer.addPass( copyPass );

const pixelRatio = renderer.getPixelRatio();

				fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( container.offsetWidth * pixelRatio );
				fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( container.offsetHeight * pixelRatio );

   

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
 
 
/*objet.position.set(0,0,550)*/
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
/*if(objet){
  objet.rotation.y+=-0.005
}*/
if ( mixer ) mixer.update( delta );
controls.update() 
stats.update();
/*renderer.render(scene,camera)*/
composer.render();

requestAnimationFrame(animate)
}

animate()

/* resize de la camera*/
window.onresize = function () {

  camera.aspect = back.clientWidth / back.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( back.clientWidth, back.clientHeight );
  const pixelRatio = renderer.getPixelRatio();

  fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( container.offsetWidth * pixelRatio );
  fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( container.offsetHeight * pixelRatio );

 /*composer.setSize( width, height );*/
};

/*liquify*/

new hoverEffect(
  {
    parent:document.getElementById('image'),
    intensity:0.8,
    image1:'./art3.jpg',
    image2:'./contact.jpg',
    displacementImage:'./heightMap.png'
  }
)

/*slider*/

const app=new Vue({
  el:'#setcSlider',
  data:{
toggle:false,
},
  methods:{
changeFalse(){
  this.toggle=!this.toggle
  return this.toggle
}
  }
})