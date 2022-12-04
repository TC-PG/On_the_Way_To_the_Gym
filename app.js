const express 	 = require("express"),
	  app 	   	 = express(),
	  bodyParser = require("body-parser"),
      flash = require("connect-flash"),
    //   User = require("./models/user.js"),
      passport = require("passport"),
	  LocalStategy = require("passport-local"),
	  methodOverride = require("method-override"),
	  sequelize = require("./util/database")

//	require routes
const indexRoutes = require("./routes/index")

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

//	Passport config
app.use(require("express-session")({
	secret: "e58f92d9a19ea3fee6a2669104642b706de5645a0eef0b34499c99d7d30b0382",
	resave: false,
	saveUninitialized: false,
	cookie:{maxAge: 60 * 1000 * 30} //30分到期
}));

// momentjs
app.locals.moment = require('moment');

app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);

//test DB Connection
const testDB = async function(){
	try {
		await sequelize.authenticate();
	   console.log('Connection has been established successfully.');
	 } catch (error) {
	   console.error('Unable to connect to the database:', error);
	 }
}
testDB();

app.listen(process.env.PORT || 8080, process.env.IP, ()=> console.log("The Server has started!"));