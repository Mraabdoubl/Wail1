document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const firstName = document.getElementById('login-firstname').value;
    const lastName = document.getElementById('login-lastname').value;
    const password = document.getElementById('login-password').value;

    if (localStorage.getItem(`${firstName} ${lastName}`) === password) {
        alert('Login successful');
        loadInternalPage(firstName, lastName);
    } else {
        alert('Invalid credentials');
    }
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const firstName = document.getElementById('signup-firstname').value;
    const lastName = document.getElementById('signup-lastname').value;
    const password = document.getElementById('signup-password').value;

    localStorage.setItem(`${firstName} ${lastName}`, password);
    alert('Sign up successful');
});

function loadInternalPage(firstName, lastName) {
    document.body.innerHTML = `
        <div id="internal-page">
            <h1>Welcome, ${firstName} ${lastName}</h1>
            <nav>
                <ul>
                    <li><a href="#" id="home">Home</a></li>
                    <li><a href="https://quran.com/ar" target="_blank">قراءة القرآن</a></li>
                    <li><a href="#" id="complaint">الشكوى</a></li>
                </ul>
            </nav>
            <div id="content">
                <div id="home-content">
                    <h2>Chat Room</h2>
                    <div id="chat-room"></div>
                    <textarea id="chat-input" placeholder="Type your message..."></textarea>
                    <button id="send-button">Send</button>
                </div>
                <div id="complaint-content" style="display: none;">
                    <h2>الشكوى</h2>
                    <textarea id="complaint-input" placeholder="اكتب شكواك هنا..."></textarea>
                    <button onclick="sendComplaint()">Send</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('home').addEventListener('click', function() {
        document.getElementById('home-content').style.display = 'block';
        document.getElementById('complaint-content').style.display = 'none';
    });

    document.getElementById('complaint').addEventListener('click', function() {
        document.getElementById('home-content').style.display = 'none';
        document.getElementById('complaint-content').style.display = 'block';
    });

    document.getElementById('send-button').addEventListener('click', function() {
        const message = document.getElementById('chat-input').value;
        if (message.trim() !== '') {
            addMessageToChatRoom(message, `${firstName} ${lastName}`);
            document.getElementById('chat-input').value = '';
        }
    });
}

function addMessageToChatRoom(message, user) {
    const chatRoom = document.getElementById('chat-room');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.textContent = `${user}: ${message}`;
    chatRoom.appendChild(messageDiv);
    chatRoom.scrollTop = chatRoom.scrollHeight;
}

function sendComplaint() {
    const complaint = document.getElementById('complaint-input').value;
    alert('شكواك تم إرسالها: ' + complaint);
    document.getElementById('complaint-input').value = '';
}