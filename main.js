song = "";
leftWristX = "";
leftWristY = "";
rightWristY = "";
rightWristX = "";
scoreleft = "";
scoreright = "";

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(2.5);
}

function setup(){
    video = createCapture(VIDEO);
    video.hide();
    canvas = createCanvas(550,550);
    canvas.position(450,140);

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("Posenet is in.")
}

function gotPoses(results){

    if(results.length > 0){
        console.log(results);
        scoreleft = results[0].pose.keypoints[9].score;
        scoreright = results[0].pose.keypoints[10].score;
        console.log(scoreleft);
        console.log(scoreright);

        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);

    }

}

function draw(){
    image(video,0,0,550,550);

    if(scoreleft > 0.2){   

    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX,leftWristY,20);

    numberwrist = Number(leftWristY);
    removedecimals = floor(numberwrist);
    volume = removedecimals/500;
    document.getElementById("volume").innerHTML = "Volume = "+volume;
    
    song.Volume(volume);
    }
 
}

function stop(){
    song.stop();
}

