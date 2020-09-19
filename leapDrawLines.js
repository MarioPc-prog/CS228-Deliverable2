var controllerOptions = {};
var x = window.innerWidth;
var y = window.innerHeight;
var rawXMin = 1000;
var rawXMax = 100;
var rawYMin = 1000;
var rawYMax = 100;
function HandleFinger(finger){
        //add thickness
	var x = finger.tipPosition[0];
	var y = finger.tipPosition[1];
	//var z=finger.tipPosition[2];
	//checks wheather the current horizontal position of the tip is less than the value stored in rawXMin.
	if (finger.tipPosition[0] <rawXMin){
		rawXMin=finger.tipPosition[0];
	}
	if (finger.tipPosition[0] > rawXMax){
                rawXMax=finger.tipPosition[0];
        }
	if (finger.tipPosition[1] <rawYMin){
                rawYMin=finger.tipPosition[1];
        }
	if (finger.tipPosition[1] > rawYMax){
                rawYMax=finger.tipPosition[1];
        }
	var oldRangeX = (rawXMax-rawXMin);
	var newRangeX=(window.innerWidth-0);
	var x =(((x - rawXMin) * newRangeX) /oldRangeX) + 0;

	var oldRangeY = (rawYMax-rawYMin);
        var newRangeY=(window.innnerHeight-0);
        var newY =(((y - rawYMin) * newRangeY) /oldRangeY) + rawYMin;
	newY =(y-rawYMin)*(window.innerHeight-0)/(rawYMax-rawYMin)+0;
        //prints only the 5 circles "finger tip"
 	//circle(x,window.innerHeight-newY,50);
        //create and assign stroke weight to a var 
        var thick = strokeWeight(4);
        var bones = finger.bones;
        for (var i=0;i<bones.length;i++){
                var bone = bones[i];
                    //handles bone data structure 
                    HandleBone(bone,thick);
            
        }
}
function HandleBone(bone,strokeWeight){
    //the distal end of the bone closest to the finger tip .nextJoint
    var x = bone.nextJoint[0];
    var y = bone.nextJoint[1];
    //return from TransformCoordinate is a array , access with [] set to the tip of the bone
    var xT = TransformCoordinates(x,y)[0];
    var yT = TransformCoordinates(x,y)[1];
    //console.log(xT,yT);
    //var z = bone.nextJoint[2];
    //the proximal end of the bone closest to the torso 
    var x1 = bone.prevJoint[0];
    var y1 = bone.prevJoint[1];
     //return from TransformCoordinate is a array , access with [] set to the base of the bone
    var xB = TransformCoordinates(x1,y1)[0];
    var yB = TransformCoordinates(x1,y1)[1];
    //var z1 = bone.prevJoint[2];
    strokeWeight;
    //call line p5 method 
    line(xT,yT,xB,yB);
}
function TransformCoordinates(x,y){
        if (x <rawXMin){
		rawXMin = x;
	}
	if (x > rawXMax){
                rawXMax = x;
        }
	if (y <rawYMin){
                rawYMin = y;
        }
	if (y > rawYMax){
                rawYMax = y;
        }
        //apply same scaling  
        var oldRangeX = (rawXMax-rawXMin);
	var newRangeX=(window.innerWidth-0);
	x =(((x - rawXMin) * newRangeX) /oldRangeX) + rawXMin;
        var oldRangeY = (rawYMax-rawYMin);
        var newRangeY=(window.innnerHeight-0);
        var newY =(((y - rawYMin) * newRangeY) /oldRangeY) + rawYMin;
	newY =(y-rawYMin)*(window.innerHeight-0)/(rawYMax-rawYMin)+0;
        y = window.innerHeight-newY;
        
    return [x,y];
}
function HandleHand(hand){
	 var fingers=hand.fingers;
        for (var i=0;i<fingers.length;i++){
        //console.log(fingers[i]);
        //comment out the if statement to print all circles
                var finger = fingers[i];
                //handles finger data type structures
		HandleFinger(finger);
        }
            
}
function Handleframe(frame){
	if(frame.hands.length===1){
        	//console.log(frame.hands);
                var hand = frame.hands[0];
		HandleHand(hand);
	}
}

Leap.loop(controllerOptions, function(frame){
	clear();
	Handleframe(frame);

});
