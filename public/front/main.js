const URL = "http://localhost:3000";
const buttonCreatequestion = document.getElementById("bnt-createQuestion");
const buttonediteMenu = document.querySelector(".eiditmenu");
console.log(buttonCreatequestion);


// request all the question from sever to display
function displayQuestion(){
    axios.get(URL+"/get_question").then((response)=>{
        let questions = response['data'];
        for (let i=0;i<questions.length;i++){
            
        }
    })
}

// create questions
function createQuestion(event){
    event.preventDefault();
    let query = URL+ "/add_question";
    let title = document.querySelector("#title").value;
    let question = document.querySelector("#question").value;
    let answer1 = document.querySelector("#answer1").value;
    let answer2 = document.querySelector("#answer2").value;
    let answer3 = document.querySelector("#answer3").value;
    let answer4 = document.querySelector("#answer4").value;
    let correctAnswer = document.querySelectorAll("#radioExample1");
    let correctanswer = "";
    let answers = {};
    answers['answer1']=answer1;
    answers['answer2']=answer2;
    answers['answer3']=answer3;
    answers['answer4']=answer4;
    for (let i=0;i<correctAnswer.length;i++){
        if (correctAnswer[i].checked){
            correctanswer = correctAnswer[i].value;
        }
    }
    axios.post(query,{"question":question,"answers":answers,"correctAnswer":correctanswer,"title":title}).then((error)=>{
        if(error){
            console.log(error)
        }else{
            console.log("repy from main js create question function...")
        }
    })


}


// edit questions
function editQuestion(){
    let questionID ="6269f713c4458366fbad36ac";
    axios.put(URL+"/update_data/"+questionID).then((res)=>{
        console.log(res);
      })
}

// delete question
function deleteQuestion(){
    let questionID = "6269f713c4458366fbad36ac";
    axios.delete(URL+"/delete_data/"+questionID).then((response)=>{
        console.log(response);
      }); 
}



// main
buttonCreatequestion.addEventListener('click',createQuestion);
buttonediteMenu.addEventListener('click',displayQuestion);