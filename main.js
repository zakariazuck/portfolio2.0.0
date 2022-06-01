import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import * as dat from 'dat.gui'

import { getStorage, ref, getDownloadURL } from "firebase/storage";

import {boxWithRoundedEdges, cylinderWithroundedendge} from './helpers/shaps.js'
import { Mesh } from 'three'

/** texture loader  */

/** Debug */
const gui = new dat.GUI()


/** Canvas */
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

/** Scene */
const scene = new THREE.Scene()


/** Objects */
// Torus
const geometryTorus = new THREE.TorusGeometry(10, 2.8, 30, 200)

// Sphere
const geometrySphere = new THREE.SphereGeometry(3.5, 30, 30)

//Big Cube 
const geometryCube = new  boxWithRoundedEdges(10, 10, 10, 2, 6, 2)

//Small Cube
const geometrySmallCube = new  boxWithRoundedEdges(3, 3, 3, 0.5, 6, 2)

//Cylinder
const points = cylinderWithroundedendge(4,9,1,10)
const geometryCylinder = new THREE.LatheGeometry(  points ,50)

/** Materials */
const darkMaterial = new THREE.MeshStandardMaterial({color:0x111111})
const purpleMaterial = new THREE.MeshStandardMaterial({color:0x4d0099})
const greenMaterial = new THREE.MeshStandardMaterial({color:0x00995c, side: THREE.DoubleSide})
const orangeMaterial = new THREE.MeshStandardMaterial({color:0xb36b00, side: THREE.DoubleSide})

/** Mesh */
//torus
const torus = new THREE.Mesh(geometryTorus, darkMaterial)
torus.position.set(20, -9, 0)           //TODO: not sure where to put this
scene.add(torus)

// Sphere
const sphere = new THREE.Mesh(geometrySphere, purpleMaterial)
sphere.position.set(30, 10, -20)        //TODO: not sure where to put this
scene.add(sphere)

//Big Cube
const cube = new THREE.Mesh(geometryCube, darkMaterial)
cube.position.set(15, 5, -30)

cube.rotation.x = 10
cube.rotation.y = 10
cube.rotation.z = 10

scene.add(cube)

//Small Cube
const smallCube = new THREE.Mesh(geometrySmallCube, greenMaterial)
smallCube.position.set(20, -9, 0)

smallCube.rotation.x = -40
smallCube.rotation.y = -20
smallCube.rotation.z = 20

scene.add(smallCube)

//Cylinder
const cylinder = new THREE.Mesh( geometryCylinder, orangeMaterial )
cylinder.position.set(-4, -10, -20)

cylinder.rotation.x = 50
cylinder.rotation.y = 50
cylinder.rotation.z = 50

cylinder.scale.set(1, 1, 1);
scene.add( cylinder );

/** import icon example */ 
const fbxLoader = new FBXLoader()
/*
fbxLoader.load('assets/models/bell/3D.fbx',
    (object) => {
        // console.log('fbx obj:', object)
        object.scale.set(.1, .1, .1)
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)
*/











/** Lights */
const pointLightWhite = new THREE.PointLight(0xffffff ,1, 100 )
pointLightWhite.position.set(10, 10, 10)

const pointLightGreen = new THREE.PointLight(0x00e68a, 1, 100 )
pointLightGreen.position.set(20, -9, 0)

const pointLightOrange = new THREE.PointLight(0xff5c33, 1, 100 )
pointLightOrange.position.set(-4, -10, -20)

const pointLightPurple = new THREE.PointLight(0xcc33ff, 1, 100 )
pointLightPurple.position.set(30, 10, -20)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight , pointLightWhite, pointLightGreen, pointLightPurple, pointLightOrange)




/** Sizes */

//  // TODO: This not a good approach. Try change the camera position instead of the scaling everything.
/** Legacy code */
/** 
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
   window.location.reload()
   window.innerWidth <= 1500 ? scene.scale.set(window.innerWidth*0.0005 +0.25 , window.innerWidth*0.0005 +0.25, window.innerWidth*0.0005 +0.25) : null
}
scene.scale.set(window.innerWidth*0.0005 +0.25 , window.innerWidth*0.0005 +0.25, window.innerWidth*0.0005 +0.25)
*/



    //Update sizes
    //Update camera
    //Update renderer

// // TODO try this code for the resizing
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
 

/** Camera */
    //Base camera
    //Controls
    const camera = new THREE.OrthographicCamera( window.innerWidth / - 20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / - 20, 1, 1000 )
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.setZ(50)


/** Renderer */


/** Interaction with shapes */ 
// TODO: to be replaced by the raycaster
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableZoom = false;

/** Animate */
    //Update objects
    //Update Orbital Controls
    //controls.update()
    //Render
    //Call tick again on the next frame


    /** Animation loop */
    var cubeDiractionX = false
    var cubeDiractionY = false

    var shpereGrowing = true

    function animateLoop() {


        requestAnimationFrame(animateLoop)
    
        /** Animate torus */
        torus.rotation.x += 0.01
        torus.rotation.y += 0.005
        torus.rotation.z += 0.01
    
        /** Animate Cylinder */
        cylinder.rotation.x += 0.01
        cylinder.rotation.y += 0.03
    
        /** Animate cube */
        /** Cube translation */
        cubeDiractionX ? cube.position.x -= 0.05 : cube.position.x += 0.05
        cube.position.x >= 15 ? cubeDiractionX = true : null
        cube.position.x <= -5 ? cubeDiractionX = false : null
    
        cubeDiractionY ? cube.position.y -= 0.05 : cube.position.y += 0.05
        cube.position.y >= 15 ? cubeDiractionY = true : null
        cube.position.y <= -5 ? cubeDiractionY = false : null
    
        /** Cube rotation */
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        cube.rotation.z += 0.01
    
        /** Animate small cube */
        smallCube.rotation.x += 0.005
        smallCube.rotation.y += 0.005
        smallCube.rotation.z += 0.005
    
        /** Animation shpere */
        shpereGrowing ? sphere.scale.x += 0.001 : sphere.scale.x -= 0.001
        shpereGrowing ? sphere.scale.y += 0.001 : sphere.scale.y -= 0.001
        shpereGrowing ? sphere.scale.z += 0.001 : sphere.scale.z -= 0.001
        sphere.scale.x >= 1.4 ? shpereGrowing = false : null
        sphere.scale.x <= 0.6 ? shpereGrowing = true : null
    
        scene.rotation.y += 0.003
        scene.rotation.x += 0.003
        
        controls.update()
    
        renderer.render(scene, camera)
    }
    animateLoop()






getDownloadURL(starsRef)

  .then((url) => {
    // Insert url into an <img> tag to "download"
    gtlfLoadHelper(loader, url)
  })


  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        console.error('File does not exist')
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        console.error('User does not have permission to access the object')
        break;
      case 'storage/canceled':
        // User canceled the upload
        console.error('User canceled the upload')
        break;

      // ...
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        console.error('Unknown error occurred, inspect the server response')
        break;
    }
  })

    

/** Background */
// TODO: Add a function to change the background color with the scroll. 
scene.background = new THREE.Color( 0x808080 )


// TODO add centred nav bar 
// TODO add about drop down full screen 
// TODO avatar 
// TODO add text working on Page




// TODO: stop animation when the window is not in focus.


/** backlog*/ 

// TODO Create a horizontal scene
// todo add GUI
// // TODO test the new resizing concept





const storage = getStorage()
const modelRef = ref(storage, '3D.gltf')



getDownloadURL(ref(storage, 'images/stars.jpg'))
  .then((url) => {
    // // `url` is the download URL for 'images/stars.jpg'

    // // This can be downloaded directly:
    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   const blob = xhr.response;
    // };
    // xhr.open('GET', url);
    // xhr.send();
    const loader = new GLTFLoader()

    loader.load(
        // resource URL
        //'assets/models/bell/3D.gltf',
        // todo: create a reference to the model with getStorage method URL : https://firebase.google.com/docs/storage/web/download-files#web-version-9
        url,
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(10,10,10)
            scene.add( gltf.scene );
    
            gltf.scene; // THREE.Group
    
        },
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    )
    



    

  })
  .catch((error) => {
    // Handle any errors
  });