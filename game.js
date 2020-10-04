const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions =  [
  {
    question: "Who looked after the coats of the men who stoned Stephen?",
    choice1: "Peter",
    choice2: "Saul",
    choice3: "Gamaliel",
    choice4: "Joseph",
    answer: 2
  },
  {
    question: "On what day did the apostles receive the Holy Spirit?",
    choice1: "Day of Pentecost",
    choice2: "Day of Atonement",
    choice3: "Passover",
    choice4: "Day of Anointing",
    answer: 1
  },
  {
    question: "Which Pharisee said that if the gospel truly comes from God, no-one will be able to stop it spreading?",
    choice1: "Paul",
    choice2: "Nicodemus",
    choice3: "Theudas",
    choice4: "Gamaliel",
    answer: 4
  },
  {
    question: "Who was appointed to replace Judas Iscariot as a disciple?",
    choice1: "Joseph",
    choice2: "Matthias",
    choice3: "Barnabas",
    choice4: "Barsabas",
    answer: 2
  },
  {
    question: "Who wrote the book of Acts?",
    choice1: "Matthew",
    choice2: "Mark",
    choice3: "Luke",
    choice4: "John",
    answer: 3
  },
  {
    question: "Towards which city was Saul travelling when he encountered a light from heaven?",
    choice1: "Jerusalem",
    choice2: "Damascus",
    choice3: "Tarsus",
    choice4: "Antioch",
    answer: 2
  },
  {
    question: "By what name was the disciple Tabitha also known?",
    choice1: "Lydia",
    choice2: "Priscilla",
    choice3: "Claudia",
    choice4: "Dorcas",
    answer: 4
  },
  {
    question: "What was Paul’s profession?",
    choice1: "Tentmaker",
    choice2: "Carpenter",
    choice3: "Fisherman",
    choice4: "Soldier",
    answer: 1
  },
  {
    question: "Why were the masters of the soothsayer in Acts 16 unhappy with Paul and Silas?",
    choice1: "Paul cursed her with an evil spirit",
    choice2: "Paul took the girl with him on his travels",
    choice3: "Paul commanded the spirit of divination to leave her",
    choice4: "Paul had the girl thrown in prison",
    answer: 3
  },
  {
    question: "What was the name of the prophet who prophecied that Paul would be bound at Jerusalem?",
    choice1: "Claudius",
    choice2: "Agabus",
    choice3: "Aquila",
    choice4: "Philip",
    answer: 2
  },
  {
    question: "Which book of prophecy was the Ethiopian eunuch reading from?",
    choice1: "Isaiah",
    choice2: "Jeremiah",
    choice3: "Ezekiel",
    choice4: "Daniel",
    answer: 1
  },
  {
    question: "Which gods did the people of Lystra think Paul and Barnabas were?",
    choice1: "Jupiter and Mercury",
    choice2: "Apollo and Mars",
    choice3: "Saturn and Janus",
    choice4: "Pluto and Bacchus",
    answer: 1
  },
  {
    question: "What misfortune did Paul encounter on the way to Rome?",
    choice1: "Tornado",
    choice2: "Accident",
    choice3: "Illness",
    choice4: "Shipwrecked",
    answer: 4
  },
  {
    question: "What was the name of the centurion who looked after Paul on the journey to Rome?",
    choice1: "Julius",
    choice2: "Augustus",
    choice3: "Tertius",
    choice4: "Quartus",
    answer: 1
  },
  {
    question: "What came out of the fire Paul made on Melita?",
    choice1: "Locust",
    choice2: "Hedgehog",
    choice3: "Viper",
    choice4: "Salamander",
    answer: 3
  },
  {
    question: "The field that Judas Iscariot purchased with his betrayal money was called Aceldama, but as what was it also known?",
    choice1: "Field of Bones",
    choice2: "Field of Blood",
    choice3: "Field of Iniquity ",
    choice4: "Field of Sin",
    answer: 2
  },
  {
    question: "What nationality was Timothy’s father?",
    choice1: "Jewish",
    choice2: "Roman",
    choice3: "Greek",
    choice4: "Egyptian",
    answer: 3
  },
  {
    question: "What was the name of the young man who fell out of the window during one of Paul’s speeches?",
    choice1: "Philemon",
    choice2: "Tychicus",
    choice3: "Eutychus",
    choice4: "Onesimus",
    answer: 3
  },
  {
    question: "What was the name of the first Gentile convert to Christianity?",
    choice1: "Paul",
    choice2: "Agabus",
    choice3: "Simon",
    choice4: "Cornelius",
    answer: 4
  },
  {
    question: "Who made this statement “Lord Jesus, receive my spirit.”",
    choice1: "Paul",
    choice2: "Timothy",
    choice3: "Stephen",
    choice4: "Silvanus",
    answer: 3
  }  

  // {
  //   question: "How many authors wrote the Bible?",
  //   choice1: "27 authors",
  //   choice2: "66 authors",
  //   choice3: "40 authors",
  //   choice4: "37 authors",
  //   answer: 3
  // },
  // {
  //  question: "And thou shall call his name Jesus... Who is this quotation talking to?",
  //   choice1: "Emmanuel",
  //   choice2: "Joseph",
  //   choice3: "Mary",
  //   choice4: "Jesus",
  //   answer: 2
  // },
  // {
  //   question: "Who wrote the book of Acts of the Apostle",
  //   choice1: "Moses",
  //   choice2: "Paul the Apostle",
  //   choice3: "John the Beloved",
  //   choice4: "Luke",
  //   answer: 4
  // },
  // {
  //   question: "Who is the Father of Enoch",
  //   choice1: "Methuselah",
  //   choice2: "Jared",
  //   choice3: "Elimelech",
  //   choice4: "Lamech",
  //   answer: 2
  // },
  // {
  //  question: "Who join Paul and Barnabas in the their initial missionary journey?",
  //   choice1: "Silas",
  //   choice2: "John",
  //   choice3: "Matthew",
  //   choice4: "Mark",
  //   answer: 2
  // },
  // {
  //   question: "Who wrote the epistle to the Colossians",
  //   choice1: "Moses",
  //   choice2: "Paul the Apostle",
  //   choice3: "John the Beloved",
  //   choice4: "Luke",
  //   answer: 2
  // },
  // {
  //   question: "Jesus spent how many years for his earthly ministry",
  //   choice1: "40 years",
  //   choice2: "35 years",
  //   choice3: "45 years",
  //   choice4: "33 years",
  //   answer: 4
  // },
  // {
  //  question: "My grace is sufficient unto your... Who is this quotation talking to?",
  //   choice1: "Emmanuel",
  //   choice2: "Joseph",
  //   choice3: "Mary",
  //   choice4: "Paul the Apostle",
  //   answer: 4
  // },
  // {
  //   question: "I will come and heal him... who said this?",
  //   choice1: "Jesus Christ",
  //   choice2: "Paul the Apostle",
  //   choice3: "John the Beloved",
  //   choice4: "Luke",
  //   answer: 1
  // },
  // {
  //   question: "For the time would fail to me tell of... whose name is to be first in that list?",
  //   choice1: "Barrak",
  //   choice2: "Gideon",
  //   choice3: "Samson",
  //   choice4: "Jephthah",
  //   answer: 2
  // }
];

// fetch("questions.json")
  // .then(res => {
  //   return res.json();
  // })
  // .then(loadedQuestions => {
  //   console.log(loadedQuestions.results);
  //   questions = loadedQuestions.results.map(loadedQuestion => {
  //     const formattedQuestion = {
  //       question: loadedQuestion.question
  //     };

  //     const answerChoices = [...loadedQuestion.incorrect_answers];
  //     formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
  //     answerChoices.splice(
  //       formattedQuestion.answer - 1,
  //       0,
  //       loadedQuestion.correct_answer
  //     );

  //     answerChoices.forEach((choice, index) => {
  //       formattedQuestion["choice" + (index + 1)] = choice;
  //     });

  //     return formattedQuestion;
  //   });
  //   startGame();
  // })
  // .catch(err => {
  //   console.error(err);
  // });
  

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 20;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question; 

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    // console.log(availableQuestions);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;
  
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

      const classToApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
      
      if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
      }, 500);


      getNewQuestion();
    });
  });

  incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };

  startGame();