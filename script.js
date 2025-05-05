// Set your special date here (YYYY-MM-DD format)
const specialDate = new Date('2025-08-16T00:00:00');

// Stage Management
let currentStage = 1;
const totalStages = 5;
let reasonsGiven = 0;

// Love Messages
const loveMessages = [
    "Your darkness calls to mine, and I answer without hesitation.",
    "I crave the way your presence makes my heart race.",
    "You're the obsession that keeps me awake at night.",
    "Your touch lingers on my skin like a brand.",
    "I'm addicted to the way you make me feel.",
    "You're the monster under my bed, and I welcome you.",
    "Your voice echoes in my mind, a constant whisper.",
    "I'm drawn to you like a moth to a flame.",
    "Your gaze sets my soul on fire.",
    "You're the poison I willingly drink."
];

// Whisper Words
const whisperWords = [
    "mine", "forever", "obsession", "crave", "need",
    "yours", "darkness", "addiction", "possession", "eternity"
];

// Stage Transitions
function transitionToStage(stageNumber) {
    // Hide all stages first
    document.querySelectorAll('.stage').forEach(stage => {
        stage.classList.remove('active');
    });
    
    // Show the next stage
    const nextStageElement = document.querySelector(`.stage:nth-child(${stageNumber})`);
    if (nextStageElement) {
        nextStageElement.classList.add('active');
        
        // Play appropriate audio for each stage
        const audioElements = {
            1: document.getElementById('whisper'),
            2: document.getElementById('heartbeat'),
            3: document.getElementById('backgroundMusic'),
            5: document.getElementById('finalMusic')
        };
        
        const audio = audioElements[stageNumber];
        if (audio) {
            // Set volume based on stage
            switch(stageNumber) {
                case 2:
                    audio.volume = 0.2; // Soft heartbeat
                    break;
                case 3:
                    audio.volume = 0.3; // Background music
                    break;
                default:
                    audio.volume = 0.5;
            }
            audio.play().catch(error => {
                console.log('Audio playback failed:', error);
            });
        }
    }
    
    currentStage = stageNumber;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize audio elements
    const backgroundMusic = document.getElementById('backgroundMusic');
    const whisper = document.getElementById('whisper');
    
    // Function to handle audio playback
    function playAudio(audioElement, volume = 0.2) {
        if (audioElement) {
            audioElement.volume = volume;
            audioElement.loop = true;
            
            // Try to play audio
            const playPromise = audioElement.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Audio playback failed:', error);
                    // If autoplay is blocked, wait for user interaction
                    document.addEventListener('click', () => {
                        audioElement.play().catch(e => console.log('Audio still failed:', e));
                    }, { once: true });
                });
            }
        }
    }

    // Start background music
    playAudio(backgroundMusic, 0.2);
    
    // Play initial whisper
    playAudio(whisper, 0.3);

    // Create falling petals if the container exists
    const petalsContainer = document.querySelector('.falling-petals');
    if (petalsContainer) {
        createFallingPetals();
    }

    // Initialize stage 1 elements
    const entranceButton = document.querySelector('.entrance-button');
    if (entranceButton) {
        entranceButton.addEventListener('click', () => {
            // Fade out background music
            if (backgroundMusic) {
                const fadeOut = setInterval(() => {
                    if (backgroundMusic.volume > 0.1) {
                        backgroundMusic.volume -= 0.1;
                    } else {
                        clearInterval(fadeOut);
                        backgroundMusic.pause();
                    }
                }, 100);
            }
            transitionToStage(2);
        });
    }

    // Initialize stage 2 elements
    const seductiveText = document.querySelector('.seductive-text');
    if (seductiveText) {
        // Add initial animation class
        seductiveText.classList.add('fade-in');
        
        // Wait for animation to complete before setting up the next transition
        seductiveText.addEventListener('animationend', () => {
            setTimeout(() => {
                transitionToStage(3);
            }, 5000); // Give more time to appreciate the message
        });
    }

    // Initialize stage 3 elements
    const loveButton = document.getElementById('loveButton');
    const messageText = document.getElementById('messageText');
    const loveMessage = document.getElementById('loveMessage');

    if (loveButton && messageText && loveMessage) {
        // Update button text
        loveButton.textContent = 'Touch Me';
        
        loveButton.addEventListener('click', () => {
            // Play whisper sound
            const whisper = document.getElementById('touchWhisper');
            if (whisper) {
                whisper.volume = 0.3;
                whisper.currentTime = 0;
                whisper.play().catch(error => {
                    console.log('Whisper playback failed:', error);
                });
            }

            // Get random message
            const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
            
            // Clear previous message
            messageText.textContent = '';
            loveMessage.classList.remove('hidden');
            
            // Add pulse effect
            loveMessage.classList.add('pulse');
            setTimeout(() => {
                loveMessage.classList.remove('pulse');
            }, 500);
            
            // Typewriter effect
            let i = 0;
            const speed = 50; // typing speed in milliseconds
            
            function typeWriter() {
                if (i < randomMessage.length) {
                    messageText.textContent += randomMessage.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
            }
            
            typeWriter();
            
            reasonsGiven++;
            
            if (reasonsGiven >= 3) {
                setTimeout(() => {
                    transitionToStage(4);
                }, 2000);
            }
        });
    }

    // Initialize stage 4 elements
    const candle = document.querySelector('.candle-container');
    const secretNote = document.querySelector('.secret-note');

    if (candle && secretNote) {
        candle.addEventListener('click', () => {
            candle.classList.add('glowing');
            secretNote.classList.remove('hidden');
            setTimeout(() => {
                transitionToStage(5);
            }, 5000);
        });
    }

    // Initialize stage 5 elements
    const finalButton = document.querySelector('.final-button');
    const finalReveal = document.querySelector('.final-reveal');

    if (finalButton && finalReveal) {
        finalButton.addEventListener('click', () => {
            finalReveal.classList.remove('hidden');
        });
    }
});

// Cursor Trail Effect
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.querySelector('.cursor-trails').appendChild(trail);
    
    // Position the trail
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    
    // Randomly add whisper text
    if (Math.random() < 0.3) {
        const whisper = document.createElement('div');
        whisper.className = 'cursor-trail whisper';
        whisper.textContent = whisperWords[Math.floor(Math.random() * whisperWords.length)];
        document.querySelector('.cursor-trails').appendChild(whisper);
        
        whisper.style.left = e.pageX + 'px';
        whisper.style.top = e.pageY + 'px';
    }
    
    // Remove trail after animation
    setTimeout(() => {
        trail.remove();
    }, 1000);
});

// Falling Petals Effect
function createFallingPetals() {
    const petalsContainer = document.querySelector('.falling-petals');
    const petalCount = 20;
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.innerHTML = '❦';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 3 + 2) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petalsContainer.appendChild(petal);
    }
} 