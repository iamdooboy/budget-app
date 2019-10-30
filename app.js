//BUDGET CONTROLLER
var budgetController = (function() {
	
	//expense constructor
	var Expense = function(id, description, value){
		this.id = id;
		this.descrtion = description;
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
	}
})();

//UI CONTROLLER
var UIController = (function() {
	
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
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
		//1. get the filed input data
		var input = UICtrl.getInput();
		
		//2. add the item to the budget controller
		
		//3. add the item to the UI
		
		//4. calculate the budget
		
		//5. display the budget on the UI
	};
	
	return {
		init: function() {
			console.log('Application has started.');
			setupEventListener();
		}
	};
	
})(budgetController, UIController);

controller.init();

