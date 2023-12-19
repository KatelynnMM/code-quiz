
const questions = [
    {
        question: "What keyword is used to declare variables in JavaScript?",
        options: ["var", "int", "variable", "declare"],
        answer: "var"
    },
    {
        question: "Which HTML tag is used for creating an ordered list?",
        options: ["<ul>", "<li>", "<ol>", "<dl>"],
        answer: "<ol>"
    },
    {
        question: "What GIT command is used to clone a repository from a remote server?",
        options: ["git push", "git clone", "git pull", "git init"],
        answer: "git clone"
    }

];

document.addEventListener("DOMContentLoaded", function () {
    // Elements
    var startButton = document.getElementById("start-button");
    var quizContainer = document.getElementById("quiz-container");
    var questionElement = document.getElementById("question");
    var optionsList = document.getElementById("options");

    var timerElement = document.getElementById("timer");
    var highscoreButton = document.querySelector(".top-bar button");

    // Quiz variables
    var currentQuestionIndex = 0;
    var timeLeft = 60;
    var userScore = 0;

    // Event listeners
    startButton.addEventListener("click", startQuiz);

    highscoreButton.addEventListener("click", showHighscore);

    // Quiz start 
    function startQuiz() {
        startButton.style.display = "none";
        timerElement.textContent = "Timer: " + formatTime(timeLeft);

        // Start timer
        var timerInterval = setInterval(function () {
            timeLeft--;

            if (timeLeft <= 0 || currentQuestionIndex >= questions.length) {
                clearInterval(timerInterval);
                endQuiz();
            } else {
                timerElement.textContent = "Timer: " + formatTime(timeLeft);
            }
        }, 1000);

        loadNextQuestion();
    }

    // Function to load the next question
    function loadNextQuestion() {
        var currentQuestion = questions[currentQuestionIndex];

        // Check if there are still questions
        if (currentQuestionIndex < questions.length) {
            questionElement.textContent = currentQuestion.question;
            optionsList.innerHTML = "";


            currentQuestion.options.forEach(function (option, index) {
                var optionButton = document.createElement("button");
                optionButton.classList.add("option");
                optionButton.textContent = option;
                optionButton.addEventListener("click", function () {
                    checkAnswer(option, currentQuestion.answer);
                });

                optionsList.appendChild(document.createElement("li").appendChild(optionButton));
            });

            currentQuestionIndex++;
        } else {
            endQuiz();
        }
    }


    // Function to check the selected answer
    function checkAnswer(selectedOption, correctAnswer) {
        if (selectedOption === correctAnswer) {
            // Correct answer
            userScore += 10; // Add 10 points for a correct answer
        } else {
            // Incorrect answer
            timeLeft -= 10; // Deduct 10 seconds for an incorrect answer
        }

        loadNextQuestion();
    }

    // Function to end the quiz
    function endQuiz() {
        // Display end of quiz message 
        alert("Quiz Over! Your score: " + userScore);
    }


    // Function to format time as MM:SS
    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;

        return (
            (minutes < 10 ? "0" : "") + minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds
        );
    }

    function showHighscore() {
        var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

        // Get user initials 
        var userInitials = prompt("Enter your initials:");

        // Create an object to represent the user's score
        var userScoreObject = {
            initials: userInitials,
            score: userScore,
        };

        highscores.push(userScoreObject);

        // Sort high scores in descending order based on score
        highscores.sort(function (a, b) {
            return b.score - a.score;
        });

        localStorage.setItem("highscores", JSON.stringify(highscores));

        // Display the high scores 
        var highscoreMessage = "High Scores:\n";
        highscores.forEach(function (score, index) {
            highscoreMessage += `${index + 1}. ${score.initials}: ${score.score}\n`;
        });

        alert(highscoreMessage);
    }




});
