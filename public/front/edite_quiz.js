const { default: axios } = require("axios");

let dom_questions_view = document.getElementById("questions-view");
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
    // clear input
    clearInput()
    // display question
    displayQuestion()
}
// clear input
function clearInput(){
    document.getElementById('title').value="";
    document.getElementById('question').value="";
    document.getElementById('answer1').value="";
    document.getElementById('answer2').value="";
    document.getElementById('answer3').value="";
    document.getElementById('answer4').value="";
    var ele = document.querySelectorAll(".choise");
   for(var i=0;i<ele.length;i++){
       ele[i].checked = false;  
   }
  }

// display the question
function displayQuestion(e){
    axios.get('/get_question').then((result) => {
        let question_data=result.data;
        // Remove the question container 
        dom_questions_container = document.getElementById("questions-container");
        dom_questions_container.remove();
        // create a new card container 
        dom_questions_container = document.createElement("div");
        dom_questions_container.id = "questions-container";
        dom_questions_container.className = "row col-6 m-auto shadow-lg p-3 mb-5 bg-body rounded border-start border-primary border-3";
        dom_questions_view.appendChild(dom_questions_container);

        for(let i=0;i<question_data.length;i++){
            // create div with class name 'bg-white px-4' and append to dom_questions_container
            let card_question=document.createElement("div");
            card_question.className="bg-white px-4";
            dom_questions_container.appendChild(card_question);
            // create p with class name 'fw-bold' and append to card_question
            let question=document.createElement('p');
            question.className="fw-bold"
            question.textContent=question_data.question;
            card_question.appendChild(question);
            // create div for answer1,answer2,answer3,answer4 with class name 'form-check mb-2 border-bottom border-primary border-2'
            // ans1
            let answer1=document.createElement('div');
            answer1.className="form-check mb-2 border-bottom border-primary border-2";
            card_question.appendChild(answer1);
            let p1=document.createElement('p');
            p1.textContent=question_data.answers.answer1;
            answer1.appendChild(p1);
            // ans2
            let answer2=document.createElement('div');
            answer1.className="form-check mb-2 border-bottom border-primary border-2";
            card_question.appendChild(answer2);
            let p2=document.createElement('p');
            p2.textContent=question_data.answers.answer2;
            answer2.appendChild(p2);
            // ans3
            let answer3=document.createElement('div');
            answer3.className="form-check mb-2 border-bottom border-primary border-2";
            card_question.appendChild(answer3);
            let p3=document.createElement('p');
            p3.textContent=question_data.answers.answer3;
            answer3.appendChild(p3);
            // ans4
            let answer4=document.createElement('div');
            answer4.className="form-check mb-2 border-bottom border-primary border-2";
            card_question.appendChild(answer4);
            let p4=document.createElement('p');
            p4.textContent=question_data.answers.answer4;
            answer4.appendChild(p4);
            // create div with class name 'text-end'
            let dom_btn=document.createElement('div');
            dom_btn.className="text-end";
            card_question.appendChild(dom_btn)

            // create delete button
            let btn_delete=document.createElement('button');
            btn_delete.type="submit";
            btn_delete.className="btn btn-danger";
            btn_delete.id="delete";
            dom_btn.appendChild(btn_delete)
            
            // create edite button
            let btn_edite=document.createElement('button');
            btn_edite.type="submit";
            btn_edite.className="btn btn-primary";
            btn_edite.id="edite";
            dom_btn.appendChild(btn_edite)
        }
    }).catch((err) => {
        console.log(err);
    });
    
}

// create btn
const btn_create_question=document.getElementById('create');
btn_create_question.addEventListener('click',add_question);