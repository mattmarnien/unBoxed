// Front end script

//////////
//Index Script
///

const gameSearch = $("#gameSearchInput");
const gameSearchForm = $("#gameSearchForm");
const gameAddButton =$();
const gamePageButton = $(".toGamePage");

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

//////////
//Game Page Script
///
const gameReview = $(".gameReviewLink");
const redditComments = $(".redditCommentLink");

function generateReviewDiv(data){
  let newDiv = $("<div class='reviewBox'>");
  for(let i = 0; i< 5; i++) {
    let reviewDiv = $("<div>")
    let newH6 = $("<h6>");
    let newP = $("<p>");
    if(data.reviews[i].title){
    newH6.text("Title" + data.reviews[i].title + "Rating: " + data.reviews[i].rating)
    }
    else{
      newH6.text("Rating: " + data.reviews[i].rating)
    }
    newP.text(data.reviews[i].description);
    newDiv.append(reviewDiv);
    reviewDiv.append(newH6, newP);
  }

  $("#infoDiv").append(newDiv);

}
function generateRedditDiv(data){
  let newDiv = $("<div class='reviewBox'>");
  for(let i = 0; i< 1; i++) {
    let redditDiv = $("<div>")
    let newH6 = $("<h6>");
    let newP = $("<p>");
    
    newH6.text(data.reddit_comments[i].title)
    
   
    newP.text(data.reddit_comments[i].body);
    newDiv.append(redditDiv);
    redditDiv.append(newH6, data.reddit_comments[i].body);
  }

  $("#infoDiv").append(newDiv);

}

gameReview.on("click", function(event){
  let name = $(this).data('name');
  let queryUrl = "https://www.boardgameatlas.com/api/search?name=" + name + "&client_id=nmzLLgP0nr"
  $("#infoDiv").empty();

  $.ajax({
    method: "GET",
    url: queryUrl
  }).then(data => {
    console.log(data)
    queryUrl = "https://www.boardgameatlas.com/api/reviews?&description_required&game_id=" + data.games[0].id + "&client_id=nmzLLgP0nr"
    $.ajax({
      method: "GET",
      url: queryUrl
    }).then(moreData => {
      generateReviewDiv(moreData)
      console.log(moreData);
    })
    
    

  })
})

redditComments.on("click", function(event){
  let name = $(this).data('name');
  let queryUrl = "https://www.boardgameatlas.com/api/search?name=" + name + "&client_id=nmzLLgP0nr"
  $("#infoDiv").empty();

  $.ajax({
    method: "GET",
    url: queryUrl
  }).then(data => {
    console.log(data)
    queryUrl = "https://www.boardgameatlas.com/api/game/reddit?limit=10&game_id=" + data.games[0].id + "&client_id=nmzLLgP0nr"
    $.ajax({
      method: "GET",
      url: queryUrl
    }).then(moreData => {
    generateRedditDiv(moreData)
      console.log(moreData);
    })
    
    

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
