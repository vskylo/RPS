
var rps = ["Rock","Paper","Scissors"];
var turn=0;
var num=0;
var player_1 = new player("");
var player_2 = new player("");
var time_id;

 function player(type) {
 	this.name = type;
 	this.choice = "";
 	this.wins = 0;
 	this.losses = 0;

 	this.add_to_wins = function(){
 		this.wins += 1;
 		$("#main").html("<h1> " + this.name + "  Wins! </h1>");
 		
 	};

 	this.add_to_losses = function(){
 		this.losses += 1;
 	};
 }



function timer(){
	time_id = setTimeout(function(){
		$("#choices-1").empty();
		$("#choices-2").empty();
		$("#wins-losses-1").html("wins: " + player_1.wins + "  Losses: " + player_1.losses);
		$("#wins-losses-2").html("wins: " + player_2.wins + "  Losses: " + player_2.losses);
		$("#main").empty()
		database.ref("/turn").update({
			turn: 2
		});
	},3000);
}


//Let our Firebase begin
var config = {
    apiKey: "AIzaSyDcbcU4sLIkhsv78vgMGFFDTMnylNUgl9I",
    authDomain: "my-first-project-2c0d6.firebaseapp.com",
    databaseURL: "https://my-first-project-2c0d6.firebaseio.com",
    projectId: "my-first-project-2c0d6",
    storageBucket: "my-first-project-2c0d6.appspot.com",
    messagingSenderId: "942503269964"
  };
 firebase.initializeApp(config);

database = firebase.database();

$("#player-1").html("<h3> Waiting for Player 1  </h3>");
$("#player-2").html("<h3> Waiting for Player 2  </h3>");
database.ref("/chat").set({
	message: ""
});



database.ref("/players").on("value",function(snapshot){
	num = snapshot.numChildren();
	player_1.name = snapshot.val().player_1.name;
	player_1.choice = snapshot.val().player_1.choice;
	player_1.wins = snapshot.val().player_1.wins;
	player_1.losses = snapshot.val().player_1.losses;
	player_2.name = snapshot.val().player_2.name;
	player_2.choice = snapshot.val().player_2.choice;
	player_2.wins = snapshot.val().player_2.wins;
	player_2.losses = snapshot.val().player_2.losses;
	console.log(num);
	if (num === 2){
		$("#player-1").html("<center><h3>" + player_1.name + "</h3></center>");
		$("#wins-losses-1").html("wins: " + player_1.wins + "  Losses: " + player_1.losses);
		$("#player-2").html("<center><h3>" + player_2.name + "</h3></center>");
		$("#wins-losses-2").html("wins: " + player_2.wins + "  Losses: " + player_2.losses);
	}
});




database.ref("/players/player_2" || "/players/player_1").onDisconnect().remove();
//database.ref("/players/player_2").onDisconnect().remove();


database.ref("/turn").on("child_added",function(snap){
	console.log("im also hereee");
	database.ref("/turn").update({
		turn: 2
	})

});


database.ref("/turn").on("child_changed",function(snap){

	turn = snap.val();
	console.log("im hereeeeeeeeee");
	console.log(turn);
	if (turn == 1) {
		var text_image = [];
		$("#choices-1").empty();
		$("#choices-2").empty();
		for (var i=0; i<3; i++) {
			text_image[i] = $("<p>");
			text_image[i].addClass("text");
			text_image[i].attr("data-attr", rps[i]);
			text_image[i].html("<h4>" + rps[i] + "</h4>");
			$("#choices-1").append(text_image[i]);
		}

	}
	else {
		var text_image = [];
		$("#choices-2").empty();
		$("#choices-1").empty();
		for (var i=0; i<3; i++) {
			text_image[i] = $("<p>");
			text_image[i].addClass("text");
			text_image[i].attr("data-attr", rps[i]);
			text_image[i].html("<h4>" + rps[i] + "</h4>");  
			$("#choices-2").append(text_image[i]);
		}

	}
});


$(document).on("click",".text",function(){
	var value = ($(this).attr("data-attr"))
	if (turn === 1) {
		
		player_1.choice = value;
		database.ref("/players/player_1").update({
			choice: player_1.choice
		});
		$("#choices-1").empty();
		$("#choices-1").html("<h2>" + player_1.choice + "</h2>");
		//Game logic
		if (( player_1.choice === "Rock") && (player_2.choice === "Scissors")) {
          	player_1.add_to_wins();
          	player_2.add_to_losses();
          	console.log("losses " + player_2.losses);
          	console.log("wins " + player_1.wins);
          	database.ref("/players/player_2").update({
          		losses: player_2.losses
          	});

          	database.ref("/players/player_1").update({
          		wins: player_1.wins
          	});
          	
          	timer();
        } else if ((player_1.choice === "Rock") && (player_2.choice === "Paper")) {
          	player_2.add_to_wins();
          	player_1.add_to_losses();
          	database.ref("/players/player_2").update({
          		wins: player_2.wins
          	});
          	database.ref("/players/player_1").update({
          		losses: player_1.losses
          	});
          	timer();
        } else if ((player_1.choice === "Scissors") && (player_2.choice === "Rock")) {
          	player_2.add_to_wins();
          	player_1.add_to_losses();
          	database.ref("/players/player_2").update({
          		wins: player_2.wins
          	});
          	database.ref("/players/player_1").update({
          		losses: player_1.losses
          	});
          	timer();
        } else if ((player_1.choice === "Scissors") && (player_2.choice === "Paper")) {
         	player_1.add_to_wins();
          	player_2.add_to_losses();
          	database.ref("/players/player_1").update({
          		wins: player_1.wins
          	});
          	database.ref("/players/player_2").update({
          		losses: player_2.losses
          	});
          	timer();
        } else if ((player_1.choice === "Paper") && (player_2.choice === "Rock")) {
         	player_1.add_to_wins();
          	player_2.add_to_losses();
          	database.ref("/players/player_1").update({
          		wins: player_1.wins
          	});
          	database.ref("/players/player_2").update({
          		losses: player_2.losses
          	});
          	timer();
        } else if ((player_1.choice === "Paper") && (player_2.choice === "Scissors")) {
          	player_2.add_to_wins();
          	player_1.add_to_losses();
          	database.ref("/players/player_2").update({
          		wins: player_2.wins
          	});
          	database.ref("/players/player_1").update({
          		losses: player_1.losses
          	});
          	timer();
        } else if (player_1.choice === player_2.choice) {
          	$("#main").html("<h1> Tie Game! </h1>");
          	timer();
        }


		
	}
	else {
		
		player_2.choice = value;
		database.ref("/players/player_2").update({
			choice: player_2.choice
		});
		$("#choices-2").empty();
		$("#choices-2").html("<h2>" + player_2.choice + "</h2>");
		database.ref("/turn").update({
			turn: 1
		});

	}
})


//Here lies the click event of the name input at the beginning of the game 
$(".name-button").on("click",function(){
	event.preventDefault();
	var name = $("#name-input").val();
	console.log(name);
	//We check the database if there is already a player
	if (num === 0) {
		 player_1 = new player(name);
		// We update the database with the new player
		database.ref("/players/player_1").set({
			name : player_1.name,
			choice : player_1.choice,
			wins : player_1.wins,
			losses : player_1.losses

		});
		//We update the new players page
		$(".name-div").empty();
		$(".name-div").html("<center><h3>Hi " + player_1.name + "! You are Player 1.</h3></center>");
		var newDiv = $("<div class='turn'>");
		$(".name-div").append(newDiv);
		$("#player-1").html("<center><h3>" + player_1.name + "</h3></center>");
		$("#wins-losses-1").html("wins: " + player_1.wins + "  Losses: " + player_1.losses);
		
	}
	else if (num === 1) {
		player_2 = new player(name);
		// We update the database with the new player
		database.ref("/players/player_2").set({
			name : player_2.name,
			choice : player_2.choice,
			wins : player_2.wins,
			losses : player_2.losses

		});
		database.ref("/turn").set({
			turn : 1
		});
		//We update the new players page
		$(".name-div").empty();
		$(".name-div").html("<center><h3>Hi " + player_2.name + "! You are Player 2.</h3></center>");
		$("#player-2").html("<center><h3>" + player_2.name + "</h3></center>");
		$("#wins-losses-2").html("wins: " + player_2.wins + "  Losses: " + player_2.losses);
		$("#player-1").html("<center><h3>" + player_1.name + "</h3></center>");
		$("#wins-losses-1").html("wins: " + player_1.wins + "  Losses: " + player_1.losses);
	}
	else {
		alert("Sorry, there are alreay two Players!");
	}
});

//Chatting event
$(".chat").on("click", function(){
	event.preventDefault();
	//Take the message from the form
	var message = $("#message").val();
	//Store it on firebase
	database.ref("/chat").set({
		message : message
	});
	//console.log(message);
	//display it on the chatbox
	//$(".chatbox").append (message + "<br>" );
});

database.ref("/chat").on("value",function(snap){
	var message = snap.val();
	console.log(message);
	$(".chatbox").prepend (message.message + "<br>" );
});