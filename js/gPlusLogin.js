function signinCallback(authResult) 
{
  if (authResult['access_token']) 
  {
    document.getElementById('signinButton').setAttribute('style', 'display: none');
	logIn();
  } else 
  if (authResult['access_denied']) 
  {
    document.getElementById('signinButton').setAttribute('style', 'display: inline');
    window.alert("Access denied by the user.");
  } else
  if (authResult['immediate_failed']) 
  {
    document.getElementById('signinButton').setAttribute('style', 'display: inline');
    window.alert("Automatic access couldn't be granted to the user.");
  } else
    document.getElementById('signinButton').setAttribute('style', 'display: inline');
}
function logIn() 
{
	gapi.client.load('plus', 'v1', function() 
	{
		var request = gapi.client.plus.people.get(
		{
			'userId': 'me'
		});
		request.execute(function(resp) 
		{
            var heading		= document.createElement('h3');
			var lineBreak	= document.createElement('br');
            var image		= document.createElement('img');
            image.src		= resp.image.url;
			
            heading.appendChild(document.createTextNode(resp.displayName));
            heading.appendChild(lineBreak);
            heading.appendChild(image);
			
			document.getElementById('nameInput').value = resp.displayName;
            document.getElementById('user').appendChild(heading);
			
			$('#messageInput').removeAttr('disabled');
			$('#messageInput').focus();
		});
	});
}
