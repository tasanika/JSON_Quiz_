
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


let questions = [
    {
        question : "What does DOB stand for?",
        imgSrc : "img/confused_1.jpg",
        choiceA : "Date of Birth",
        choiceB : "Date of Burial",
        choiceC : "Date of Baptism",
        correct : "A"
    },{
        question : "What does ASAP stand for?",
        imgSrc : "img/confused_2.png",
        choiceA : "A Snicker and Peach",
        choiceB : "As Soon As Possible",
        choiceC : "As Salty Apple Pie",
        correct : "B"
      },{
        question : "What does AWOL stand for?",
        imgSrc : "img/confused_3.png",
        choiceA : "Away without Leave",
        choiceB : "Absent Without Leave",
        choiceC : "Acting Without Leave",
        correct : "B"
    },{
        question : "What does TIA stand for",
        imgSrc : "img/confused_4.png",
        choiceA : "Take it Away",
        choiceB : "That Is Annoying",
        choiceC : "Thanks In Advance",
        correct : "C"

    },{
       question : "What does AKA stand for?",
       imgSrc : "img/confused_5.jpg",
       choiceA : "Also Known As",
       choiceB : "Addtionally Known As",
       choiceC : "All Know As",
       correct : "A"
    },{
       question : "What does TLC stand for",
       imgSrc : "img/confused_6.jpg",
       choiceA : "Take Less Care",
       choiceB : "Top Level Classified",
       choiceC : "Tender Loving Care",
       correct : "C"
     },{
       question : "What does YTD stand for?",
       imgSrc : "img/confused_7.jpg",
       choiceA : "Yearly Target Data",
       choiceB : "Year To Date",
       choiceC : "Yearly Trend Data",
       correct : "B"
     },{
        question : "What does TGIF stand for?",
        imgSrc : "img/confused_8.jpeg",
        choiceA : "Thank God It's Friday",
        choiceB : "Top Grade Information",
        choiceC : "To Go In Front",
        correct : "A"
      },{
        question : "What does BYOB stand for?",
        imgSrc : "img/confused_9.gif",
        choiceA : "Be Your Own Boss",
        choiceB : "Bring Your Own Bottle",
        choiceC : "Buy Your Own Beer",
        correct : "B"
  },{
        question : "What does PPV stand for",
        imgSrc : "img/confused_10.gif",
        choiceA : "Pay Post Vending  ",
        choiceB : "Personal Payment Vendor",
        choiceC : "Pay Per View   ",
        correct : "C"
    }
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}


function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}


function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender(){
    scoreDiv.style.display = "block";

    const scorePerCent = Math.round(100 * score/questions.length);

    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
