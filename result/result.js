// Check if quiz was passed
if (!sessionStorage.getItem('quizPassed')) {
  window.location.href = '../index.html';
}

// Create sparkles
function createSparkles() {
  const sparklesContainer = document.getElementById('sparkles');
  const numberOfSparkles = 30;
  
  for (let i = 0; i < numberOfSparkles; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 3}s`;
    sparkle.style.width = `${5 + Math.random() * 10}px`;
    sparkle.style.height = sparkle.style.width;
    sparklesContainer.appendChild(sparkle);
  }
}

// Fullscreen confetti burst
function launchFullScreenConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.5 },
    particleCount: count,
    spread: 360,
    startVelocity: 50,
    scalar: 1.2, // size multiplier
    zIndex: 9999,
    colors: ['#FFD700', '#FF6347', '#7B68EE', '#3CB371', '#FF69B4', '#00BFFF']
  };

  // Fire from multiple horizontal points
  confetti(Object.assign({}, defaults, { origin: { x: 0.1, y: 0.2 } }));
  confetti(Object.assign({}, defaults, { origin: { x: 0.3, y: 0.4 } }));
  confetti(Object.assign({}, defaults, { origin: { x: 0.5, y: 0.3 } }));
  confetti(Object.assign({}, defaults, { origin: { x: 0.7, y: 0.6 } }));
  confetti(Object.assign({}, defaults, { origin: { x: 0.9, y: 0.4 } }));
}

// On clicking 'true'
function sayYes() {
  document.getElementById('message').innerHTML = "<span class='emoji'>🎉</span> Yay! We'll see you there, Code Queen <span class='emoji'>👑</span>";
  launchFullScreenConfetti();
  
  // Add more confetti after a delay
  setTimeout(launchFullScreenConfetti, 1500);
}

// On load
window.onload = () => {
  createSparkles();
  launchFullScreenConfetti();
  
  // Get the false button
  const falseBtn = document.getElementById("falseBtn");
  
  // Add mouseenter event to the original button
  falseBtn.addEventListener("mouseenter", function(e) {
    // Get the button's current position
    const rect = falseBtn.getBoundingClientRect();
    
    // Create a clone of the button
    const clone = falseBtn.cloneNode(true);
    clone.id = "falseBtnClone";
    document.body.appendChild(clone);
    
    // Style the clone to match the original button's appearance and position
    clone.style.position = "fixed";
    clone.style.left = rect.left + "px";
    clone.style.top = rect.top + "px";
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";
    clone.style.zIndex = "100000";
    clone.style.margin = "0";
    clone.style.transition = "left 0.2s, top 0.2s"; // Smooth transition for movement
    
    // Hide the original button
    falseBtn.style.visibility = "hidden";
    
    // Add a slight delay before running away (300ms)
    setTimeout(function() {
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate safe area
      const maxX = viewportWidth - rect.width - 20;
      const maxY = viewportHeight - rect.height - 20;
      
      // Generate random position
      const randX = 20 + Math.random() * maxX;
      const randY = 20 + Math.random() * maxY;
      
      // Move the clone
      clone.style.left = randX + "px";
      clone.style.top = randY + "px";
      
      // Add mouseenter event to the clone to make it run away again
      clone.addEventListener("mouseenter", function() {
        // Add a slight delay before running away again (200ms)
        setTimeout(function() {
          const newX = 20 + Math.random() * maxX;
          const newY = 20 + Math.random() * maxY;
          clone.style.left = newX + "px";
          clone.style.top = newY + "px";
        }, 200); // Slightly shorter delay for subsequent movements
      });
    }, 300); // Initial delay before running away
  });
};
