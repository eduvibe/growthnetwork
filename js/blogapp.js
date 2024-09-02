
document.getElementById('mobileMenuButton').addEventListener('click', () => {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
});


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
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark');
        gsap.to('body', { backgroundColor: '#1a202c', duration: 0.5 });
    }

    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark');
        gsap.to('body', { backgroundColor: isDarkMode ? '#1a202c' : '#f7fafc', duration: 0.5 });
        localStorage.setItem('darkMode', isDarkMode);
    });

    // Data for trending topics and categories
    const topicsData = {
        'Web Development': ['JavaScript', 'React', 'Node.js'],
        'AI and Machine Learning': ['TensorFlow', 'PyTorch', 'Scikit-Learn'],
        'Cryptocurrency': ['Bitcoin', 'Ethereum', 'Litecoin'],
        'Climate Change': ['Renewable Energy', 'Carbon Footprint', 'Climate Policies'],
        'Mental Health': ['Therapy', 'Mindfulness', 'Stress Management']
    };

    const categoryData = {
        'Technology': ['Web Development', 'AI and Machine Learning', 'Cryptocurrency'],
        'Science': ['Climate Change'],
        'Health': ['Mental Health'],
        'Business': ['Cryptocurrency'],
        'Entertainment': []
    };

    // Function to render trending topics
    function renderTrendingTopics() {
        trendingTopics.innerHTML = '';
        Object.keys(topicsData).forEach(topic => {
            const li = document.createElement('li');
            li.textContent = topic;
            li.className = 'cursor-pointer hover:text-primary-color transition duration-300';
            li.addEventListener('click', () => renderPosts(topicsData[topic]));
            trendingTopics.appendChild(li);
            gsap.from(li, { opacity: 0, x: -50, duration: 0.5 });
        });
    }

    // Function to render categories
    function renderCategories() {
        categories.innerHTML = '';
        categoryTabs.innerHTML = '';
        Object.keys(categoryData).forEach(cat => {
            const categoryDiv = document.createElement('div');
            categoryDiv.textContent = cat;
            categoryDiv.className = 'category-pill bg-primary-color text-white px-4 py-2 rounded-full cursor-pointer hover:bg-opacity-80 transition duration-300';
            categoryDiv.addEventListener('click', () => renderPosts(categoryData[cat]));
            categories.appendChild(categoryDiv);

            const tab = document.createElement('button');
            tab.textContent = cat;
            tab.className = 'category-pill bg-gray-200 px-4 py-2 rounded-full hover:bg-primary-color hover:text-white transition duration-300';
            tab.addEventListener('click', () => renderPosts(categoryData[cat]));
            categoryTabs.appendChild(tab);

            gsap.from(categoryDiv, { opacity: 0, y: 20, duration: 0.5 });
            gsap.from(tab, { opacity: 0, y: 20, duration: 0.5 });
        });
    }

    // Function to render posts based on a given set of topics
    function renderPosts(topics) {
        posts.innerHTML = ''; // Clear previous posts
        topics.forEach(topic => addPost(`Discussion on ${topic}`));
    }

    // Post submission
    submitPost.addEventListener('click', () => {
        const content = postInput.value.trim();
        if (content) {
            addPost(content);
            postInput.value = '';
        } else {
            alert('Post content cannot be empty!');
        }
    });

    function addPost(content) {
        const post = document.createElement('div');
        post.className = 'post-card neumorphic p-6 mb-4';
        const postId = 'post-' + Date.now(); // Unique identifier based on current timestamp
        post.dataset.id = postId;
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
                <button class="like-button text-primary-color hover:underline" aria-label="Like this post" data-post-id="${postId}">
                <i class="fas fa-heart"></i>
                </button>

                <button class="comment-button text-primary-color hover:underline" data-post-id="${postId}">
                    <i class="fas fa-comment"></i>
                </button>
                <button class="share-button text-primary-color hover:underline" data-post-id="${postId}">
                    <i class="fas fa-share"></i>
                </button>
            </div>
            <div class="comment-area hidden mt-4">
                <textarea class="w-full p-2 rounded-lg neumorphic resize-none" rows="3" placeholder="Add a comment..."></textarea>
                <button class="submit-comment bg-primary-color text-white px-4 py-2 rounded mt-2 hover:bg-opacity-90">Submit</button>
            </div>
            <div class="share-options hidden mt-4 p-4 neumorphic">
                <button class="share-option whatsapp-button flex items-center space-x-2 mb-2" data-url="#">
                    <i class="fab fa-whatsapp text-green-500"></i>
                    <span>WhatsApp</span>
                </button>
                <button class="share-option facebook-button flex items-center space-x-2 mb-2" data-url="#">
                    <i class="fab fa-facebook text-blue-600"></i>
                    <span>Facebook</span>
                </button>
                <button class="share-option twitter-button flex items-center space-x-2 mb-2" data-url="#">
                    <i class="fab fa-twitter text-blue-400"></i>
                    <span>Twitter</span>
                </button>
                <button class="share-option telegram-button flex items-center space-x-2 mb-2" data-url="#">
                    <i class="fab fa-telegram text-blue-500"></i>
                    <span>Telegram</span>
                </button>
                <button class="share-option clipboard-button flex items-center space-x-2 mb-2" data-url="#">
                    <i class="fas fa-copy text-gray-600"></i>
                    <span>Copy Link</span>
                </button>
            </div>
        `;

        posts.insertBefore(post, posts.firstChild);
        gsap.from(post, { duration: 0.5, y: 50, opacity: 0, ease: "back.out(1.7)" });
        attachPostButtonEvents(post);
    }

    function attachPostButtonEvents(post) {
        post.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return; // Exit if no button is clicked
    
            if (target.classList.contains('like-button')) {
                handleLike(target);
            } else if (target.classList.contains('comment-button')) {
                toggleCommentArea(target);
            } else if (target.classList.contains('share-button')) {
                toggleShareOptions(target);
            } else if (target.classList.contains('submit-comment')) {
                handleSubmitComment(post);
            }
        });
    }
    
    function handleLike(button) {
        const isLiked = button.classList.contains('liked');
        button.classList.toggle('liked', !isLiked);
        const icon = button.querySelector('i');
        icon.classList.toggle('fa-heart', !isLiked);
        icon.classList.toggle('fa-heart', isLiked);
        icon.style.color = isLiked ? 'red' : 'inherit'; // Apply red color for liked state
    }
    
    
    function toggleCommentArea(button) {
        const post = button.closest('.post-card');
        const commentArea = post.querySelector('.comment-area');
        commentArea.classList.toggle('hidden');
    }
    
    function toggleShareOptions(button) {
        const post = button.closest('.post-card');
        const shareOptions = post.querySelector('.share-options');
        shareOptions.classList.toggle('hidden');
        attachShareButtonEvents(post); // Reattach events to updated elements
    }
    
    function handleSubmitComment(post) {
        const textarea = post.querySelector('textarea');
        const content = textarea.value.trim();
        if (content) {
            addPost(`Comment: ${content}`); // Optionally handle comment submission
            textarea.value = ''; // Clear the textarea
        } else {
            alert('Comment cannot be empty!');
        }
    }
    
    function attachShareButtonEvents(post) {
        post.querySelectorAll('.share-option').forEach(button => {
            const platform = button.classList[1]?.split('-')[0];
            const url = button.dataset.url || '';
    
            if (url) {
                switch (platform) {
                    case 'whatsapp':
                        button.addEventListener('click', () => 
                            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank')
                        );
                        break;
                    case 'facebook':
                        button.addEventListener('click', () => 
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
                        );
                        break;
                    case 'twitter':
                        button.addEventListener('click', () => 
                            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank')
                        );
                        break;
                    case 'telegram':
                        button.addEventListener('click', () => 
                            window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}`, '_blank')
                        );
                        break;
                    case 'clipboard':
                        button.addEventListener('click', () => {
                            navigator.clipboard.writeText(url);
                            alert('Link copied to clipboard!');
                        });
                        break;
                    default:
                        console.warn(`No handler for platform: ${platform}`);
                }
            }
        });
    }
    
    // Load more posts
    loadMore.addEventListener('click', () => {
        const hasMorePosts = checkForMorePosts();
        if (hasMorePosts) {
            for (let i = 0; i < 3; i++) {
                addPost('This is a sample post content. #ThriveLink');
            }
        } else {
            loadMore.style.display = 'none';
            alert('No more posts available.');
        }
    });

    function checkForMorePosts() {
        // Implement your logic to check if more posts are available
        return true; // Placeholder for demonstration
    }

    // To-Do List functionality
    addTodo.addEventListener('click', () => {
        const task = todoInput.value.trim();
        if (task) {
            const li = document.createElement('li');
            li.className = 'flex items-center space-x-2 mb-2';
            li.innerHTML = `
                <input type="checkbox" class="form-checkbox h-5 w-5 text-primary-color">
                <span>${task}</span>
                <button class="ml-auto text-red-500 hover:text-red-700">Delete</button>
            `;
            li.querySelector('button').addEventListener('click', () => li.remove());
            todoList.appendChild(li);
            todoInput.value = '';
            gsap.from(li, { duration: 0.5, x: -50, opacity: 0, ease: "back.out(1.7)" });
        } else {
            alert('Task cannot be empty!');
        }
    });

    // Active members list
    const members = [
        { name: 'Alice', status: 'online' },
        { name: 'Bob', status: 'offline' },
        { name: 'Charlie', status: 'online' },
        { name: 'David', status: 'offline' }
    ];

    members.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'flex items-center space-x-3 mb-3';
        memberDiv.innerHTML = `
            <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                ${member.name[0]}
            </div>
            <div>
                <h4 class="font-semibold">${member.name}</h4>
                <p class="text-sm ${member.status === 'online' ? 'text-green-500' : 'text-red-500'}">${member.status}</p>
            </div>
        `;
        activeMembers.appendChild(memberDiv);
        gsap.from(memberDiv, { opacity: 0, y: 20, duration: 0.5 });
    });

    // Initialize trending topics and categories
    renderTrendingTopics();
    renderCategories();
});


