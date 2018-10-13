 const pi=Math.PI;
 
 function squared(a){
     return a*a;
 }

 function sqroot(a){
     return Math.sqrt(a);
 }

 function norm(a,b){ 
     return sqroot(squared(a)+squared(b));
 }
 
 function randFloat(min,max){
    return Math.random() * (max - min) + min;
 }

 function distance(pos1,pos2){
     var disx=Math.abs(pos1.x-pos2.x);
     var disy=Math.abs(pos1.y-pos2.y);
     return norm(disx,disy);
 }
     
