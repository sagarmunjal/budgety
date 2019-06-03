var budgetController = (function(){

    // Constructor functions 
    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var exampleExpense = new Expense('001',`trip`,15000);

    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var exampleIncome = new Income('002',`tscJS27`,7000);

    // Defining data structures for our data
    // not the best practice
    var allExpense = []
    var allIncome = []
    var totalExpenses = 0;
    var totalIncome = 0;
    

    return{
        exampleExpense,exampleIncome
    }
})(); 

var uiController = (function(){

    var DOMstrings = {
        inputType : ".add__type",
        inputDes : ".add__description",
        inputVal : ".add__value",
        addButton : ".add__btn"
    }
    return {
        getInput : function(){
            return {
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDes).value,
                value : document.querySelector(DOMstrings.inputVal).value
            }
        },
        
        getDOMStrings : function(){
            return DOMstrings
        }
    }
    
})();

var appController = (function(budgetCtrl,UIctrl){
        
        
        var ctrlAddItem = function(){
            // 1. Get the field input data
                var input = UIctrl.getInput();
                console.log(input);

            // 2. Add the item to the budget controller
                console.log(budgetCtrl.exampleExpense)
                console.log(budgetController.exampleIncome)

            // 3. Add the item to the UI
            // 4. Calculate the budget
            // 5. Display the budget on the UI
        }

    // app controller has an initialisation function
        var setupEventListeners = function (){
            var DOMstrings = UIctrl.getDOMStrings();
            // Fetching add button from the DOM and attaching an event listener to it

            document.querySelector(DOMstrings.addButton).addEventListener("click",ctrlAddItem) 

            // adding event listener to the keypress event => resource(https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)
            document.addEventListener('keypress',function(e){
                if(e.keyCode === 13 || event.which === 13){
                    ctrlAddItem();
                }
            })
        }

        return {
            init : setupEventListeners
        }

})(budgetController,uiController)

// TOY0005 - explain the initialization function and its purpose and importance.
// also explain what will happen if we remove the "appController.init()" function
appController.init();

// TOY0006 - creating constructor functions 

function Person(name,age){
    this.age = age;
    this.name = name
}

var joseph = new Person("joseph",55);
console.log(joseph);