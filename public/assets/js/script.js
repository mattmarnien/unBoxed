// Front end script

//////////
//Index Script
///

const gameSearch = $("#gameSearchInput");
const gameSearchForm = $("#gameSearchForm");

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
const signUpCity = $("#signUpCity");
const signUpState = $("#signUpState");
const signUpButton = $("#signUpBtn");
const signUpForm = $("#signUpForm");

async function getUserInfo() {


  let user = {
    email: signUpEmail.val().trim(),
    firstname: signUpFirstname.val().trim(),
    lastname: signUpLastname.val().trim(),
    username: signUpUsername.val().trim(),
    password: signUpPassword.val().trim(),
    city: signUpCity.val().trim(),
    state: signUpState.val().trim()
  };


  return user;



}

signUpForm.on("submit", event => {
  event.preventDefault();
})
signUpButton.on("click", async event => {
  event.preventDefault();
  if (signUpPassword.val().trim() === signUpConfirmPassword.val().trim()) {
    let newUser = await getUserInfo();
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




const userSelect = $("#selectUser");
const gamesDiv = $("#gamesDiv")
const gameAddButton = $(".gameAddButton")
let user = 0;

userSelect.on("change", event => {
  user = event.target.value;
  console.log("selected");
  $.ajax({
    method: "GET",
    url: "/api/games"
  }).then(data => {
    console.log(data);
    for(let i =0; i < data.length; i++){    
    let newDiv = $("<div>");
    let newTitle = $("<h4>");
    let newImage = $(`<img src='${data[i].image_url}' class='addGamesImage'>`)
    let newButton = $(`<button class='btn gameAddButton col s3' data-id='${data[i].id}'>`)
    newButton.text("Add")
    newTitle.text(data[i].names);
    gamesDiv.append(newDiv);
    newDiv.append(newTitle, newImage, newButton);

    }


  })
})

$(document).on("click", ".gameAddButton", function (event) {
  console.log("click");
  console.log(user);
  let game = {
    id: $(this).data('id')
  };
  console.log(game);
  $.ajax({
    method: "POST",
    url: "/api/users/games/" + user,
    data: game
  }).then(data => {
    console.log(data)

  })

})


//////////
//LFG Scripts
///

const lfgSelect = $("#groupTypeSelect");



lfgSelect.on("change", event => {
  let choice = event.target.value;
  console.log(choice)
  if (choice == 1) {
    $.ajax({
      method: "GET",
      url: "/api/users/group"
    }).then(data => {
      let matchArr = [];      
      for (let i = 0; i < 3;) {
        let alreadyPresent = false;
        let randoCalrissian = Math.floor(Math.random() * data.length);
        for(let j = 0; j<matchArr.length; j ++){
         if(matchArr[j].id === data[randoCalrissian].id){         
         alreadyPresent = true;
         }
        }
        if(alreadyPresent === false){   
          matchArr.push(data[randoCalrissian]);
          i++;          
        }   
        }
        console.log(matchArr)
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
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});
