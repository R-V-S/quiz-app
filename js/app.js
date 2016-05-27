$(document).ready(function() {
  // Objects!
  var quiz = {
    currentQuestionIndex: 0,
    questionElement: $('#question-p'),
    choicesElement: $('ul.choices'),
    resultsElement: $('#results'),
    load: function() {
      this.showQuestion();
    },
    evaluateChoice: function(selectedAnswer) {
      var question = this.questions[this.currentQuestionIndex];
      if (selectedAnswer === question.answer) {
        this.resultsElement.text('correct!');
      } else {
        this.resultsElement.text('FAIL');
      }
    },
    showQuestion: function() {
      var question = this.questions[this.currentQuestionIndex];
      this.questionElement.text(question.question);
      for (var i = 0; i < question.choices.length; i++) {
        $('li[data-choice-number="'+i+'"]', this.choicesElement).text(question.choices[i]);
      }
    },
    moveForward: function() {
      var totalQuestions = quiz.questions.length;
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex > totalQuestions-1) {
        this.currentQuestionIndex = 0;
      }
      this.showQuestion();
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
      choices: ["し　よん", "いち", "なな　しち", "ご"],
      answer: 0
    },
    // Q3
    {
      question: "九",
      choices: ["はち", "ろく", "さん", "きゅう　く"],
      answer: 3
    },
    // Q4
    {
      question: "七",
      choices: ["いち", "し　よん", "じゅう", "なな　しち"],
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
      choices: ["さん", "じゅう", "きゅう　く", "に"],
      answer: 1
    },
    // Q7
    {
      question: "八",
      choices: ["し　よん", "ろく", "はち", "いち"],
      answer: 2
    },
    // Q8
    {
      question: "二",
      choices: ["に", "ご", "よん", "きゅう　く"],
      answer: 0
    },
    // Q9
    {
      question: "五",
      choices: ["ろく", "なな　しち", "ご", "じゅう"],
      answer: 2
    },
    // Q10
    {
      question: "六",
      choices: ["し　よん", "ろく", "いち", "さん"],
      answer: 1
    }];

    // Events!
    $("#start").click(function() {
      $(this).hide();
      $("#intro-container").hide();
      $("#question").show();
      $("#progress-bar").show();
      quiz.load();
    });

    $('ul.choices li').click(function() {
      var choiceNumber = $(this).data('choice-number');
      quiz.evaluateChoice(choiceNumber);
      quiz.moveForward();
    })



});
