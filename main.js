import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

import { loadSVG, materilizeSVG } from './helpers/svg-helper.js'

import { storageURL, getURLAndDownloadModel, fetchDownloadURL, loadModel, addModelToScene } from './helpers/model'    


import * as dat from 'dat.gui'

import {  ref, getDownloadURL , connectStorageEmulator } from "firebase/storage";

import { app , appStorage }  from './firebase-config.js'

import {boxWithRoundedEdges, cylinderWithroundedendge } from './helpers/shaps.js'

import { routes } from './router'
import { async } from '@firebase/util'



/** texture loader  */

/** Debug */
const gui = new dat.GUI()

const size = 200
const divisions = 10
const gridHelper = new THREE.GridHelper( size, divisions )



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




scene.add( gridHelper )

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
    camera.position.setY(5)

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
    
        // scene.rotation.y += 0.003
        // scene.rotation.x += 0.003
        
        controls.update()
    
        renderer.render(scene, camera)
    }
    animateLoop()





    

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
// // todo add GUI
// todo use gui
// // TODO test the new resizing concept
// // TODO: Add SDKs for Firebase products that you want to use




const fbxLoader = new FBXLoader()

const myModelRef = ref( appStorage, 'letter.fbx')

// todo abstract this
let targetEnverment = () => {
    return  (process.env.NODE_ENV === "production" && location.hostname === "localhost") ? "emulator"
        :   process.env.NODE_ENV
}




// // todo : make conditions for the different envs (dev, prod, emulator)
// // todo we can change loadModel to be function that takes the url as an argument
// // TODO remove this finction 


// todo: add the scene as argument to the function loadModel
const addObjToScene = ( url ) => {
    fbxLoader.load( url, 
        (object) => {
            object.scale.set(.1, .1, .1)
            scene.add(object)
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log('error:', error)
        }
    )  
}


const myModelsInfoMoch = [
    {name: "letter"},
    {name: "HTML"},
]

const myModelsInfoMoch2 = [
    {name: "css"},
    {name: "firebase"},
]

const myModelsCollectionsmyMoch = [
    {
        name:"contants",
        models: myModelsInfoMoch 
    },
    {
        name:"contants",
        models: myModelsInfoMoch2
    },
]

// TODO new data schema for firestore collection collection { name: "contact",  models [ array of modal gonna be used in contact component] } all files gonna be in the same folder 
 




// TODO refactor : abstract the env checking process to a function and move it to a diff drectory (env || config)S
// todo remove assets dir form git





async () => {
    // todo abstract this to a function
    if (targetEnverment() === "emulator") {
        connectStorageEmulator( myStorage, "localhost", 9199)
        const modelURL = await fetchDownloadURL(myModelRef)
        const model = await loadModel(modelURL)
        addModelToScene(model,scene)
        // todo devide this funciton to two functions
        //getURLAndDownloadModel(myModelRef,addObjToScene)

    }

    if (targetEnverment() === "development") {
        const url = storageURL( routes, targetEnverment ) +  myModelsInfoMoch[1].name + ".fbx"
        addModelToScene(  await loadModel(url) ,scene )
    }



    if ( targetEnverment() === "production" ) {
        //getURLAndDownloadModel(myModelRef,addObjToScene)
        const modelURL = await fetchDownloadURL(myModelRef)
        const model = await loadModel(modelURL)
        addModelToScene(model,scene)
    }
}




// todo: emulator firestore
// todo: create a fucntion that fetch all the colloections of the models from firestore
// todo: create a function that takes as argument collection name and returns the array of models names
// todo: create a function that takes as argument an array of models names and retuens an array of objcts with the mode name and the url of the model in the farebase storage
// todo: create a function that takes as argument an array of objects and a postion function render all the models in the scene 
// todo: craete a function that returns a random position
// todo: ditch the random position and use only three or four models that turns => so create a function that retern positions 



// // todo: function to loadobject 
// // todo: function to add object to the scene
// // todo: function for the positon 
// // todo: function to scale models




// // todo: create a function that takes as argumnet model ref and retuns download url


// async function myfunction(fetchDownloadURL, myModelRef) {
//     return await fetchDownloadURL(myModelRef)
// }






//myfunction(fetchDownloadURL, myModelRef)



//myfunction(fetchDownloadURL, mySVG)

// load a SVG resource

// function loadSVG(url) { 
//     const loader = new SVGLoader()
//     loader.load(
//         // resource URL
//         url,
//         // called when the resource is loaded
//         ( data ) => {
//             const paths = data.paths
//             const group = new THREE.Group()
//             for ( let i = 0; i < paths.length; i ++ ) {
//                 const path = paths[ i ]
    
//                 const material = new THREE.MeshBasicMaterial( {
//                     color: path.color,
//                     side: THREE.DoubleSide,
//                     depthWrite: false
//                 } );
    
//                 const shapes = SVGLoader.createShapes( path )
    
//                 for ( let j = 0; j < shapes.length; j ++ ) {
//                     const shape = shapes[ j ]
//                     const geometry = new THREE.ShapeGeometry( shape )
//                     const mesh = new THREE.Mesh( geometry, material )
//                     group.add( mesh )
    
//                 }
    
//             }
//             scene.add( group )
    
//         },
//         // called when loading is in progresses
//         ( xhr ) => {
//             console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
//         },
//         // called when loading has errors
//         ( error ) => {
//             console.log( 'An error happened:',error )
//         }
//     )
// }




const mySVGRef = ref( appStorage, 'about-me.svg')

async function func () {
    // todo abstract this to a function
    if (targetEnverment() === "emulator") {
        connectStorageEmulator( appStorage, "localhost", 9199)
        const SVGURL = await fetchDownloadURL(mySVGRef)
        //loadSVG(SVGURL)
        
    }

    if (targetEnverment() === "development") {
        
        const SVGURL = await storageURL( routes, targetEnverment ) + 'svg/reach-out.svg'

        console.log('svg',await loadSVG(SVGURL))
        // groupUpSVG(await loadSVG(SVGURL))
        console.log('group',await materilizeSVG(SVGURL))
        scene.add( await materilizeSVG(SVGURL) )
        
    }



    if ( targetEnverment() === "production" ) {

        const SVGURL = await fetchDownloadURL(mySVGRef)
        //loadSVG(SVGURL)
    }
}

func ()