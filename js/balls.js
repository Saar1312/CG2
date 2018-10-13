//Ball Size
const BallsDim={radius:5}; 
//Balls number
const Balls_nr=10;

//starting speed between min and max
const baseminspeed=0; 
const basemaxspeed=10;

//augment speed variables (augments speed 'plus_speed' each 'timer' seconds)
const plus_speed=5;
const timer=1;
var time_passed=0;

//creates a random position for the balls, within the board limits
function random_ball_position(){
    return {x:randFloat(-FieldBonds.x+BallsDim.radius,FieldBonds.x-BallsDim.radius),  
            y:randFloat(-FieldBonds.y+BallsDim.radius,FieldBonds.y-BallsDim.radius),  
            z:BallsDim.radius};                                                       
}

function createAllBalls(){
    var Balls=new THREE.Object3D();
    for(var i=0;i<Balls_nr;i++){
        createBall(Balls);
    }
    scene.add(Balls);
}

function createBall(obj){
	
    Ball=new THREE.Object3D();
    
    var pos=random_ball_position();
    
	//set position right away to check early if two balls are coliding
    Ball.position.set(pos.x,pos.y,pos.z);
    
    //check if pos doesnt collide with created position    
    for (var i=objects.ballsArray.length-1;i>0;i--){
        if (ballscolision(Ball,objects.ballsArray[i-1])){
            createBall(obj);
			//delete 
            return;
        }
    }   
    
    var speed=randFloat(baseminspeed,basemaxspeed);
    var angle=randFloat(0,2*pi);
    
    Ball.userData = {speed : speed,
                     angle : angle};
					 
   
    Ball.rotateZ(angle);
    
	//creates Mesh to rotate on two Axis
    BallMeshGeometry    = new THREE.SphereGeometry(BallsDim.radius, 16, 16 );
    BallMeshMaterial    = new THREE.MeshBasicMaterial( { color: 'orange', wireframe : true } );
    BallMesh            = new THREE.Mesh( BallMeshGeometry, BallMeshMaterial );
	
	BallMesh.add( new THREE.AxisHelper( 50 ) );
	//pushes to array to hide axis
    AxisArray.push(BallMesh.children[0]);    
    
    Ball.add(BallMesh);   
    obj.add(Ball);
    objects.ballsArray.push(Ball);
}

function UpdateAllBalls(){
    var delta=clock.getDelta();
    time_passed+=delta;
    
    //if timer excceded, update all balls speed
    if (time_passed>=timer){
        for(var i=Balls_nr-1;i>=0;i--){
            objects.ballsArray[i].userData.speed+=plus_speed;
        }
        time_passed-=timer;
    }
    
    //updates each balls position, rotation, and checks for colisions
    for(var j=Balls_nr-1;j>=0;j--){
        updateBall(objects.ballsArray[j],j,delta); //pass the j to check colision only with updated balls
    }
}


function updateBall(ball,j,delta){
	var distance=delta*ball.userData.speed;
	//update position
    ball.translateY(distance); 
	//update rotation
	ball.children[0].rotateX(-distance/BallsDim.radius); 
    
    //check colision with walls
    if(wallscolision(ball)){
		console.log("WALL COLISION");
        //treat colision                       
		//If there is colision, by changing position, need to check colision for the new position??
		
		/*********DELETE***********/
		ball.userData.angle=-ball.userData.angle+pi
		/***********************/
    }
	
    //check colision with every updated ball
    for(var i=j+1;i<Balls_nr;i++){
        if(ballscolision(ball,objects.ballsArray[i])){
			console.log("BALL COLISION");
            //treat colision
			//If there is colision, by changing the position, need to check colision for the new position(in both balls)??
			
			/*********DELETE***********/
			var p=random_ball_position();
			ball.position.set(p.x,p.y,p.z);
			/***********************/
        }
    }
}

//Checks a balls Colisions with all Walls
function wallscolision(ball){
    //Position+radius>Field Bonds
    if((Math.abs(ball.position.x)+BallsDim.radius>FieldBonds.x)||(Math.abs(ball.position.y)+BallsDim.radius>FieldBonds.y)){        
        return true;
    }
    else{
        return false;
    }
}

//Checks if 2 balls are coliding with each other
function ballscolision(ball1 , ball2){
     //Distance<Diameter
    if((distance(ball1.position,ball2.position)<BallsDim.radius*2)){        
        return true;
    }
    else{
         return false;
    }

}
    
        
        
