document.addEventListener('DOMContentLoaded', () => {

    // --- SPLASH SCREEN LOGIC ---
    const instructionText = document.getElementById('instruction-text');
    const splashMessageTop = document.getElementById('splash-message-top');
    const splashMessageBottom = document.getElementById('splash-message-bottom');
    const threadContainer = document.getElementById('thread-container');
    const topPaper = document.getElementById('top-paper');
    const bottomPaper = document.getElementById('bottom-paper');
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const ashCanvas = document.getElementById('ash-canvas');
    const ctx = ashCanvas.getContext('2d');
    

    ashCanvas.width = window.innerWidth;
    ashCanvas.height = window.innerHeight;
    let ashes = [];
    let isAshAnimating = false;

    // Show splash messages after a brief delay
    setTimeout(() => {
        splashMessageTop.style.opacity = 1;
        splashMessageBottom.style.opacity = 1;
    }, 500);


    // Ash Particle Animation
    function createAshParticle() {
        return {
            x: Math.random() * ashCanvas.width,
            y: ashCanvas.height / 2 + (Math.random() * 40 - 20),
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * -1.5 - 0.5,
            opacity: 1,
            life: Math.random() * 100 + 50
        };
    }

    function animateAsh() {
        if (!isAshAnimating) return;
        ctx.clearRect(0, 0, ashCanvas.width, ashCanvas.height);
        ashes.forEach((p, i) => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.life--;
            if (p.life < 20) {
                p.opacity = p.life / 20;
            }
            if (p.life <= 0) {
                ashes.splice(i, 1);
            } else {
                ctx.beginPath();
                ctx.fillStyle = `rgba(50, 50, 50, ${p.opacity})`;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        if(isAshAnimating) requestAnimationFrame(animateAsh);
    }

    threadContainer.addEventListener('click', () => {
        threadContainer.style.cursor = 'default';
        threadContainer.title = '';
        instructionText.style.opacity = 0;
        instructionText.style.transform = 'translateX(-50%) translateY(100px)'; // Adjust transform
        splashMessageTop.style.opacity = 0;
        splashMessageBottom.style.opacity = 0;
        threadContainer.classList.add('sparking');

        setTimeout(() => {
            threadContainer.classList.add('burning');
            isAshAnimating = true;
            animateAsh();

            // Generate ash particles over time
            const ashInterval = setInterval(() => {
                if (ashes.length < 150) {
                    for(let i = 0; i < 5; i++) ashes.push(createAshParticle());
                } else {
                    clearInterval(ashInterval);
                }
            }, 50);

            // Start the paper burning effect
            document.querySelectorAll('.burn-overlay').forEach(overlay => {
                overlay.style.opacity = 1;
            });
            
            // Burn upwards
            topPaper.style.clipPath = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
            // Burn downwards
            bottomPaper.style.clipPath = 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)';

        }, 150); // Start burning just after the spark

        setTimeout(() => {
            splashScreen.style.opacity = 0;
            mainContent.style.opacity = 1;
            isAshAnimating = false;

            // --- Welcome Message Logic ---
            const welcomeMessage = document.getElementById('welcome-message');
            setTimeout(() => {
                welcomeMessage.classList.remove('opacity-0', 'translate-y-16', 'pointer-events-none');
            }, 500);

            setTimeout(() => {
                welcomeMessage.classList.add('opacity-0', 'translate-y-16');
                welcomeMessage.classList.add('pointer-events-none');
            }, 4500);

            setTimeout(() => {
                splashScreen.style.display = 'none';
                revealOnScroll();
                
                const contactSection = document.getElementById('contact');
                const footerSection = document.querySelector('footer');
                
                easterEggObserver.observe(contactSection);
                easterEggObserver.observe(footerSection);
                
            }, 500);
        }, 3000); 
    }, { once: true });


    // --- THEME TOGGLE LOGIC ---
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');
    const htmlEl = document.documentElement;

    const updateTheme = () => {
        const isDark = htmlEl.classList.contains('dark');
        lightIcon.classList.toggle('hidden', isDark);
        darkIcon.classList.toggle('hidden', !isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlEl.classList.add('dark');
    } else {
        htmlEl.classList.remove('dark');
    }
    updateTheme();

    // Add click listener
    themeToggle.addEventListener('click', () => {
        htmlEl.classList.toggle('dark');
        updateTheme();
    });
    
    // --- MOBILE MENU ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // --- PROJECT DATA & MODAL LOGIC ---
    const projects = [
        {
            title: 'Web Automation Scraper',
            image: 'https://placehold.co/600x400/312e81/ffffff?text=Web+Scraper',
            tags: ['Python', 'Selenium', 'MySQL', 'Automation'],
            description: `
                <p>This project involved creating a robust web scraper to automate data extraction from various websites. It uses Selenium for browser automation to handle dynamic JavaScript-heavy pages and stores the collected data efficiently in a MySQL database.</p>
                <p>The system was designed to be scalable and resilient, with error handling and logging mechanisms to ensure data integrity.</p>
            `,
            contributors: 'Ravinandan'
        },
        {
            title: 'Task Management App',
            image: 'https://placehold.co/600x400/15803d/ffffff?text=Task+App',
            tags: ['Power Apps', 'Low-Code', 'Microsoft Power Platform'],
            description: `
                <p>A comprehensive task management application built using Microsoft Power Apps. This low-code solution provides an intuitive interface for users to create, assign, and track tasks within a team.</p>
                <p>It integrates with other Power Platform services like Power Automate for notifications and approvals, demonstrating the power of low-code for rapid application development.</p>
            `,
            contributors: 'Ravinandan'
        },
        {
            title: 'Gesture-Based Media Controller',
            image: 'https://placehold.co/600x400/be123c/ffffff?text=Gesture+Control',
            tags: ['Python', 'OpenCV', 'Computer Vision'],
            description: `
                <p>This innovative project uses computer vision to control media playback through hand gestures. Leveraging the OpenCV library in Python, the application captures webcam feed, recognizes specific hand movements (like play, pause, volume up/down), and translates them into system commands.</p>
                <p>It provides a futuristic, hands-free way to interact with your computer.</p>
            `,
            contributors: 'Ravinandan'
        },
        {
            title: 'Real-time Background Changer',
            image: 'https://placehold.co/600x400/a16207/ffffff?text=Background+Changer',
            tags: ['Python', 'OpenCV', 'AI/ML'],
            description: `
                <p>An application that can change the background of a live video feed in real-time. This was achieved using OpenCV for video processing and a pre-trained machine learning model for person segmentation, allowing for a virtual green screen effect without the need for special hardware.</p>
            `,
            contributors: 'Ravinandan'
        },
        {
            title: 'Personal Voice Assistant',
            image: 'https://placehold.co/600x400/1e40af/ffffff?text=Voice+Assistant',
            tags: ['Python', 'Speech Recognition', 'AI'],
            description: `
                <p>A custom voice assistant built from scratch in Python. It utilizes speech recognition and text-to-speech libraries to understand voice commands and provide audible feedback. The assistant can perform various tasks like opening applications, searching the web, or providing weather updates.</p>
            `,
            contributors: 'Ravinandan'
        },
        {
            title: 'Portfolio Website',
            image: 'https://placehold.co/600x400/581c87/ffffff?text=Portfolio',
            tags: ['HTML', 'CSS', 'JavaScript', 'TailwindCSS'],
            description: `
                <p>The very website you are looking at! This personal portfolio was designed and built to be a unique, engaging, and aesthetically pleasing showcase of my skills and projects. It features a custom burning paper splash screen, smooth animations, and a responsive, theme-able layout.</p>
            `,
            contributors: 'Ravinandan'
        }
    ];

    const projectGrid = document.getElementById('project-grid');
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card reveal bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden cursor-pointer group';
        card.style.transitionDelay = `${index * 100}ms`;
        card.innerHTML = `
            <div class="relative">
                <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover transition-transform duration-300">
                <div class="project-overlay absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span class="text-white text-lg font-semibold">View Details</span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                <div class="flex flex-wrap gap-2">
                    ${project.tags.map(tag => `<span class="text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2.5 py-0.5 rounded-full">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        card.addEventListener('click', () => openModal(project));
        projectGrid.appendChild(card);
    });

    function openModal(project) {
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-image').src = project.image;
        document.getElementById('modal-image').alt = project.title;
        document.getElementById('modal-description').innerHTML = project.description;
        document.getElementById('modal-contributors').textContent = project.contributors;

        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = '';
        project.tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = "text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2.5 py-0.5 rounded-full";
            tagEl.textContent = tag;
            tagsContainer.appendChild(tagEl);
        });
        
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modalContent.classList.remove('scale-95');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.add('opacity-0');
        modalContent.classList.add('scale-95');
         setTimeout(() => {
            modal.classList.add('pointer-events-none');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });


    // --- SCROLL REVEAL LOGIC ---
    function revealOnScroll() {
        const revealElements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    }


    // --- CUSTOMIZABLE LINKS ---
    // !! IMPORTANT: Change these values to your own !!
    const resumeFileLink = 'https://drive.google.com/uc?export=download&id=1nVz9GY9h7okVLMtgbx3J-U4lFjfDY_Rc'; // Direct download link for your resume
    const contactEmail = 'ravinandanjn2005@gmail.com';
    const emailSubject = 'Portfolio Inquiry - Let\'s Connect!';
    const emailBody = 'Hello Ravi,\n\nI saw your portfolio and I was very impressed. I would like to connect with you regarding...';
    const loginPageUrl = '#'; // EMPTY LINK FOR NOW

    document.getElementById('resume-download-btn').href = resumeFileLink;
    document.getElementById('contact-btn').href = `mailto:${contactEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    document.getElementById('moving-easter-egg').href = "secret/";


    // --- MOVING EASTER EGG ---
    const movingEasterEgg = document.getElementById('moving-easter-egg');
    const easterEggEmojis = ['🤫', '👀', '👻', '🔑', '✨'];
    let easterEggInterval = null;

    const cycleEasterEgg = () => {
         // Change emoji
        const randomEmoji = easterEggEmojis[Math.floor(Math.random() * easterEggEmojis.length)];
        movingEasterEgg.textContent = randomEmoji;

        // Position it
        const isLeftSide = Math.random() < 0.5;
        const x = isLeftSide ? Math.random() * 10 + 2 : Math.random() * 10 + 82; // Constrained to corners
        const y = Math.random() * 5 + 92; 
        movingEasterEgg.style.left = `${x}vw`;
        movingEasterEgg.style.top = `${y}vh`;

        // Fade in
        movingEasterEgg.style.opacity = '1';

        // Set timer to fade out after 3 seconds
        setTimeout(() => {
            movingEasterEgg.style.opacity = '0';
        }, 3000); 
    };
    
    const easterEggObserver = new IntersectionObserver((entries) => {
        const isVisible = entries.some(entry => entry.isIntersecting);
        
        if (isVisible) {
            if (!easterEggInterval) { // Start only if not already running
                setTimeout(() => { // Initial delay before first appearance
                    cycleEasterEgg();
                    easterEggInterval = setInterval(cycleEasterEgg, 13000); // 3s visible + 10s hidden = 13s cycle
                }, 2000);
            }
        } else {
            if (easterEggInterval) {
                clearInterval(easterEggInterval);
                easterEggInterval = null;
                movingEasterEgg.style.opacity = '0';
            }
        }
    }, { threshold: 0.1 });


     // --- CHATBOT LOGIC ---
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatMessages = document.getElementById('chat-messages');
    const chatCommands = document.getElementById('chat-commands');

    const qaResponses = {
        'about': "Ravinandan is a passionate final-year B.Tech student focused on automation and data-driven solutions. He loves solving complex problems!",
        'skills': "Ravi specializes in Python, MySQL, and the Microsoft Power Platform. He's also skilling up in DSA and generative AI.",
        'projects': "You can see all of Ravi's work in the projects section. Just scroll down or click 'Projects' in the navigation bar!",
        'resume': `Of course! <a href="${resumeFileLink}" download="Ravinandan-Resume.pdf" class="text-indigo-400 dark:text-indigo-300 underline">Click here to download the resume.</a>`,
        'contact': `The best way to reach Ravi is by email. <a href="mailto:${contactEmail}?subject=Portfolio%20Inquiry%20-%20Let's%20Connect!&body=Hello%20Ravi..." class="text-indigo-400 dark:text-indigo-300 underline">Click here to open your mail app.</a>`,
        'socials': `You can connect with Ravi on <a href="https://www.linkedin.com/in/ravinandan2005/" target="_blank" class="text-indigo-400 dark:text-indigo-300 underline">LinkedIn</a>, <a href="https://github.com/Ravinandan2005" target="_blank" class="text-indigo-400 dark:text-indigo-300 underline">GitHub</a>, and <a href="https://www.youtube.com/@RaviTechXplorer" target="_blank" class="text-indigo-400 dark:text-indigo-300 underline">YouTube</a>!`,
        'hobbies': "Ravi is a creative soul! He enjoys video editing, exploring new tech, and creating content for his YouTube channel. 🎬",
        'opportunities': "Ravi is actively seeking opportunities where he can contribute to meaningful projects in software automation and business intelligence. He's excited to bring his passion for problem-solving to a dynamic team! 🚀",
        'site': "This portfolio was built from scratch using HTML, Tailwind CSS for styling, and vanilla JavaScript for all the cool animations and the chatbot functionality. It's a testament to Ravi's front-end skills! ✨",
        'secret': "Guess we never know...",
    };
    
    const commands = [
        { key: 'about', text: 'Tell me about Ravi' },
        { key: 'skills', text: 'What are his skills?' },
        { key: 'projects', text: 'Show me his projects' },
        { key: 'resume', text: 'Download Resume' },
        { key: 'contact', text: 'Contact Ravi' },
        { key: 'socials', text: 'Find on Social Media' },
        { key: 'hobbies', text: 'What are his hobbies? 🎬' },
        { key: 'opportunities', text: 'What is he looking for? 🚀' },
        { key: 'site', text: 'How was this site made? ✨' },
        { key: 'secret', text: 'Tell me a secret' }
    ];

    const addMessage = (text, sender) => {
        const messageEl = document.createElement('div');
        const isUser = sender === 'user';
        messageEl.classList.add('mb-3', 'p-3', 'rounded-lg', 'max-w-xs', isUser ? 'bg-indigo-500' : 'bg-gray-200', isUser ? 'text-white' : 'text-gray-800', isUser ? 'ml-auto' : 'mr-auto', 'dark:bg-gray-700', 'dark:text-gray-200');
         if(!isUser){
            messageEl.classList.add('dark:text-white');
         }
        messageEl.innerHTML = text;
        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const showTypingIndicator = () => {
        const typingEl = document.createElement('div');
        typingEl.id = 'typing-indicator';
        typingEl.classList.add('mb-3', 'p-3', 'rounded-lg', 'max-w-xs', 'bg-gray-200', 'dark:bg-gray-700', 'flex', 'items-center', 'space-x-1');
        typingEl.innerHTML = `<span class="block w-2 h-2 bg-gray-500 rounded-full"></span><span class="block w-2 h-2 bg-gray-500 rounded-full"></span><span class="block w-2 h-2 bg-gray-500 rounded-full"></span>`;
        chatMessages.appendChild(typingEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const removeTypingIndicator = () => {
        const typingEl = document.getElementById('typing-indicator');
        if (typingEl) typingEl.remove();
    };
    
    const handleCommand = (commandKey, commandText) => {
        addMessage(commandText, 'user');
        showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator();
            const botResponse = qaResponses[commandKey];
            addMessage(botResponse, 'bot');
        }, 1200);
    };

    const initChat = () => {
        chatMessages.innerHTML = '';
        chatCommands.innerHTML = '';
        addMessage("Hi there! I'm Xplora, Ravi's digital assistant. Here are some things you can ask me:", 'bot');

        commands.forEach(command => {
            const button = document.createElement('button');
            button.textContent = command.text;
            button.classList.add('p-2', 'text-sm', 'border', 'rounded-md', 'text-indigo-600', 'border-indigo-300', 'hover:bg-indigo-50', 'dark:text-indigo-300', 'dark:border-indigo-500', 'dark:hover:bg-indigo-900/40', 'text-left');
            button.addEventListener('click', () => handleCommand(command.key, command.text));
            chatCommands.appendChild(button);
        });
    };

    chatbotIcon.addEventListener('click', () => {
        chatbotWindow.classList.toggle('opacity-0');
        chatbotWindow.classList.toggle('pointer-events-none');
        chatbotWindow.classList.toggle('translate-y-4');
        if(!chatbotWindow.classList.contains('opacity-0')){
            initChat();
        }
    });

    closeChatBtn.addEventListener('click', () => {
        chatbotWindow.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    });
    
    // --- FOOTER YEAR ---
    document.getElementById('year').textContent = new Date().getFullYear();

});
