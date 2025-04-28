// This javascript file gives functionality to my quiz.html file
// Each question type required is included in this portion

const questions = [ // All questions, also gives which type each question will be and their correct answers
  {
      question: "Who invented Internet Cookies?",
      type: "multiple-choice",
      options: ["Lou Montulli", "Tim Berners Lee", "Mark Zuckerberg", "Steve Jobs"],
      correctAnswer: "Lou Montulli"
  },
  {
      question: "If you want to have a safer browsing experience, what type of software should you use?",
      type: "multiple-choice",
      options: ["Bootstrap", "Eclipse", "VPN", "React"],
      correctAnswer: "VPN"
  },
  {
      question: "What are internet cookies used for? Be sure to select all that apply!",
      type: "multiple-choice-multiple",
      options: ["Tracking User Activity", "Session Management", "Formatting CSS", "Debugging Code"],
      correctAnswers: ["Tracking User Activity", "Session Management"]
  },
  {
      question: "The ability for cookies to keep track of your browsing habits and preferences and make personalized recommendations based off of this information is called  ____.",
      type: "fill-in-the-blank",
      correctAnswer: "Personalization"
  },
  {
      question: "Which type of cookies can be dangerous and more difficult to remove?",
      type: "multiple-choice",
      options: ["First Party Cookies", "Essential Cookies", "HTML Cookies", "Zombie Cookies"],
      correctAnswer: "Zombie Cookies"
  },
  {
      question: "Which is NOT a type of internet cookie?",
      type: "multiple-choice",
      options: ["Session Cookies", "HTML Cookies", "Persistent Cookies", "Third Party Cookies"],
      correctAnswer: "HTML Cookies"
  },
  {
      question: "True or False: Session cookies are stored on your device's hard drive.",
      type: "multiple-choice",
      options: ["True", "False"],
      correctAnswer: "False"
  }
];

function renderQuestions() {
  const container = document.getElementById('questions-container');
  questions.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');

      const questionTitle = document.createElement('h3');
      questionTitle.textContent = q.question;
      questionDiv.appendChild(questionTitle);

      if (q.type === "multiple-choice") {
          q.options.forEach(option => {
              const label = document.createElement('label');
              const input = document.createElement('input');
              input.type = "radio";
              input.name = `question${index}`;
              input.value = option;
              label.appendChild(input);
              label.appendChild(document.createTextNode(option));
              questionDiv.appendChild(label);
          });
      } else if (q.type === "multiple-choice-multiple") {
          q.options.forEach(option => {
              const label = document.createElement('label');
              const input = document.createElement('input');
              input.type = "checkbox";
              input.name = `question${index}`;
              input.value = option;
              label.appendChild(input);
              label.appendChild(document.createTextNode(option));
              questionDiv.appendChild(label);
          });
      } else if (q.type === "fill-in-the-blank") {
          const input = document.createElement('input');
          input.type = "text";
          input.name = `question${index}`;
          questionDiv.appendChild(input);
      }

      container.appendChild(questionDiv);
  });
}

// Calculates score
function calculateScore(event) {
  event.preventDefault();
  let score = 0;
  questions.forEach((q, index) => {
      const formElement = document.forms['quiz-form'][`question${index}`];

      if (q.type === "multiple-choice") {
          if (formElement.value === q.correctAnswer) {
              score++;
          }
      } else if (q.type === "multiple-choice-multiple") {
          const selectedAnswers = Array.from(formElement).filter(input => input.checked).map(input => input.value);
          if (selectedAnswers.sort().join(",") === q.correctAnswers.sort().join(",")) {
              score++;
          }
      } else if (q.type === "fill-in-the-blank") {
          if (formElement.value.toLowerCase().trim() === q.correctAnswer.toLowerCase()) {
              score++;
          }
      }
  });

  const totalQuestions = questions.length;
  const result = document.getElementById('result');
  result.textContent = `You scored ${score}/${totalQuestions}.`;
// Gives the score
  if (score >= 4) {
      result.textContent += " Yay, you passed! You can still retest if you'd like to try again.";
  } else {
      result.textContent += " Oh no, you failed! Hit the restart quiz button if you'd like to try again.";
  }

  document.getElementById('restart-btn').style.display = "block";
}

// Restarts the quiz
function restartQuiz() {
  const result = document.getElementById('result');
  result.textContent = "";
  document.getElementById('restart-btn').style.display = "none";
  document.getElementById('quiz-form').reset();
  window.scrollTo(0, 0);
}

// For form submission
document.getElementById('quiz-form').addEventListener('submit', calculateScore);

// Renders the questions 
window.onload = renderQuestions;