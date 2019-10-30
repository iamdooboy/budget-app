//BUDGET CONTROLLER
var budgetController = (function() {
	
//	var x  = 23;
//	
//	var add = function(a) {
//		return x + a;
//	}
//	
//	return{
//		publicTest: function(b) {
//			return add(b);
//		}
//	}
	
	
})();

//UI CONTROLLER
var UIController = (function() {
	
})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
	
	var ctlrAddItem = function() {
		//1. get the filed input data
		
		//2. add the item to the budget controller
		
		//3. add the item to the UI
		
		//4. calculate the budget
		
		//5. display the budget on the UI
	}
	
	document.querySelector('add__btn').addEventListener('click', ctlrAddItem);
	
	//pressing enter
	document.addEventListener('keypress', function(event) {
		if(event.keyCode === 13 || event.which === 13) {
		   ctlrAddItem();
		}
	});
	
})(budgetController, UIController);

