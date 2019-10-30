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
	
	document.querySelector('add__btn').addEventListener('click', function() {
		console.log('button was clicked');
	});
	
})(budgetController, UIController);

