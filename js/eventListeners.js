function onResize(){
	'use strict';

	resize();
}

function onKeyDown(e){
	'use strict';

	switch(e.keyCode){
		
		/*******************************************************************/
		/*                                                                 */
		/*                       Switch Axis-Helper                        */
		/*                                                                 */
		/*******************************************************************/

		/* After pressing 'e' or 'E', we hide or show the Axis Helpers */							   
		case 69: //E
		case 101: //e
			for(var i=AxisArray.length-1;i>=0;i--){
                AxisArray[i].visible=!AxisArray[i].visible;
            }
            break;


		/*******************************************************************/
		/*                                                                 */
		/*                           Camera Keys                           */
		/*                                                                 */
		/*******************************************************************/

		/* After pressing the 1, 2 or 3 key this changes the camera.choice */
		/* in cameras struct and the cameraSwitch variable to TRUE so when */
		/* we call UpdateCamera(), it changes the default camera           */
				
		case 49: //1
            camera = cameras.ONE;
			break;

		case 50: //2
            camera= cameras.TWO;
			break;

		case 51: //3
            camera = cameras.THREE;
			break;
	}
}

