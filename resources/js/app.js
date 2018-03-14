var jQ = jQuery.noConflict();

jQ(document).ready(function(){  
	
	jQ('#startDate').daterangepicker(
	{
		language:'en',
		singleDatePicker: true,
	    showDropdowns: true,
	});
});

jQ("#startDate").on("keydown",function(e){
	
	e.preventDefault();
});

jQ("#renderBtn").on("click",function(e){
	
	if(isFormValid()){
		
		renderCalendar();
	}
});

function isFormValid(){

	var formInputs = jQ("#appForm").find("input");

	for(var i = 0; i < formInputs.length; i++){

		if(formInputs[i].value == ""){

			return false;
		}
	}

	return true;
}

function renderCalendar(){

	console.log("render calendar");
}