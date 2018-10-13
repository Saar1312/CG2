/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

const objects = {
	field : 	null,
    ballsArray :     []
}

const AxisArray=[];

/***************************************************************************/
/*                                                                         */
/*                             Variable Values                             */
/*                                                                         */
/***************************************************************************/

var scene, renderer;

var clock = new THREE.Clock();



/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/


function createScene(){
	'use strict';

	scene = new THREE.Scene();
	scene.add( new THREE.AxisHelper( 1000 ) );
	scene.background = new THREE.Color( 0x1e1e1e );
		
	objects.field=createField();	
    createAllBalls();
    
    createCameras();

}

function render(){
	'use strict';
		
	renderer.render( scene, camera );
}

function animate(){
	'use strict';
	UpdateAllBalls();
    
	render();

	requestAnimationFrame(animate);
}

function init(){
	'use strict';

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown,true);
}
