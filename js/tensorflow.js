// Load Model
var model;
async function load_model(){
    MODEL_URL = 'https://kcarrig.github.io/js//model/model.json';
    model = await tf.loadLayersModel(MODEL_URL);
    //console.log('Tensorflow Model Loaded');
    //alert("model loaded!");

}
load_model();

// Load Universal Sentence encoder
var encoder;
async function load_encoder(){
    encoder = await use.load()
    console.log('Universal Sentence Encoder Loaded')
}
load_encoder();

// Define Input Area
var input_area = document.getElementById('inpt_search');

// Event Listener: Hit Submit if Users Clicks Enter
/*
input_area.addEventListener("keyup",function (event) {
    if (event.keyCode == 13){
      console.log ("Enter Button Hit!")
      document.getElementById('submit_button').click();
    }
});
*/

input_area.addEventListener("click",function (event) {
  document.getElementById('inpt_search').innerText="";
  const elements = document.getElementsByClassName("pred");
  while (elements.length > 0) elements[0].remove();
});

// Define Submit Button
var submit_button = document.getElementById('submit_button');

// Event Listener: Submit Button

tf.tidy(() => {

submit_button.addEventListener("click", async function (event){
  console.log ("Submit Button Hit!")

  let text = document.getElementById('inpt_search').value;
  document.getElementById('inpt_search').value="";

  let embeddings = await encoder.embed(text);
  let formatted_embeddings = Array.from(embeddings.dataSync());

  let prediction = await model.predict(embeddings);
  let formatted_prediction = Array.from(prediction.dataSync());

  console.log(formatted_prediction);
  //document.getElementById('embeddings').innerText=formatted_embeddings;
  document.getElementById('prediction1').innerHTML+='<h6 class="mt-3 pred">'+Math.round(formatted_prediction[0]*100)+'% Match</h6>';
  document.getElementById('prediction2').innerHTML+='<h6 class="mt-3 pred">'+Math.round(formatted_prediction[5]*100)+'% Match</h6>';
  document.getElementById('prediction3').innerHTML+='<h6 class="mt-3 pred">'+Math.round(formatted_prediction[1]*100)+'% Match</h6>';
  document.getElementById('prediction4').innerHTML+='<h6 class="mt-3 pred">'+Math.round(formatted_prediction[4]*100)+'% Match</h6>';
  document.getElementById('prediction5').innerHTML+='<h6 class="mt-3 pred">'+Math.round(formatted_prediction[3]*100)+'% Match</h6>';
  document.getElementById('prediction6').innerHTML+='<h6 class="mt-3 pred">'+Math.round(formatted_prediction[2]*100)+'% Match</h6>';

});

});
