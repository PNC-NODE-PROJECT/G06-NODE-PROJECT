

let dom_questions_view = document.getElementById("questions-view");
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
    if( question.value!=='' && answer1.value!=='' && answer2.value!=='' && answer3.value!=='' && answer3.value!=='' && correct_answer!==''){
        let url="/add_question";
        let body={
                    'question':question.value,
                    'answers':{
                        'answer1':answer1.value,
                        'answer2':answer2.value,
                        'answer3':answer3.value,
                        'answer4':answer4.value
                    },
                        'correctAnswer':correct_answer
                }
        axios.post(url,body).then((res)=>{
            console.log(res);
        })
        // clear input
        clearInput();
        // display question
        display_question();
    }else{
        alert("you didn't complete all field!")
    }
}

// clear input
function clearInput(){
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

// display the questions
function display_question(){
    axios.get('/get_question').then((result) => {
        let question_data=result.data;
        console.log(question_data);
        
        // Remove the question view 
        while (dom_questions_view.firstChild) {
            dom_questions_view.removeChild(dom_questions_view.lastChild);
        }



        for(let i=0;i<question_data.length;i++){
            // create a new card container 
            dom_questions_container = document.createElement("div");
            dom_questions_container.id = "questions-container";
            dom_questions_container.className = "row col-6 m-auto shadow-lg p-3 mb-5 bg-body rounded border-start border-primary border-3";
            dom_questions_view.appendChild(dom_questions_container);
            // create div with class name 'bg-white px-4' and append to dom_questions_container
            let card_question=document.createElement("div");
            card_question.className="bg-white px-4";
            dom_questions_container.appendChild(card_question);
            // create p with class name 'fw-bold' and append to card_question
            let question=document.createElement('p');
            question.className="fw-bold"
            question.textContent=question_data[i].question;
            card_question.appendChild(question);
            // create div for answer1,answer2,answer3,answer4 with class name 'form-check mb-2 border-bottom border-primary border-2'
            // ans1      
            
            let answer1=document.createElement('div');
            answer1.className="form-check mb-2 border-bottom border-primary border-2";
            card_question.appendChild(answer1);
            let p1=document.createElement('p');
            p1.textContent=question_data[i].answers.answer1;
            if(question_data[i].correctAnswer=="answer1"){
                p1.className="text-primary fs-4"
            }else{
                p1.className="fs-4";
            }
            answer1.appendChild(p1);
            // ans2
            let answer2=document.createElement('div');
            answer2.className="form-check mb-2 border-bottom border-primary border-2";
            card_question.appendChild(answer2);
            let p2=document.createElement('p');
            p2.textContent=question_data[i].answers.answer2;
            if(question_data[i].correctAnswer=="answer2"){
                p2.className="text-primary fs-4"
            }else{
                p2.className="fs-4";
            }
            answer2.appendChild(p2);
            // ans3
            let answer3=document.createElement('div');
            answer3.className="form-check mb-2 border-bottom border-primary border-2";
            card_question.appendChild(answer3);
            let p3=document.createElement('p');
            p3.textContent=question_data[i].answers.answer3;
            if(question_data[i].correctAnswer=="answer3"){
                p3.className="text-primary fs-4"
            }else{
                p3.className="fs-4";
            }
            answer3.appendChild(p3);
            // ans4
            let answer4=document.createElement('div');
            answer4.className="form-check mb-2 border-bottom border-primary border-2";
            card_question.appendChild(answer4);
            let p4=document.createElement('p');
            p4.textContent=question_data[i].answers.answer4;
            if(question_data[i].correctAnswer=="answer4"){
                p4.className="text-primary fs-4";
            }else{
                p4.className="fs-4";
            }
            answer4.appendChild(p4);
            // create div with class name 'text-end'
            let dom_btn=document.createElement('div');
            dom_btn.className="text-end ";
            dom_btn.id=question_data[i]._id;
            card_question.appendChild(dom_btn)

            // create delete button
            let btn_delete=document.createElement('button');
            btn_delete.type="submit";
            btn_delete.className="btn btn-danger m-1";
            btn_delete.id="delete";
            btn_delete.textContent="delete"
            dom_btn.appendChild(btn_delete)
            
            // create edite button
            let btn_edite=document.createElement('button');
            btn_edite.type="submit";
            btn_edite.className="btn btn-primary";
            btn_edite.id="edite";
            btn_edite.textContent="edite"
            dom_btn.appendChild(btn_edite)
        }
        console.log(dom_questions_view);
    }).catch((err) => {
        console.log(err);
    });
    
}
function delete_edite_question(e){
    e.preventDefault();
  if (e.target.id === "delete") {
    let isExecuted = confirm("Are you sure to delete this task?");
    if (isExecuted) {
      // TODO: Request to the server to detele one task
      const taskID = e.target.parentElement.id;
      console.log(taskID);
      axios.delete("/delete_data/"+taskID).then((response)=>{
        console.log(response);
      });       

    }
  } else if (e.target.id === "edite") {
    // TODO: Request to the server to update one task as completed
    const taskID = e.target.parentElement.id;
    axios.put("/update_data/"+taskID).then((res)=>{
      console.log(res);
    })
  }
  //DISPLAY TASKS
  display_question();
}
display_question();
// create btn
const btn_create_question=document.getElementById('create');
btn_create_question.addEventListener('click',add_question);
dom_questions_view.addEventListener("click",delete_edite_question);