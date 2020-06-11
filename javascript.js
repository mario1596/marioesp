
//    $.ajax({
//  url: "/pages/" + url,
//        method: "GET"
//}).done(function() {
//  $( "page" ).html( data );
//});


$( document ).ajaxError(function() {
  console.log( "Triggered ajaxError handler." );
});


/*********************CHANGE PAGE*****************************/


function page( url ){
	
    
    
    
//	$( "#page" ).load( "/pages/" + url + '.html' );	
	
//	console.log( "page " + url + " opened!");
    
    $.ajax({
       url: "/pages/" + url + ".html",
      
    success: function(result)
    {
        $("#page").html(result);
        history.pushState( null , url, "/" + url + "/");
    },
      error: function(jqHXR , exception){
          console.log(jqHXR,exception);
//        alert('the page not exist');
//          return false;
    }
        
    });

document.title = url;
return Event.preventDefault();
};

/**********************ONLOAD FUNC****************************/


window.onload = function(){
	page( 'home' );
};
/**************************************************/
window.onpopstate = function(event) {
    
 
    
    var url = (event.target.location.pathname);
    url = url.replace(/\//g,'');
    $( "#page" ).load( "/pages/" + url + '.html' );	
  console.log(url);
  
    
};

/*********************PAGE HREF CHANGE*****************************/


$('a').unbind().click( function(event){	
	
	var mypage = $( this ).attr('href');
	page( mypage.replace(/\//g, ""));
	
	return event.preventDefault();
});

/********************SERVICE WORKER*******************/



if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}




/************************NOTIFICATIONS**************************/
function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }
}


