/**
 * Created by cferrier on 4/16/2017.
 */
//used for 'choose 1 of X options' choices
//If options is empty, this is just a description text with a continue button

//prepare our DOM selectors
let $descText, $options, $prompt, $inputBox, $inputField, $inputButton;

//hook these up when the page is ready;
$(document).ready(function(){
	$descText = $('#descText');
	$options  = $('#options');
	$prompt = $('#prompt');
	$inputField = $('#inputField');
	$inputButton = $('#inputButton');
});

//A class representing a basic choice
class Choice {
	constructor(descText, options, promptText) {
		this.descText = descText ? descText : "You may:"; //the text that's displayed before the choices
		this.options = options ? options : null; //array of options. In the format of [description, nextChoice, onChosen];
		this.promptText = promptText ? promptText : "What is your choice?"; // the text to display before the input prompt
	}

	//display this choice
	display() {
		//use this as a choice

		//generate string to display
		let optionString = "";
		for (let i = 0; i < this.options.length; i++) {
			const num = i + 1;
			optionString += num + ". " + this.options[i].desc + "<br>";
		}

		//show what we need
		$inputField.show();
		$prompt.show();
		$options.show();


		//set display values
		$inputField.attr("min", 1);
		$inputField.attr("max", this.options.length);
		$descText.html(this.descText);
		$options.html(optionString);
		$prompt.html(this.promptText);

	}

	validateInput(input) {
		let min = 1;
		let max = this.options.length;

		if ($.isNumeric(input) && input >= min && input <= max){
			return true;
		}
		alert ("Enter a value between " + min + " and " + max);
		return false;
	}
}

//used for situations where you need to input a number of things you want.
//An example is when the shopkeeper asks how many oxen you want
class InputValue {
	constructor (descText, promptText, min, max, checkFunction, nextChoice, onChosen){
		this.descText = descText; //the text that's displayed before the number input
		this.promptText = promptText ? promptText : "How many do you want?";
		this.min = min ? min : 0; //this minimum value accepted
		this.max = max ? max : Infinity; //the maximum accepted value
		this.checkFunction = checkFunction ? checkFunction : function(){return true}; //the function to be called to check if the input is valid
		this.nextChoice = nextChoice; //the choice object to be displayed as a result;
		this.onChosen = onChosen ? onChosen : function(){}; //the function to be called if the input is correct, used to update state variables
	}

	display(){

		//show what we need
		$inputField.show();
		$prompt.show();
		$options.hide();

		//set display values
		$inputField.attr("min", this.min);
		$inputField.attr("max", this.max);
		$descText.html(this.descText);
		$prompt.html(this.promptText);

	}

	//TODO maybe this just uses the $inputField variable instead of being passed in?
	validateInput(input){
		if (this.checkFunction(input)){
			if (input >= this.min && input <= this.max){
				return true;
			}
			else
			{
				alert ("Enter a value between " + this.min + " and " + this.max);
				console.log("Input was greater than min or less than max");
			}
		}

		console.log("Input failed check function");
		return false;
	}
}

//A class representing no choice, where the user can only continue
class Continue {
	constructor(descText, nextChoice, onChosen){
		this.descText = descText;
		this.nextChoice = nextChoice;
		this.onChosen = onChosen ? onChosen : function(){};
	}

	//always return true, there's no input
	validateInput(input){
		return true;
	}

	display() {
		//we're just using this to display a message.
		$inputField.hide();
		$prompt.hide();
		$options.hide();
		$descText.html(this.descText);
	}
}




//example
//no nextChoice or onChosen
let mainChoice = new Choice(null, [
		{
			desc: "Continue on trail",
			nextChoice: null,
			onChosen: function(){alert("You chose continue")}
		},
		{
			desc: "Check supplies",
			nextChoice: null,
			onChosen: function(){alert("You chose check supplies")}
		},
		{
			desc: "Look at map",
			nextChoice: null,
			onChosen: function(){alert("You chose look at map")}
		},
		{
			desc: "Change pace",
			nextChoice: null,
			onChosen: function(){alert("You chose change pace")}
		},
		{
			desc: "Change food rations",
			nextChoice: null,
			onChosen: function(){alert("You chose change food rations")}
		},
		{
			desc: "Stop to rest",
			nextChoice: null,
			onChosen: function(){alert("You chose stop to rest")}
		},
		{
			desc: "Attempt to trade",
			nextChoice: null,
			onChosen: function(){alert("You chose attempt to trade")}
		},
		{
			desc: "Talk to people",
			nextChoice: null,
			onChosen: function(){alert("You chose talk to people")}
		},
		{
			desc: "Buy Supplies",
			nextChoice: null,
			onChosen: function(){alert("You chose buy supplies")}
		}
	]
);

//example of an inputValue choice
let buyingYoke  = new InputValue("There are 2 Oxen in a yoke! I recommend at least 3 yoke. I charge $40 a yoke.",
	"How many yoke do you want?", 1, 9,
	function(input){
		if (input * 40 <= party.supplies.money){
			return true;
		}
		else
		{
			alert("You don't have enough money for this transaction");
			return false;
		}
	},
	mainChoice,
	function(input){
		party.supplies.money -= (input * 40);
		party.supplies.oxen += input;
		alert("You now have " + party.supplies.oxen + " Oxen and $" + party.supplies.money);
	});


//example Choice with no options
let exampleBlank = new Continue("Hi, I'm farmer John. Here's an Example of not having any options",
	buyingYoke,
	function(){
		alert ("Continuing to buying yoke as an example")
	}
);
