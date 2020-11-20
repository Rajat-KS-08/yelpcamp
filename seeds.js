 var mongoose    = require("mongoose");
var Campground  = require("./models/Campground");
var Comment     = require("./models/comment");

var data = [
	{
		name: "Valley View",
		image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.RnNkpMQiOtux-sh6JvjMRgHaEZ%26pid%3DApi&f=1",
		description: "This is a campground located in Valley View"
	},
	{
		name: "Hill View",
		image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.zGooUWFdYaGFs8oVJkb2VwHaEo%26pid%3DApi&f=1" ,
		description: "This is a campground located in Hill View"
	},
	{
		name: "Dawki river side CG",
		image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.zGooUWFdYaGFs8oVJkb2VwHaEo%26pid%3DApi&f=1" ,
		description: "This is a campground located in Dawki,Shillong."
	}
]

  function seedDB(){
	  Campground.remove({}, function(err){
	//if(err)
	// console.log(err);
	//else
	// console.log("All the campgrounds have removed");
	//});
	//
	//data.forEach(function(seed){
	//  Campground.create(seed, function(err, campground){
	//	  if(err)
	//		  console.log(err);
	//	  else
	//		  {
	//			  console.log("Added a campground.");
	//			  //adding comment
	//			  Comment.create(
	//				  {
	//					  text: "What a beauty!!!",
	//					  author: "Larry Smith"
	//				  },
	//				  function(err, comment){
	//					  if(err)
	//						  console.log("Unable to create!");
	//					  else
	//						  {
	//							  campground.comments.push(comment);
	//					          campground.save();
	//							  console.log("created new comment...");
	//						  }
	//					   
	//				  }
	//			  );
	//		  }
	//  });
	  });
	  
	  
  }
 
module.exports = seedDB; 