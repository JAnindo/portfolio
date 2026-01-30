// ===== LOADING SCREEN =====
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        
        if (loadingScreen && mainContent) {
            loadingScreen.classList.add('hidden');
            mainContent.classList.add('visible');
        }
    }, 2800);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only handle hash links, not full URLs
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ===== THEME TOGGLE =====
const themeBtn = document.getElementById('theme-switch');
const body = document.body;

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            themeBtn.textContent = '☀️';
        } else {
            themeBtn.textContent = '🌙';
        }
    });
}

// ===== MENU ITEM CLICK =====
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===== PARALLAX EFFECT =====
document.addEventListener('mousemove', (e) => {
    const glow = document.querySelector('.blue-glow');
    if (glow) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        glow.style.transform = `translate(${x * 100}px, ${y * 100}px)`;
    }
});

// Animated Space Background
const canvas = document.getElementById('spaceCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create stars
    const stars = [];
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random()
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw stars
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            // Move stars
            star.y += star.speed;
            star.opacity = Math.sin(Date.now() * 0.001 + star.x) * 0.5 + 0.5;
            
            // Reset star position
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Budget button selection
const budgetButtons = document.querySelectorAll('.budget-btn');
const budgetInput = document.getElementById('budget');

if (budgetButtons.length > 0 && budgetInput) {
    budgetButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            budgetButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            budgetInput.value = this.dataset.budget;
        });
    });
}

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you! for reaching out please use the whatsapp option.');
        
        // Reset form
        this.reset();
        if (budgetButtons.length > 0) {
            budgetButtons.forEach(b => b.classList.remove('active'));
        }
    });
}

// Template category filtering
const categoryButtons = document.querySelectorAll('.category-btn');
const templateCards = document.querySelectorAll('.template-card');

if (categoryButtons.length > 0 && templateCards.length > 0) {
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected category
            const category = this.dataset.category;
            
            // Filter templates
            templateCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Add transition styles
    templateCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}

// ===== DYNAMIC CONTENT - Get URL Parameters =====
const urlParams = new URLSearchParams(window.location.search);

// ===== PROJECT DETAIL PAGE - DYNAMIC CONTENT =====
// Project data
const projects = {
    'fashion-store': {
        title: 'Custom Apparel & Merch Design',
        description: 'A clean, royal-themed apparel concept featuring gold accents, stars, and crown iconography. This project explores minimalist typography paired with luxury visual elements for the modern pageant community.',
        year: '2024',
        services: 'Graphic design & branding',
        technology: 'Figma',
        industry: 'Custom Apparel & Merch Design',
        image: 'IMAGES/image.png',
        previewLink: '#'
    },
    'jewelry-store': {
        title: 'Olivia Fashion Brand',
        description: 'Olivia Fashion represents contemporary style with the tagline "Good Fashion is Our Priority." This brand identity project showcases modern fashion photography, elegant composition, and a sophisticated color palette designed for fashion-forward audiences.',
        year: '2024',
        services: 'Brand Identity & Design',
        technology: 'Photoshop, Figma, InDesign',
        industry: 'Fashion & Lifestyle',
        image: 'IMAGES/fashion_banner.png',
        previewLink: 'https://www.figma.com/proto/rqHFK0ba2ILcNRINqNwKEd/Olivia-Fashion?node-id=2-2&p=f&t=K0NK3kHCn1wqA0Hr-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1'
    },
    'shopping-hub': {
        title: 'Japhinix Shopping Hub',
        description: 'Japhinix Shopping Hub is a multi-vendor e-commerce platform featuring product categories, search functionality, and a streamlined checkout process. The design prioritizes user experience with clear navigation and attractive product displays.',
        year: '2024',
        services: 'Full Stack E-commerce Development',
        technology: 'HTML, JavaScript, Tailwind CSS',
        industry: 'E-commerce Platform',
        image: 'IMAGES/japhinix_shoppinghub.PNG',
        previewLink: 'https://japhinix-hub.netlify.app/'
    },
    'project-4': {
        title: 'Niora Connect Website',
        description: 'Niora Connect is a customer service outsourcing company committed to providing exceptional voice, chat, email, and social media support. The goal is to help businesses deliver unforgettable customer experiences that drive loyalty and growth.',
        year: '2024',
        services: 'Web Design & Development',
        technology: 'HTML, JavaScript, Tailwind CSS',
        industry: 'Social Networking',
        image: 'IMAGES/Niora_Connect_Website.PNG',
        previewLink: 'https://neora-connect.netlify.app/'
    },
    'project-5': {
        title: 'Car Inspection App',
        description: 'A comprehensive mobile application for vehicle inspection and maintenance tracking. The app allows users to document vehicle conditions, schedule inspections, and maintain detailed service records with photo documentation and report generation.',
        year: '2024',
        services: 'Mobile App Design & Development',
        technology: 'React Native, Node.js, PostgreSQL',
        industry: 'Automotive',
        image: 'IMAGES/Car  Inspection App.png',
        previewLink: '#'
    },
    'project-6': {
        title: 'Personal Portfolio',
        description: 'A clean, minimalist portfolio website showcasing creative projects with emphasis on typography and whitespace. The design uses subtle animations and a refined color scheme to create an elegant browsing experience for potential clients.',
        year: '2023',
        services: 'Portfolio Design & Development',
        technology: 'HTML5, CSS3, Vanilla JS',
        industry: 'Personal Portfolio',
        image: 'IMAGES/MY PORTFOLIO.png',
        previewLink: 'https://janindo.netlify.app/'
    }
};

// Load project data only if we're on the project detail page
const projectId = urlParams.get('project');

if (projectId && document.getElementById('project-title')) {
    if (projects[projectId]) {
        const project = projects[projectId];
        
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-description').textContent = project.description;
        document.getElementById('project-year').textContent = project.year;
        document.getElementById('project-services').textContent = project.services;
        document.getElementById('project-technology').textContent = project.technology;
        document.getElementById('project-industry').textContent = project.industry;
        document.getElementById('project-image').src = project.image;
        document.getElementById('project-image').alt = project.title;
        document.getElementById('preview-link').href = project.previewLink;
        console.log('Preview link set to:', project.previewLink);
        document.title = project.title + ' - JAPHETH';
    } else {
        // Default or error state
        document.getElementById('project-title').textContent = 'Project Not Found';
        document.getElementById('project-description').textContent = 'Sorry, the project you are looking for does not exist.';
    }
}

// ===== BLOG POST DETAIL PAGE - DYNAMIC CONTENT =====
const blogPosts = {
    '1': {
        title: 'Smart Animated in visual studio code',
        category: 'Web Development',
        date: 'January 10, 2026',
        readTime: '5 min read',
        featuredImage: 'IMAGES/Personal_Portfolio.PNG',
        content: `
            <h2>Introduction</h2>
            <p>My website represents more than just visuals it's a user-focused digital experience. The goal of my design approach is to combine clean UI, smooth interactions, and efficient code to create products that are both visually engaging and easy to use.</p>

            <h2>Why Use My Design?</h2>
            <p>My design philosophy is rooted in clarity, performance, and usability, combining a user-first mindset with modern aesthetics like dark UI, smooth animations, and clean typography.</p>

            <h3>Key Benefits:</h3>
            <ul>
                <li>Performance-Focused</li>
                <li>Better User Experience</li>
                <li>Modular Structure</li>
                <li>Developer Ready</li>
            </ul>

            <h2>Getting Started with Visual Studio Code (VS Code)</h2>
            <p>Getting started with Visual Studio Code (VS Code) gives you a powerful yet flexible environment for building modern web experiences. VS Code combines an intuitive interface with robust features like live preview, intelligent code completion, and seamless Git integration, making development faster and more efficient.</p>

            <h2>Step-by-Step Implementation</h2>
            <p>To implement animations in your project, start by structuring your HTML elements clearly within your layout. Next, define the initial and animated states using CSS for smooth transitions. Then, use JavaScript to trigger the animations based on user actions or scroll events. Finally, fine-tune the timing and behavior to align perfectly with your overall design experience.</p>

            <h2>Best Practices</h2>
            <p>When using animated counters, keep the animation subtle and purposeful to avoid distracting users from key content. Choose speeds and easing that feel natural, ensuring numbers are easy to read as they update. Trigger animations at meaningful moments, such as when the element enters the viewport, to maximize impact and engagement.</p>

            <h2>Conclusion</h2>
            <p>Animated counters are an effective way to highlight key information while keeping your interface engaging and dynamic. When thoughtfully customized and implemented using best practices, they enhance user experience without compromising performance or clarity.</p>
        `
    },
    '2': {
        title: 'Crafting a Modern Fashion & Content Experience',
        category: 'UI/UX Design',
        date: 'February 1, 2025',
        readTime: '4 min read',
        featuredImage: 'IMAGES/fashion_banner.png',
        content: `
            <h2>Introduction</h2>
            <p>This prototype demonstrates a clean, content driven layout designed to highlight both visual products and educational content. It blends bold imagery, clear typography, and structured sections to create a design that feels modern, engaging, and easy to scan. The focus is on drawing attention quickly while maintaining clarity and balance across the layout.

            <h2>Why Smooth Scrolling Matters</h2>
            <p>This design is built to communicate value instantly. By combining strong visual elements with clear messaging, it ensures users immediately understand the brand purpose and the content being presented. The layout is intentional, guiding the eye from product visuals to supporting text, making it ideal for brands that want to showcase both products and knowledge based content without overwhelming the user.</p>

            <h3>Key Benefits:</h3>
            <ul>
                <li>Strong Visual Hierarchy</li>
                <li>Brand Consistency</li>
                <li>Content + Commerce Friendly</li>
                <li>Responsive-Ready Layout</li>
            </ul>

            <h2>Getting Started with Figma</h2>
            <p>Figma provides a powerful, collaborative environment for designing and prototyping modern interfaces. It allows you to create layouts, define visual hierarchy, and apply consistent styles using components, auto layout, and shared styles. With real-time collaboration and interactive prototyping features, Figma makes it easy to visualize how users will experience the design before development begins.</p>

            <h2>Step-by-Step Implementation</h2>
            <p>To build this prototype, start by defining the core layout sections such as the hero banner, product showcase, and content cards. Next, apply typography, color styles, and imagery to establish brand identity and visual balance. Then, connect frames using Figma’s prototyping tools to simulate navigation and interactions. Finally, refine spacing, alignment, and responsiveness to ensure the design feels polished and intuitive across different screen sizes.</p>

            <h2>Implementation in Figma</h2>
            <p>In Figma, interactions are created by linking elements and defining behaviors such as On Click, On Hover, or While Hovering. Transitions like Smart Animate and Ease In/Out can be applied to create smooth, realistic motion between frames. These interactions help communicate how the final product should behave, making the prototype a clear and effective blueprint for developers and stakeholders.</p>


            <h2>Customization Options</h2>
            <p>This prototype offers flexible customization to suit different brand and content needs. Colors, typography, and imagery can be easily adjusted to reflect a brand’s identity while maintaining visual harmony. Layout sections such as product highlights, banners, and content cards can be rearranged or scaled to support different use cases, from fashion showcases to editorial content. Interactive elements and transitions can also be refined in Figma to control motion, emphasis, and user flow throughout the design.</p>

            <h2>Conclusion</h2>
            <p>This Figma prototype demonstrates a thoughtful balance between visual storytelling and functional layout. By combining strong imagery, clear hierarchy, and customizable components, the design delivers an engaging and adaptable user experience. With careful attention to consistency, interaction, and scalability, the prototype serves as a solid foundation for development, making it ideal for brands looking to present products and content in a modern, polished way.</p>
        `
    },
    '3': {
        title: 'Japhinix Shopping Hub  E-commerce Website Experience',
        category: 'web Design',
        date: 'January 31, 2025',
        readTime: '6 min read',
        featuredImage: 'IMAGES/japhinix_shoppinghub.PNG',
        content: `
            <h2>Introduction</h2>
            <p>Japhinix Shopping Hub is a modern e-commerce website designed to showcase products in a clean, accessible, and visually engaging way. The site focuses on clarity, ease of navigation, and strong branding to create a seamless shopping experience. From the hero branding to the featured products section, the design emphasizes trust, usability, and simplicity for online shoppers.</p>

            <h2>Why Use This Website Design?</h2>
            <p>This website design prioritizes user flow and accessibility, making it easy for visitors to browse products, search for items, and take action. The layout balances branding with functionality, ensuring that users are not overwhelmed while still being visually engaged. It is ideal for small to medium online stores looking for a professional and scalable digital presence.</p>

            <h3>Key Benefits:</h3>
            <ul>
                <li>Clear Navigation Structure</li>
                <li>Strong Brand Identity</li>
                <li>Product-Focused Layout</li>
                <li>Responsive Design</li>
            </ul>
            <h2>Getting Started with the Website Structure</h2>
            <p>The website is structured around core e-commerce sections, including a hero branding area, navigation menu, search functionality, and featured product listings. This structure ensures users can immediately understand the purpose of the site and find products with minimal effort. Each section is organized to support scalability as more products and features are added.</p>

            <h2>Step-by-Step Website Implementation Approach</h2>
            <p>To build this website, start by defining the global layout, including the header, navigation, and main content area. Next, implement the branding elements and hero section to establish identity and trust. Then, add product listings and supporting UI components such as search and cart icons. Finally, refine spacing, responsiveness, and interactions to ensure smooth usability across all devices.</p>

            <h2>Website Functionality Overview</h2>
            <p>Key functionalities include product highlighting, intuitive navigation, and search accessibility to improve the shopping experience. The site structure supports future enhancements such as category filtering, user accounts, and checkout flows. Each interaction is designed to feel natural and efficient, reinforcing a smooth customer journey from landing to purchase.</p>

            <h2>Customization Options</h2>
            <p>The website can be customized to fit different brands and product niches. Colors, fonts, and imagery can be adjusted to align with brand identity, while layout sections can be expanded or rearranged to support additional features. Product displays, navigation items, and homepage content can also be scaled as the store grows, making the design flexible and future-ready.</p>

            <h2>Conclusion</h2>
            <p>Japhinix Shopping Hub demonstrates a clean and functional approach to e-commerce web design. By combining strong branding, intuitive navigation, and a product-focused layout, the website delivers a user-friendly shopping experience. Its scalable structure and customization flexibility make it a solid foundation for growing online businesses.</p>
        `
    },
    '5': {
        title: 'How to Create an Editable Vector Text Effect in Adobe Illustrator.',
        category: 'ui/ux Design',
        date: 'November 20, 2025',
        readTime: '7 min read',
        featuredImage: 'IMAGES/Personal_Portfolio.PNG',
        content: `
            <h2>Introduction</h2>
            <p>To take Shii Fashion to the next level, we treat this design as a Brand Identity Layout. The goal is to move away from a "collage" look and toward a "catalog" look. This involves using Adobe Photoshop for "raster" work (pixels, photos, textures) and Adobe Illustrator for "vector" work (logos, icons, and sharp text).</p>

            <h2>Why use Adobe Photoshop vs. Illustrator?</h2>
            <p>My design philosophy is rooted in clarity, performance, and usability, with a strong user-first mindset that shapes layouts around real user interactions. The design embraces modern aesthetics through dark UI, smooth animations, and clean typography, while maintaining a scalable structure that can easily grow alongside a project. It is also developer-friendly, built with clean, maintainable code that supports long-term efficiency. This approach makes the design ideal for personal portfolios, SaaS landing pages, business websites, and product showcases.</p>

            <h3>Key Benefits:</h3>
            <ul>
                <li>Layer Masks: Instead of "erasing" a background (which is permanent), you "mask" it. This means if you accidentally cut off too much of a sneaker, you can bring it back instantly.</li>
                <li>Smart Objects: You can link your Photoshop files into Illustrator. If you change the color of the tracksuit in Photoshop, it automatically updates in your main layout.</li>
                <li>The Pen Tool ($P$): This is the "Gold Standard" for cutting out products. It creates smooth, curved lines that make the clothing look like it was photographed in a high-end studio.</li>
            </ul>
        
            <h3>Core Concepts:</h3>
            <ul>
                <li>Grid containers and grid items</li>
                <li>Grid template columns and rows</li>
                <li>Grid gaps and alignment</li>
                <li>Auto-placement and explicit placement</li>
                <li>Named grid lines and areas</li>
            </ul>

            <h2>Step-by-Step Implementation Approach</h2>
            <p>To implement this design professionally, start by using Photoshop’s Object Selection Tool to mask product backgrounds, refining the edges with a soft brush for a natural look. Next, create the "Shii Fashion" logo in Illustrator by applying a five-stop metallic gradient to mimic realistic gold reflections. Then, import your masked product PNGs into the layout and utilize the Align Tool for mathematically perfect icon and text placement. Finally, complete the composition by applying Gaussian Blur shadows under each item to provide a professional, three-dimensional depth.</p>

        
            <h2>Conclusion</h2>
            <p>Shii Fashion, mission is to redefine your wardrobe by bridging the gap between high energy urban streetwear and sophisticated chic. Our brand identity, rooted in a bold black and gold aesthetic, represents a premium, "luxe" experience designed for those who demand both style and substance.</p>
        `
    }
};

// Load blog post data
const blogId = urlParams.get('id');

if (blogId && document.querySelector('.post-title')) {
    if (blogPosts[blogId]) {
        const post = blogPosts[blogId];
        
        document.querySelector('.post-title').textContent = post.title;
        document.querySelector('.post-category').textContent = post.category;
        document.querySelector('.post-date').textContent = post.date;
        document.querySelector('.post-reading-time').textContent = post.readTime;
        document.querySelector('.post-featured-image img').src = post.featuredImage;
        document.querySelector('.post-featured-image img').alt = post.title;
        document.querySelector('.post-body').innerHTML = post.content;
        document.title = post.title + ' - JAPHETH';
    } else {
        document.querySelector('.post-title').textContent = 'Blog Post Not Found';
        document.querySelector('.post-body').innerHTML = '<p>Sorry, this blog post does not exist.</p>';
    }
}