import { getName } from "../modules/user-data.js";


const username = getName();
const commentForm = document.getElementById('comment-form');
const commentBox = document.getElementById('comment-box');
commentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    if (username == null) { 
        alert("Cannot comment as you are not logged in");
        return;
    }

    const commentInput = commentBox.value; //commenting box content
    if (commentInput.trim() != '') {
        sendComment(commentInput);
    }
})

function sendComment(commentInput) {
    const serverRequestData = {
        username: username,
        content: commentInput
    };

    console.log(serverRequestData);
    fetch('/forum/page-comment', {
        method: "PUT", // You can use GET or POST, depending on your server's implementation.
        body: JSON.stringify(serverRequestData),
        headers: {
            "Content-Type": "application/json"
            //for form body there is no need for Content-Type header
        }
    })
        .then(response => {
            console.log(response.status);
            switch (response.status) {
                case 401:
                    alert("Server dismissed response");
                    break;
                case 200:
                    window.location.href = window.location.href; //refresh
                    break;
                default:
                    alert("Unexpected response from server");
            }
        })
        .catch (error => {
            let message = 'couldnt send comment';
            
            alert(message);
            console.error(message + ' ' + error.message);
        })
        .finally (() => {
            commentBox.value = '';
        })


}

