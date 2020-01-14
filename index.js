$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('body,html').animate({
          scrollTop: $(hash).offset().top
            }, 1200, function(){
                window.location.hash = hash;
                }
            );
    }
  });
});
var width = $(window).width();

window.onscroll = function(){
if ((width >= 900)){
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $("#middle").css("background-size","140% auto");
    }else{
        $("#middle").css("background-size","100% auto");
    }
}
};

setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
  },800);
},1450);





let formList = document.getElementById("formList");
let formName = document.getElementById("formName");
let formEmail = document.getElementById("formEmail");

let formText = document.getElementById("formText");
let formButton = document.getElementById("formButton");

function getMessages() {
    fetch('http://localhost:3000/messages')
        .then(function (response) {
            response.json().then(function (messages) {
                appendMessagesToDOM(messages);
            });
        });
};

function postMessage() {
    const postObject = {
        name: formName.value,
        email: formEmail.value,
        text: formText.value
    }

    fetch('http://localhost:3000/messages', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        getMessages();
        resetForm();
    });
}

function deleteMessage(id) {

    fetch(`http://localhost:3000/messages/${id}`, {
        method: 'DELETE',
    }).then(function () {
        getMessages();
    });
}

function updateMessage(id) {
    const putObject = {
        name: formName.value,
        email: formEmail.value,
        text: formText.value
    }

    fetch(`http://localhost:3000/messages/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(function () {
        getMessages();
        resetForm();
    });
}

function editMessage(message) {
    updateButton.addEventListener('click', function () {
        updateMessage(message.id)
    });
}

function appendMessagesToDOM(messages) {
    while (formList.firstChild) {
        formList.removeChild(formList.firstChild);
    }

    // create and append tags
    for (let i = 0; i < messages.length; i++) {
        //  Create new image&name objects.
        let name = document.createElement('p');
        name.innerText = messages[i].name;
        name.className = "services-span";

        let email = document.createElement('p');
        email.innerText = messages[i].email;
        email.className = "services-span";

        let text = document.createElement('p');
        text.innerText = messages[i].text;
        text.className = "services-span";

        let editButton = document.createElement('button');
        editButton.addEventListener('click', function () {
            updateMessage(messages[i].id);
        });
        editButton.innerText = 'Edit';
        editButton.className = 'btn_one';
        let deleteButton = document.createElement('button')
        deleteButton.addEventListener('click', function () {
            deleteMessage(messages[i].id)
        });
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'btn_one';
        //  Create a container for the new nodes.
        let container = document.createElement('div');
        container.appendChild(name);
        container.appendChild(email);
        container.appendChild(text);
        container.appendChild(editButton);
        container.appendChild(deleteButton);

        formList.appendChild(container);
    }
}

function resetForm() {
    formName.value = '';
    formUrl.value = '';
}

var messageList;

formButton.addEventListener('click', postMessage);

getMessages();
