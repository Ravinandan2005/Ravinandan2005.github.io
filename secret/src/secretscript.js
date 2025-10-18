const entryScreen = document.getElementById('entry-screen');
const passcode_input = document.getElementById('passcode-input');
const errorMessage = document.getElementById('error-message');
const doorContainer = document.getElementById('door-container');
const themeContainer = document.getElementById('theme-container');
const messageScreen = document.getElementById('message-screen');
const messageContent = document.getElementById('message-content');
const goBackBtn = document.getElementById('go-back-btn');
const redirectNotice = document.getElementById('redirect-notice');
let autoRedirectTimer = null; // To hold the automatic redirect timer

const secrets = {
    'jhivini': {
        theme: 'theme-jhivini',
        message: `<h2 class="text-5xl md:text-6xl font-bold mb-6">Jhivini 💖</h2><p class="text-xl md:text-2xl max-w-2xl">You’re my closest friend, my safe space, and the person who lets me be myself without any filters. With you, I can be silly, dramatic, quiet, or loud, and it always feels easy and natural. You bring calm in chaos and laughter in boring moments. Thank you for always being there and making even ordinary days feel special. Keep shining bright, girl ✨🌙. Everything will be alright 🫂 Don't forget this girl anytime 😌 - aka Athika</p>`
    },
    'nandychu': {
        theme: 'theme-nandychu',
        message: `<h2 class="text-4xl md:text-5xl font-bold mb-4">Nandychu ☕🍵</h2><p class="text-lg md:text-xl max-w-2xl">You’re the calm anchor in all the noise, the one who supports quietly but fully. Your presence makes everything feel lighter, and your humor always brings a smile when it’s needed the most. Never forget, you make a difference just by being yourself 🌸💫.</p>`
    },
    'niggarika': {
        theme: 'theme-niggarika',
        message: `<h2 class="text-5xl md:text-6xl font-bold mb-6">Niggarika </h2><p class="text-xl md:text-2xl max-w-2xl">You radiate patience, understanding, and positivity. Even in busy or chaotic moments, your thoughtful nature makes people feel seen and valued. Keep spreading your warmth and bright energy wherever you go 🌻.</p>`
    },
    'aravind': {
        theme: 'theme-aravind',
        message: `<h2 class="text-4xl md:text-5xl font-bold mb-4">Aravind 🧠</h2><p class="text-lg md:text-xl max-w-2xl">Calm, steady, and dependable. You guide and support without making it feel heavy. Keep shining your steady light 🌟💪.</p>`
    },
    'amma@25101983': {
        theme: 'theme-amma',
        message: `<h2 class="text-4xl md:text-5xl font-bold mb-4">Amma ❤️</h2><p class="text-lg md:text-xl max-w-2xl">You are my rock, my inspiration, and my endless source of strength. No matter what challenges come your way, don’t give up — I’ll always be right here by your side through it all. Your courage, love, and resilience light up everything around you, and together we can face anything. Keep going, keep shining, and never forget how amazing you are ✨💪🌸.</p>`
    },
    'poojitha': {
        theme: 'theme-poojitha',
        message: `<h2 class="text-4xl md:text-5xl font-bold mb-4">Poojitha 🌹</h2><p class="text-lg md:text-xl max-w-2xl">Some connections leave a mark even if paths diverge. Hope life is treating you well and you’re finding joy in every step 🌟💫.</p>`
    },
    'madhu': {
        theme: 'theme-madhu',
        message: `<h2 class="text-4xl md:text-5xl font-bold mb-4">Madhu 😊</h2><p class="text-lg md:text-xl max-w-2xl">Like a reflection of me through similar challenges. Sharing laughs, struggles, and random moments together makes life lighter and brighter. Keep rocking your spirit ✨. I wish you a greater success ahead 💝</p>`
    },
    'rithv': {
        theme: 'theme-rithv',
        message: `<h2 class="text-4xl md:text-5xl font-bold mb-4">Rithvika 🎨</h2><p class="text-lg md:text-xl max-w-2xl">You remind people to think creatively and color outside the lines. Your energy is contagious, and your vibe inspires others. Keep creating magic ✨🌸.</p>`
    },
    'chetta': {
        theme: 'theme-chetta',
        message: `<h2 class="text-4xl md:text-5xl font-bold mb-4">Chetta 💫</h2><p class="text-lg md:text-xl max-w-2xl">The anchor of the gang, the one who keeps spirits high and laughter loud. Your presence makes life brighter and more fun. Stay amazing ⚡🎉.</p>`
    },
    'adhi': {
        theme: 'theme-adhi',
        message: `<h2 class="text-4xl md:text-5xl font-bold mb-4">Adhi ⚡</h2><p class="text-lg md:text-xl max-w-2xl">Energy, humor, and positivity follow you wherever you go. You make tough days feel easier and fun moments even better. Keep spreading those good vibes 🌟😊.</p>`
    },
    'kavya': {
        theme: 'theme-kavya',
        message: `<h2 class="text-4xl md:text-5xl font-bold mb-4">Kavya 💖</h2><p class="text-lg md:text-xl max-w-2xl">You have this incredible spark that makes everything around you feel lighter and brighter. Even the tiniest moments — a smile, a laugh, or a thoughtful word — leave a lasting impression. You have this rare way of making people feel comfortable, happy, and seen, without even trying. Being around you is like a breath of fresh air; you remind everyone that life can be fun, calm, and full of small joys at the same time. Keep shining your amazing energy, because the world feels better with you in it ✨💫🌷.</p>`
    },
    'padhu': {
        theme: 'theme-padhu',
        message: `<h2 class="text-4xl md:text-5xl font-bold mb-4">Padhu 📒</h2><p class="text-lg md:text-xl max-w-2xl">Always the one who keeps things organized and makes sure nothing important is missed. Your thoughtfulness and care make life easier for everyone around you. Keep being steady, reliable, and amazing ✨📝.</p>`
    },
    'akshaya': {
        theme: 'theme-akshaya',
        message: `<h2 class="text-4xl md:text-5xl font-bold mb-4">Akshaya 🌸</h2><p class="text-lg md:text-xl max-w-2xl">Even though our paths have changed, I still appreciate the moments we shared and the memories that shaped us. Your energy always brought light to the days we spent together. Wishing you all the best and hoping life continues to bring you happiness and positivity ✨💫.</p>`
    }
};

const revealSecret = (secret) => {
    entryScreen.style.opacity = '0';
    setTimeout(() => {
        entryScreen.style.display = 'none';
        doorContainer.children[0].style.backgroundColor = 'transparent';
        doorContainer.children[1].style.backgroundColor = 'transparent';
    }, 500);

    setTimeout(() => {
        doorContainer.classList.add('doors-open');
    }, 500);

    setTimeout(() => {
        themeContainer.className = `relative w-screen h-screen ${secret.theme}`;
        messageContent.innerHTML = secret.message;
        messageScreen.style.opacity = '1';
        messageScreen.style.pointerEvents = 'auto'; 

        const messageDuration = 1 * 60 * 1000; // 1 minute
        
        setTimeout(() => {
            redirectNotice.style.opacity = '1';
            redirectNotice.textContent = 'Redirecting to the home page...';
        }, messageDuration - 10000);

        autoRedirectTimer = setTimeout(() => {
            window.location.href = '/';
        }, messageDuration);

    }, 1500); 
};

passcode_input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const code = e.target.value.trim().toLowerCase();
        const secret = secrets[code];
        
        if (secret) {
            revealSecret(secret);
        } else {
            errorMessage.style.opacity = '1';
            setTimeout(() => errorMessage.style.opacity = '0', 5000);
        }
    }
});

goBackBtn.addEventListener('click', () => {
    if(autoRedirectTimer) clearTimeout(autoRedirectTimer); // Cancel automatic redirect

    goBackBtn.style.display = 'none';
    redirectNotice.style.opacity = '1';

    let countdown = 10;
    redirectNotice.textContent = `You will be now redirected to the home page in ${countdown} seconds...`;

    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            redirectNotice.textContent = `You will be now redirected to the home page in ${countdown} seconds...`;
        } else {
            redirectNotice.textContent = 'Redirecting now...';
            clearInterval(countdownInterval);
        }
    }, 1000);

    setTimeout(() => {
        window.location.href = '/';
    }, 10000);
});