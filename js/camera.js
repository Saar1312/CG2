/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

const viewSize = 400;               /* _viewSize_ - holds the value of the viewsize window of the
                                    camera, so when defining the orthographic camera parametres
                                    we just need to adjust this value. */


const viewSizeHALF = viewSize / 2;    /* _viewSizeHalf_ - holds half the value of _viewSize_, so 
                                      when defining the camera we can assign this value directly 
                                      to the left, right, top, bottom parametres. */


const camera1_Position = new THREE.Vector3(0,0,1);
//const camera2_Position = new THREE.Vector3();
//var camera3_Position = new THREE.Vector3();
// const cameraPositionArray = [ camera1_Position ,camera2_Position, camera3_Position ];

const camera1_UP = new THREE.Vector3(0,1,0);
//const camera2_UP = new THREE.Vector3(0,0,1);
//const camera3_UP = new THREE.Vector3(0,0,1);
//const cameraUPArray = [ camera1_UP, camera2_UP,camera3_UP ];

const cameraLookDirection = new THREE.Vector3();


const cameras = {

    ONE : null,
    TWO : null,
    THREE : null,
};

/***************************************************************************/
/*                                                                         */
/*                             Variable Values                             */
/*                                                                         */
/***************************************************************************/

var camera;                         /* _camera_ - holds the default camera for the scene */

/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/


/*********************************************************/
/* createCamera - Creates a Orthographic Camera and      */
/*                depending on the input parametre it    */
/*                adjusts the camera parameters to the   */
/*                view of the scene.                     */
/*_______________________________________________________*/
/* ||INPUT||  -> num - changes depending on the camera   */
/*                     view we want to create.           */    
/* ||OUTPUT|| -> cam - created camera with the correct   */
/*                     parameters assigned.              */
/*********************************************************/


function createCamera(num){
    'use strict';

    if(num==0){
        var cam = new THREE.OrthographicCamera(); /* Variable that hold the new camera to create */
    };

    cam.near = -viewSize;               /* near and far parametres are bigger than the viewsize.  */
    cam.far = viewSize;     
	

    cam.position.copy(camera1_Position);

    cam.up.copy( camera1_UP);

    cam.lookAt( cameraLookDirection );

    scene.add( cam );

    return cam;
}



/*********************************************************/
/* createCameras - Creates ALL the cameras in the scene  */
/*                 and calls switchCamera to define the  */
/*                 default camera.                       */
/*_______________________________________________________*/
/* ||INPUT||  -> (none)                                  */
/* ||OUTPUT|| -> (none)                                  */
/*********************************************************/

function createCameras(){

    cameras.ONE = createCamera( 0 );
    //cameras.orthographic_2 = createCamera( 1 );
    //cameras.orthographic_3 = createCamera( 2 );

    camera=cameras.ONE;
    resize();
}


/*********************************************************/
/* resize - depending on the viewsize windows, this      */
/*          function calculates the camera parameters    */
/*          proportionately so we don't lose the aspect  */
/*          ratio of the scene.                          */
/*_______________________________________________________*/
/* ||INPUT||  -> (none)                                  */
/* ||OUTPUT|| -> (none)                                  */
/*********************************************************/

function resize(){

    //var viewSize = 500;

    renderer.setSize( window.innerWidth, window.innerHeight );

    var aspectRatio = window.innerWidth / window.innerHeight;

    if( window.innerHeight > 0 && window.innerWidth > 0 ){

        if ( aspectRatio < 1 )
        {
            camera.left     = -viewSizeHALF;
            camera.right    =  viewSizeHALF;
            camera.top      =  viewSizeHALF * (1 / aspectRatio);
            camera.bottom   = -viewSizeHALF * (1 / aspectRatio);
            //camera.updateProjectionMatrix();

        }
        else if ( aspectRatio > 1 )
        {
            camera.left     = -viewSizeHALF * aspectRatio;
            camera.right    =  viewSizeHALF * aspectRatio;
            camera.top      =  viewSizeHALF;
            camera.bottom   = -viewSizeHALF;
            //camera.updateProjectionMatrix();

        }
        else if ( aspectRatio == 1 )
        {
            //camera.updateProjectionMatrix();
        }
    }
    camera.updateProjectionMatrix();
}
