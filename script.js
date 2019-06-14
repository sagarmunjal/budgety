

/* Info 
=== BudgetController & UIController have public modules which are then used by AppController. 
*/ 

//1.BudgetController
var BudgetController = (function (){
var Expense = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
}

var Income =  function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
}
function calculateTotal(type){
    var sum = 0;
    data.all[type].forEach(function(current){
        sum += current.value;
    })
    data.total[type] = sum;
    return sum;
}

var data = {
    all : {
        exp : [],
        inc : []
    },
    total : {
        exp : 0,
        inc : 0
    },
    budget :0,
    percentage : -1
}
return{
    addItem : function(type,description,value){
        var ranId,newInst
        var ranId = (function (){return Math.floor(Math.random()*100000)})();
        if(type=="inc"){
            newInst = new Income(ranId,description,value);
        }
        else if(type=="exp"){
            newInst = new Expense(ranId,description,value);
        }
        data.all[type].push(newInst);
        console.log(data);
        return newInst;
        },
    calculateBudget : function(){
        var budget;
        budget = calculateTotal('inc') - calculateTotal('exp');
        if(data.total.inc > 0){
        data.percentage = Math.round((data.total.exp/data.total.inc) * 100);
        console.log(`${data.percentage}%`);
        }else{
            data.percentage = -1;
        }
        data.budget = budget;
        return budget;
    },
    getBudget : function(){
        return {
            budget : data.budget,
            totalInc : data.total.inc,
            totalExp : data.total.exp,
            percentage : data.percentage
        }
    },
    deleteItem : function(type,id){
        var IDarr = data.all[type].map(function(item){
            return item.id;})
        var index = IDarr.indexof(id);
        console.log(data[type]);
    }
}
})();
//2.UIController
var UIController = (function (app){
// apply the DRY principle here and replace the repeated values by variables declared below
var DOMstrings = {
    inputType : ".add__type",
    inputDes : ".add__description",
    inputVal : ".add__value",
    addButton : ".add__btn",
    incomeContainer : ".income__list",
    expenseContainer : ".expenses__list",
    budgetLabel : ".budget__value",
    incomeLabel : ".budget__income--value",
    expenseLabel : ".budget__expenses--value",
    percentageLabel : ".budget__expenses--percentage",
    container : ".container",
    delete : ".item__delete--btn"
}
// UIController returns multiple pairs of public methods accessible to AppController
    return {
        getInput: function(){
            var type;
            if(document.querySelector(DOMstrings.inputType).checked == true){
                type = 'inc'
            }
            else{
                type = 'exp'
            }
            return {
                type: type,
                description:document.querySelector(DOMstrings.inputDes).value,
                value:parseFloat(document.querySelector(DOMstrings.inputVal).value)
            }
        },
        addListItem: function(item,type){
            var html,newHTML,element
            if(type=='inc'){
                element = DOMstrings.incomeContainer
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if(type == 'exp'){
                element = DOMstrings.expenseContainer
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description% </div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            newHTML = html.replace('%id%',item.id)
            newHTML = newHTML.replace('%description%',item.description)
            newHTML = newHTML.replace('%value%',item.value)
            document.querySelector(element).insertAdjacentHTML("beforeend",newHTML)
        },
        displayBudget : function(obj){
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp
            if(obj.percentage > 0){
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%'
            }
            else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '--'
            }
        },
        deleteItem : function(){
            
        },
        getDOMstrings : function(){
            return DOMstrings;
        }
    }
})();
//3.AppController
/*

*/
var AppController = (function (budgetCtrl,uiCtrl){
    var len = data.all[type] - 1;
    var updateBudget = function(){
        budgetCtrl.calculateBudget();
        var budgetObj = budgetCtrl.getBudget();
        uiCtrl.displayBudget(budgetObj);
    }
    var ctrlAddItem = function(){
        var input = uiCtrl.getInput();
        console.log(input);
        //input.description what is if condition
        if(input.description && !isNaN(input.value) && input.value > 0){
        var newItem = budgetCtrl.addItem(input.type,input.description,input.value);
        uiCtrl.addListItem(newItem,input.type);
        updateBudget();
    }
    else{
        console.log('give values');
    }
}
    var ctrlDelete = function(event){
        //parent node etc?
        console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);
        var ID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        var splitter = ID.split("-");
        console.log(splitter);
        Type = splitter[0];
        type = Type.substring()
        id = splitter[1];
        uiCtrl.deleteItem();
        budgetCtrl.deleteItem();
    }
    var setupEventListeners = function(){
        var DOMstrings = uiCtrl.getDOMstrings();
        document.querySelector(DOMstrings.addButton).addEventListener("click",ctrlAddItem);
        document.querySelector(DOMstrings.delete).addEventListener("click",ctrlDelete);
        document.addEventListener('keypress',function(e){
            if(e.keyCode === 13 || event.which === 13){
                ctrlAddItem;
            }
        })
        document.querySelector(DOMstrings.container).addEventListener('click',ctrlDelete);
    }
    return{
        init: function(){
        uiCtrl.displayBudget({
            budget : 0,
            totalInc : 0,
            totalExp : 0,
            percentage : -1
        });
        setupEventListeners();
    }
}      
    
})(BudgetController,UIController);

AppController.init();
