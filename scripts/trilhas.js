
import { getTrilhaCard } from "../components/TrilhaCard.js";
import htmlPages from "../modules/htmlPaths.js";

//exercices link for each card
const adhdExLink = htmlPages.exercicios;
const desflexiaExLink = htmlPages.exercicios;
const outraExLink = htmlPages.exercicios;

//img src for each card
const adhdImg = '/images/profile/basic-graph.png'
const desflexiaImg = '/images/profile/basic-graph.png'
const outraImg = '/images/profile/basic-graph.png'

const cardsData = 
[
    { title: 'Adhd Trilha',  description: 'my description is this', link: adhdExLink, image: adhdImg },
    { title: 'Desflexia Trilha', description: 'my description is this', link: desflexiaExLink, image: desflexiaImg },
    { title: 'outra Trilha', description: 'my description is this', link: outraExLink, image: outraImg }
];




document.addEventListener("DOMContentLoaded", function () {
    loadElements();
});


/* Use information compacted at modalData's objs to load each card
 * Each div with class '.PlaceHolder-Trilha' receive the cards as inner elements
 * Each card will contain a click event listenener, that will open and change modal information
 */ 
function loadElements(){
    //acess the container and placeholders list
    const container = document.getElementById("trilha-container");
    const placeholders = container.querySelectorAll(".Placeholder-Trilha");


    //acess to modal elements
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalLink = document.getElementById("modal-link");
    const closeBtn = document.getElementById("close-modal"); 
    
    if (placeholders.length != cardsData.length) {
        console.warn (`Html contains more or less placeholders than expected: 
        ${placeholders.length} placeholders for ${cardsData.length} prepared obj data for the cards`)
    }

    placeholders.forEach(function (element, index) {
        //cardsData obj values
        const title = cardsData[index].title;
        const description = cardsData[index].description;
        const link = cardsData[index].link;
        const image = cardsData[index].image;

        //get card html string, with image and title values updated
        const card = getTrilhaCard(image, title);
        
        //set card html string as child of placeholder
        element.innerHTML = card;

        //add click listener for entire card
        element.addEventListener("click", () => {
            modalImage.src = image;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalLink.href = link; //current identifier

            // Show the modal
            modal.style.display = "block";
        });
    });

    // Close modal with button
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close the modal if the background is clicked
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

