const username = document.querySelector("#usernamelg");
const password = document.getElementById("passwordlg");
const button_signup = document.querySelector("#sing_up");
const URL = "http://localhost:3000";

function login(e){
    e.preventDefault();
    let body = {}
    body['username']=username.value;
    body['password']=password.value;
    
    axios.get(URL+"/login/?username="+username.value+"&password="+password.value).then((response)=>{
      let isValid = response.data;
      console.log(isValid);
      if (isValid){
          location.href = "home.html";
      }else {
          alert("Please try again you have wrong password or username and make sure that you have file username and password!!")
      }
    });


}



button_signup.addEventListener('click',login);