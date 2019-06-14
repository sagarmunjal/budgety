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

    function calculateTotal(type){
        var sum = 0;
        // 1. forEach loop on the income array 
            data.all[type].forEach(function(current){
                sum += current.value;
            })

        // update data
            data.total[type] = sum;

        // 3. returns the total sum
            return sum
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
        },
        budget : 0,
        percentage:-1
    }
    
    // addExpense is being exported from the budget control module
    return{
        addItem : function(type,description,value){
            var randomId,newInstance
            var randomId = (function (){return `${type}${Math.floor(Math.random()*100000)}`})(type);
            if(type == "exp"){
                newInstance = new Expense(randomId,description,value)
            }else if(type == "inc"){
                newInstance = new Income(randomId,description,value)
            }
            data.all[type].push(newInstance);
            console.log(data)
            return newInstance;
        },
        deleteItem : function(id,type){
            console.log(`delete Item from budget control invoked`)
            // map returns an array 
            // forEach doesnt return an array only operates on each item
            idsArray = data.all[type].map(function(item){
                return item.id
            })
            console.log(idsArray)
            var index = idsArray.indexOf(id)
            data.all[type].splice(index,1)
            console.log(data);
        },
        calculateBudget : function(){
            var budget;
            // 1. calculate total income and expenses
            var budget = calculateTotal('inc')- calculateTotal('exp')
            // 2. calculate the percentage  
            if(data.total.inc > 0){
                data.percentage = Math.round((data.total.exp/data.total.inc) * 100)
                console.log(`${data.percentage}%`)
            }else {
                data.percentage = -1;
            }
            // 3. calculate the budget - income - expenses 
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
        }
    }
})(); 

var uiController = (function(){

    var DOMstrings = {
        inputId : ".add__type",
        inputDes : ".add__description",
        inputVal : ".add__value",
        addButton : ".add__btn",
        incomeContainer : '.income__list',
        expenseContainer : '.expenses__list',
        budgetLabel : ".budget__value",
        incomeLabel : ".budget__income--value",
        expenseLabel : ".budget__expenses--value",
        percentageLabel : ".budget__expenses--percentage",
        container : ".container"
    }
    return {
        getInput : function(){
            var type;
            if(document.querySelector(DOMstrings.inputId).checked == true){
                type = 'inc'
            }else{
                type = 'exp'
            }
            return {
                type : type,
                description : document.querySelector(DOMstrings.inputDes).value,
                value : parseFloat(document.querySelector(DOMstrings.inputVal).value)
            }
        },
        addListItem : function(item,type){
            var html,newHTML,element
            // create HTML string
            if(type == "inc"){
                    element = DOMstrings.incomeContainer
                    html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
           
                }else if(type == "exp"){
                    element = DOMstrings.expenseContainer
                    html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description% </div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }


            newHTML = html.replace('%id%',item.id)
            newHTML = newHTML.replace('%description%',item.description)
            newHTML = newHTML.replace('%value%',item.value)

            // insert HTML into the dome
            // ref - https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML

            document.querySelector(element).insertAdjacentHTML('beforeend',newHTML)

        },
        //TOY0010 - based on the previous commits about DOM updation we are now going to update the following - 
        // cont ... 1. total budget 2. income/expense 3. percentage
        displayBudget :function(obj){
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%'
            }else {
                document.querySelector(DOMstrings.percentageLabel).textContent = "--"
            }
            
        },
        deleteListItem : function (selectorId){
            console.log(`delete UI item invoked`);
            // 1. Get the element ID using getElementById
            var el = document.getElementById(selectorId)
            // 2. use document.removeChild to remove the child element
            el.parentNode.removeChild(el);
        },
        getDOMStrings : function(){
            return DOMstrings
        }
    }
    
})();



var appController = (function(budgetCtrl,UIctrl){
        
        var updateBudget = function(){
            // 1. Calculate the budget
            budgetCtrl.calculateBudget();
            // 2. Return the budget
            var budgetObj = budgetCtrl.getBudget()
            console.log();
            // 3. Display the budget on the UI
            UIctrl.displayBudget(budgetObj);
        }
        
        var ctrlAddItem = function(){
            // 1. Get the field input data
                var input = UIctrl.getInput();
                console.log(input);
            if(input.description && !isNaN(input.value) && input.value > 0){
                // 2. Add the item to the budget controller
                var newItem = budgetCtrl.addItem(input.type,input.description,input.value);
            // 3. Add the item to the UI
                UIctrl.addListItem(newItem,input.type)
            
            // 4. Delete item 

            // 5. Update budget
                
                updateBudget();

            }else{
                console.log('Kindly give some values')
            }

        }
        
        var ctrlDelete = function(event){
            console.log(`control delete invoked`)
            var id
            id = event.target.parentNode.parentNode.parentNode.parentNode.id
            if(id){
                var splitID = id.split('-')
                var type = splitID[0]
                ID = parseInt(splitID[1]);
                console.log(ID,type)

            }else{
                return
            }
            // 1. delete the HTML element from UI
                UIctrl.deleteListItem(id)
            // 2. delete the data record from the database 
                budgetCtrl.deleteItem(ID,type)
            // 3. update the UI 
                updateBudget();
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
            document.querySelector(DOMstrings.container).addEventListener('click',ctrlDelete)
        }

        return {
            init : function(){
                // reset app data to zero
                UIctrl.displayBudget({        
                    budget : 0,
                    totalInc : 0,
                    totalExp : 0,
                    percentage : -1
                });
                setupEventListeners();
            }

        }

})(budgetController,uiController)

appController.init();
