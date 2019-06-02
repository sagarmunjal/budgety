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
        // once we added the publicly exposed method above we now reference the returned object to DOM
        var DOM = UIctrl.getDOMstrings();
        
        
        var ctrlAddItem = function(){
            var input = UIctrl.getInput();
            console.log(input);
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