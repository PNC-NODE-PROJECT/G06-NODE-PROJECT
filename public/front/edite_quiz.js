// const { default: axios } = require("axios");

let title =document.getElementById('title');
let question=document.getElementById('question');
let answer1=document.getElementById('answer1');
let answer2=document.getElementById('answer2');
let answer3=document.getElementById('answer3');
let answer4=document.getElementById('answer4');
let correct=document.querySelectorAll(".choise");


// add question
function add_question(event){
    event.preventDefault();
    let correct_answer="";
    for(let i=0;i<correct.length;i++){
        if(correct[i].checked){
            correct_answer="answer"+(i+1)
        }
    }
    // console.log(title.value,question.value,answer1.value,answer2.value,answer3.value,answer4.value,correct_answer);
    let url="/add_question";
    let body={
                'title':title.value,
                'question':question.value,
                'answers':{
                    'answer1':answer1.value,
                    'answer2':answer2.value,
                    'answer3':answer3.value,
                    'answer4':answer4.value},
                    'correctAnswer':correct_answer
            }
    axios.post(url,body).then((res)=>{
        console.log(res);
    })
}
// create btn
const btn_create_question=document.getElementById('create');
btn_create_question.addEventListener('click',add_question);