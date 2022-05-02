const username = document.querySelector("#username");
const password = document.getElementById("password");
const button_signup = document.querySelector("#sing_up");
const URL = "http://localhost:3000/users";


function createUser(e){
    e.preventDefault();
    let body = {}
    body['username']=username.value;
    body['password']=password.value;
    let validation = false;
    if (username.value !=="" && password.value!==""){
        validation = true;

    }
    axios.post(URL+"/signup",body).then((error)=>{
        if (error && validation==true){
            console.log(error)
            location.href = "home.html";
        }else {
            console.log("user have add already!!!...")
        }
    });
}




button_signup.addEventListener('click',createUser);