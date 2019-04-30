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
    /* now we are going to write our code in the uiController
    As you know that our code is now being written in an IIFE, so whatever is returned will be immediately assigned to the controller function.

    */

    return {
        getInput : function(){
           var type = document.querySelector('.add__type').value;
        }
    }
    
})

var controller = (function(budgetCtrl,UIctrl){
    var ctrlAddItem = function(){
        // 1. Get the field input data
        // 2. Add the item to the budget controller
        // 3. Add the item to the UI
        // 4. Calculate the budget
        // 5. Display the budget on the UI
        console.log('add Item button pressed')
    }
    document.querySelector('.add__btn').addEventListener("click",ctrlAddItem)

    document.addEventListener('keypress',function(e){
        if(e.keyCode === 13 || event.which === 13){
            console.log('enter was pressed')
        }
    })


})(budgetController,uiController)