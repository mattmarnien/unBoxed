// Front end script

//////////
//Index Script
///

const gameSearch = $("#gameSearchInput");
const gameSearchForm = $("#gameSearchForm");
const gameAddButton = $();
const gamePageButton = $(".toGamePage");

gameSearchForm.on("submit", event => {
  event.preventDefault();
  let search = gameSearch.val().trim()
  $.ajax({
    method: "POST",
    url: "/search",
    data: { name: search }
  }).then(() => {

  })


})

//////////
//Game Page Script
///
const redditComments = $(".redditCommentLink");
const description = $(".descriptionLink")

function generateDescription(data) {
  let newDiv = $("<div class='gameExtraInfo'>");
    let descriptionDiv = $("<div>")
    let newH6 = $("<h6>");
    newH6.text("Description: ")
    newDiv.append(descriptionDiv);
    descriptionDiv.append(newH6, data.games[0].description_preview);
  $("#infoDiv").append(newDiv);
}

function generateRedditDiv(data) {
  let newDiv = $("<div class='gameExtraInfo'>");
  for (let i = 0; i < 5; i++) {
    let redditDiv = $("<div>")
    let newH4 = $("<h4>");
    newH4.text(data.reddit_comments[i].title)
    newDiv.append(redditDiv);
    redditDiv.append(newH4, data.reddit_comments[i].body);
  }
  $("#infoDiv").append(newDiv);
}

redditComments.on("click", function (event) {
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

description.on("click", function (event) {
  console.log("click")
  let name = $(this).data('name');
  let queryUrl = "https://www.boardgameatlas.com/api/search?name=" + name + "&client_id=nmzLLgP0nr"
  $("#infoDiv").empty();
  $.ajax({
    method: "GET",
    url: queryUrl
  }).then(data => {
    console.log(data)
    generateDescription(data)
    
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
  if (signUpPassword.val().trim() === signUpConfirmPassword.val().trim()) {
    let newUser = getUserInfo();
    console.log(newUser);
    $.ajax({
      method: "POST",
      url: "/api/users",
      data: newUser
    }).then(() => {
      console.log(newUser.firstname + " " + newUser.lastname + " has been added to the database.")
    })
  }
  else {
    console.log("Passwords do not match!")
  }
})

//////////
//Add game scripts
////
const addButton = $(".addGameButton");

addButton.on("click", function (event) {
  game = $(this).data('id');
  $.ajax({
    method: "POST",
    url: "/api/users/:id",
    data: game
  }).then(() => {

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
