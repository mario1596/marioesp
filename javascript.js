/***************************************************************************/
// ENGINE FOR PAGES

$( document ).ajaxError(function() {
  console.log( "Triggered ajaxError handler." );
});

function page(url){

	//$('#page').html(url);
	//$("#page").load("/pages/" + url + '.html');
	
	$.ajax({
	url: "/pages/" + url + ".html",

	   error: function( jqXHR, exception ){
		 console.log( jqXHR, exception )
		 //alert('the page not exist');
		 //return false;
	   },
	   
	   success: function( result ){		
		$("#page").html( result );
		history.pushState(null, url, "/" + url + '/');		 
	   }	

	 });	
	
	document.title = url;	
	console.log('page '+ url + " opened!");
	return event.preventDefault();

};

// this way the function is an object
// var page = function(){}

window.onload = function(){
  page('home');
};

/***************************************************************************/

window.onpopstate = function(event) {

	var url = event.target.location.pathname;
	url = url.replace(/\//g,'');

	$("#page").load("/pages/" + url + '.html');

	//console.log( url );

};

/***************************************************************************/
// CHANGE BEHAVIOR ABOUT ANCHORS

$('a').unbind().click(function(event){

	var $this = $(this);

  console.info( $this.attr('href'));

  var mypage = $this.attr('href');

//comment out
//   page( mypage.replace(/\//g,'') );

  return event.preventDefault();
});

/***************************************************************************/
// SERVICE WORKER

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

/***************************************************************************/
// NOTIFICATION SERVICE

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

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

// $(window).om('load', function(){
//
//   page('home.html');
// });


// window.addEventListener("test", function(){ page('home.html');
//
// }, null);