var name, email;
var myQuestions =[
	{
		question: "1)How many grams of protien is required per lbs body weight",
		answer:{
			a:"2gms",
			b:"3gms",
			c:"5gms",
		},
		correctAnswer: "a",
	},

	{
		question:"2) Which of the following helps in muscle building",
		answer:{
			a:"Protien",
			b:"Fats",
			c:"Carbohydrates",
		},
		correctAnswer: "a",
	},
	{
		question:"3)If you do both weight training and cardio in the same session, which should come first?",
		answer:{
			a:" weight training",
			b:"cardio",
		},
		correctAnswer:"a",
	},
{
	question:"4) Exercise gives you an energy boost?",
	answer:{
		a:" true", 
		b:"false",
	},
	correctAnswer:"a",
}, 
{
	question:"5)	You're stuck with the metabolic rate you're born with?",
	answer:{ 
		a:"true",
		b:" false",
	},
	correctAnswer:"b",
},
	{
	question:"6) If you think you've injured a muscle, immediately apply ice.",
	answer:{
		a:" true", 
		b:"false",
	},
	correctAnswer:"a",
},
	{
		question:"7)Which type of exercise is the best way to burn fat?",
		answer:{
			a:"vigorous",
			b:"moderate",
			c:"it doesn't matter",
		},
		correctAnswer:"a",
	},
 {
	question:"8)Which of the following fruits has the highest content of vitamin C per average serving size?",
	answer:{
		a:"banana",
		b:"kiwi",
		c:"orange",
	},
	correctAnswer:"b",
},
{
   question:"9)For optimal fat burning, immediately prior to long & slow cardio training session, you should eat?",
 	answer:{
		 a:"nothing",
		 b:"simple carbs",
		 c:"complex carbs", 
		 d:" protein & simple carbs",
	 },
	 correctAnswer:"d",
},
{
	question:"10)	For optimal lean muscle mass building, 30 minutes prior to weight training, you should eat?",
	answer:{
		a:"nothing",
		b:"simple carbs",
		c:"complex carbs",
		d:" protein & low-to-moderate GI carbs",
	},
	correctAnswer:"c",
},
	];

function generateQuiz(
	questions,
	quizContainer,
	resultsContainer,
	submitButton
) {
	function showQuestions(questions, quizContainer) {
		// we'll need a place to store the output and the answer choices
		var output = [];
		var answers;

		// for each question...
		for (var i = 0; i < questions.length; i++) {
			// first reset the list of answers
			answers = [];

			// for each available answer to this question...
			for (letter in questions[i].answers) {
				// ...add an html radio button
				answers.push(
					`
                    <label>
						<input class="option" type="radio" name="question${i}" value="${letter}">						
                        <span>${letter}: ${questions[i].answers[letter]}<span>
                    </label>
                    `
				);
			}

			// add this question and its answers to the output

			output.push(
				`
                <div class="question-container">
                    <div class="question">
                        <code>${questions[i].question}</code>
                    </div>
					<div class="answers">
					<form class="options">${answers.join("")}</form>
					</div>
                </div>
                `
			);
		}

		// finally combine our output list into one string of html and put it on the page
		quizContainer.innerHTML = output.join("");
	}

	function showResults(questions, quizContainer, resultsContainer) {
		// gather answer containers from our quiz
		var answerContainers = quizContainer.querySelectorAll(".answers");

		// keep track of user's answers
		var userAnswer = "";
		var numCorrect = 0;

		// for each question...
		for (var i = 0; i < questions.length; i++) {
			// find selected answer
			userAnswer = (
				answerContainers[i].querySelector(
					"input[name=question" + i + "]:checked"
				) || {}
			).value;

			// if answer is correct
			if (userAnswer === questions[i].correctAnswer) {
				// add to the number of correct answers
				numCorrect++;

				// color the answers green
				answerContainers[i].style.color = "green";
			}
			// if answer is wrong or blank
			else {
				// color the answers red
				answerContainers[i].style.color = "red";
			}
		}

		// show number of correct answers out of total
		var score = numCorrect + " out of " + questions.length;
		resultsContainer.innerHTML = score;
		sendEmail(score, name, email, numCorrect, questions.length);
	}

	// show the questions
	showQuestions(questions, quizContainer);

	// when user clicks submit, show results
	document.getElementById("submit").onclick = function () {
		showResults(questions, quizContainer, resultsContainer);
	};
}

var quizContainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");
var startButton = document.getElementById("start-quiz");

startButton.onclick = function () {
	 name = document.getElementById("name").value;
	 email = document.getElementById("email").value;

	const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	// Validation
	if (name !== "" && email !== "") {
		if (EMAIL_REGEX.test(email)) {
			$('#contact-container').hide();
			$('#start-container').hide();
			$('#quiz').show();
			$('#timer').show();
			$('#next').show();

			var sixtyMinutes = 60 * 60,
				display = document.querySelector("#time");
			startTimer(sixtyMinutes, display);
		} else {
			alert("Please Enter a valid Email Address");
			// M.toast({ html: 'Please Enter a valid Email Address' });
		}
	} else {
		alert("Please Enter Your Name and Email to Continue");
	}
};

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function sendEmail(score, name, email, numCorrect, length) {
	var data = new FormData();
	data.append(
		"apikey",
		"55EF3CBB993E80E5B93EB7DB09CF933DFE8AC858FFE5CEDC807B7B860BCBBDF96F09EAEBD2C9166AAF6BE852391ACF5D"
	);
	data.append("subject", "Result: " + score);
	data.append("from", "ryan97singh@gmail.com");
	data.append("fromName", "Singh Fitness");
	data.append("to", `mohitsngh030@gmail.com${email}`);
	data.append("bodyText", `Name: ${name}\nEmail: ${email}`);
	fetch("https://api.elasticemail.com/v2/email/send", {
		method: "POST",
		body: data,
	})
		.then((res) => {
			if (res.status === 200) {
				// alert("Answers Submitted Successfully");
				if (parseInt(numCorrect, 10) >= parseInt(length *0.6, 10)) {
					swal({
						title: "Result: Pass",
						text: score,
						icon: "success",
					}).then(() => {
						location.href = 'http://www.bodybuiulding.com';
					});
				} else {
					swal({
						title: "Result: Fail",
						text: score,
						icon: "error",
					}).then(() => {
						location.href='http://www.bodybuilding.com';
					});
				}
			}
		})
		.catch((err) => console.error(err));
}

function startTimer(duration, display) {
	var timer = duration,
		minutes,
		seconds;
	setInterval(function () {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.textContent = minutes + ":" + seconds;

		if (--timer < 0) {
			document.getElementById("submit").click();
		}
	}, 1000);
}
$(document).ready(function () {
	answers = new Object();
	$('.option').change(function () {
		var answer = ($(this).attr('value'))
		var question = ($(this).attr('name'))
		answers[question] = answer
	})
	var item1 = document.getElementById('question-container');

	var totalQuestions = $('.question-container').length;
	var currentQuestion = 0;
	$questions = $('.question-container');
	$questions.hide();
	$($questions.get(currentQuestion)).fadeIn();
	$('#next').click(function () {
		$('#next').prop('disabled', true);
		$($questions.get(currentQuestion)).fadeOut(function () {
			currentQuestion = currentQuestion + 1;
			$($questions.get(currentQuestion)).fadeIn();
			if (currentQuestion == totalQuestions-1) {
				$('#submit').show();
				$('#next').hide();
			}
			$('#next').prop('disabled', false);
		});

	});
});


function sum_values() {
	var the_sum = 0;
	for (questions in answers) {
		the_sum = the_sum + parseInt(answers[question])
	}
	return the_sum
}
