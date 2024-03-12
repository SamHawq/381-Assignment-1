async function login(){
    var usernameInput = document.getElementById('username').value;
    var passwordInput = document.getElementById('password').value;

    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json();

        console.log('Fetched Data', data);
        var userFound = data.find(user => user.username === usernameInput && user.email === passwordInput);
    
        if(userFound){
            loginMessage('Login successful!');
        } else {
            loginMessage('Invalid username or useremail. Please Try Again.');
        }
    } catch(error){
        console.error('Error fetching data:', error);
        loginMessage('Error fetching data from API');
    }
}

function loginMessage(message){
    var existingMessageBox = document.getElementById('message-box');
    
    if (existingMessageBox) {
        existingMessageBox.innerHTML = ''; 
        existingMessageBox.textContent = message;
    } else {
        var newMessageBox = document.createElement('div');
        newMessageBox.id = 'message-box';
        newMessageBox.textContent = message;
        document.querySelector('main').appendChild(newMessageBox);
    }
}