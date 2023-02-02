video="";
status="";
objects=[];

function preload(){
    video=createVideo('video.mp4');
}

function setup(){
    canvas=createCanvas(380,280);
    canvas.center();
    video.hide();
}

function draw(){
    image(video, 0, 0, 380, 280);
    if(status != ""){
        ObjectDetection.detect(video, gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Le Object Has Been Detected.";
            document.getElementById("number-of-objects").innerHTML="Number Of Objects Detected Are " + objects.length;


            fill("blueviolet");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill();
            stroke("blueviolet");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results){
    if(error){
        console.error();
    }
    console.log(results);
    objects=results;
}

function start(){
    ObjectDetection=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Detecting Objects....";
}

function modelLoaded(){
    console.log("Model Is Loaded 👍");
    status=true
    video.loop();
    video.speed(1);
    video.volume(0);
}

