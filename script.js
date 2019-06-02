var budgetController = (function(){
    var x = 23;
    var add = function(a){
        return x + a;
    }

    return {
        publicTest : function (b){
            return add(b);
        }
    }
})(); 

var uiController = (function(){

    // TOY0003 (cont) - your code goes here below
    var DOMstrings = {
        inputType : ".add__type",
        inputDes : ".add__description",
        inputVal : ".add__value"
    }
    return {
        getInput : function(){
            return {
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDes).value,
                value : document.querySelector(DOMstrings.inputVal).value
            }
        }
    }
    
})();

var appController = (function(budgetCtrl,UIctrl){
        
        
        var ctrlAddItem = function(){
            // 1. Get the field input data
                // TOY0003 - store the DOM strings in uiCtrl module
                var input = UIctrl.getInput();
                console.log(input);

            // 2. Add the item to the budget controller
            // 3. Add the item to the UI
            // 4. Calculate the budget
            // 5. Display the budget on the UI
        }

    // Fetching add button from the DOM and attaching an event listener to it
    // TOY0001 - console lot message "button was pressed" when ever add button is pressed

    document.querySelector('.add__btn').addEventListener("click",ctrlAddItem) 

    // adding event listener to the keypress event => resource(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)
    // TOY0002 - Find out the logic that will be replaced from the if logic below and what logic would be implemented.
    // TOY0002 (cont) - Replace the console.log statement accordingly
    document.addEventListener('keypress',function(e){
        if(e.keyCode === 13 || event.which === 13){
            console.log('enter was pressed')
        }
    })


})(budgetController,uiController)