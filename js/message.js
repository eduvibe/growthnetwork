// Sample data for demonstration; replace with actual data from your backend or state
const friendsData = {
    1: { name: 'Alice', status: 'Online', profilePic: 'https://picsum.photos/100/100?random=1' },
    2: { name: 'Bob', status: 'Offline', profilePic: 'https://picsum.photos/100/100?random=2' },
    // Add more friends as needed
};

document.addEventListener('DOMContentLoaded', () => {
    // Get all friend list items
    const friendItems = document.querySelectorAll('.friend-item');

    // Add click event listener to each friend item
    friendItems.forEach(item => {
        item.addEventListener('click', (event) => {
            const friendId = item.getAttribute('data-id');
            const friendData = friendsData[friendId];
            
            // Update the right sidebar with the friend's details
            if (friendData) {
                document.getElementById('userProfilePic').src = friendData.profilePic;
                document.getElementById('userProfileName').textContent = friendData.name;
                document.getElementById('userProfileStatus').textContent = friendData.status;
            }
        });
    });
});


const friends = [
    { id: 1, name: "Christino Morillo", avatar: "https://picsum.photos/40/40?random=5", lastMessage: "When are you coming?" },
    { id: 2, name: "John Smith", avatar: "https://picsum.photos/40/40?random=6", lastMessage: "I paid last month contribution." },
    { id: 3, name: "Genevieve", avatar: "https://picsum.photos/40/40?random=7", lastMessage: "What about last night had fun at Beach?" },
];

const chats = {
    1: [
        { id: 1, sender: "Christino Morillo", message: "When are you coming?", time: "05:46pm", isSelf: false },
        { id: 2, sender: "You", message: "Hi Dear, I'll be there by 7:30pm. btw where are u?", time: "06:30pm", isSelf: true },
        { id: 3, sender: "Christino Morillo", message: "DesiBoy Pub", time: "06:32pm", isSelf: false },
        { id: 4, sender: "You", message: "Coming.", time: "06:50pm", isSelf: true },
    ],
    2: [
        { id: 1, sender: "John Smith", message: "I paid last month contribution.", time: "03:00pm", isSelf: false },
        { id: 2, sender: "You", message: "Great, thank you John!", time: "03:15pm", isSelf: true },
    ],
    3: [
        { id: 1, sender: "Genevieve", message: "What about last night had fun at Beach?", time: "11:00am", isSelf: false },
        { id: 2, sender: "You", message: "Yes, it was amazing! We should do it again soon.", time: "11:30am", isSelf: true },
    ]
};

let currentChatId = null;

function renderFriendsList() {
    const friendsList = document.getElementById('friendsList');
    friendsList.innerHTML = friends.map(friend => `
        <li class="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer transition duration-300 neumorphic pulse-animation" data-friend-id="${friend.id}">
            <img src="${friend.avatar}" alt="${friend.name}" class="w-10 h-10 rounded-full mr-2">
            <div>
                <h3 class="font-semibold">${friend.name}</h3>
                <p class="text-sm text-gray-600">${friend.lastMessage}</p>
            </div>
        </li>
    `).join('');

    friendsList.addEventListener('click', (e) => {
        const friendItem = e.target.closest('li');
        if (friendItem) {
            const friendId = parseInt(friendItem.dataset.friendId);
            loadChat(friendId);
            updateActiveFriend(friendId);
        }
    });
}

function updateActiveFriend(friendId) {
    const friendItems = document.querySelectorAll('#friendsList li');
    friendItems.forEach(item => {
        item.classList.remove('friend-active');
        if (parseInt(item.dataset.friendId) === friendId) {
            item.classList.add('friend-active');
        }
    });
}

function loadChat(friendId) {
    currentChatId = friendId;
    const friend = friends.find(f => f.id === friendId);
    const chatHeader = document.getElementById('chatHeader');
    const chatName = document.getElementById('chatName');
    const chatAvatar = document.getElementById('chatAvatar');
    
    chatName.textContent = friend.name;
    chatAvatar.src = friend.avatar;
    
    renderChatMessages(chats[friendId]);
}

function renderChatMessages(messages) {
    const chatMessagesContainer = document.getElementById('chatMessages');
    chatMessagesContainer.innerHTML = messages.map(msg => `
        <div class="${msg.isSelf ? 'flex justify-end' : 'flex justify-start'}">
            <div class="${msg.isSelf ? 'bg-orange-500 text-white' : 'bg-gray-200'} rounded-lg p-3 max-w-xs lg:max-w-md message-bubble">
                <p class="text-sm">${msg.message}</p>
                <p class="text-xs text-right mt-1 ${msg.isSelf ? 'text-orange-200' : 'text-gray-500'}">${msg.time}</p>
            </div>
        </div>
    `).join('');
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    
    // Animate new messages
    gsap.from(".message-bubble", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
    });
}

document.getElementById('sendMessage').addEventListener('click', () => {
    if (currentChatId === null) {
        alert('Please select a chat first');
        return;
    }
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message) {
        const newMessage = {
            id: chats[currentChatId].length + 1,
            sender: "You",
            message: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSelf: true
        };
        chats[currentChatId].push(newMessage);
        renderChatMessages(chats[currentChatId]);
        messageInput.value = '';
        updateLastMessage(currentChatId, message);
    }
});

function updateLastMessage(friendId, message) {
    const friend = friends.find(f => f.id === friendId);
    friend.lastMessage = message;
    renderFriendsList();
    updateActiveFriend(friendId);
}

document.getElementById('searchFriends').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredFriends = friends.filter(friend => 
        friend.name.toLowerCase().includes(searchTerm) || 
        friend.lastMessage.toLowerCase().includes(searchTerm)
    );
    renderFilteredFriendsList(filteredFriends);
});

function renderFilteredFriendsList(filteredFriends) {
    const friendsList = document.getElementById('friendsList');
    friendsList.innerHTML = filteredFriends.map(friend => `
        <li class="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer transition duration-300 neumorphic pulse-animation" data-friend-id="${friend.id}">
            <img src="${friend.avatar}" alt="${friend.name}" class="w-10 h-10 rounded-full mr-2">
            <div>
                <h3 class="font-semibold">${friend.name}</h3>
                <p class="text-sm text-gray-600">${friend.lastMessage}</p>
            </div>
        </li>
    `).join('');
}

// Initialize the chat interface
renderFriendsList();

// Enable message sending on Enter key press
document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('sendMessage').click();
    }
});

// Simulated reply functionality
document.getElementById('chatMessages').addEventListener('click', (e) => {
    if (e.target.tagName === 'P' && e.target.parentElement.classList.contains('bg-gray-200')) {
        const replyTo = e.target.textContent;
        document.getElementById('messageInput').value = `Replying to: "${replyTo}" - `;
        document.getElementById('messageInput').focus();
    }
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Initialize particles.js
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#f97316" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#f97316", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Add smooth scrolling to chat messages
const chatMessages = document.getElementById('chatMessages');
chatMessages.addEventListener('scroll', () => {
    const scrollPercentage = (chatMessages.scrollTop / (chatMessages.scrollHeight - chatMessages.clientHeight)) * 100;
    if (scrollPercentage > 90) {
        gsap.to(chatMessages, { scrollTop: chatMessages.scrollHeight, duration: 0.5, ease: "power2.out" });
    }
});

// Add typing indicator
function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'flex justify-start';
    typingIndicator.innerHTML = `
        <div class="bg-gray-200 rounded-lg p-3 max-w-xs lg:max-w-md message-bubble">
            <p class="text-sm">Typing<span class="typing-dots">...</span></p>
        </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    gsap.to('.typing-dots', { opacity: 0, repeat: -1, yoyo: true, duration: 0.5 });
}

function hideTypingIndicator() {
    const typingIndicator = chatMessages.querySelector('.typing-dots')?.closest('.flex');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Simulate typing indicator when sending a message
document.getElementById('sendMessage').addEventListener('click', () => {
    showTypingIndicator();
    setTimeout(() => {
        hideTypingIndicator();
        // Add your message sending logic here
    }, 1500);
});