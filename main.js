function setup() {
  canvas = createCanvas(300, 300);
  // canvas.center();
  canvas.position(700,380);

  //1 accessing the webcam
  video = createCapture(VIDEO);
  video.hide();

  //3 load the Mobilenet model
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded() {
  console.log('Model Loaded!');
}

function draw() {
  //2 place webcam on the canvas
  image(video, 0, 0, 300, 300);

  // execution of ml5.js function should happen in real time so its put in draw()
  classifier.classify(video, gotResult);
  // as it is in draw() it displays results continuously
}

// to hold the result label
var previous_result = '';

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    // changing the output continuously almost every second
    // result is displayed even when the model is not very accurate about the result
    // checking the model's confidence will reduce the rate at which the output changes

    // If both the previous_result and the current result label are equal, it means
    // the same object is still being shown to the webcam
    if ((results[0].confidence > 0.5) && (previous_result != results[0].label)) {
      console.log(results);
      previous_result = results[0].label;
      var synth = window.speechSynthesis;
      speak_data = 'Object detected is - ' + results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}