// Initialize Firebase
var config = {
  apiKey: "AIzaSyB3uXKOfRS1dpteWAkK2IDzffSMAWBJdzg",
  authDomain: "train-scheduler-383cb.firebaseapp.com",
  databaseURL: "https://train-scheduler-383cb.firebaseio.com",
  projectId: "train-scheduler-383cb",
  storageBucket: "train-scheduler-383cb.appspot.com",
  messagingSenderId: "518015954964"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTrainTime = $("#time-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstDeparture: firstTrainTime,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstDeparture);
  console.log(newTrain.frequency);

  alert("train successfully added");

  // Clears all of the text boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

  // Create Firebase event for adding trains to the database and a row in the html 
  // when a user adds an entry
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstDeparture;
    var trainFrequency = childSnapshot.val().frequency;

  // Train info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrainTime);
  console.log(trainFrequency);

  // Prettify the train start
  

  // Calculate the total billed rate
// Assumptions
var tFrequency = 3;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
//console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    //$("<td>").text(trainNextArrival),
    //$("<td>").text(trainMinutesAway),
  )

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
  });
});