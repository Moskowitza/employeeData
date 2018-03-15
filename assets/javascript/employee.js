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
var startDate = "";
var monthsWorked = "";
var monthlyRate = "";
var totalBilled = "";

$("#submit").on("click", function(event) {
    event.preventDefault();
    
    name=$("#name").val().trim();
    position=$("#position").val().trim();
    startDate=$("#startDate").val().trim();
    monthsWorked=$("#monthsWorked").val().trim();

    database.ref().push({
    name:name,
    position:position,
    startDate:startDate,
    monthsWorked:monthsWorked
    });
});