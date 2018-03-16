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
var startDate = "01/01/2018";

var monthlyRate = "";
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
      var startMoment = moment(childsnapshot.val().startDate, "MM/DD/YYYY");
      var monthsWorked = moment().diff(startMoment, "months");
      var monthsWorkedTd = $("<td>").text(monthsWorked)
      var total = monthsWorked * parseInt(childsnapshot.val().monthlyRate)
      console.log(monthsWorked);
      //Check these names. may want to use childsnapshot.val()
      var nameTd = $("<td>").text(childsnapshot.val().name);
      var positionTd = $("<td>").text(childsnapshot.val().position);
      var startDateTd = $("<td>").text(childsnapshot.val().startdate);
      var monthlyRate=$("<td>").text(childsnapshot.val().monthlyRate);
      tRow.append(nameTd, positionTd, monthlyRate, startDateTd, monthsWorkedTd);
      $(".tableBody").append(tRow)
    })
