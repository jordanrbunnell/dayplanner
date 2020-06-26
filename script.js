$(document).ready(function() {
  
    // planner flag
    const planner = false;
  
    // Current date and time
    var now = moment().format('MMMM Do YYYY, h:mm:ss a');
  
    // commented out for planner in non-standard hours
    var hour24 = moment().format('H');
    var hour12 = moment().format('h');
  
  
    var $dateHeading = $('#navbar-subtitle');
    $dateHeading.text(now);
// Set cariable for local storage access
    var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

    if (planner) { console.log(storedPlans); }

    if (storedPlans !== null) {
        planTextArr = storedPlans;
      } else {
        // Run on first use
        planTextArr = new Array(9);
        planTextArr[4] = "Bigfoot Sighting";
      }
    
      if (planner) { console.log("full array of plned text",planTextArr); }
    
      // set variable referencing planner element
      var $plannerDiv = $('#plannerContainer');
      // clear existing elements
      $plannerDiv.empty();
    
      if (planner) { console.log("current time",hour12); }

 for (var hour = 6; hour <= 24; hour++) {
    // index for array use offset from hour
    var index = hour - 12;
    
    //  row components
    var $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.addClass('plannerRow');
    $rowDiv.attr('hour-index',hour);
  
    //  TimeBox row
    var $col2TimeDiv = $('<div>');
    $col2TimeDiv.addClass('col-md-2');
  
    // (contains time)
    const $timeBoxSpn = $('<span>');
    // can use this to get value
    $timeBoxSpn.attr('class','timeBox');
    
    // format hours for display
    var displayHour = 0;
    var ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
    } else {
      displayHour = hour;
    }

    // format AM and PM to reflect correctly
    if (hour >= 12) { 
        ampm = "pm";
      } 
      if(hour < 12 || hour == 24)  {
        ampm = "am";
      }


    // populate timeBox with time
    $timeBoxSpn.text(`${displayHour} ${ampm}`);

    // insert into col inset into timebox
    $rowDiv.append($col2TimeDiv);
    $col2TimeDiv.append($timeBoxSpn);
    
    //  row components
    var $dailyPlanSpn = $('<input>');

    $dailyPlanSpn.attr('id',`input-${index}`);
    $dailyPlanSpn.attr('hour-index',index);
    $dailyPlanSpn.attr('type','text');
    $dailyPlanSpn.attr('class','dailyPlan');

    // access index from data array for hour 
    $dailyPlanSpn.val( planTextArr[index] );
    
    // create col to control width
    var $col9IptDiv = $('<div>');
    $col9IptDiv.addClass('col-md-9');

    // add col width and row component to row
    $rowDiv.append($col9IptDiv);
    $col9IptDiv.append($dailyPlanSpn);
    // STOP building Time box portion of row

    // START building save portion of row
    var $col1SaveDiv = $('<div>');
    $col1SaveDiv.addClass('col-md-1');

    var $saveBtn = $('<i>');
    $saveBtn.attr('id',`saveid-${index}`);
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"far fa-save saveIcon");
    
    // add col width and row component to row
    $rowDiv.append($col1SaveDiv);
    $col1SaveDiv.append($saveBtn);
    // STOP building save portion of row

    // set row color based on time
    updateRowColor($rowDiv, hour);
    
    // add row to planner container
    $plannerDiv.append($rowDiv);
  };

  // function to update row color
  function updateRowColor ($hourRow,hour) { 

    if (planner) { console.log("rowColor ",hour24, hour); }

    if ( hour < hour24) {
      if (planner) { console.log("lessThan"); }
      $hourRow.css("background-color","lightgrey")
    } else if ( hour > hour24) {
      if (planner) { console.log("greaterthan"); }
      $hourRow.css("background-color","lightgreen")
    } else {
      if (planner) { console.log("eqaul"); }
      $hourRow.css("background-color","red")
    }
  };

  // saves to local storage
  // conclick function to listen for user clicks on plan area
  $(document).on('click','i', function(event) {
    event.preventDefault();  

    if (planner) { console.log('click pta before '+ planTextArr); }

    let $index = $(this).attr('save-id');

    let inputId = '#input-'+$index;
    let $value = $(inputId).val();

    planTextArr[$index] = $value;


    if (planner) { console.log('value ', $value); }
    if (planner) { console.log('index ', $index); }
    if (planner) { console.log('click pta after '+ planTextArr); }

    // remove shawdow pulse class
    $(`#saveid-${$index}`).removeClass('shadowPulse');
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });  
  
  // function to color save button on change of input
  $(document).on('change','input', function(event) {
    event.preventDefault();  
    if (planner) { console.log('onChange'); }
    if (planner) { console.log('id', $(this).attr('hour-index')); }

    // neeed to check for save button

    let i = $(this).attr('hour-index');

    // add shawdow pulse class
    $(`#saveid-${i}`).addClass('shadowPulse');
  });
});