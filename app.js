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
		}
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
		expenseContainer: '.expenses__list'
	};
	
	return {
		getInput: function() {
			//return object with 3 properties
			return {
			type: document.querySelector(DOMstrings.inputType).value,  //will be either inc or exp
			description: document.querySelector(DOMstrings.inputDescription).value,
			value: document.querySelector(DOMstrings.inputValue).value
			}
		}, 
		
		addListItem: function(obj, type) {
			
			var html, newhtml, element;
			//1. create HTML string with placeholder text
			
			if (type === 'inc'){
				element = DOMstrings.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if(type === 'exp') {
				element = DOMstrings.expenseContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			
			//2. replace the placeholder text with some actual data 
			newhtml = html.replace('%id%', obj.id);
			newhtml = newhtml.replace('%description%', obj.description);
			newhtml = newhtml.replace('%value%', obj.value);
			
			//3. insert HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
			
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
	};
	
	var DOM = UICtrl.getDOMstrings();
	
	var ctlrAddItem = function() {
		
		var input, newItem;
		
		//1. get the filed input data
		input = UICtrl.getInput();
		
		//2. add the item to the budget controller
		newItem = budgetCtrl.addItems(input.type, input.description, input.value);
		
		//3. add the item to the UI
		UICtrl.addListItem(newItem, input.type);
		
		//4. clear the fields
		UICtrl.clearFields();
		
		//5. calculate the budget
		
		//6. display the budget on the UI
	};
	
	return {
		init: function() {
			console.log('Application has started.');
			setupEventListener();
		}
	};
	
})(budgetController, UIController);

controller.init();

