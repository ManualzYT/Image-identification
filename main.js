camera = document.getElementById("camera");
Webcam.set({
    height:300,
    width:350,
    image_format:'jpeg',
    jpeg_quality:99
});

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+ data_uri + '">';
    });
}

console.log('ml5version:' , ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/hZfdUQ0vA/model.json' , model_Loaded);
function model_Loaded(){
    console.log('model loaded');
}

function check(){
    img = document.getElementById("capture_image");
    classifier.classify(img , gotResult);
}

function gotResult(error , results){
  if(error){
      console.error(error);
  }
  else{
      console.log(results);
      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3); 
 }
}