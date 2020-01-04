const registerName = document.getElementById('registerName');
const registerPassword = document.getElementById('registerPassword');
let registerButton = document.getElementById('registerButton');
let result = document.getElementById('register-result');

function checkRegister() {
    fetch('http://localhost:3000/users')
        .then(function (response) {
            response.json().then(function (users) {
                checkValidUser(users);
            });
        });
}
function checkValidUser(users) {
    
    let userName = registerName.value;
    let userPassword = registerPassword.value;

    resetData();

    for (var i = 0; i < users.length; i++) {
        if (users[i].name == userName) {
            let serverMessage = document.createElement('p');
            serverMessage.innerText = 'There is an existing user with the same name. Could not create user';

            let container = document.createElement('div');
            container.appendChild(serverMessage);
            result.appendChild(container);
            return;
        }
    }

    let serverMessage = document.createElement('span');
    serverMessage.innerText = 'You have successfully created a new user !'

    let container = document.createElement('div');
    container.appendChild(serverMessage);
    result.appendChild(container);

    const postObject = {
        name: userName,
        password: userPassword
    }
    fetch('http://localhost:3000/users', {
        method: 'post',headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    });
}
function resetData() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
}
registerButton.addEventListener('click', checkRegister);
resetData();
