let questions = {
  chemistry: {
    easy: [
      { question: "What is the symbol for Sodium?", answer: "Na" },
      { question: "What is the pH level of pure water?", answer: "7" },
      { question: "What element has the atomic number 1?", answer: "Hydrogen" },
    ],
    hard: [
      { question: "What is the molar mass of NaCl?", answer: "58.44 g/mol" },
      { question: "What is the speed of light?", answer: "299792458 m/s" },
      {
        question: "What is the primary component of natural gas?",
        answer: "Methane",
      },
      {
        question: "What is the boiling point of water in Celsius?",
        answer: "100°C",
      },
    ],
  },
  physics: {
    easy: [
      { question: "What is the unit of force?", answer: "Newton" },
      { question: "What is the unit of energy?", answer: "Joule" },
      {
        question: "What do we call the change in velocity over time?",
        answer: "Acceleration",
      },
      {
        question: "What is the formula for calculating force?",
        answer: "F=ma",
      },
    ],
    hard: [
      {
        question: "What is the gravitational constant?",
        answer: "6.67430×10−11 m3 kg−1 s−2",
      },
      {
        question: "What is the principle of conservation of energy?",
        answer: "Energy cannot be created or destroyed, only transformed.",
      },
      {
        question:
          "What is the relationship between frequency and wavelength in wave motion?",
        answer: "v = fλ",
      },
      {
        question: "What is the formula for kinetic energy?",
        answer: "0.5mv^2",
      },
    ],
  },
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;

// Validating login information
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username.includes(" ") || username.includes("_")) {
    document.getElementById("login-error").innerText =
      "Invalid username! No spaces or underscores allowed.";
    return;
  }

  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password)
  ) {
    document.getElementById("login-error").innerText =
      "Password must be at least 8 chars, include 1 uppercase and 1 lowercase.";
    return;
  }

  startQuiz();
}

// Start the quiz
function startQuiz() {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");

  const topic = prompt("Choose a topic: Chemistry or Physics").toLowerCase();
  const level = prompt("Choose a level: Easy or Hard").toLowerCase();

  if (topic !== "chemistry" && topic !== "physics") {
    alert("Invalid topic selected. Defaulting to Chemistry.");
    topic = "chemistry";
  }

  if (level !== "easy" && level !== "hard") {
    alert("Invalid level selected. Defaulting to Easy.");
    level = "easy";
  }

  currentQuestions = questions[topic][level];
  document.getElementById("topic-name").innerText = ` ${topic} (${level})`;

  shuffleQuestions();
  displayQuestion();
}

function shuffleQuestions() {
  currentQuestions.sort(() => Math.random() - 0.5);
}

function displayQuestion() {
  if (currentQuestionIndex < currentQuestions.length) {
    document.getElementById("question").innerText =
      currentQuestions[currentQuestionIndex].question;
    timeLeft = 10;
    document.getElementById("time-left").innerText = timeLeft;
    startTimer();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time-left").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time is over!");
      nextQuestion();
    }
  }, 1000);
}

function submitAnswer() {
  clearInterval(timer);
  const userAnswer = document
    .getElementById("answer")
    .value.trim()
    .toLowerCase();
  const correctAnswer =
    currentQuestions[currentQuestionIndex].answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    score +=
      currentQuestions[currentQuestionIndex].difficulty === "easy" ? 1 : 3;
    document.getElementById("feedback").innerText = "Correct!";
  } else {
    document.getElementById("feedback").innerText = "Wrong!";
  }

  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  document.getElementById("answer").value = "";
  displayQuestion();
}

function endQuiz() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");

  document.getElementById("final-score").innerText = score;
  document.getElementById("performance").innerText =
    score <= 10 ? "Bad" : score <= 20 ? "Fair" : "Good";
}

// Retry the quiz
function retry() {
  score = 0;
  currentQuestionIndex = 0;
  startQuiz();
}

//end the app[login app again]]
function logout() {
  score = 0;
  currentQuestionIndex = 0;
  document.getElementById("result-container").classList.add("hidden");
  document.getElementById("login-container").classList.remove("hidden");
}
