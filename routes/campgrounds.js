var express         = require("express");
var router          = express.Router();
var Campground      = require("../models/Campground");
var middleware      = require("../middleware");
 
//var Comment         = require("../models/comment");


//Campgrounds Routes --------------------------------------------------------------------

router.get("/campgrounds", function(req,res){
	//console.log(req.user);
    //Get all the campgrounds from the database
	Campground.find({}, function(err, campgrounds){
		if(err)
			console.log(err);
		else
			res.render("campgrounds", {campgrounds:campgrounds, currentUser: req.user});
	});
    
});

router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name : name , image: image, description: desc, author: author};
	
	//create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyAdded){
		//redirect back to campgrounds page
	    res.redirect("/campgrounds");
	});
	
	 
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req,res){
	res.render("new");
});

//Show route - This shows the contents of the campgrounds

router.get("/campgrounds/:id", function(req, res){
	//find the campground with provided id 
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err)
			console.log(err);
		else
		    res.render("show", {campground: foundCampground});	
	});	 
});

//Edit Campgrounds Routes

router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("edit", {campground: foundCampground});
	});
});

//Update Campgrounds Routes
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
		if(err)
			res.redirect("/campgrounds");
		else
			res.redirect("/campgrounds/" + req.params.id);
	});
});

//Destroy route
 router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
 	Campground.findByIdAndRemove(req.params.id, function(err){
 		if(err)
 			res.redirect("/campgrounds");
 		else
 			res.redirect("/campgrounds");
 	});
 });


module.exports = router;