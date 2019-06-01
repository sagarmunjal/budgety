var budgetController = (function U(){
    var total = 0;
    var add = function(a){
        total = total + a ;
        console.log(total);
    }
    var subtract = function(b){
        total = total - b ;
        console.log(total);
    }
    return {
        Test: function(c){
            console.log(add(c));
        },
        Test2: function(d){
            console.log(subtract(d));
        }
         
    }
})();

var UIController = (function (budgetctrl){
var z = budgetctrl.Test;
var x = budgetctrl.Test2;
return{
    secondTest: function(c){
        console.log(z(c));
    },
    thirdTest: function(d){
        console.log(x(d));
    }
}
}
)(budgetController);

var budgetApp = (function (e,f){
    var addition = e.Test;
    var additionUI = f.secondTest;
    var subtraction = e.Test2;
    var subtractionUI = f.thirdTest;
    //need to use dom get element by id & add event listener but dunno where 
    return {
        addTest: function(c){
            console.log(addition(c));
        },
        subTest:function(d){
            console.log(subtraction(d));
        },
        addUI: function(c){
            console.log(additionUI(c))
            
        },
        subUI: function(d){
            console.log(subtractionUI(d))
        }
}
})(budgetController,UIController)

budgetApp.addTest(500);
budgetApp.subUI(500);
