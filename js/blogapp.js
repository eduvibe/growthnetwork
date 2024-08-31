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

        // Dark mode toggle
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark');
        });

        // Add trending topics
        const topics = ['Web Development', 'AI and Machine Learning', 'Cryptocurrency', 'Climate Change', 'Mental Health'];
        topics.forEach(topic => {
            const li = document.createElement('li');
            li.textContent = topic;
            li.className = 'cursor-pointer hover:text-primary-color transition duration-300';
            trendingTopics.appendChild(li);
        });

        // Add categories
        const categoryList = ['Technology', 'Science', 'Health', 'Business', 'Entertainment'];
        categoryList.forEach(cat => {
            const div = document.createElement('div');
            div.textContent = cat;
            div.className = 'category-pill bg-primary-color text-white px-4 py-2 rounded-full cursor-pointer';
            categories.appendChild(div);

            const tab = document.createElement('button');
            tab.textContent = cat;
            tab.className = 'category-pill bg-gray-200 px-4 py-2 rounded-full hover:bg-primary-color hover:text-white transition duration-300';
            categoryTabs.appendChild(tab);
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


        document.addEventListener('DOMContentLoaded', () => {
    const postInput = document.getElementById('postInput');
    const submitPost = document.getElementById('submitPost');
    const posts = document.getElementById('posts');
    const imageInput = document.getElementById('imageInput');
    const videoInput = document.getElementById('videoInput');

    submitPost.addEventListener('click', () => {
        const content = postInput.value.trim();
        const imageFile = imageInput.files[0];
        const videoUrl = videoInput.value.trim();
        
        if (content || imageFile || videoUrl) {
            addPost(content, imageFile, videoUrl);
            postInput.value = '';
            imageInput.value = '';
            videoInput.value = '';
        }
    });

    function addPost(content, imageFile, videoUrl) {
        const post = document.createElement('div');
        post.className = 'post-card neumorphic p-6';
        
        // Create post content
        let postContent = `<div class="flex items-center mb-4">
                               <img src="https://picsum.photos/50/50?random=${Math.random()}" alt="Profile" class="w-12 h-12 rounded-full mr-4">
                               <div>
                                   <h3 class="font-semibold">User Name</h3>
                                   <p class="text-sm text-gray-500">Just now</p>
                               </div>
                           </div>`;
        postContent += `<p>${content}</p>`;
        
        // Add image if available
        if (imageFile) {
            const imageUrl = URL.createObjectURL(imageFile);
            postContent += `<img src="${imageUrl}" alt="Post Image" class="mt-4 w-full rounded-lg shadow-md">`;
        }
        
        // Add video if available
        if (videoUrl) {
            postContent += `<div class="mt-4">
                                <video controls class="w-full rounded-lg shadow-md">
                                    <source src="${videoUrl}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </div>`;
        }
        
        post.innerHTML = postContent;
        post.innerHTML += `<div class="mt-4 flex space-x-4">
                               <button class="text-primary-color hover:underline">Like</button>
                               <button class="text-primary-color hover:underline">Comment</button>
                               <button class="text-primary-color hover:underline">Share</button>
                           </div>`;
        
        posts.insertBefore(post, posts.firstChild);
        gsap.from(post, {duration: 0.5, y: 50, opacity: 0, ease: "back.out(1.7)"});
    }
});


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

        // Initialize with some posts
        for (let i = 0; i < 3; i++) {
            addPost('Welcome to ThriveLink! Connect, share, and thrive together. #CommunityGrowth');
        }
    });
