// Sample blog posts data
let blogPosts = [
    {
        id: 1,
        title: "My Journey Through the Italian Countryside",
        excerpt: "Discovering hidden gems and culinary delights in rural Italy.",
        content: "Full story about my travels through Tuscany and the amazing people I met along the way...",
        category: "travel",
        date: "May 15, 2023",
        author: "You",
        image: "https://images.unsplash.com/photo-1496564203457-11bb12075d90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1012&q=80"
    },
    {
        id: 2,
        title: "The Art of Homemade Pasta",
        excerpt: "Learning traditional pasta-making techniques from my grandmother.",
        content: "Full story about my experience learning to make pasta from scratch...",
        category: "food",
        date: "June 2, 2023",
        author: "You",
        image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 3,
        title: "Why I Switched to a Mechanical Keyboard",
        excerpt: "My experience with different keyboard types and why I made the switch.",
        content: "Full story about my keyboard journey and the benefits I've found...",
        category: "tech",
        date: "June 10, 2023",
        author: "You",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80"
    },
    {
        id: 4,
        title: "Finding Balance in a Digital World",
        excerpt: "How I learned to disconnect and be more present in my daily life.",
        content: "Full story about my digital detox experience and what I learned...",
        category: "lifestyle",
        date: "June 18, 2023",
        author: "You",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
];

// DOM Elements
const storiesContainer = document.getElementById('storiesContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const newPostBtn = document.getElementById('newPostBtn');
const postModal = document.getElementById('postModal');
const closeModal = document.querySelector('.close');
const postForm = document.getElementById('postForm');
const categoryCards = document.querySelectorAll('.category-card');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');

// Initial display
let visiblePosts = 4;

// Display stories
function displayStories(posts = blogPosts) {
    storiesContainer.innerHTML = '';
    
    posts.slice(0, visiblePosts).forEach(post => {
        const storyElement = createStoryElement(post);
        storiesContainer.appendChild(storyElement);
    });
    
    // Show/hide load more button
    if (visiblePosts >= posts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Create story element
function createStoryElement(post) {
    const storyElement = document.createElement('div');
    storyElement.className = 'story-card';
    
    storyElement.innerHTML = `
        <div class="story-image">
            <img src="${post.image}" alt="${post.title}" loading="lazy">
        </div>
        <div class="story-content">
            <span class="story-category">${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</span>
            <h3 class="story-title">${post.title}</h3>
            <p class="story-excerpt">${post.excerpt}</p>
            <div class="story-meta">
                <span>By ${post.author}</span>
                <span>${post.date}</span>
            </div>
        </div>
    `;
    
    // Add click event to view full story
    storyElement.addEventListener('click', () => {
        viewStory(post.id);
    });
    
    return storyElement;
}

// View full story
function viewStory(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
        alert(`Viewing post: ${post.title}\n\n${post.content}`);
    }
}

// Filter stories by category
function filterStories(category) {
    if (category === 'all') {
        displayStories();
        return;
    }
    
    const filteredPosts = blogPosts.filter(post => post.category === category);
    displayStories(filteredPosts);
}

// Add new post
function addNewPost(title, category, content, image) {
    const newPost = {
        id: blogPosts.length + 1,
        title,
        excerpt: content.length > 100 ? content.substring(0, 100) + '...' : content,
        content,
        category,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        author: "You",
        image: image || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80'
    };
    
    blogPosts.unshift(newPost);
    displayStories();
}

// Event Listeners
loadMoreBtn.addEventListener('click', () => {
    visiblePosts += 4;
    displayStories();
});

newPostBtn.addEventListener('click', () => {
    postModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    postModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === postModal) {
        postModal.style.display = 'none';
    }
});

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('postTitle').value;
    const category = document.getElementById('postCategory').value;
    const content = document.getElementById('postContent').value;
    const image = document.getElementById('postImage').value;
    
    addNewPost(title, category, content, image);
    
    // Reset form
    postForm.reset();
    postModal.style.display = 'none';
});

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        filterStories(category);
    });
});

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Initialize the blog
document.addEventListener('DOMContentLoaded', () => {
    displayStories();
    
    // Responsive nav links
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
        }
    });
});