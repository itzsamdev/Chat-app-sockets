const socket = io()

const textArea = document.querySelector(".text-area")
const form = document.querySelector("form");
const input = document.getElementById("text-input")

let name;
do {
    name = prompt("Enter ypir name");
} while (!name)

socket.emit("new-user-joined", name);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
        let msg = {
            user: name,
            message: input.value.trim()
        }
        // Send to Server
        socket.emit("send", msg)
        append(msg, "outgoing")
        input.value = '';
    }
})

socket.on("receive", (message) => {
    append(message, "incoming")
    scrollToBottom()
})

function append(msg, position) {

    let div = document.createElement('div')
    div.classList.add(position, "message")

    let markup =
        `<h4> ${msg.user}</h4>
        <p>${msg.message}</p>`

    div.innerHTML = markup;

    textArea.appendChild(div);
    // window.scrollTo(0, document.body.scrollHeight);
    scrollToBottom()
}

function scrollToBottom() {
    textArea.scrollTop = textArea.scrollHeight
}