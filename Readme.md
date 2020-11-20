name : "Shillong View Point" , 
		image :   "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.awesomemitten.com%2Fwp-content%2Fuploads%2F2014%2F08%2Fgen.jpg&f=1&nofb=1",
		description :  "This is a beautiful campground present in Shillong"
		
		Campground.create(
	{
		 
	}, function(err, campground){
		if(err)
			console.log(err);
		else
			console.log("Newly created campground");
		    console.log(campground);
	}

);
