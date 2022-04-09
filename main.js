var status = "";

function setup() {
   canvas =  createCanvas(480,480);
   canvas.center();
   video = createCapture(VIDEO);
   video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    var object = document.getElementById('input').value;
}
function modelLoaded() {
    console.log('Model IS loaded!!!!!');
    status = true;
}

function draw() {
    image(video,0,0,480,480);
    if(status != ""){
        objectDetector.detect(video,gotResult);
    }
      for(i = 0; i<objects.length; i++) {
        document.getElementById("status").innerHTML = "Status: Detecting objects";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are" + objects.length;

        var percent = floor(objects[i].confidence * 100);
        text(object[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      nofill();
      stroke('#FF0000');
        rect(object[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects.length == object){
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById('status').innerHTML = "Object Mentioned Found";
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance('Onject mentioned found');
        synth.speak(utterThis);
        }
        else{
            document.getElementById('status').innerHTML = "Object mentioned not found";
        }
      }
      
}


