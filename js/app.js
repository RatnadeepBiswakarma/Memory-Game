/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const cards = document.querySelectorAll(".card");
let array = []; // array list that holds all the cards
let openCards = []; // list that holds the two open cards

let moves = 0;
let counter = {
    isTimerRunning: false,
    min: 0,
    sec: 0
}
let matchedCardsNumbers = 0;
let star = 3;

function storeCardsToArray() { // Store all the cards to array variable
    for (i = 0; i < cards.length; i++) {
        array.push(cards[i]);
    }
}
storeCardsToArray();
//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    for (i = 0; i < array.length; i++) {
        $(".deck").append(array[i]);
    }

    return array;
}
shuffle(array);


// function to start the game and flip card
$(".card").on("click", function () {
    $(this).addClass("open show animated flipInY");
    let card = (this);
    openCards.push(card);
    if (counter.isTimerRunning === false) {
        time();
    }
    if (openCards.length == 2) {
        increaseMoves();
        matchCards();
    }
});
// increase move function
function increaseMoves() {
    moves++;
    $(".moves").html(moves);
}
// function after two cards are clicked in the deck
function matchCards() {
    let cardOne = openCards[0];
    let cardTwo = openCards[1];
    let nameOne = $(cardOne).attr("name");
    let nameTwo = $(cardTwo).attr("name");
    if (nameOne === nameTwo) {
        setTimeout(function () {
            openCards = [];
            $(cardOne).removeClass("flipInY");
            $(cardTwo).removeClass("flipInY");
            $(cardOne).addClass("match animated tada");
            $(cardTwo).addClass("match animated tada");
        }, 0);
        matchedCardsNumbers += 2;
        gameWin();
        starGrade();
    } else {

        setTimeout(function () {
            openCards = [];
            $(cardOne).removeClass("open flipInY");
            $(cardTwo).removeClass("open flipInY");
            $(cardOne).addClass("animated shake red");
            $(cardTwo).addClass("animated shake red");
        }, 0);
        setTimeout(function () {
            starGrade();
            $(cardOne).removeClass("shake red open show animated flipInY");
            $(cardTwo).removeClass("shake red open show animated flipInY");
        }, 500);
    }
}

// time function 

let timeoutID;

function time() {
    counter.isTimerRunning = true;
    if (counter.sec === 60) {
        counter.min += 1;
        counter.sec = 0;
    } else {
        counter.sec += 1;
    }
    $("#seconds").html(`${counter.min} : ${counter.sec}`);
    timeoutID = setTimeout(time, 1000);
}
// clear time counting function after the game win
function clearTime() {
    clearTimeout(timeoutID);
    $("#seconds").html(`00 : 00`);
}
// reset event listener
$(".restart").on("click", function () {
    resetGame();
});
// game reset function
function resetGame() {
    for (i = 0; i < array.length; i++) {
        $(".card").removeClass("match animated tada open show shake");
    }
    matchedCardsNumbers = 0;
    openCards = [];
    clearTime();
    shuffle(array);
    stars();
    moves = 0;
    counter.isTimerRunning = false;
    counter.min = 0;
    counter.sec = 0;
    $(".moves").html(0);
    $(".pop__up").css("display", "none");
    $(".container").css("display", "flex");
}
// game win function (to do what will be done after the game is won)
function gameWin() {
    if (matchedCardsNumbers === 16) {
        setTimeout(() => {
            $(".container").css("display", "none");
            $("#final__score").html(`You scored ${star} Star(s) within ${counter.min}:${counter.sec} time taking ${moves} moves.`);
            $(".pop__up").css("display", "block");
            $(".pop__up").addClass("animated zoomIn");
            matchedCardsNumbers = 0;
            clearTime();
        }, 700);
    }
}
// replay button event listener
$("#replay").on("click", function () {
    resetGame();
})
// star grade function
function starGrade() {
    if (moves === 14) {
        $(".three").css("color", "white");
        star = 2;
    } else if (moves === 18) {
        $(".two").css("color", "white");
        star = 1;
    } else if (moves === 25) {
        $(".one").css("color", "white");
        star = 0;
    }
}
// star erase function
function stars() {
    $(".fa-star").css("color", "black");
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */