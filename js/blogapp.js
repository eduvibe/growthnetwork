document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const trendingTopics = document.getElementById('trendingTopics');
    const categories = document.getElementById('categories');
    const categoryTabs = document.getElementById('categoryTabs');
    const postInput = document.getElementById('postInput');
    const submitPost = document.getElementById('submitPost');
    const posts = document.getElementById('posts');
    const loadMore = document.getElementById('loadMore');
    const todoList = document.getElementById('todoList');
    const todoInput = document.getElementById('todoInput');
    const addTodo = document.getElementById('addTodo');
    const activeMembers = document.getElementById('activeMembers');

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        gsap.to('body', {backgroundColor: body.classList.contains('dark') ? '#1a202c' : '#f7fafc', duration: 0.5});
    });

    // Add trending topics
    const topics = ['Web Development', 'AI and Machine Learning', 'Cryptocurrency', 'Climate Change', 'Mental Health'];
    topics.forEach((topic, index) => {
        const li = document.createElement('li');
        li.textContent = topic;
        li.className = 'cursor-pointer hover:text-primary-color transition duration-300';
        trendingTopics.appendChild(li);
        gsap.from(li, {opacity: 0, x: -50, duration: 0.5, delay: index * 0.1});
    });

    // Add categories
    const categoryList = ['Technology', 'Science', 'Health', 'Business', 'Entertainment'];
    categoryList.forEach((cat, index) => {
        const div = document.createElement('div');
        div.textContent = cat;
        div.className = 'category-pill bg-primary-color text-white px-4 py-2 rounded-full cursor-pointer hover:bg-opacity-80 transition duration-300';
        categories.appendChild(div);

        const tab = document.createElement('button');
        tab.textContent = cat;
        tab.className = 'category-pill bg-gray-200 px-4 py-2 rounded-full hover:bg-primary-color hover:text-white transition duration-300';
        categoryTabs.appendChild(tab);

        gsap.from(div, {opacity: 0, y: 20, duration: 0.5, delay: index * 0.1});
        gsap.from(tab, {opacity: 0, y: 20, duration: 0.5, delay: index * 0.1});
    });

    // Post submission
    submitPost.addEventListener('click', () => {
        const content = postInput.value.trim();
        if (content) {
            addPost(content);
            postInput.value = '';
        }
    });

    function addPost(content) {
        const post = document.createElement('div');
        post.className = 'post-card neumorphic p-6';
        post.innerHTML = `
            <div class="flex items-center mb-4">
                <img src="https://picsum.photos/50/50?random=${Math.random()}" alt="Profile" class="w-12 h-12 rounded-full mr-4">
                <div>
                    <h3 class="font-semibold">User Name</h3>
                    <p class="text-sm text-gray-500">Just now</p>
                </div>
            </div>
            <p>${content}</p>
            <div class="mt-4 flex space-x-4">
                <button class="text-primary-color hover:underline">Like</button>
                <button class="text-primary-color hover:underline">Comment</button>
                <button class="text-primary-color hover:underline">Share</button>
            </div>
        `;
        posts.insertBefore(post, posts.firstChild);
        gsap.from(post, {duration: 0.5, y: 50, opacity: 0, ease: "back.out(1.7)"});
    }

    // Load more posts
    loadMore.addEventListener('click', () => {
        for (let i = 0; i < 3; i++) {
            addPost('This is a sample post content. #ThriveLink');
        }
    });

    // To-do list functionality
    addTodo.addEventListener('click', () => {
        const task = todoInput.value.trim();
        if (task) {
            const li = document.createElement('li');
            li.className = 'flex items-center space-x-2';
            li.innerHTML = `
                <input type="checkbox" class="form-checkbox h-5 w-5 text-primary-color">
                <span>${task}</span>
                <button class="ml-auto text-red-500 hover:text-red-700" onclick="this.parentElement.remove()">Delete</button>
            `;
            todoList.appendChild(li);
            todoInput.value = '';
            gsap.from(li, {duration: 0.5, x: -50, opacity: 0, ease: "back.out(1.7)"});
        }
    });

    // Add active members
    const members = [
        {name: 'Alice', status: 'online'},
        {name: 'Bob', status: 'offline'},
        {name: 'Charlie', status: 'online'},
        {name: 'Diana', status: 'offline'},
        {name: 'Eve', status: 'online'}
    ];

    members.forEach((member, index) => {
        const div = document.createElement('div');
        div.className = 'flex items-center space-x-1';
        div.innerHTML = `
            <span class="status-indicator ${member.status}"></span>
            <img src="https://picsum.photos/32/32?random=${index}" alt="${member.name}" class="h-8 w-8 rounded-full border-2 border-white">
            <span class="text-sm">${member.name}</span>
        `;
        activeMembers.appendChild(div);
        gsap.from(div, {opacity: 0, x: 20, duration: 0.5, delay: index * 0.1});
    });

    // Initialize with some posts
    for (let i = 0; i < 3; i++) {
        addPost('Welcome to ThriveLink! Connect, share, and thrive together. #CommunityGrowth');
    }

    // Add float animation to certain elements
    gsap.to('.float-animation', {y: -10, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut"});
});
