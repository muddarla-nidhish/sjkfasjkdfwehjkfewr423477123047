var previous_result='';
function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',modelLoaded);
}
function preload(){

}
function draw(){
  image(video,0,0,300,300);
classifier.classify(video,gotResult);
}
function modelLoaded(){
console.log('modalLoaed');
}
function gotResult(error,results){
  if(error){
console.error(error);
  }
  else{
   if((results[0].confidence>0.5)&&(previous_result!=results[0].label)){
     previous_result=results[0].label;
var synth=window.speechSynthesis;
speak_data='object detected is'+results[0].label;
var utterThis=new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);
document.getElementById("object1").innerHTML=results[0].label;
document.getElementById("accuracy1").innerHTML=results[0].confidence.toFixed(3);
   } 
  }
}
