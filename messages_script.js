const list = document.getElementById('image-list');
const formName = document.getElementById('formName');
const formUrl = document.getElementById('formUrl');
const addButton = document.getElementById('addButton');
let updateButton = document.getElementById('updateButton');
let slideshowButton = document.getElementById('slideshowButton');
let slides = document.getElementById('slideshow');
let stopButton = document.getElementById('stopButton');


function getMessages() {
    fetch('http://localhost:3000/messages')
        .then(function (response) {
            response.json().then(function (messages) {
                appendMessagesToDOM(messages);
            });
        });
};

function postMessage() {
    //  Create a new post object.
    const postObject = {
        name: formName.value,
        img: formUrl.value
    }

    fetch('http://localhost:3000/messages', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        // Get the new message list
        getMessages();
        resetForm();
    });
}

function deleteMessage(id) {
    // delete message
    fetch(`http://localhost:3000/messages/${id}`, {
        method: 'DELETE',
    }).then(function () {
        getMessages();
    });
}

function updateMessage(id) {
    //  Create a new put object.
    const putObject = {
        name: formName.value,
        img: formUrl.value
    }

    fetch(`http://localhost:3000/messages/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(function () {
        getMessages();
        addButton.disabled = false;
        clearUpdateButtonEvents();
        resetForm();
    });
}

function editMessage(message) {

    formName.value = message.name;
    formUrl.value = message.str;
    addButton.disabled = true;

    clearUpdateButtonEvents();

    updateButton.disabled = false;
    updateButton.addEventListener('click', function () {
        updateMessage(message.id)
    });
}

function appendMessagesToDOM(messages) {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // create and append tags
    for (let i = 0; i < messages.length; i++) {
        //  Create new image&name objects.
        let img = document.createElement('img');
        console.log(messages[i].img);
        img.src = messages[i].img;
        img.className = "services-image";
        let name = document.createElement('span');
        name.innerText = messages[i].name;
        name.className = "services-span";

        //  Create edit&delete buttons.
        let editButton = document.createElement('button');
        editButton.addEventListener('click', function () {
            editMessage(messages[i])
        });
        editButton.innerText = 'Edit';
        editButton.className = 'script-btn';
        let deleteButton = document.createElement('button')
        deleteButton.addEventListener('click', function () {
            deleteMessage(messages[i].id)
        });
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'script-btn';
        //  Create a container for the new nodes.
        let container = document.createElement('div');
        container.appendChild(img);
        container.appendChild(name);
        container.appendChild(editButton);
        container.appendChild(deleteButton);

        list.appendChild(container);
    }
}

function resetForm() {
    formName.value = '';
    formUrl.value = '';
}

function clearUpdateButtonEvents() {
    let newUpdateButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
    updateButton = document.getElementById('updateButton');
}

var messageList;
var slideTimer;
function generateSlideshow() {
    fetch('http://localhost:3000/messages')
        .then(function (response) {
            response.json().then(function (messages) {
                messageList = messages;
                slideTimer = window.setInterval(showSlides, delayMs);
            });
        });
}

var slideIndex = 0;
var delayMs = 2000;
function showSlides() {
    while (slides.firstChild) {
        slides.removeChild(slides.firstChild);
    }
    let image = document.createElement('img');
    image.src = messageList[slideIndex].img;
    image.className = "services-image";

    slideIndex++;
    if (slideIndex >= messageList.length) {
        slideIndex = 0;
    }

    slides.appendChild(image);
}

function stopSlides() {
    window.clearInterval(slideTimer);
    while (slides.firstChild) {
        slides.removeChild(slides.firstChild);
    }
}

addButton.addEventListener('click', postMessage);
slideshowButton.addEventListener('click', generateSlideshow);
stopButton.addEventListener('click', stopSlides);

getMessages();
