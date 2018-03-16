// Link to our Firebase:
var config = {
    apiKey: "AIzaSyAhhFXOI9Zb4ulqhQg2T1b5XIlgRt0P78Q",
    authDomain: "employees-8798f.firebaseapp.com",
    databaseURL: "https://employees-8798f.firebaseio.com",
    projectId: "employees-8798f",
    storageBucket: "",
    messagingSenderId: "799081197880"
};
firebase.initializeApp(config);
var database = firebase.database();

var name = "";
var position = "";
var startDate = "09/01/2017";
var startFormat = "MM/DD/YYYY";
var startMoment= moment(startDate, startFormat);  
console.log(moment(startMoment).diff(moment(), "months"));
var monthlyRate = 100;
var totalBilled = "";

$("#submit").on("click", function(event) {
    event.preventDefault();
    console.log("hi");
    name=$("#name").val().trim();
    position=$("#position").val().trim();
    startDate=$("#startDate").val().trim();
    monthlyRate=$("#monthlyRate").val().trim();

    database.ref().push({
    name:name,
    position:position,
    startDate:startDate,
    monthlyRate:monthlyRate
    });
  });


    // let's fill in a table?
    var tRow = $("<tr>");
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(childsnapshot) {
      $(".tableBody").empty()
      // moved the moment calculation to down here
      startDate=childsnapshot.val().startDate;
      var startMoment = moment(startDate, startFormat);
      var monthsDiffernce = moment(startMoment).diff(moment(), "m"); //should be a number but isn't
      var monthsWorked = monthsDiffernce * (-1); 
      var monthsWorkedTd = $("<td>").text(monthsWorked);
      //totalTd doesn't work because monthsWorked is not a number
      var rateNumber=parseInt(childsnapshot.val().monthlyRate);
      console.log(rateNumber); //this is a NUMBER!
      var totalTd = monthsWorked * rateNumber;

      console.log(monthsDiffernce);  //shoots NAN Error, let's dig 
      console.log(startDate); //returns the date entered
      console.log(totalTd); //NAN
      //Check these names. may want to use childsnapshot.val()
      var nameTd = $("<td>").text(childsnapshot.val().name);
      var positionTd = $("<td>").text(childsnapshot.val().position);
      var startDateTd = $("<td>").text(childsnapshot.val().startDate);

      var monthlyRateTd=$("<td>").text(childsnapshot.val().monthlyRate);
      tRow.append(nameTd, positionTd, startDateTd, monthsWorkedTd, monthlyRateTd, totalTd);
      $(".tableBody").append(tRow)
    })
