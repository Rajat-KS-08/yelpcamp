var express                     = require("express");
var app                         = express();
var bodyParser                  = require("body-parser");
var mongoose                    = require("mongoose");
var flash                       = require("connect-flash");
var passport                    = require("passport");
var LocalStrategy               = require("passport-local");
var methodOverride              = require("method-override");
var Campground                  = require("./models/Campground");
var Comment                     = require("./models/comment");
var User                        = require("./models/user");
var seedDB                      = require("./seeds");

var commentRoutes               = require("./routes/comments");
var campgroundRoutes            = require("./routes/campgrounds");
var indexRoutes                 = require("./routes/index");

//seedDB();
//mongoose.connect("mongodb://localhost/yelp_camp");
var url = "mongodb+srv://abcd:1234@cluster0.iefyv.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(url, {
	useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});





app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(flash());

//Passport Configuration

app.use(require("express-session")({
	secret: "Yup!!! Everything is Okay...",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error     = req.flash("error");
   res.locals.success   = req.flash("success");
   next();
});

app.set("view engine" , "ejs");

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});

//app.listen(3000, function(){
//    console.log("My Server has started !!!");
//});