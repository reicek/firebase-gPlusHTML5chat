// ***********************************
//	Firebase & jQuery HTML5 chat
// ***********************************
var messagesRef = new Firebase('https://cesarstechinsights.firebaseio.com');

// When the user presses enter on the message input, write the message to firebase.
$('#messageInput').keypress(function (e) {
	if (e.keyCode == 13) {
		var name = $('#nameInput').val();
		var text = $('#messageInput').val();
		messagesRef.push({name:name, text:text});
		$('#messageInput').val('');
	}
});

// Add a callback that is triggered for each chat message.
messagesRef.limit(40).on('child_added', function (snapshot) {
	var message						= snapshot.val();
	
	$('<div/>')
	.text(message.text)
	.prepend($('<strong/>')
	.text(message.name+': '))
	.appendTo($('#messagesDiv'));
});
