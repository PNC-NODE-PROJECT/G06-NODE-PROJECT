// DOM ELEMENT  -------------------------
let dom_questions_view = document.getElementById("questions-view");
let dom_add=document.getElementById('add');
let dom_update=document.getElementById('update');
// INPUT CREATE -----------------
let question=document.getElementById('question');
let answer1=document.getElementById('answer1');
let answer2=document.getElementById('answer2');
let answer3=document.getElementById('answer3');
let answer4=document.getElementById('answer4');
let correct=document.querySelectorAll(".choise");
// INPUT EDITE--------------------
let quest=document.getElementById('questions');
let answers1=document.getElementById('ans1');
let answers2=document.getElementById('ans2');
let answers3=document.getElementById('ans3');
let answers4=document.getElementById('ans4');
let corrects=document.querySelectorAll(".choises");
// BUTTON-----------------
let btn_create_question=document.getElementById('create');
let btn_cancel_add=document.getElementById('cancel_add');
let btn_cancel_update=document.getElementById('cancel_update');
let btn_update=document.getElementById('edite');
// globle id
let taskID=0;


// HIDE / SHOW ---------------------------------------------------------
hide(dom_update);
function hide(element) {
    element.style.display = "none";
  }
  function show(element) {
    element.style.display = "block";
  }

// add question---------------------
function add_question(event){
    event.preventDefault();
    let correct_answer="";
    for(let i=0;i<correct.length;i++){
        if(correct[i].checked){
            correct_answer="answer"+[i+1]
        }
    }
    if( question.value!=='' && answer1.value!=='' && answer2.value!=='' && answer3.value!=='' && answer3.value!=='' && correct_answer!==''){
        let url="/question/add_question";
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
        axios.post(url,body).then((res)=>{console.log(res);})
        // clear input
        clearInput();
        // display question
        display_question();
    }else{
        alert("you didn't complete all field!")
    }
}


// clear input---------------------------------------
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
// get a question by id-----------------
function get_question_by_id(id){
    axios.get('/question/get_question_by_id/'+id).then((result) => {
        let questions=result.data[0];

        document.getElementById('questions').value=questions.question;   
        let choises = document.querySelectorAll('.choises');      
        for(let i=1;i<choises.length+1;i++){
            let ans='ans'+i
            document.getElementById(ans).value= questions.answers['answer'+i];
            if(questions.correctAnswer=="answer"+i){
                choises[i-1].checked=true;
            }
        }
    }).catch((err) => {
        console.log(err);
    });
}
// edite--------------
function edite_question(e){
    e.preventDefault();
    let correct_answer="";
    for(let i=0;i<corrects.length;i++){
        if(corrects[i].checked){
            correct_answer="answer"+[i+1]
        }
    }
    
    let conf=confirm("To make sure you want to update it!");
    if(conf ){
        let url="/question/update_data/";
        let body={
                    'question':quest.value,
                    'answers':{
                        'answer1':answers1.value,
                        'answer2':answers2.value,
                        'answer3':answers3.value,
                        'answer4':answers4.value
                    },
                        'correctAnswer':correct_answer
                }
        console.log(body);
        axios.put(url+taskID,body).then((res)=>{
            console.log(res);
            hide(dom_update);
            show(dom_questions_view);
            show(dom_add);
        })
        // display question
        display_question();
        
    }
}
// display the questions------------------------------
function display_question(){
    axios.get('/question/get_question').then((result) => {
        let question_data=result.data;       
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
    }).catch((err) => {
        console.log(err);
    });
    
}
function delete_edite_question(e){
    e.preventDefault();
  if (e.target.id === "delete") {
    let isExecuted = confirm("Are you sure to delete this question?");
    if (isExecuted) {
      // TODO: Request to the server to detele one task
      taskID = e.target.parentElement.id;
      axios.delete("/question/delete_data/"+taskID).then((response)=>{
        console.log(response);
      });       

    }
  } else if (e.target.id === "edite") {
      hide(dom_add);
      hide(dom_questions_view);
      show(dom_update);
    // TODO: Request to the server to update one task as completed
    taskID = e.target.parentElement.id;
    get_question_by_id(taskID);

  }
  //DISPLAY question
  display_question();
}
display_question();
// create btn

btn_create_question.addEventListener('click',add_question);
dom_questions_view.addEventListener("click",delete_edite_question);
btn_cancel_add.addEventListener('click',clearInput);
btn_cancel_update.addEventListener('click',function(){
    show(dom_add);
    show(dom_questions_view);
    hide(dom_update);
});
btn_update.addEventListener("click",edite_question);