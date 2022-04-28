//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
const next_btn = document.querySelector("footer .next_btn");
const bottom_question_counter = document.querySelector("footer .total_question");

// other variables required for running
let timeValue = 30;
let question_count = 0;
let question_number = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// assets
var soundCorrect = new Audio("rightsound.mp3");
var soundIncorrect = new Audio("wrongsound.mp3");

// reoccuring functions
const f1 = () => {
    info_box.classList.add("activeInfo"); //show info box
}

const f2 = () => {
    showQuetions(question_count); //calling showQestions function
    questionCounter(question_number); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if startQuiz button clicked
start_btn.onclick = f1;
// if exitQuiz button clicked
exit_btn.onclick = f1;

// if quitQuiz button clicked
quit_quiz.onclick = () => {
    window.location.reload(); //reload the current window
}

// if continueQuiz button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuetions(0);
    questionCounter(1);
    startTimer(30);
    startTimerLine(0);
}

// if restartQuiz button clicked
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue = 30;
    question_count = 0;
    question_number = 1;
    userScore = 0;
    widthValue = 0;
    f2();
}

// if Next Que button clicked
next_btn.onclick = () => {
    if (question_count < questions.length - 1) {
        question_count++;
        question_number++;
        f2();
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

// getting questions and options from array
function showQuetions(index) {
    const question_text = document.querySelector(".question_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let question_tag = `<span>${questions[index].number}. ${questions[index].question}</span>`;
    let option_tag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;
    question_text.innerHTML = question_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//if user clicked on option
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correcAns = questions[question_count].answer;
    const allOptions = option_list.children.length;

    // creating the new div tags which for icons
    let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
    let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

    if (userAns == correcAns) {
        userScore += 1;
        answer.classList.add("correct");
        soundCorrect.play();
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        soundIncorrect.play();
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

function showResult() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 9) {
        let scoreTag = '<span>Wow Awesome! You scored <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 7) {
        let scoreTag = '<span> Good job! You scored <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span>You manage to score <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 56);

    function timer() {
        time += 1;
        time_line.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

function questionCounter(index) {
    let totalQuestionCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p></span>';
    bottom_question_counter.innerHTML = totalQuestionCounTag;
}

window.onscroll = () => {
    let navbarLinks = document.querySelectorAll("nav a");

    scrollpos = window.scrollY;
    navbarLinks.forEach(link => {
        let section = document.querySelector(link.hash);
        if (section.offsetTop <= scrollpos + 150 &&
            section.offsetTop + section.offsetHeight > scrollpos + 150) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    var header = document.getElementById("navbar");
    var sticky = header.offsetTop;

    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}