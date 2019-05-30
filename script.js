var budgetController = (function U(){
    var total = 100000;
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

var UIController = (function budgetctrl(){
var z = budgetctrl.Test;
var x = budgetctrl.Test2
return{
    secondTest: function(){
        console.log(z);
    },
    thirdTest: function(){
        console.log(x);
    }
}
}
)(budgetController);
UIController.secondTest(500);
UIController.thirdTest(500);
