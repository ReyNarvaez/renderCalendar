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

	var startDate = jQ("#startDate").val();
	var numDays = jQ("#numDays").val();
	var countryCode = jQ("#countryCode").val();

	var startDate = moment(startDate);

	var newCalendar = null;
	var monthHeader = null;
	var currentMonth = null;
	var tbody = null;

	var numMonths = Math.ceil(moment(startDate).add("days",50).diff(startDate,"months",true));
	
	var tr = null;
	var td = null;

	for(var count = 0; count < numMonths; count++){

		newCalendar = document.getElementById("calendarContainer").cloneNode(true);
		monthHeader = newCalendar.getElementsByClassName("monthHeader")[0];
		monthHeader.innerHTML = startDate.format('MMMM');

		currentMonth = startDate.format('MMMM');

		numMonths = Math.ceil(moment(startDate).add("days",50).diff(startDate,"months",true));

		tbody = newCalendar.getElementsByTagName("tbody")[0];

		for(var i = 0; i < 5; i++){

			tr = document.createElement("tr");
			tr.scope = "row";

			for(var j = 0; j < 7; j++){

				td = document.createElement("td");			
				td.innerHTML = "&nbsp;";
				td.className = "invalidday";

				if(j == startDate.weekday() && currentMonth == startDate.format('MMMM')){

					td.innerHTML = startDate.format("DD");

					if(!startDate.isHoliday()){

						if(j > 0 && j < 6){

							td.className = "weekday";
						}
						else{

							td.className = "weekend";
						}
					}
					else{

						td.className = "holiday";
					}

					startDate.add("days",1);
				}

				tr.appendChild(td);
			}

			tbody.appendChild(tr);
		}

		document.body.appendChild(newCalendar);
	}
}