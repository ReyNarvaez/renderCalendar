var jQ = jQuery.noConflict();

var calendarIndex = 0;
var numMonths = 0;

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

		resetCalendar();
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

	var startDate = jQ("#startDate").val();
	var numDays = parseInt(jQ("#numDays").val());
	var countryCode = jQ("#countryCode").val();

	var startDate = moment(startDate);

	var newCalendar = null;
	var monthHeader = null;
	var currentMonth = null;
	var tbody = null;

	numMonths = Math.ceil(moment(startDate).add("days",numDays).diff(startDate,"months",true));

	var tr = null;
	var td = null;

	var totalDays = 0;

	for(var count = 0; count < numMonths; count++){

		newCalendar = document.getElementById("calendarContainer").cloneNode(true);
		monthHeader = newCalendar.getElementsByClassName("monthHeader")[0];
		monthHeader.innerHTML = startDate.format('MMMM')  + " " + startDate.format('YYYY');

		currentMonth = startDate.format('MMMM');

		tbody = newCalendar.getElementsByTagName("tbody")[0];

		newCalendar.id = "calendar" + count;

		for(var i = 0; i < 5; i++){

			tr = document.createElement("tr");
			tr.scope = "row";

			for(var j = 0; j < 7; j++){

				td = document.createElement("td");			
				td.innerHTML = "&nbsp;";
				td.className = "invalidday";

				if(j == startDate.weekday() && (totalDays < numDays + 1) && currentMonth == startDate.format('MMMM')){

					totalDays++;

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

	if(numMonths > 1){

		jQ("#calendarControls").show(300);
	}

	jQ("#calendar0").show(300);
}

function showCalendar(index){

	if(document.getElementById("calendar" + index) != null){

		jQ("#calendar" + calendarIndex).hide(150);
		jQ("#calendar" + index).show(300);

		calendarIndex = index;
	}
}

jQ("#leftBtn").on("click",function(e){
	
	var newIndex = calendarIndex - 1;
	showCalendar(newIndex);
});

jQ("#rightBtn").on("click",function(e){
	
	var newIndex = calendarIndex + 1;
	showCalendar(newIndex);
});

function resetCalendar(){

	jQ("#calendarControls").hide();

	for(var i = 0; i < numMonths; i++){

		jQ("#calendar" + i).remove()
	}

	calendarIndex = 0;
}