/*
TODO: add transition animations between questions
count correctly answered questions (score)
at end of quiz, hide questions and show results section with score
add 'new game' button to results section which starts new game
*/

$(document).ready(function() {
  // Objects
  var score = 0;
  var quiz = {
    currentQuestionIndex: 0,
    container: $('#question-box'),
    questionElement: $("#question-p"),
    progressElement: $(".progress"),
    choicesElement: $("ul.choices"),
    resultsElement: $("#results"),
    showPage: function(id) {
      $('section.page').hide();
      $('section.page#'+id).show();
    },
    init: function() {
      this.showPage('intro');
    },
    load: function() {
      this.currentQuestionIndex = 0;
      this.showQuestion();
      this.showPage('question');
    },
    evaluateChoice: function(selectedAnswer) {
      var question = this.questions[this.currentQuestionIndex];
      var clickedButton = $('[data-choice="'+selectedAnswer+'"]');
      if (selectedAnswer === question.answer) {
        clickedButton.addClass('win');
        score++;
      } else {
        clickedButton.addClass('fail');
      }
    },
    /*
    evaluateChoice: function(selectedAnswer) {
      var question = this.questions[this.currentQuestionIndex];
      if (selectedAnswer === question.answer) {
        this.resultsElement.text("Correct!");
      } else {
        this.resultsElement.text("Incorrect!");
      }
    },
    */
    showQuestion: function() {
      var question = this.questions[this.currentQuestionIndex];
      $(this.questionElement).text(question.question);
      for (var i = 0; i < question.choices.length; i++) {
        $('li[data-choice="' + i + '"]', this.choicesElement).text(question.choices[i]);
      }
    },
    moveForward: function() {
      // timeout add class to hide, timeout run, execute move forward, add show class again
      var totalQuestions = quiz.questions.length;
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex > totalQuestions - 1) {
        $('.results-text').text("You answered " + score + " out of 10 questions correctly! Click the button below to play again.");
        this.showPage('results');
        this.currentQuestionIndex = 0;
      }
      this.showQuestion();
      var progress = (this.currentQuestionIndex / totalQuestions) * 100;
      this.progressElement.css("width", progress + "%");
      $('ul.choices li').removeClass('win fail');
    }
  };

  quiz.questions = [{
      // Q1
      question: "三",
      choices: ["に", "さん", "ろく", "じゅう"],
      answer: 1
    },
      // Q2
    {
      question: "四",
      choices: ["し・よん", "いち", "なな・しち", "ご"],
      answer: 0
    },
      // Q3
    {
      question: "九",
      choices: ["はち", "ろく", "さん", "きゅう・く"],
      answer: 3
    },
      // Q4
    {
      question: "七",
      choices: ["いち", "し・よん", "じゅう", "なな・しち"],
      answer: 3
    },
      // Q5
    {
      question: "一",
      choices: ["いち", "ろく", "はち", "ご"],
      answer: 0
    },
      // Q6
    {
      question: "十",
      choices: ["さん", "じゅう", "きゅう・く", "に"],
      answer: 1
    },
      // Q7
    {
      question: "八",
      choices: ["し・よん", "ろく", "はち", "いち"],
      answer: 2
    },
      // Q8
    {
      question: "二",
      choices: ["に", "ご", "よん", "きゅう・く"],
      answer: 0
    },
      // Q9
    {
      question: "五",
      choices: ["ろく", "なな・しち", "ご", "じゅう"],
      answer: 2
    },
      // Q10
    {
      question: "六",
      choices: ["し・よん", "ろく", "いち", "さん"],
      answer: 1
  }];

  // Events
  $("#start").click(function() {
    // timeout remove this.hide, add class then run timeout, then hide and show
    quiz.load();
  });

  $("ul.choices li").click(function() {
    var choiceNumber = $(this).data("choice");
    quiz.evaluateChoice(choiceNumber);
    quiz.container.removeClass('show').addClass('hide');
    function questionDelay() {
      quiz.moveForward();
      quiz.container.removeClass('hide').addClass('show');
    }
    setTimeout(questionDelay, 1200);
  });
  $('#new-game').click(function() {
    quiz.load();
  });

  quiz.init();
});

  // position absolute on one or both containers
