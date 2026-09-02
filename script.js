    const questionSets = {

    general: [
        {
            question: "What is the capital of Pakistan?",
            answers: ["Karachi", "Lahore", "Islamabad", "Peshawar"],
            correct: "Islamabad"
        },
        {
            question: "How many days are there in a week?",
            answers: ["5", "6", "7", "8"],
            correct: "7"
        },
        {
            question: "What is 10 + 15?",
            answers: ["20", "25", "30", "35"],
            correct: "25"
        }
    ],

    science: [
        {
            question: "Which planet is known as the Red Planet?",
            answers: ["Earth", "Mars", "Jupiter", "Venus"],
            correct: "Mars"
        },
        {
            question: "What gas do humans need to breathe?",
            answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            correct: "Oxygen"
        },
        {
            question: "What is H2O commonly known as?",
            answers: ["Salt", "Water", "Oxygen", "Hydrogen"],
            correct: "Water"
        }
    ],

    sports: [
        {
            question: "How many players are on a cricket team?",
            answers: ["9", "10", "11", "12"],
            correct: "11"
        },
        {
            question: "Which country won the Cricket World Cup in 1992?",
            answers: ["India", "Pakistan", "Australia", "England"],
            correct: "Pakistan"
        },
        {
            question: "How many players are on a football team on the field?",
            answers: ["9", "10", "11", "12"],
            correct: "11"
        }
    ],

    technology: [
        {
            question: "What does HTML stand for?",
            answers: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Hyper Transfer Machine Language",
                "Home Tool Markup Language"
            ],
            correct: "Hyper Text Markup Language"
        },
        {
            question: "Which language is mainly used to style web pages?",
            answers: ["HTML", "CSS", "Python", "Java"],
            correct: "CSS"
        },
        {
            question: "Which language makes web pages interactive?",
            answers: ["CSS", "HTML", "JavaScript", "SQL"],
            correct: "JavaScript"
        }
    ]
};


let questions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;


// Elements

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


// Start Quiz

startButton.addEventListener("click", () => {

    const category = categorySelect.value;

    questions = questionSets[category];

    currentQuestion = 0;
    score = 0;

    scoreElement.textContent = "Score: 0";

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
});


// Show Question

function showQuestion() {

    clearInterval(timer);

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

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


// Check Answer

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


// Timer

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


// Next Question

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
});


// Result

function showResult() {

    clearInterval(timer);

    questionElement.textContent = "Quiz Completed! 🎉";

    answersElement.innerHTML = `
        <div style="text-align:center; padding:20px;">
            <h2>Your Score</h2>
            <p style="font-size:32px; margin:15px 0;">
                ${score} / ${questions.length}
            </p>
        </div>
    `;

    questionNumber.textContent = "Quiz Finished";

    scoreElement.textContent = `Score: ${score}`;

    nextButton.textContent = "Play Again";

    nextButton.disabled = false;

    nextButton.onclick = () => {

        currentQuestion = 0;
        score = 0;

        scoreElement.textContent = "Score: 0";

        nextButton.textContent = "Next Question";

        nextButton.onclick = null;

        quizScreen.classList.add("hidden");
        startScreen.classList.remove("hidden");
    };
}            
