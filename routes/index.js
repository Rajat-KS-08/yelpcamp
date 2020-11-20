var express         = require("express");
var router          = express.Router();
var passport        = require("passport");
var User            = require("../models/user");

//Index routes

//Landing Page Route (Also known as root rute) --------------------------------------------------------------------

router.get("/", function(req, res){
    res.render("landing");
});

 
//Authentication Routes --------------------------------------------------------------------------

//Show register form

router.get("/register", function(req, res){
	res.render("register");
});

//Handling the sign up post logic

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err)
			{
				req.flash("error", err.message);
				return res.render("register");
			}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to Yelp_Camp " + user.usernamer);
			res.redirect("/campgrounds");
		});
	});
});

//Login route

router.get("/login", function(req, res){
   res.render("login" ); 
});

//Handling login post logic

//The syntax for app.post() logic ----------> app.post("/route", passport.authenticate("local", middleware, function()))

 router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        //failureRedirect: "/login"
    }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged Out!");
   res.redirect("/campgrounds");
});

 

module.exports = router;