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
var startMoment = moment(startDate, startFormat);
console.log(moment(startMoment).diff(moment(), "months"));// returns negative number
var monthlyRate = 100;
var totalBilled = "";

$("#submit").on("click", function (event) {
  event.preventDefault();
  console.log("hi");
  name = $("#name").val().trim();
  position = $("#position").val().trim();
  startDate = $("#startDate").val().trim();
  monthlyRate = $("#monthlyRate").val().trim();

  database.ref().push({
    name: name,
    position: position,
    startDate: startDate,
    monthlyRate: monthlyRate
  });
});


// let's fill in a table!!!
var tRow = $("<tr>");
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (childsnapshot) {
  $(".tableBody").empty()
  // Calculate Months Worked
  var startDate = childsnapshot.val().startDate;
  console.log(startDate); //does get last date, but as YYYY/MM/DD 
  var startMoment = moment(startDate, "YYYY/MM/DD");
  console.log(startMoment);//this is an object
  var monthsDiffernce = moment(startMoment).diff(moment(), "M"); //should be a number but isn't
  var monthsNumber = parseInt(monthsDiffernce);
  console.log(monthsDiffernce); //this is a negative number
  //calculate TOTAL
  var rate = childsnapshot.val().monthlyRate;
  console.log(rate); //this is a string
  var rateNumber = parseInt(rate);  
  console.log(rateNumber); //a number!
  var total = monthsNumber * rateNumber;


  //Check these names. Use childsnapshot.val() if pulling from database, otherwise put calculated
  var nameTd = $("<td>").text(childsnapshot.val().name);//from database
  var positionTd = $("<td>").text(childsnapshot.val().position);//from database
  var startDateTd = $("<td>").text(childsnapshot.val().startDate);//from database
  var monthsWorkedTd = $("<td>").text(monthsWorked); //calculated value
  var monthlyRateTd = $("<td>").text(childsnapshot.val().monthlyRate); //from database
  var totalTd = $("<td>").text(total);//calculated value
  tRow.append(nameTd, positionTd, startDateTd, monthsWorkedTd, monthlyRateTd, totalTd);
  $(".tableBody").append(tRow)
})
