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
var x = budgetctrl.Test2
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
UIController.secondTest(500);
UIController.thirdTest(500);
