const questions = [
    {
        question: "Which type of JavaScript language is ___?",
        answers: [
            { text: "Object-Oriented", correct: false},
            { text: "bject-Based", correct: true},
            { text: "Assembly-language", correct: false},
            { text: "High-level", correct: false},
        ]
    },
    {
        question: "Which one of the following also known as Conditional Expression:?",
        answers: [
            { text: "Alternative to if-else", correct: false},
            { text: "Switch statement", correct: false},
            { text: "If-then-else statement", correct: false},
            { text: "immediate if", correct: true},
        ]
    },
    {
        question: "In JavaScript, what is a block of statement?",
        answers: [
            { text: "Conditional block", correct: false},
            { text: "block that combines a number of statements into a single compound statement", correct: true},
            { text: "both conditional block and a single statement", correct: false},
            { text: "block that contains a single statement", correct: false},
        ]
    },
    {
        question: "When interpreter encounters an empty statements, what it will do:?",
        answers: [
            { text: "Shows a warning", correct: false},
            { text: "Prompts to complete the statement", correct: false},
            { text: "Throws an error", correct: false},
            { text: "Ignores the statements", correct: true},
        ]
    },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+currentQuestion.question;


    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");

        }
        button.disabled = true;
    })
    nextButton.style.display = "block"

}
function showScore(){
    resetState();
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Agin";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();