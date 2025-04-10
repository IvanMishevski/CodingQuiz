function createMatrixRain() {
    const matrixRain = document.getElementById('matrix-rain');
    const columns = Math.floor(window.innerWidth / 20); // Adjust spacing as needed
    
    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = i * 20 + 'px';
      column.style.animationDuration = 3 + Math.random() * 5 + 's';
      column.textContent = generateRandomBinary(20);
      matrixRain.appendChild(column);
    }
  }
  
  function generateRandomBinary(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 2);
    }
    return result;
  }
  
  // Initialize matrix rain effect
  window.addEventListener('load', createMatrixRain);