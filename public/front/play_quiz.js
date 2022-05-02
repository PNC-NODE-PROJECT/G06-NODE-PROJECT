const URL = "http://localhost:3000/question";
const playQuizDom = document.getElementById("playQuizDom");
const QuizResultDom = document.getElementById("QuizResultDom");
const box = document.getElementById("box-result")
const box_progressbar = document.querySelector(".box-progressbar");
const progressbar = document.querySelector(".progressbar");
const nexbutton = document.querySelector("#next")
const questionDom = document.getElementById("question");
const answer1_Dom = document.getElementById("answer1");
const answer2_Dom = document.getElementById("answer2");
const answer3_Dom = document.getElementById("answer3");
const answer4_Dom = document.getElementById("answer4");
const h3 = document.getElementById("average");
var currentQuestionIndex = 0;
let numberofcorrectAnswer = 0;
let chosenAnswers = [];

// Show function
function show(element){
    element.style.display = "block";
}

// Hide function
function hide (element){
    element.style.display = "none";
}

// To display question on Dom
function playQuiz(index){
    axios.get(URL+"/get_question").then((response)=>{
        let questions = response.data;
        if (index < questions.length){
            let equestion = questions[index];
            question.textContent = equestion.question;
            answer1.textContent = equestion.answers.answer1;
            answer2.textContent = equestion.answers.answer2;
            answer3.textContent = equestion.answers.answer3;
            answer4.textContent = equestion.answers.answer4;
            hide(QuizResultDom);
        } else {
            console.log(chosenAnswers);
            computeScore();
        }

        let progressbarsize = (index*100)/questions.length;
        progressbar.style.width = progressbarsize + "%";
    });
}

// To increase current index of question
function increaseCurrenIndexQuestion(){
    playQuiz(currentQuestionIndex);
    currentQuestionIndex +=1;
}

// To start quiz when user come to play quiz
function startQuiz(){
    currentQuestionIndex = 0;
    numberofcorrectAnswer = 0;
    chosenAnswers = [];
    increaseCurrenIndexQuestion();
}

// To get the answer from user's click
function checkAnswer(choice){
    console.log(choice);
    chosenAnswers.push(choice);
    increaseCurrenIndexQuestion();
}

// To compare answer that user had choosen already with the answer that store in MongoDB
function computeScore(){
    axios.get(URL+"/get_question").then((response)=>{
        let index = 0;
        let allquestion = response.data;
        for (let question of allquestion){
            if (question.correctAnswer==chosenAnswers[index]){
                numberofcorrectAnswer += 1;
            }
            index++;
        }
        let percentage = parseInt((numberofcorrectAnswer*100)/allquestion.length);
        h3.textContent = percentage +"%";
        if (percentage==100){
            box.style.backgroundColor = "green";
        }else if (percentage<80 && percentage>60){
            box.style.backgroundColor = "rgb(116, 236, 46)";
        }else if (percentage==50){
            box.style.backgroundColor = "orange";
        }else if (percentage>=25 && percentage<50){
            box.style.backgroundColor = "rgb(235, 108, 29)";
        }else if (percentage<25){
            box.style.backgroundColor = "red";
        }
    });
    setTimeout(showResult, 500);
   
}

function showResult (){
    hide(playQuizDom);
    show(QuizResultDom);
}

// Start Quiz
startQuiz()