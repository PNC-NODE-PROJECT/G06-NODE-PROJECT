const dom_login=document.getElementById('login_dom');
const dom_signUp=document.getElementById('signup_dom');
const login = document.getElementById('login')

hide(dom_login)
// Hide a given element
function hide(element) {
    element.style.display = "none";
  }
  
  // Show a given element
function show(element) {
    element.style.display = "block";
  }

  login.addEventListener("click", (event) => {
    hide(dom_signUp);
    show(dom_login);
    // alert('hie')
});

