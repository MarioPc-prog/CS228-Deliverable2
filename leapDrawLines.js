var controllerOptions = {};
var x = window.innerWidth;
var y = window.innerHeight;
var rawXMin = 1000;
var rawXMax = 100;
var rawYMin = 1000;
var rawYMax = 100;

function HandleFinger(finger){
	var x = finger.tipPosition[0];
	var y=finger.tipPosition[1];
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
	newY =(y-rawYMin)*(window.innerHeight-0)/(rawYMax-rawYMin)+0
        //prints only the 5 circles "finger tip"
 	//circle(x,window.innerHeight-newY,50);
        var bones = finger.bones;
        for (var i=0;i<bones.length;i++){
                var bone = bones[i];
                    //handles bone data structure 
                    HandleBone(bone);
            
        }
}
function HandleBone(bone){
    //the distal end of the bone closest to the finger tip .nextJoint
    var x = bone.nextJoint[0];
    var y = bone.nextJoint[1];
    //var z = bone.nextJoint[2];
    //the proximal end of the bone closest to the torso 
    var x1 = bone.prevJoint[0];
    var y1 = bone.prevJoint[1];
    //var z1 = bone.prevJoint[2];
    //calibration for both the base and tip of the bone 
    if (bone.nextJoint[0] <rawXMin){
		rawXMin=bone.nextJoint[0];
	}
	if (bone.nextJoint[0] > rawXMax){
                rawXMax=bone.nextJoint[0];
        }
	if (bone.nextJoint[1] <rawYMin){
                rawYMin=bone.nextJoint[1];
        }
	if (bone.nextJoint[1] > rawYMax){
                rawYMax=bone.nextJoint[1];
        }
    if (bone.prevJoint[0] <rawXMin){
		rawXMin=bone.prevJoint[0];
	}
	if (bone.prevJoint[0] > rawXMax){
                rawXMax=bone.prevJoint[0];
        }
	if (bone.prevJoint[1] <rawYMin){
                rawYMin=bone.prevJoint[1];
        }
	if (bone.prevJoint[1] > rawYMax){
                rawYMax=bone.prevJoint[1];
        }
        //apply same scaling  
        var oldRangeX1 = (rawXMax-rawXMin);
	var newRangeX1=(window.innerWidth-0);
	x1 =(((x1 - rawXMin) * newRangeX1) /oldRangeX1) + rawXMin;
        var oldRangeY1 = (rawYMax-rawYMin);
        var newRangeY1=(window.innnerHeight-0);
        var newY1 =(((y1 - rawYMin) * newRangeY1) /oldRangeY1) + rawYMin;
	newY1 =(y1-rawYMin)*(window.innerHeight-0)/(rawYMax-rawYMin)+0;
        y1 = window.innerHeight-newY1;
        
       //apply same scaling
	var oldRangeX = (rawXMax-rawXMin);
	var newRangeX=(window.innerWidth-0);
	x =(((x - rawXMin) * newRangeX) /oldRangeX) + rawXMin;
        var oldRangeY = (rawYMax-rawYMin);
        var newRangeY=(window.innnerHeight-0);
        var newY =(((y - rawYMin) * newRangeY) /oldRangeY) + rawYMin;
	newY =(y-rawYMin)*(window.innerHeight-0)/(rawYMax-rawYMin)+0;
        y = window.innerHeight-newY;
        //call line p5 method 
        line(x,y,x1,y1);
        
}
function TransformCoordinates(x,y){
    
    
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
