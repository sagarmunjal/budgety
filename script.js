var budgetController = (function(){

    // Constructor functions 
    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }


    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }


    // good practice to have a good data structure rather than variables just laying around 
    // or another options is 

    var data = {
        all : {
            exp : [],
            inc : []
        },
        total : {
            exp : 0,
            inc : 0
        }
    }
    // TOY0008 - solution
    // TOY0008 - here addExpense is being exported from the budget control module, however we are manually passing in the arguments to the constructor function. 
    // TOY0008 (cont) - how can you connect the constructor function with the data that we are getting on button click "addCtrlItem" in UIController 
    return{
        addItem : function(type,description,value){
            var randomId,newInstance
            var randomId = (function (){return Math.floor(Math.random()*100000)})();
            if(type == "exp"){
                newInstance = new Expense(randomId,description,value)
            }else if(type == "inc"){
                newInstance = new Income(randomId,description,value)
            }
            data.all[type].push(newInstance);
            console.log(data)
            return newInstance;
        }
    }
})(); 

var uiController = (function(){

    var DOMstrings = {
        inputId : ".add__type",
        inputDes : ".add__description",
        inputVal : ".add__value",
        addButton : ".add__btn"
    }
    return {
        getInput : function(){
            var type;
            if(document.querySelector(".add__type").checked == true){
                type = 'inc'
            }else{
                type = 'exp'
            }
            return {
                type : type,
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
                budgetCtrl.addItem(input.type,input.description,input.value);
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


appController.init();
