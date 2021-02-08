status="";
objects=[];

function preload(){
    
}

function setup(){
    canvas = createCanvas(380,380);
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    canvas.center();
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
}


function modelloaded(){
    console.log("Model has been loaded");
    status="True";
    document.getElementById("status").innerHTML="Status : Detecting objects";
   
}

function gotresults(error,results) {
    if (error){
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video,0,0,380,380);
    objectdetector.detect(video,gotresults);

    if(status != ""){

        r = random(255);
        g = random(255);
        b = random(255);

        for ( i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Object detected";
            document.getElementById("number").innerHTML = "No of objects detected: " + objects.length;
            console.log("hi");
            accuracy= floor(objects[i].confidence * 100) + " %";
            fill(r,g,b);
            text(objects[i].label + " " + accuracy , objects[i].x , objects[i].y);
            stroke(r,g,b);
            noFill();
            rect(objects[i].x , objects[i].y ,objects[i].height , objects[i].width);
        }
    }

}