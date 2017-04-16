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
    constructor(descText, options, promptText){
        this.descText = descText ? descText : "You may:"; //the text that's displayed before the choices
        this.options = options ? options : null; //array of options. In the format of [description, nextChoice, onChosen];
        this.promptText = promptText ? promptText : "What is your choice?" // the text to display before the input prompt
    }

    //display this choice
    display(){
        if (this.options){
            //use this as a choice

            //generate string to display
            let optionString = "";
            for (let i = 0; i < this.options.length; i++){
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
        else{
            //we're just using this to display a message.
            $inputField.hide();
            $prompt.hide();
            $options.hide();

            $descText.html(this.descText);
        }


    }
}

//used for situations where you need to input a number of things you want.
//An example is when the shopkeeper asks how many oxen you want
class InputValue {
    constructor (descText, min, max, checkFunction, nextChoice, onChosen){
        this.descText = descText; //the text that's displayed before the number input
        this.min = min; //this minimum value accepted
        this.max = max; //the maximum accepted value
        this.checkFunction = checkFunction; //the function to be called to check if the input is valid
        this.nextChoice = nextChoice; //the choice object to be displayed as a result;
        this.onChosen = onChosen; //the function to be called if the input is correct, used to update state variables
    }
}


//example
//no nextChoice or onChosen
let mainChoice = new Choice(null, [
        {
            desc: "Continue on trail",
            nextChoice: null,
            onChosen: null
        },
        {
            desc: "Check supplies",
            nextChoice: null,
            onChosen: null
        },
        {
            desc: "Look at map",
            nextChoice: null,
            onChosen: null
        },
        {
            desc: "Change pace",
            nextChoice: null,
            onChosen: null
        },
        {
            desc: "Change food rations",
            nextChoice: null,
            onChosen: null
        },
        {
            desc: "Stop to rest",
            nextChoice: null,
            onChosen: null
        },
        {
            desc: "Attempt to trade",
            nextChoice: null,
            onChosen: null
        },
        {
            desc: "Talk to people",
            nextChoice: null,
            onChosen: null
        },
        {
            desc: "Buy Supplies",
            nextChoice: null,
            onChosen: null
        },
    ]
);

//example Choice with no options
let exampleBlank = new Choice("Hi, I'm farmer John. Here's an Example of not having any options");