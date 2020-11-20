var express         = require("express");
var router          = express.Router();
var Campground      = require("../models/Campground");
var Comment         = require("../models/comment");
var middleware      = require("../middleware");

//Routes related to comments---------------------------------------------------------------------

//Comments Route

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err)
			console.log(err);
		else
			res.render("commentNew", {campground: campground});
	});
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err)
			console.log(err);
		else
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Opps!!! Something went wrong.");
					console.log(err);
				}
 
				else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//saving the comment
					comment.save();
					campground.comments.push(comment);
				    campground.save();
					req.flash("success", "Successfully added comment");
					res.redirect("/campgrounds/" + campground._id);
				}
					 
				
			});
	});
});

//Comment Edit Route

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	var campground_id = Campground.findById(req.params.id);
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err)
			res.redirect("back");
		else
			res.render("commentEdit", {campground_id: campground_id, comment: foundComment});
	});
	 
});

//Comment Update Route

router.put("/campgrounds/:id/comments/:comment_id",  middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err)
			res.redirect("back");
		else
			res.redirect("/campgrounds");
	});
});

//Comment Delete Route

router.delete("/campgrounds/:id/comments/:comment_id",  middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err)
			res.redirect("back");
		else
			req.flash("success", "Comment deleted successfully!!!");
			res.redirect("/campgrounds");
	});
});

 

module.exports = router;