document.addEventListener('DOMContentLoaded', function() {
  // Create prom ornaments on the sides and throughout the page
  createSideOrnaments();
  createBackgroundOrnaments();
  
  // Add event listeners to the buttons
  const trueOption = document.querySelector('.true-option');
  const falseOption = document.querySelector('.false-option');
  
  if (trueOption) {
      trueOption.addEventListener('click', function() {
          // Create celebration effect
          createHearts();
          
          // Show thank you message
          this.textContent = "🎉Супер!Няма връщане назад,да знаете!🎉";
          this.style.backgroundColor = '#b89b56';
          this.style.color = '#1a2038';
          
          // Hide the false option and its clone if it exists
          if (falseOption) {
              falseOption.style.display = 'none';
          }
          const falseClone = document.querySelector('.false-option-clone');
          if (falseClone) {
              falseClone.style.display = 'none';
          }
      });
  }
  
  if (falseOption) {
      // Create a clone of the false button for the moving effect
      // This way the original button stays in place
      falseOption.addEventListener('mouseover', function(e) {
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
          
          // Make the clone run away on hover
          falseClone.addEventListener('mouseover', function(e) {
              // Get viewport dimensions
              const viewportWidth = window.innerWidth;
              const viewportHeight = window.innerHeight;
              
              // Get button dimensions
              const btnWidth = this.offsetWidth;
              const btnHeight = this.offsetHeight;
              
              // Get true button position to avoid overlapping
              const trueButtonRect = trueOption.getBoundingClientRect();
              
              // Calculate safe boundaries (keep button fully visible)
              const maxX = viewportWidth - btnWidth - 20;
              const maxY = viewportHeight - btnHeight - 20;
              
              // Generate random position within viewport
              let randomX, randomY;
              let validPosition = false;
              
              // Try to find a position that doesn't overlap with the true button
              // Maximum 10 attempts to prevent infinite loop
              for (let attempts = 0; attempts < 10 && !validPosition; attempts++) {
                  randomX = Math.floor(Math.random() * maxX);
                  randomY = Math.floor(Math.random() * maxY);
                  
                  // Check if this position would overlap with the true button
                  const wouldOverlap = (
                      randomX < trueButtonRect.right && 
                      randomX + btnWidth > trueButtonRect.left &&
                      randomY < trueButtonRect.bottom && 
                      randomY + btnHeight > trueButtonRect.top
                  );
                  
                  if (!wouldOverlap) {
                      validPosition = true;
                  }
              }
              
              // If we couldn't find a non-overlapping position, ensure at least some distance
              if (!validPosition) {
                  // Move at least 100px away from the true button's center
                  const trueCenterX = trueButtonRect.left + trueButtonRect.width / 2;
                  const trueCenterY = trueButtonRect.top + trueButtonRect.height / 2;
                  
                  // Calculate angle and distance
                  const angle = Math.random() * Math.PI * 2; // Random angle
                  const distance = 150; // Minimum distance
                  
                  // Calculate new position based on angle and distance
                  randomX = trueCenterX + Math.cos(angle) * distance - btnWidth / 2;
                  randomY = trueCenterY + Math.sin(angle) * distance - btnHeight / 2;
                  
                  // Ensure within viewport bounds
                  randomX = Math.max(20, Math.min(maxX, randomX));
                  randomY = Math.max(20, Math.min(maxY, randomY));
              }
              
              // Apply new position
              this.style.left = `${randomX}px`;
              this.style.top = `${randomY}px`;
              
              // Add transition for smoother movement
              if (!this.dataset.hovered) {
                  this.style.transition = 'none'; // First move is instant
                  this.dataset.hovered = 'true';
              } else {
                  // Random transition speed for unpredictable movement
                  const speed = Math.random() * 0.2 + 0.1;
                  this.style.transition = `left ${speed}s, top ${speed}s`;
              }
          });
          
          
      });
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
  
  // Function to create hearts effect
  function createHearts() {
      const heartCount = 50;
      const container = document.body;
      
      for (let i = 0; i < heartCount; i++) {
          const heart = document.createElement('div');
          heart.className = 'celebration-heart';
          
          // Random properties
          const size = Math.random() * 15 + 10;
          const colors = ['#b89b56', '#ff6b6b', '#f06292', '#e91e63'];
          
          heart.style.width = `${size}px`;
          heart.style.height = `${size}px`;
          
          // Set color for before and after pseudo-elements
          const color = colors[Math.floor(Math.random() * colors.length)];
          heart.style.setProperty('--heart-color', color);
          
          heart.style.left = `${Math.random() * 100}vw`;
          heart.style.top = '-20px';
          heart.style.opacity = '1';
          
          // Animation
          heart.style.animation = `heartRain ${Math.random() * 3 + 2}s linear forwards`;
          
          container.appendChild(heart);
          
          // Remove heart after animation
          setTimeout(() => {
              heart.remove();
          }, 5000);
      }
  }
});
