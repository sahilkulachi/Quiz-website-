const questionSets = {

    general: [
        { question: "What is the capital of Pakistan?", answers: ["Karachi", "Lahore", "Islamabad", "Peshawar"], correct: "Islamabad" },
        { question: "How many days are there in a week?", answers: ["5", "6", "7", "8"], correct: "7" },
        { question: "What is 10 + 15?", answers: ["20", "25", "30", "35"], correct: "25" },
        { question: "Which is the largest continent?", answers: ["Africa", "Asia", "Europe", "Australia"], correct: "Asia" },
        { question: "How many months are in a year?", answers: ["10", "11", "12", "13"], correct: "12" },
        { question: "Which is the largest ocean?", answers: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: "Pacific" },
        { question: "What is the national language of Pakistan?", answers: ["Punjabi", "Urdu", "Sindhi", "English"], correct: "Urdu" },
        { question: "How many hours are in a day?", answers: ["12", "18", "24", "30"], correct: "24" },
        { question: "Which direction does the sun rise from?", answers: ["West", "North", "East", "South"], correct: "East" },
        { question: "How many sides does a triangle have?", answers: ["2", "3", "4", "5"], correct: "3" }
    ],

    science: [
        { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Venus"], correct: "Mars" },
        { question: "What is H2O commonly known as?", answers: ["Salt", "Water", "Oxygen", "Hydrogen"], correct: "Water" },
        { question: "What gas do humans need to breathe?", answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: "Oxygen" },
        { question: "How many planets are in our Solar System?", answers: ["7", "8", "9", "10"], correct: "8" },
        { question: "What force pulls objects toward Earth?", answers: ["Magnetism", "Gravity", "Friction", "Pressure"], correct: "Gravity" },
        { question: "Which organ pumps blood around the body?", answers: ["Brain", "Lungs", "Heart", "Kidney"], correct: "Heart" },
        { question: "What is the boiling point of water at sea level?", answers: ["50°C", "75°C", "100°C", "150°C"], correct: "100°C" },
        { question: "Which is the closest planet to the Sun?", answers: ["Venus", "Earth", "Mars", "Mercury"], correct: "Mercury" },
        { question: "What is the center of an atom called?", answers: ["Electron", "Nucleus", "Proton", "Shell"], correct: "Nucleus" },
        { question: "Which gas do plants absorb from the atmosphere?", answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: "Carbon Dioxide" }
    ],

    sports: [
        { question: "How many players are on a cricket team?", answers: ["9", "10", "11", "12"], correct: "11" },
        { question: "Which country won the Cricket World Cup in 1992?", answers: ["India", "Pakistan", "Australia", "England"], correct: "Pakistan" },
        { question: "How many players are on a football team on the field?", answers: ["9", "10", "11", "12"], correct: "11" },
        { question: "How many rings are on the Olympic symbol?", answers: ["4", "5", "6", "7"], correct: "5" },
        { question: "Which sport uses a shuttlecock?", answers: ["Tennis", "Badminton", "Hockey", "Golf"], correct: "Badminton" },
        { question: "How many balls are there in a standard over in cricket?", answers: ["4", "5", "6", "8"], correct: "6" },
        { question: "Which sport is played at Wimbledon?", answers: ["Cricket", "Football", "Tennis", "Hockey"], correct: "Tennis" },
        { question: "Which country hosted the 2016 Summer Olympics?", answers: ["China", "Brazil", "UK", "Japan"], correct: "Brazil" },
        { question: "What is the highest score possible with one dart?", answers: ["50", "60", "100", "120"], correct: "60" },
        { question: "Which sport uses a bat, ball and wickets?", answers: ["Baseball", "Cricket", "Tennis", "Golf"], correct: "Cricket" }
    ],

    technology: [
        { question: "What does HTML stand for?", answers: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Machine Language", "Home Tool Markup Language"], correct: "Hyper Text Markup Language" },
        { question: "Which language is mainly used to style web pages?", answers: ["HTML", "CSS", "Python", "Java"], correct: "CSS" },
        { question: "Which language makes web pages interactive?", answers: ["CSS", "HTML", "JavaScript", "SQL"], correct: "JavaScript" },
        { question: "What does CPU stand for?", answers: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Processing User"], correct: "Central Processing Unit" },
        { question: "Which device is used to store data permanently?", answers: ["RAM", "Hard Drive", "Monitor", "Keyboard"], correct: "Hard Drive" },
        { question: "Which company developed Windows?", answers: ["Apple", "Google", "Microsoft", "Samsung"], correct: "Microsoft" },
        { question: "What does URL stand for?", answers: ["Uniform Resource Locator", "Universal Read Link", "User Resource Language", "Uniform Record Location"], correct: "Uniform Resource Locator" },
        { question: "Which one is a programming language?", answers: ["HTML", "CSS", "Python", "HTTP"], correct: "Python" },
        { question: "What is used to connect devices to a network wirelessly?", answers: ["Wi-Fi", "HDMI", "USB", "VGA"], correct: "Wi-Fi" },
        { question: "Which company created the Android operating system?", answers: ["Google", "Microsoft", "IBM", "Intel"], correct: "Google" }
    ]
};

let questions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const startButton = document.getElementById("start-btn");
const categorySelect = document.getElementById("category");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const progressBar = document.getElementById("progress-bar");
const themeButton = document.getElementById("theme-btn");

startButton.addEventListener("click", () => {

    const category = categorySelect.value;

    questions = [...questionSets[category]];

    currentQuestion = 0;
    score = 0;

    scoreElement.textContent = "Score: 0";

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
});

function showQuestion() {

    clearInterval(timer);

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    answersElement.innerHTML = "";

    current.answers.forEach(answer => {

        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer");

        button.addEventListener("click", () => {
            checkAnswer(button, answer);
        });

        answersElement.appendChild(button);
    });

    nextButton.disabled = true;

    startTimer();
}

function checkAnswer(button, answer) {

    clearInterval(timer);

    const buttons = document.querySelectorAll(".answer");

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    if (answer === questions[currentQuestion].correct) {

        button.style.background = "#4CAF50";
        button.style.color = "white";

        score++;

        scoreElement.textContent = `Score: ${score}`;

    } else {

        button.style.background = "#f44336";
        button.style.color = "white";

        buttons.forEach(btn => {

            if (btn.textContent === questions[currentQuestion].correct) {

                btn.style.background = "#4CAF50";
                btn.style.color = "white";
            }
        });
    }

    nextButton.disabled = false;
}

function startTimer() {

    timeLeft = 15;

    timeElement.textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        timeElement.textContent = timeLeft;

        if (timeLeft === 0) {

            clearInterval(timer);

            const buttons = document.querySelectorAll(".answer");

            buttons.forEach(btn => {

                btn.disabled = true;

                if (btn.textContent === questions[currentQuestion].correct) {

                    btn.style.background = "#4CAF50";
                    btn.style.color = "white";
                }
            });

            nextButton.disabled = false;
        }

    }, 1000);
}

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
});

function showResult() {

    clearInterval(timer);

    const percentage =
        Math.round((score / questions.length) * 100);

    let message = "";

    if (percentage >= 80) {
        message = "🏆 Excellent!";
    } else if (percentage >= 50) {
        message = "👍 Good Job!";
    } else {
        message = "💪 Keep Practicing!";
    }

    questionElement.textContent = "Quiz Completed! 🎉";

    answersElement.innerHTML = `
        <div class="result">
            <h2>${message}</h2>

            <p class="final-score">
                ${score} / ${questions.length}
            </p>

            <p class="percentage">
                ${percentage}%
            </p>

            <p>Your quiz has been completed.</p>
        </div>
    `;

    questionNumber.textContent = "Quiz Finished";

    nextButton.textContent = "Play Again";
    nextButton.disabled = false;

    nextButton.onclick = () => {

        nextButton.onclick = null;

        currentQuestion = 0;
        score = 0;

        scoreElement.textContent = "Score: 0";

        nextButton.textContent = "Next Question";

        quizScreen.classList.add("hidden");
        startScreen.classList.remove("hidden");

        progressBar.style.width = "0%";
    };
}

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeButton.textContent = "☀️ Light Mode";

    } else {

        themeButton.textContent = "🌙 Dark Mode";
    }
});
