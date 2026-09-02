const questions = [
    {
        question: "What is the capital of Pakistan?",
        answers: ["Karachi", "Lahore", "Islamabad", "Peshawar"],
        correct: "Islamabad"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: "Mars"
    },
    {
        question: "How many days are there in a week?",
        answers: ["5", "6", "7", "8"],
        correct: "7"
    },
    {
        question: "Which language is used to structure web pages?",
        answers: ["HTML", "Python", "C++", "Java"],
        correct: "HTML"
    },
    {
        question: "How many continents are there?",
        answers: ["5", "6", "7", "8"],
        correct: "7"
    },
    {
        question: "Which animal is known as the King of the Jungle?",
        answers: ["Tiger", "Lion", "Elephant", "Bear"],
        correct: "Lion"
    },
    {
        question: "What is 10 + 15?",
        answers: ["20", "25", "30", "35"],
        correct: "25"
    },
    {
        question: "Which ocean is the largest?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        correct: "Pacific Ocean"
    },
    {
        question: "Which device is used to take photographs?",
        answers: ["Camera", "Printer", "Speaker", "Keyboard"],
        correct: "Camera"
    },
    {
        question: "What does CSS mainly control?",
        answers: ["Website design", "Database", "Server", "Internet speed"],
        correct: "Website design"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");

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

        button.addEventListener("click", () => checkAnswer(button, answer));

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

    nextButton.textContent = "Restart Quiz";
    nextButton.disabled = false;

    nextButton.onclick = () => {
        currentQuestion = 0;
        score = 0;
        scoreElement.textContent = "Score: 0";
        nextButton.textContent = "Next Question";

        nextButton.onclick = null;

        showQuestion();
    };
}

showQuestion();
