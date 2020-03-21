// Front end script


/////////
//Login Script
//

const loginButton = $("#loginButton")
const loginForm = $(".loginForm")
const loginUsername = $("#loginUsernameInput");
const loginPassword = $("#loginPasswordInput");

loginForm.on("submit", event => {
  event.preventDefault();
  let username = loginUsername.val().trim();
  let password = loginPassword.val().trim();
  let loginObj = {
    username: username,
    password: password
  }
  $.ajax({
    method: "GET",
    url: "/user/login",
    data: loginObj
  }).then(() => {
    window.location.href = "/user";
  })

})



//////////
//Index Script
///
const gameSearch = $("#gameSearchInput");
const gameSearchForm = $("#gameSearchForm");
const gameAddButton = $(".gameAddButton");
const gamePageButton = $(".toGamePage");

gameSearchForm.on("submit", event => {
  event.preventDefault();
  let search = {name: gameSearch.val().trim()}
  console.log("search!!!!!!!", search);
  $.ajax({
    method: "POST",
    url: "/search",
    data: search
  }).then(data => {
    window.location = "/games/" + data.id;
  });

});


//function to add game on game add button that works both in Index and on Game Page
$(".gameAddButton").on("click", function(event){

  thisGame = $(this).data("id");
  addedGameObj = {game: thisGame};
  console.log(addedGameObj);
  $.ajax({
    method: "POST",
    url: "/api/users/games/",
    data: addedGameObj,
    success: function(data) {
      if (data.redirect) {
          // data.redirect contains the string URL to redirect to
          window.location.href = data.redirect;
      } else {
          // data.form contains the HTML for the replacement form
          console.log('game added')
      }
  }

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
    
    generateDescription(data)
    
  })
})

$(document).on("click", event => {
  $("#infoDiv").empty();
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
      url: "/api/signup",
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
//LFG Scripts
///

const lfgSelect = $("#groupTypeSelect");
const matchArr = [];
const matchDiv = $("#matchDiv");

function generateGroupPage(matchArr){
  console.log("generationg")
  for(let i = 0; i < matchArr.length; i++){
    let matchUserDiv = $("<div class='gameCard col s4'>");
    let matchUserName = $("<h5>");
    let matchUserGames = $("<p>")
    matchUserName.text(matchArr[i].username);
    let gamesStr = ''
    for(let j = 0; j < matchArr[i].games.length; j++){
      gamesStr += matchArr[i].games[j].names; 
      gamesStr += '\n'
    }
    matchUserGames.text(gamesStr);
    matchDiv.append(matchUserDiv);
    matchUserDiv.append(matchUserName, matchUserGames);

  }

}

lfgSelect.on("change", event => {
  let choice = event.target.value
  console.log(choice)
  if (choice == 1) {
    $.ajax({
      method: "GET",
      url: "/api/users/group",
      success: function(data) {
        if (data.redirect) {
            window.location.href = data.redirect;
        } else {
      console.log(data);
      let hasGamesArr = data.group.filter(user => user.games.length)  
      console.log(hasGamesArr);    
      matchArr.length = 0;
      let count = 0;  
      for (let i = 0; i < hasGamesArr.length;) {
        count++;
        let alreadyPresent = false;
        let gamesinCommon = false;
        let randoCalrissian = Math.floor(Math.random() * hasGamesArr.length);
        for(let j = 0; j<matchArr.length; j ++){
         if(matchArr[j].id === hasGamesArr[randoCalrissian].id){         
         alreadyPresent = true;
         }
        
         for(let g = 0; g < data.group[randoCalrissian].games.length; g ++){
           if(data.thisUser.games.include(hasGamesArr[randoCalrissian].games[m])){
             gamesinCommon = true;
           }
         }
         
        }

        if(!alreadyPresent && gamesinCommon){
          matchArr.push(hasGamesArr[randoCalrissian]);
          i++;
             
        }
        else if(count > hasGamesArr.length *2){
          matchArr.push(hasGamesArr[randoCalrissian]);
          i++;
                }   
        }
        generateGroupPage(matchArr);
      }
    
    }
  })
 
}
  
  if (choice == 2) {

  }
})
    




/////////////
//Materialize Scripts
////////

// Materialize event listener for side-nav on mobile;
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
  $('select').formSelect();
});

