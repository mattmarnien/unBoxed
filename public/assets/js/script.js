// Front end script

//////////
//Global Functions
///

function makeAlertText(alertDiv, alertMessage, alertType) {
  alertDiv.empty();
  let alertText;
  if (alertType === 'alert') {
    alertText = $("<p class='alertText'>");
  }
  else {
    alertText = $("<p class='updatedText'>");
  }
  alertText.text(alertMessage)
  alertDiv.append(alertText);
}


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
  let search = { name: gameSearch.val().trim() }
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
$(".gameAddButton").on("click", function (event) {

  thisGame = $(this).data("id");
  addedGameObj = { game: thisGame };
  console.log(addedGameObj);
  $.ajax({
    method: "POST",
    url: "/api/users/games/",
    data: addedGameObj,
    success: function (data) {
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
const signUpCity = $("#signUpCity");
const signUpState = $("#signUpState");
const signUpZip = $("#signUpZip");
const signUpOnlineCheck = $(".onlineGamingCheck");
const signUpButton = $("#signUpBtn");
const signUpForm = $("#signUpForm");
const avatarSelect = $("#avatarSelect");
const avatarSelectImage = $("#avatarSelectImage");
let avatarVal = "/assets/images/blueMeeple.jpg"

function getUserInfo() {
  let online = 0;
  if (signUpOnlineCheck.checked) {
    online = 1;
  }
  let user = {
    email: signUpEmail.val().trim(),
    firstname: signUpFirstname.val().trim(),
    lastname: signUpLastname.val().trim(),
    username: signUpUsername.val().trim(),
    password: signUpPassword.val().trim(),
    city: signUpCity.val().trim(),
    state: signUpState.val().trim(),
    zipcode: signUpZip.val().trim(),
    avatar: avatarVal,
    onlineGaming: online
  };
  return user;
}

avatarSelect.on("change", function (event) {
  avatarSelectImage.attr('src', event.target.value);
  avatarVal = event.target.value;
})


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
      window.location = "/";
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

function generateGroupPage(matchArr) {
  for (let i = 0; i < matchArr.length; i++) {
    let matchHolderDiv = $("<div class='cardHolder col l4 m6 s12'>");
    let matchUserDiv = $("<div class='card groupCard gameCard'>");
    let matchUserImage = $("<img class='card-image gameCardImage'>");
    let matchUserName = $("<h5>");
    let matchUserGames = $("<p>");
    let cardActionDiv = $("<div class='card-action'>");
    let thisUserLink = $(`<a href='/user/${matchArr[i].id}' target='_blank'>`)
    thisUserLink.text("Check their profile");
    matchUserName.text(matchArr[i].username);
    matchUserImage.attr('src', matchArr[i].avatar);
    let gamesStr = ''
    for (let j = 0; j < matchArr[i].games.length; j++) {
      gamesStr += matchArr[i].games[j].name;
      gamesStr += '\n'
    }
    matchUserGames.text(gamesStr);
    matchDiv.append(matchHolderDiv);
    matchHolderDiv.append(matchUserDiv);
    cardActionDiv.append(thisUserLink);
    matchUserDiv.append(matchUserImage, matchUserName, matchUserGames, cardActionDiv);
  }
}

lfgSelect.on("change", event => {
  let choice = event.target.value
  console.log(choice)
  if (choice == 1) {
    $.ajax({
      method: "GET",
      url: "/api/users/onlinegroup",
      success: function (data) {
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
            for (let j = 0; j < matchArr.length; j++) {
              if (matchArr[j].id === hasGamesArr[randoCalrissian].id) {
                alreadyPresent = true;
              }

              for (let g = 0; g < hasGamesArr[randoCalrissian].games.length; g++) {
                if (data.thisUser.games.includes(hasGamesArr[randoCalrissian].games[g])) {
                  gamesinCommon = true;
                }
              }

            }

            if (!alreadyPresent && gamesinCommon) {
              matchArr.push(hasGamesArr[randoCalrissian]);
              i++;

            }
            else if (count > hasGamesArr.length * 2 && !alreadyPresent) {
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
    $.ajax({
      method: "GET",
      url: "/api/users/irlgroup",
      success: function (data) {
        if (data.redirect) {
          window.location.href = data.redirect;
        } else {
          console.log(data);
          let hasGamesCloseArr = data.hasGamesCloseArr;
          console.log(hasGamesCloseArr);
          matchArr.length = 0;
          let count = 0;
          for (let i = 0; i < hasGamesCloseArr.length;) {
            count++;
            let alreadyPresent = false;
            let gamesinCommon = false;
            let randoCalrissian = Math.floor(Math.random() * hasGamesCloseArr.length);
            for (let j = 0; j < matchArr.length; j++) {
              if (matchArr[j].id === hasGamesCloseArr[randoCalrissian].id) {
                alreadyPresent = true;
              }

              for (let g = 0; g < hasGamesCloseArr[randoCalrissian].games.length; g++) {
                if (data.thisUser.games.includes(hasGamesCloseArr[randoCalrissian].games[g])) {
                  gamesinCommon = true;
                }
              }

            }

            if (!alreadyPresent && gamesinCommon) {
              matchArr.push(hasGamesCloseArr[randoCalrissian]);
              i++;

            }
            else if (count > hasGamesCloseArr.length * 2 && !alreadyPresent) {
              matchArr.push(hasGamesCloseArr[randoCalrissian]);
              i++;
            }
          }
          generateGroupPage(matchArr);
        }

      }
    })



  }
})


///////////
//User page scripts
///
const bioText = $(".bioText");
const userBioAlertDiv = $(".userBioAlertDiv")

bioText.on("focusout", function (event) {
  updatedText = bioText.text();
  console.log("changed");
  console.log(updatedText);

  $.ajax({
    method: "PUT",
    url: "/api/users",
    data: { bio: updatedText }
  }).then(data => {
    let message = "Bio Text Updated";
    makeAlertText(userBioAlertDiv, message, 'update')

  })

})

//////////
//Recommendation Script
//

let chosenGame = {}
function recommendGame(data, chosen) {
  console.log(chosen);
  const sameGameUserArr = [];
  let recGame = {}
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].games.length; j++) {
      if (data[i].games[j].id == chosen) {
        sameGameUserArr.push(data[i])
      }
    }

  }
  if (sameGameUserArr.length) {    
    console.log("games in common")
    let randoUser = Math.floor(Math.random() * sameGameUserArr.length)
    let randoGame = Math.floor(Math.random() * sameGameUserArr[randoUser].games.length)
    recGame = sameGameUserArr[randoUser].games[randoGame];
    console.log(recGame.id)
    if(recGame.id == chosen) {      
      recGame = recommendGame(data, chosen);
      return recGame;
    }
    else {
      return recGame;
    }
  }
  else {   
    console.log("no games in common") 
      let randoUser = Math.floor(Math.random() * data.length)
      let randoGame = Math.floor(Math.random() * data[randoUser].games.length)
      recGame = data[randoUser].games[randoGame];
      console.log(recGame);
      if (recGame.id !== chosen) {
        return recGame
      }
      else {
        recGame = recommendGame(data, chosen);
        return recGame
      }

    
  }


}


$("#favoriteGameSelect").on("change", event => {
  chosenGame = event.target.value;
  $("#recommendDiv").empty();

  $.ajax({
    Method: "GET",
    url: '/api/recommendation/' + chosenGame,
  }).then(data => {


    let recGame = recommendGame(data, chosenGame);
    console.log(recGame);
    let recCard = $("<div class='card gameCard'>")
    let cardBody = $("<div class='row'>")
    let secondRow = $("<div class='row card-action gameCard'>")
    let recImage = $("<img class='card-image gameCardImage col s4'>")
    let recTitle = $("<h4 class='col s8'>");
    let recButton = $("<button class='btn-large gameAddButton'>")
    let newIcon = $('<i class="fas fa-puzzle-piece">');
    recButton.html(newIcon);
    recButton.text("Info");
    recImage.attr("src", recGame.image_url);
    recTitle.text(recGame.name);
    $("#recommendDiv").append(recCard);
    recCard.append(cardBody, secondRow);
    cardBody.append(recImage, recTitle);
    secondRow.append(recButton);


  })

});






/////////
//Infinite Scroll Scripts
//
$('.indexContainer').infiniteScroll({
  // options
  path: '/page/{{#}}',
  append: '.cardFeed',
  history: 'push'
});

/////////////
//Materialize Scripts
////////

// Materialize event listener for side-nav on mobile;
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
  $('select').formSelect();
});

