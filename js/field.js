/*Dimensions*/

const BaseDim={
     width: viewSize-4,
     height: (viewSize-4)/2,
     depth: 1,
 };
 
const UpperWallsDim={
     width: BaseDim.width,
     height:5,
     depth: norm(BaseDim.width,BaseDim.height),
 };
 
const SideWallsDim={
     width: 5,
     height:BaseDim.height,
     depth: norm(BaseDim.width,BaseDim.height),
 };

/*Positions */

const BasePos={
    x:0,
    y:0,
    z: -BaseDim.depth/2,
};

const Wall1Pos={
    y:BaseDim.height/2+UpperWallsDim.height/2,
    x:0,
    z:UpperWallsDim.depth/2,
};

const Wall2Pos={
    y:-BaseDim.height/2-UpperWallsDim.height/2,
    x:0,
    z:UpperWallsDim.depth/2,
};

const Wall3Pos={
    y:0,
    x:BaseDim.width/2+SideWallsDim.width/2,
    z:UpperWallsDim.depth/2,
};

const Wall4Pos={
    y:0,
    x:-BaseDim.width/2-SideWallsDim.width/2,
    z:UpperWallsDim.depth/2,
};

/*Bonds*/
const FieldBonds={
    y:BaseDim.height/2,
    x:BaseDim.width/2
};

/*Creating the Objects*/
function createField(){
    var Field=new THREE.Object3D();
    createBase(Field);
    createUpperWall(Field,Wall1Pos);
    createUpperWall(Field,Wall2Pos);
    createSideWall(Field,Wall3Pos);
    createSideWall(Field,Wall4Pos);
    
    scene.add(Field);    
    return Field;
}

function createBase(obj){
    const BaseGeometry        = new THREE.CubeGeometry( BaseDim.width, BaseDim.height,  BaseDim.depth );
    const BaseMaterial        = new THREE.MeshBasicMaterial( { color: 'cyan', wireframe : true } );
    const Base                = new THREE.Mesh( BaseGeometry, BaseMaterial );
    
    Base.position.set(BasePos.x,BasePos.y,BasePos.z);
    obj.add(Base);
}

//If creating Geometry out of function, can join both Walls functions
function createUpperWall(obj,pos){
    const WallGeometry        = new THREE.CubeGeometry( UpperWallsDim.width, UpperWallsDim.height,  UpperWallsDim.depth );
    const WallMaterial        = new THREE.MeshBasicMaterial( { color: 'brown', wireframe : true } );
    const Wall                = new THREE.Mesh( WallGeometry, WallMaterial );
    
    Wall.position.set(pos.x,pos.y,pos.z);
    obj.add(Wall);
}

function createSideWall(obj,pos){
    const WallGeometry        = new THREE.CubeGeometry( SideWallsDim.width, SideWallsDim.height,  SideWallsDim.depth );
    const WallMaterial        = new THREE.MeshBasicMaterial( { color: 'brown', wireframe : true } );
    const Wall                = new THREE.Mesh( WallGeometry, WallMaterial );
    
    Wall.position.set(pos.x,pos.y,pos.z);
    obj.add(Wall);
}
	
