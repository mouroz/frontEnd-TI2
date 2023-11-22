///DEFINED CONSTANTS
const defaultJson = {
    title: 'Placeholder 1', 
    text: 'my description is this', 
    type: 0, //support for extra types for later
    alternatives: [
        "alternative1", "alternative2", "alternative3", "alternative4", "alternative5"
    ],
    correct: '1'
}
let g_progress = 0; //counts progress towards finishing the trilha
let g_correct = 0;

//default score even if answer is incorrect (100 points is total)
const incrementDefault = 2.5; 

//mod * incrementDefault for when you got it right
const isCorrectMod = 5


import { getUsername } from "../modules/user-data.js";
import { restfulJsonGet, getPaths } from "../modules/bancoti2-fetch.js";

addEventListener('DOMContentLoaded', () => {
    //user username as unique key
    const userKey = getUsername();
    if (userKey == null || userKey == '') console.error('Couldnt access user key');  
    const json = restfulJsonGet(getPaths.exercicios, userKey);

    if (json != null) updateExercicios(json);
    else updateExercicios (defaultJson);

})


const form = document.getElementById("question-form");
const title = document.getElementById("question-form-header");
const question = document.querySelector(".question-form-text");
const alternatives = document.querySelectorAll(".alternative-label"); //labels
const alternativesText = document.querySelectorAll(".alternative-text");

const button = document.getElementById("enviar-button");
const progressBar = document.getElementById("progress-bar");
const debugCorrectValue = document.getElementById("alternative-debug-correct");


function updateExercicios(json) {
    if (json.alternatives.length != 5) {
        console.warn("unexpected alternatives length " + json.alternatives.length);
    }

    title.textContent = json.title;
    question.textContent = json.text;
    if (debugCorrectValue != null) debugCorrectValue.textContent = json.correct;
    g_correct = json.correct;
    let cont = 0;
   
    alternatives.forEach(function (element) {
        const alternativeText = element.querySelector('.alternative-label-text');
        alternativeText.textContent = json.alternatives[cont];
        cont++;
    });

}

//Checks if input was selected and if so compare to stored correct result
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let selectedValue = -1;
    console.log(alternatives.length)
    for (let i = 0; i < alternatives.length; i++) {
        const label = alternatives[i];
        const input = label.querySelector('input[type="radio"]');
        if (input.checked) {
            selectedValue = input.value;
            input.checked=false;
            break; 
        }
    }

    if (selectedValue > -1){ //if something was selected
        let increment = (selectedValue == g_correct) ? incrementDefault : incrementDefault*isCorrectMod;
        g_progress = (increment + g_progress > 100) ? 100 : g_progress+increment;

        //On 100 the bar is filled
        progressBar.style.height = g_progress + '%';
        
        if (g_progress < 100) fetchNewExercise(); 
        else {
            alert('Voce concluiu!');
            //code here
        }
    } else {
        alert('Selecione uma opcao!');
    }

});
