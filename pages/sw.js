self.addEventListener('install', e => { 
		console.log('Service Worker installing.'); 
		let timeStamp = 
Date.now
(); 
		e.waitUntil( 
caches.open
('service_worker').then(cache => { 
			return cache.addAll([ 
				'/', 
				'/?utm_source=homescreen'
			]) .then(() => self.skipWaiting()); 
		}) ) }); 
		
	self.addEventListener('activate', event => { 
		console.log('Service Worker activating.'); 
		
		var cacheKeeplist = ['service_worker'];

		event.waitUntil(
			caches.keys().then((keyList) => {
				return Promise.all(
keyList.map
((key) => {
					if (cacheKeeplist.indexOf(key) === -1) {
						return caches.delete(key);
					}
				}));
			})
		);
		/*
		event.waitUntil(
			self.clients.claim()
		);
		*/ 
	}); 

	self.addEventListener('fetch', event => { 
		return event.request;
		/*
		event.respondWith( caches.match(event.request).then(response => {
		 response || fetch(event.request);				
		}) ); 
		*/
	});