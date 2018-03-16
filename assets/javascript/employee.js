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

var startMoment = moment(startDate, "MM/DD/YYYY");
var monthsWorked = moment().diff(startMoment, "months");
console.log(monthsWorked);
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
    monthsWorked:monthsWorked
    });


    // let's fill in a table?
    var tBody = $("tbody");
    var tRow = $("<tr>");

    //Check these names. may want to use childsnapshot.val()
    var nameTd = $("<td>").text(childsnapshot.val().name);
    var positionTd = $("<td>").text(childsnapshot.val().position);
    var startDateTd = $("<td>").text(childsnapshot.val().startdate);
    var monthsWorkedTd=$("<td>").text(childsnapshot.val().monthsWorked);
    tRow.append(nameTd, posionTd, startDateTd, monthsWorkedTd);
    tBody.append(tRow);
});
