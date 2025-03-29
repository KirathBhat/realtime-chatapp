//Client Side Script

const socket = io('http://localhost:8000', {
    withCredentials: true,
    transports: ['websocket', 'polling']});
console.log("Client side script loaded");

var audio = new Audio('../static/notif.mp3');

const form = document.getElementById("sendContainer");
const msgInp = document.getElementById('messageInp');
const msgContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    msgContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    msgInp.value = '';
    msgContainer.scrollTop = msgContainer.scrollHeight;
});

const name = prompt("Enter your name to join");

socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'left');
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
    msgContainer.scrollTop = msgContainer.scrollHeight;
})

socket.on('left', name =>{
    append(`${name} left the chat`, 'left');
    msgContainer.scrollTop = msgContainer.scrollHeight;
})