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