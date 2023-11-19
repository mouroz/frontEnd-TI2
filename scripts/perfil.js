/* Builds the profile from bottom to top
 * First analyze what profile page its supposed to build'
 * Then request to build the inner content specific to each option (mainpage, sobremim, planos ...)
 * The component responsible to build the inner component will then insert its value inside the 'frame'
 * which contains elements that is always common no matter the option.
 * 
 * (For sobre mim) -> ProfilesSobremim.js builds the inner content with information about the user
 *                    Then it returns the string of this inner content inside the outer frame (with ProfileFrame.js)
 *                    The result is a html string return that contains the entire html structure to append to the body
 * 
 * This step was needed as there was a common frame for all 3 or more different options. 
 */


import { createProfile, profileDefaultJson } from "../components/profile/ProfileMainpage.js";
import { createPlanos, planosDefaultJson } from "../components/profile/ProfilePlanos.js";
import { createSobremim, sobremimDefaultJson } from "../components/profile/ProfileSobremim.js";
import htmlPages from "../modules/htmlPaths.js";

const state = window.location.search.split('?').pop();
switch (state){
    case 'perfil':
        fetchData('/perfil/perfil', perfil, profileDefaultJson);
        break;

    case 'sobremim':
        fetchData('/perfil/sobremim', sobremim, sobremimDefaultJson);
        break;

    case 'plano':
        fetchData('/perfil/plano', planos, planosDefaultJson);
        break;

    default:
        console.error('None of the options where found, building default homepage');
        perfil(profileDefaultJson);

}


function fetchData(url, functionPointer, defaultJson){
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failure in perfil-fetch response');
            }
            return response.json();
        })
        .then(data => {
            if (!data) {
                throw new Error('Response data is not in JSON format');
            }
            functionPointer(data);
        })
        .catch(error => {
            console.error(error);
            if (defaultJson) {
                functionPointer(defaultJson);
            }
        });
}

function perfil(json){
    //use json to insert values
    attachBody(
        createProfile()
    );
}

function sobremim(json){
    attachBody(
        createSobremim()
    );
}

function planos(json){
    //use json to insert values
    attachBody(
        createPlanos()
    );
}

function attachBody(child) {
    const container = document.getElementById('main');
    container.innerHTML = child;

    const navElements = document.querySelectorAll('.pageOff');

    navElements.forEach(function(element) {
        element.addEventListener("click", function() {
            var text = element.textContent.trim();
            // Determine which link was clicked and navigate accordingly
            switch (text) {
                case "Informacoes gerais":
                    window.location.href = htmlPages.perfilMainpage;
                    break;
                case "Sobre mim":
                    window.location.href = htmlPages.perfilSobremim;
                    break;
                case "Plano":
                    window.location.href = htmlPages.perfilPlano;
                    break;
                default:
                    console.warn('test')
                    break;
            }
        });
    });
    
    if (state === 'perfil') {
        navElements[0].classList.remove('pageOff');
        navElements[0].classList.add('pageOn');
    } else if (state === 'sobremim') {
        navElements[1].classList.remove('pageOff');
        navElements[1].classList.add('pageOn');
    } else if (state === 'plano') {
        navElements[2].classList.remove('pageOff');
        navElements[2].classList.add('pageOn');
    }
}


