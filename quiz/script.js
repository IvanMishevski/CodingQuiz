function next(question) {
  const answer = document.getElementById('answer').value.trim();
  let correct = false;

  if (question === 'q1' && answer.toLowerCase() === 'int') {
    correct = true;
    sessionStorage.setItem('q1', 'int');
    window.location.href = 'quiz2.html';
  } else if (question === 'q2' && answer === 'Console.WriteLine') {
    correct = true;
    sessionStorage.setItem('q2', 'Console.WriteLine');
    window.location.href = 'quiz3.html';
  } else if (question === 'q3' && answer === 'finally') {
    correct = true;
    sessionStorage.setItem('q3', 'finally');
    sessionStorage.setItem('quizPassed', 'true');
    
    // Show success message
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `
      <div class="success-message">
        <h2>Checking answers!</h2>
        <p>Great job! Redirecting to results...</p>
        <div class="loader"></div>
      </div>
    `;
    
    // Delay before redirecting
    setTimeout(function() {
      window.location.href = '../result/result.html';
    }, 5000); // 5 second delay
  }

  if (!correct) {
    alert('Try again!');
  }
}
