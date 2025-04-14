document.addEventListener('DOMContentLoaded', function () {
    // Create prom ornaments on the sides and throughout the page
    createSideOrnaments();
    createBackgroundOrnaments();
    createFullWidthConfetti(); // Call the full-width confetti on page load

    // Add event listeners to the buttons
    const trueOption = document.querySelector('.true-option');
    const falseOption = document.querySelector('.false-option');

    // Modify the click event handler for the true option button
    if (trueOption) {
        trueOption.addEventListener('click', function () {
            // Create celebration effect with side confetti
            createSideConfetti();

            // Check if message already exists to prevent duplicates
            if (!document.querySelector('.confirmation-message')) {
                // Create a confirmation message element
                const confirmationMessage = document.createElement('div');
                confirmationMessage.className = 'confirmation-message';
                confirmationMessage.innerHTML = "🎉 Супер,ще Ви чакаме! Няма връщане назад, да знаете! 🎉";

                // Insert the message after the options container
                const optionsContainer = document.querySelector('.options-container');
                optionsContainer.after(confirmationMessage);
            }

            // Disable both buttons to prevent multiple clicks
            trueOption.disabled = true;
            trueOption.style.opacity = '0.5';
            trueOption.style.pointerEvents = 'none';
            if (falseOption) {
                falseOption.disabled = true;
                falseOption.style.opacity = '0.5';
                falseOption.style.pointerEvents = 'none';
            }

            // Remove any clones of the false button if they exist
            const falseClone = document.querySelector('.false-option-clone');
            if (falseClone) {
                falseClone.remove();
            }
        });
    }

    if (falseOption) {
        // Handle both mouse and touch events
        falseOption.addEventListener('mouseover', handleFalseButtonEvasion);
        falseOption.addEventListener('touchstart', handleFalseButtonEvasion);
        
        function handleFalseButtonEvasion(e) {
            // Prevent the event from firing multiple times
            if (this.dataset.cloneCreated) return;
            this.dataset.cloneCreated = 'true';
    
            // Create clone
            const falseClone = this.cloneNode(true);
            falseClone.classList.add('false-option-clone');
            document.body.appendChild(falseClone);
    
            // Position the clone exactly over the original button
            const rect = this.getBoundingClientRect();
            falseClone.style.position = 'fixed';
            falseClone.style.zIndex = '1000';
            falseClone.style.left = `${rect.left}px`;
            falseClone.style.top = `${rect.top}px`;
            falseClone.style.width = `${rect.width}px`;
            falseClone.style.height = `${rect.height}px`;
    
            // Completely hide the original button (not just visibility)
            this.style.display = 'none';
    
            // Make the clone run away on hover/touch
            falseClone.addEventListener('mouseover', function(e) {
                moveButtonToSafePosition(this);
            });
            
            falseClone.addEventListener('touchstart', function(e) {
                moveButtonToSafePosition(this);
                // Prevent default to avoid triggering click events
                e.preventDefault();
            });
            
            // IMPORTANT: Prevent click events on the clone from triggering confetti
            falseClone.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                moveButtonToSafePosition(this);
                return false;
            });
            
            // Move the button immediately on first touch/hover
            moveButtonToSafePosition(falseClone);
            
            // Also add a periodic check to ensure the false button doesn't overlap the true button
            // This handles cases where the true button moves after the false button has been positioned
            const safetyInterval = setInterval(() => {
                const falseClone = document.querySelector('.false-option-clone');
                const trueButton = document.querySelector('.true-option');
                
                if (falseClone && trueButton) {
                    const falseRect = falseClone.getBoundingClientRect();
                    const trueRect = trueButton.getBoundingClientRect();
                    
                    // Check if they overlap
                    const overlaps = !(
                        falseRect.right < trueRect.left + 20 || 
                        falseRect.left > trueRect.right - 20 || 
                        falseRect.bottom < trueRect.top + 20 || 
                        falseRect.top > trueRect.bottom - 20
                    );
                    
                    if (overlaps) {
                        moveButtonToSafePosition(falseClone);
                    }
                } else {
                    // If either button doesn't exist anymore, clear the interval
                    clearInterval(safetyInterval);
                }
            }, 100); // Check every 100ms
            
            // Function to move the button to a safe position
            function moveButtonToSafePosition(button) {
                // Get viewport dimensions
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                
                // Get button dimensions
                const btnWidth = button.offsetWidth;
                const btnHeight = button.offsetHeight;
                
                // Get true button position to avoid overlapping - get fresh position
                const trueOption = document.querySelector('.true-option');
                const trueButtonRect = trueOption.getBoundingClientRect();
                
                // Calculate safe boundaries (keep button fully visible)
                const maxX = viewportWidth - btnWidth - 20;
                const maxY = viewportHeight - btnHeight - 20;
                
                // Generate random position within viewport
                let randomX, randomY;
                let validPosition = false;
                
                // Try to find a position that doesn't overlap with the true button
                for (let attempts = 0; attempts < 30 && !validPosition; attempts++) {
                    randomX = Math.floor(Math.random() * maxX);
                    randomY = Math.floor(Math.random() * maxY);
                    
                    // Check if this position would overlap with the true button
                    // Add a larger safety margin of 30px around the true button
                    const wouldOverlap = (
                        randomX < trueButtonRect.right + 30 && 
                        randomX + btnWidth > trueButtonRect.left - 30 &&
                        randomY < trueButtonRect.bottom + 30 && 
                        randomY + btnHeight > trueButtonRect.top - 30
                    );
                    
                    if (!wouldOverlap) {
                        validPosition = true;
                    }
                }
                
                // If we couldn't find a non-overlapping position, force it to a far corner
                if (!validPosition) {
                    // Find which corner is farthest from the true button
                    const trueCenterX = trueButtonRect.left + trueButtonRect.width / 2;
                    const trueCenterY = trueButtonRect.top + trueButtonRect.height / 2;
                    
                    // Calculate distances to each corner
                    const corners = [
                        { x: 20, y: 20 }, // Top left
                        { x: maxX - 20, y: 20 }, // Top right
                        { x: 20, y: maxY - 20 }, // Bottom left
                        { x: maxX - 20, y: maxY - 20 } // Bottom right
                    ];
                    
                    // Find the corner farthest from the true button
                    let maxDistance = 0;
                    let bestCorner = corners[0];
                    
                    for (const corner of corners) {
                        const distance = Math.hypot(
                            corner.x - trueCenterX,
                            corner.y - trueCenterY
                        );
                        
                        if (distance > maxDistance) {
                            maxDistance = distance;
                            bestCorner = corner;
                        }
                    }
                    
                    randomX = bestCorner.x;
                    randomY = bestCorner.y;
                }
                
                // Apply new position
                button.style.left = `${randomX}px`;
                button.style.top = `${randomY}px`;
                
                // Add transition for smoother movement
                if (!button.dataset.hovered) {
                    button.style.transition = 'none'; // First move is instant
                    button.dataset.hovered = 'true';
                } else {
                    // Random transition speed for unpredictable movement
                    const speed = Math.random() * 0.2 + 0.1;
                    button.style.transition = `left ${speed}s, top ${speed}s`;
                }
            }
        }
    }

    // Function to create side ornaments
    function createSideOrnaments() {
        const leftOrnaments = document.querySelector('.left-ornaments');
        const rightOrnaments = document.querySelector('.right-ornaments');

        if (!leftOrnaments || !rightOrnaments) return;

        // Add ornaments to left side
        for (let i = 0; i < 20; i++) {
            const ornament = document.createElement('div');
            ornament.className = 'ornament';

            // Random ornament type
            const types = ['circle', 'star', 'diamond'];
            const type = types[Math.floor(Math.random() * types.length)];
            ornament.classList.add(type);

            // Random size
            const size = Math.random() * 20 + 10;
            ornament.style.width = `${size}px`;
            ornament.style.height = `${size}px`;

            // Random position
            const posY = Math.random() * 100;
            const posX = Math.random() * 100;
            ornament.style.top = `${posY}%`;
            ornament.style.left = `${posX}%`;

            // Random opacity
            ornament.style.opacity = Math.random() * 0.5 + 0.2;

            leftOrnaments.appendChild(ornament);
        }

        // Add ornaments to right side
        for (let i = 0; i < 20; i++) {
            const ornament = document.createElement('div');
            ornament.className = 'ornament';

            // Random ornament type
            const types = ['circle', 'star', 'diamond'];
            const type = types[Math.floor(Math.random() * types.length)];
            ornament.classList.add(type);

            // Random size
            const size = Math.random() * 20 + 10;
            ornament.style.width = `${size}px`;
            ornament.style.height = `${size}px`;

            // Random position
            const posY = Math.random() * 100;
            const posX = Math.random() * 100;
            ornament.style.top = `${posY}%`;
            ornament.style.left = `${posX}%`;

            // Random opacity
            ornament.style.opacity = Math.random() * 0.5 + 0.2;

            rightOrnaments.appendChild(ornament);
        }

        // Add some special prom-themed ornaments
        addPromThemeOrnaments(leftOrnaments);
        addPromThemeOrnaments(rightOrnaments);
    }

    // Function to create background ornaments
    function createBackgroundOrnaments() {
        const bgOrnaments = document.querySelector('.background-ornaments');
        if (!bgOrnaments) return;

        // Add floating stars
        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.className = 'bg-ornament star';

            // Random size
            const size = Math.random() * 15 + 5;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // Random position
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;

            // Random opacity
            star.style.opacity = Math.random() * 0.3 + 0.1;

            // Random animation duration
            const duration = Math.random() * 10 + 10;
            star.style.animation = `twinkle ${duration}s infinite alternate`;

            bgOrnaments.appendChild(star);
        }

        // Add floating music notes
        for (let i = 0; i < 15; i++) {
            const note = document.createElement('div');
            note.className = 'bg-ornament music-note';

            // Random size
            const size = Math.random() * 15 + 10;

            // Random position
            note.style.top = `${Math.random() * 100}%`;
            note.style.left = `${Math.random() * 100}%`;

            // Random opacity
            note.style.opacity = Math.random() * 0.3 + 0.1;

            // Random animation duration
            const duration = Math.random() * 15 + 15;
            note.style.animation = `float ${duration}s infinite alternate`;

            // Style
            note.innerHTML = '♪';
            note.style.fontSize = `${size * 2}px`;

            bgOrnaments.appendChild(note);
        }
    }

    // Function to add prom-themed ornaments
    function addPromThemeOrnaments(container) {
        if (!container) return;

        // Add graduation cap
        const cap = document.createElement('div');
        cap.className = 'graduation-cap';
        cap.style.top = '20%';
        cap.style.left = '30%';
        container.appendChild(cap);

        // Add champagne glass
        const glass = document.createElement('div');
        glass.className = 'champagne-glass';
        glass.style.bottom = '20%';
        glass.style.left = '40%';
        container.appendChild(glass);

        // Add bow tie
        const bowtie = document.createElement('div');
        bowtie.className = 'bowtie';
        bowtie.style.top = '60%';
        bowtie.style.left = '50%';
        container.appendChild(bowtie);
    }

    // Full-width confetti for page load
    // Full-width confetti for page load
    function createFullWidthConfetti() {
        // Increase confetti count from 350 to 500
        const confettiCount = 500;
        const container = document.body;
        const colors = ['#b89b56', '#ffffff', '#d4af37', '#1a2038', '#ffd700', '#e5c687', '#f0e6cc'];
        const shapes = ['circle', 'square', 'rectangle', 'triangle'];

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'celebration-confetti';

            // Random shape
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.classList.add(shape);

            // Random size with wider range
            const size = Math.random() * 15 + 5;
            confetti.style.width = `${size}px`;
            confetti.style.height = shape === 'rectangle' ? `${size * 2}px` : `${size}px`;

            // Random color
            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = color;

            // Random position - spread across the entire width
            confetti.style.left = `${Math.random() * 100}vw`;

            // Set animation properties with faster speeds
            const duration = Math.random() * 2 + 1; // 1-3 seconds
            const delay = Math.random() * 0.7; // 0-0.7 second delay
            confetti.style.setProperty('--end-x', `${(Math.random() * 300 - 150)}px`);

            // Add different animation timing functions for more natural movement
            const timingFunctions = ['linear', 'ease-in', 'ease-out', 'ease-in-out'];
            const timingFunction = timingFunctions[Math.floor(Math.random() * timingFunctions.length)];

            confetti.style.animation = `confettiDrop ${duration}s ${delay}s ${timingFunction} forwards`;

            // Add some rotation and initial transform
            const rotation = Math.random() * 360;
            confetti.style.transform = `rotate(${rotation}deg)`;

            // Add subtle shadow for depth
            confetti.style.boxShadow = `0 0 ${Math.random() * 5}px rgba(0,0,0,0.3)`;

            container.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000 + 500);
        }

        // Add a second wave of confetti after a shorter delay
        setTimeout(() => {
            // Increase second wave from 200 to 300
            for (let i = 0; i < 300; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'celebration-confetti';

                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.classList.add(shape);

                const size = Math.random() * 12 + 4;
                confetti.style.width = `${size}px`;
                confetti.style.height = shape === 'rectangle' ? `${size * 2}px` : `${size}px`;

                const color = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.backgroundColor = color;

                confetti.style.left = `${Math.random() * 100}vw`;

                const duration = Math.random() * 2 + 1;
                confetti.style.setProperty('--end-x', `${(Math.random() * 200 - 100)}px`);
                confetti.style.animation = `confettiDrop ${duration}s linear forwards`;

                container.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, duration * 1000 + 300);
            }
        }, 300);

        // Add a third wave for even more confetti
        setTimeout(() => {
            for (let i = 0; i < 200; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'celebration-confetti';

                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.classList.add(shape);

                const size = Math.random() * 10 + 3;
                confetti.style.width = `${size}px`;
                confetti.style.height = shape === 'rectangle' ? `${size * 2}px` : `${size}px`;

                const color = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.backgroundColor = color;

                confetti.style.left = `${Math.random() * 100}vw`;

                const duration = Math.random() * 1.5 + 0.8;
                confetti.style.setProperty('--end-x', `${(Math.random() * 200 - 100)}px`);
                confetti.style.animation = `confettiDrop ${duration}s linear forwards`;

                container.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, duration * 1000 + 300);
            }
        }, 600);
    }


    // Side-specific confetti for the "Yes" button click - modified to sprinkle all over the screen
    function createSideConfetti() {
        const confettiCount = 350;
        const container = document.body;
        const colors = ['#b89b56', '#ffffff', '#d4af37', '#1a2038', '#ffd700', '#e5c687', '#f0e6cc'];
        const shapes = ['circle', 'square', 'rectangle', 'triangle'];

        // Function to create confetti all over the screen
        function createConfettiAllOver(count) {
            for (let i = 0; i < count; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'celebration-confetti';

                // Random shape
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.classList.add(shape);

                // Random size with wider range
                const size = Math.random() * 15 + 5;
                confetti.style.width = `${size}px`;
                confetti.style.height = shape === 'rectangle' ? `${size * 2}px` : `${size}px`;

                // Random color
                const color = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.backgroundColor = color;

                // Random position - anywhere on the screen
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.top = `${Math.random() * 100}vh`;

                // Add different animation timing functions for more natural movement
                const timingFunctions = ['linear', 'ease-in', 'ease-out', 'ease-in-out'];
                const timingFunction = timingFunctions[Math.floor(Math.random() * timingFunctions.length)];

                // Instead of falling, let's have them fade in, grow slightly, and then fade out
                const duration = Math.random() * 2 + 1;

                // Create a custom animation for each confetti piece
                confetti.style.animation = `confettiPop ${duration}s ${timingFunction} forwards`;

                // Add some rotation
                const rotation = Math.random() * 360;
                confetti.style.transform = `rotate(${rotation}deg)`;

                // Add subtle shadow for depth
                confetti.style.boxShadow = `0 0 ${Math.random() * 5}px rgba(0,0,0,0.3)`;

                // Add custom animation properties
                confetti.style.opacity = '0';

                container.appendChild(confetti);

                // Manually animate the confetti since we're not using the standard animation
                setTimeout(() => {
                    confetti.style.opacity = '1';
                    confetti.style.transform = `rotate(${rotation + 20}deg) scale(1.2)`;
                }, 10);

                // Remove confetti after animation
                setTimeout(() => {
                    confetti.style.opacity = '0';
                    setTimeout(() => {
                        confetti.remove();
                    }, 300);
                }, duration * 1000 - 300);
            }
        }

        // Create initial burst all over
        createConfettiAllOver(confettiCount);

        // Add a second wave after a short delay
        setTimeout(() => {
            createConfettiAllOver(200);
        }, 300);

        // Add a third wave for even more confetti
        setTimeout(() => {
            createConfettiAllOver(150);
        }, 600);
    }

});
