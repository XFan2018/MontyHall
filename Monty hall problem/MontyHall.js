  // set a global variable to random the number of the gift
var gift_num = Math.floor(Math.random()*3);
console.log("gift : " + gift_num);

  // the number of the player's choice
var player_choice = null;

  // the unveiled goat door number
var wrong_answer = null;

  // the number of times that you win
var win_count = 0;

// the number of times that you lose
var lose_count = 0;

// short delay time to open the door
var shortDelayTime = 50;

//long delay timeout to open the door
var longDelayTime = 2000;

window.onload = function(){

  // If a image is clicked, call function ShowAWrongOne()
  for (var i = 0; i < $$(".images").length; i++) {
    $$(".images")[i].observe("click", ShowAWrongOne)

    // Give each image a attribute "num" to store their number
    $$(".images")[i].num = i;

    //set the gift image to bugatti.
    if (i == gift_num) {
      $$(".images")[i].img = "bugatti.jpg";

    //set the other two images goats.
    } else {
      $$(".images")[i].img = "goat.jpg";
    }
  }

  // if the player want to switch, call function SwitchDoor, and pass a parameter for the delay time 2000ms
  $('yes').observe('click', function(event){SwitchDoor(longDelayTime)});

  // if the player do not want to switch, call OpenDoor2, to unveil the result
  $('no').observe('click', function(event){OpenDoor2(player_choice, longDelayTime)});

  $('play_again').observe('click', playAgain);
}

// this function is to show the player a wrong choice after they picked up one image, and ask if they will switch
function ShowAWrongOne(){

  // give the player a wrong answer. The wrong answer cannnot be the number of gift and the player's current choice
  var number = Math.floor(Math.random()*3);

  // if the number equals to the gift_num or the player_choice, random another number
  while(number == gift_num || number == this.num){
    number = Math.floor(Math.random()*3);
  }

  // update global variable : wrong_answer
  wrong_answer = number;

// assign player_choice
  player_choice = this.num;

// set the image backgroundColor that the player has picked to #F2EAED
  this.parentNode.style.backgroundColor = "#F2EAED";

// open a random goat door
  OpenDoor(number, shortDelayTime);

// update the prompt
  $('result').innerHTML = "Behind door " + (number + 1) + " is not a gift. Do you want to switch?";
  $('prompt').innerHTML = "You have picked number " + (this.num + 1);

// let the buttons to show up
  for (var i = 0; i < $$('.button').length; i++) {
    $$('.button')[i].style.display = "inline";
  }

// after the click, images are not able to be clicked again.
  for (var j = 0; j < $$(".images").length; j++) {
    $$(".images")[j].stopObserving('click');
  }
}

// oper the door of a given number
function OpenDoor(num,time){
  $$('.images')[num].src = "open_door.jpg";

// after certain time, show the result of the player's choice.
  var timer1 = setTimeout(showResult, time, $$('.images')[num]);
}

// show the wrong image
function showResult(choice){
  choice.src = choice.img;
}

// after a decision of weather to switch, open the door that the player has picked
function OpenDoor2(num, time){
  // hide the buttons
  for (var i = 0; i < $$('.button').length; i++) {
    $$('.button')[i].style.display = "none";
  }

  // hide the result paragraph
  $('result').innerHTML = "";

  // change the hightlighted image to open_door
  $$('.images')[num].src = "open_door.jpg";
  var timer2 = setTimeout(showResult2, time, $$('.images')[num]);
}

// after a decision of weather to switch, show the image
function showResult2(choice){

  // reveil the image, change the src to goat or gift
  choice.src = choice.img;

  // if the player has choose the right answer
  if (choice.num == gift_num) {
    $('prompt').style.color = "purple";
    $('prompt').innerHTML = "Congraduations, You Win!!!"
    win_count++;
    $('win').innerHTML = "you win " + win_count +" times";
  }

  // if the player has choose the wrong answer
  else {
    $('prompt').style.color = "grey";
    $('prompt').innerHTML = "You Lose :("
    lose_count++
    $('lose').innerHTML = "you lose " + lose_count +" times";
  }
}

// function to switch the door
function SwitchDoor(time){

  // unhightlight the current picked image
  $$(".images")[player_choice].parentNode.style.backgroundColor = "transparent";

  // update the player_choice
  player_choice = 3 - wrong_answer - player_choice;

  // hightlight the picked image after player chooses to switch
  $$(".images")[player_choice].parentNode.style.backgroundColor = "#F2EAED";

  // update the prompt
  $('prompt').innerHTML = "You have picked number " + (player_choice + 1);

  // open the door to show the final result
  OpenDoor2(player_choice, time)
}

function playAgain(){
  // update the gift_num
  gift_num = Math.floor(Math.random()*3);
  console.log("gift : " + gift_num);

  // If a image is clicked, call function ShowAWrongOne()
  for (var i = 0; i < $$(".images").length; i++) {
    // change images back to close_door
    $$('.images')[i].src = "close_door.jpg";

    // unhightlight all the images
    $$('.images')[i].parentNode.style.backgroundColor = "transparent";

    //set the gift image to bugatti.
    if (i == gift_num) {
      $$(".images")[i].img = "bugatti.jpg";

    //set the other two images goats.
    } else {
      $$(".images")[i].img = "goat.jpg";
    }

    // add event handler
    $$(".images")[i].observe("click", ShowAWrongOne)
  }

  // change the prompt
  $('prompt').innerHTML = "please pick up a door"
  $('prompt').style.color = "black";
}
