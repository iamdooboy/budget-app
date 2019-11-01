//BUDGET CONTROLLER
var budgetController = (function() {
	
	//expense constructor
	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	}
	
	//income contructor
	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}
	
	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	};
	
	var calculateTotal = function(type) {
		var sum = 0;
		data.allItems[type].forEach(function(current) {
			sum += current.value;
		});
		
		data.totals[type] = sum;
	};
	
	return {
		addItems: function(type, dis, val) {
			var newItem, id;
			
			//create new item based on 'inc' or 'exp' type
			if(data.allItems[type].length > 0){
				id = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				id = 0;
			}
			
			
			if(type === 'exp'){
				newItem = new Expense(id, dis, val);
			} else if (type === 'inc'){
				newItem = new Income(id, dis, val);
			}
			
			//push it into our data structure 
			data.allItems[type].push(newItem);
			
			//return the new element
			return newItem;
		},
		
		deleteItem: function(type, id) {
			var ids, index;
			
			var ids = data.allItems[type].map(function(current) {
				return current.id;
			});
			
			index = ids.indexOf(id);
			
			if(index !== -1) {
				data.allItems[type].splice(index, 1);
			}
		},
		
		calculateBudget: function() {
			// calculate total income and expense
			calculateTotal('exp');
			calculateTotal('inc');
			
			// calculate thr budget: income - budget
			data.budget = data.totals.inc - data.totals.exp;
			
			//calculate the percentage of income that we spent
			if(data.totals.inc > 0){
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			}
		},
		
		getBudget: function() {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			}
		},
		
		testing: function() {
			console.log(data)
		}
	};
})();

//UI CONTROLLER
var UIController = (function() {
	
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		expenseLabel: '.budget__expenses--value',
		incomeLabel: '.budget__income--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container'
	};
	
	return {
		getInput: function() {
			//return object with 3 properties
			return {
			type: document.querySelector(DOMstrings.inputType).value,  //will be either inc or exp
			description: document.querySelector(DOMstrings.inputDescription).value,
			value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			}
		}, 
		
		addListItem: function(obj, type) {
			
			var html, newhtml, element;
			//1. create HTML string with placeholder text
			
			if (type === 'inc'){
				element = DOMstrings.incomeContainer;
				html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if(type === 'exp') {
				element = DOMstrings.expenseContainer;
				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			
			//2. replace the placeholder text with some actual data 
			newhtml = html.replace('%id%', obj.id);
			newhtml = newhtml.replace('%description%', obj.description);
			newhtml = newhtml.replace('%value%', obj.value);
			
			//3. insert HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
			
		},
		
		deleteListItem: function(selectorID) {
			var el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);	
		},
		
		clearFields: function() {
			
			var fields, fieldsArr;
			
			//querySelectorAll returns a list
			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
			
			fieldsArr = Array.prototype.slice.call(fields);
			
			fieldsArr.forEach(function(current, index, array) {
				current.value = "";
			});
			
			fieldsArr[0].focus();
		},
		
		displayBudget: function(obj) {
			document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;
			
			
			if(obj.percentage > 0) {
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}
		}, 
		
		getDOMstrings: function() {
			return DOMstrings;
		}
	};
})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
	
	var setupEventListener = function() {
		document.querySelector(DOM.inputBtn).addEventListener('click', ctlrAddItem);
	
		//event listener for pressing enter
		document.addEventListener('keypress', function(event) {
		if(event.keyCode === 13 || event.which === 13) {
		   ctlrAddItem();
		}
		});
		
		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
	};
	
	var DOM = UICtrl.getDOMstrings();
	
	var updateBudget = function() {
			//1. calculate the budget
			budgetCtrl.calculateBudget();
		
			//2. return the budget
			var budget = budgetCtrl.getBudget();
		
			//3. display the budget on the UI
			UICtrl.displayBudget(budget);
	};
	
	var ctlrAddItem = function() {
		
		var input, newItem;
		
		//1. get the filed input data
		input = UICtrl.getInput();
		
		if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
			//2. add the item to the budget controller
			newItem = budgetCtrl.addItems(input.type, input.description, input.value);

			//3. add the item to the UI
			UICtrl.addListItem(newItem, input.type);

			//4. clear the fields
			UICtrl.clearFields();

			//5. calculate the budget
			updateBudget();
		}
		
		
	};
	
	var ctrlDeleteItem = function(event) {
		var itemID, splitID, type, ID;
		
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
		
		if(itemID) {
			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);
			
			//1. delete the item from the data structure
			budgetCtrl.deleteItem(type, ID);
			
			//2. delete the item from the UI
			
			UICtrl.deleteListItem(itemID);
			
			//3. update and show the budget
			updateBudget();
			
		}
	};
	
	return {
		init: function() {
			console.log('Application has started.');
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
			setupEventListener();
		}
	};
	
})(budgetController, UIController);

controller.init();

