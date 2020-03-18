// Front end script

//////////
//Index Script
///

const gameSearch = $("#gameSearchInput");
const gameSearchForm = $("#gameSearchForm");

gameSearchForm.on("submit", event =>{
  event.preventDefault();
  let search = gameSearch.val().trim()
  $.ajax({
    method: "POST",
    url: "/search",
    data: {name: search}
  }).then( () => {

  })
  

})


/////////
//Signup Page Script
//
const signUpEmail = $("#signUpEmail");
const signUpFirstname = $("#signUpFirstname");
const signUpLastname = $("#signUpLastname");
const signUpUsername = $("#signUpUsername");
const signUpPassword = $("#signUpPassword");
const signUpConfirmPassword = $("#signUpConfirmPassword");
const signUpButton = $("#signUpBtn");
const signUpForm = $("#signUpForm");

function getUserInfo() {
  let user = {
    email: signUpEmail.val().trim(),
    firstname: signUpFirstname.val().trim(),
    lastname: signUpLastname.val().trim(),
    username: signUpUsername.val().trim(),
    password: signUpPassword.val().trim(),
};
return user;
}

signUpForm.on("submit", event => {
  event.preventDefault();
})
signUpButton.on("click", event => {
  event.preventDefault();
if(signUpPassword.val().trim() === signUpConfirmPassword.val().trim()){
  let newUser = getUserInfo();
  console.log(newUser);
  $.ajax({
    method: "POST",
    url: "/api/users",
    data: newUser
  }).then( () => {
    console.log(newUser.firstname + " " + newUser.lastname + " has been added to the database.")
  })
  }
  else{
    console.log("Passwords do not match!")
  }
})

//////////
//Add game scripts
////
const addButton = $(".addGameButton");

addButton.on("click", function(event){
  game = $(this).data('id');
  $.ajax({
    method: "POST",
    url: "/api/users/:id",
    data: game
  }).then( () => {
    
  })

})




/////////////
//Materialize Scripts
////////

// Materialize event listener for side-nav on mobile;
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });
