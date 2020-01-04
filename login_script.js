const loginName = document.getElementById('loginName');
const loginPassword = document.getElementById('loginPassword');
let loginButton = document.getElementById('loginButton');
let result = document.getElementById('login-result');

function checkLogin() {
    fetch('http://localhost:3000/users')
        .then(function (response) {
            response.json().then(function (users) {
                checkValidUser(users);
            });
        });
}

function checkValidUser(users) {
    let userName = loginName.value;
    let userPassword = loginPassword.value;

    resetData();

    for (var i = 0; i < users.length; i++) {
        if (users[i].name == userName && users[i].password == userPassword) {
            let serverMessage = document.createElement('p');
            serverMessage.innerText = 'Congratulations! You have successfully logged in!'

            let container = document.createElement('div');
            container.appendChild(serverMessage);
            result.appendChild(container);

            return;
        }
    }
    let serverMessage = document.createElement('span');
    serverMessage.innerText = 'The login data is incorrect'

    let container = document.createElement('div');
    container.appendChild(serverMessage);
    result.appendChild(container);
}

function resetData() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
}
loginButton.addEventListener('click', checkLogin);
resetData();
