const express 	 = require("express"),
	  app 	   	 = express(),
      morgan     = require("morgan"),
	  bodyParser = require("body-parser"),
      flash = require("connect-flash"),
      User = require("./models/user.js"),
      Sensor = require("./models/sensor.js"),
      Sensor_data = require("./models/sensor_data.js"),
      SensorToData = require("./models/sensorToData"),
      path = require("path"),
      passport = require("passport"),
	  LocalStategy = require("passport-local"),
	  methodOverride = require("method-override"),      
	  sequelize = require("./util/database"),
      seedDB = require("./util/seedDB")

//	require routes
const indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/public")));
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


const testDBConnection = async function(){
	try {
		await sequelize.authenticate();
	   console.log('Connection has been established successfully.');
	 } catch (error) {
	   console.error('Unable to connect to the database:', error);
	 }
}
testDBConnection();

User.hasMany(Sensor_data, {
    onDelete: "CASCADE",
    foreignKey: "user_id"
});

/* TODO: remove*/
// Sensor.hasMany(Sensor_data,{
//     foreignKey: "sensor_id"
// });

/* TODO: remove*/
// Sensor.belongsToMany(Sensor_data,{
//     through: SensorToData,
//     sourceKey: 'id',
//     targetKey: 'id'
// });

Sensor.belongsToMany(Sensor_data,{
    through: SensorToData,
    sourceKey: 'id',
    foreignKey: "sensor_id"
});

Sensor_data.belongsToMany(Sensor,{
    through: SensorToData,
    sourceKey: 'id',
    foreignKey: 'sensor_data_id'
});

sequelize.sync()
		.then(async (result)=> {
            /* TODO: test data insertion; should be commented out after server startup */
            // await seedDB(); 
			console.log("table以及假資料建立完成");
		})
		.catch((err)=> {
			console.log(err);
		});


/* TODO: for testing only; should be removed */
app.get("/test", async (req, res) =>{ 
    const result = await Sensor_data.findAll({
        include: Sensor,
        where:{
            // instant: '2022-12-05 12:48:42'
            user_id: 1
        }
        
    });
    
    const resultString = JSON.stringify(result);
    const resultobj = JSON.parse(resultString);

    /* 整理資料庫中屬於同一筆的加速度及陀螺儀感測資料*/
    const outerArr = [];    
    const size = resultobj.length / 2;     
    for(let i = 0; i< size; i++){
        let id_1 = getRelationID(resultobj,i);
        for(let j = size; j < resultobj.length; j++){
            let id_2 = getRelationID(resultobj,j);
            let innerArr = [];
            if(id_1 === id_2){                
                innerArr.push(resultobj[i]);
                innerArr.push(resultobj[j]);
                outerArr.push(innerArr);                
            }
        }        
    }    
    
    const sensorData = [];
    for(let i = 0; i < outerArr.length; i++){
        let temp = {};
        for(let j = 0; j < outerArr[i].length; j++){
            let sensorDataItem = outerArr[i][j];
            temp.instant = sensorDataItem.instant;
            let sensor = sensorDataItem.sensors[0];
            let sensor_type = sensor.sensor_type;
            
            if(sensor_type === 'gyro'){
                temp.gyroX = sensorDataItem.x_axis;
                temp.gyroY = sensorDataItem.y_axis;
                temp.gyroZ = sensorDataItem.z_axis;
            }else{
                temp.accX = sensorDataItem.x_axis;
                temp.accY = sensorDataItem.y_axis;
                temp.accZ = sensorDataItem.z_axis;
            }
        }        
        sensorData.push(temp);
    }

    res.render("test", {sensorData});
    // res.send(JSON.stringify(result))

    // SensorToData.findAll()
    //             .then(result => {
                                
    //                     return JSON.stringify(result);        
    //             }).then(data => {        
    //                 const SensorToData = JSON.parse(data);  
    //                 console.log(SensorToData)      
    //                 // res.render("test", {sensorData});        
    //             }).catch(err => console.log(err));

});

const getRelationID = (resultobj, n) =>{
    const sensor = resultobj[n].sensors;    
    const SensorToData = sensor[0].SensorToData;
    return SensorToData.relationID;
}

// const getData = () => {
//      User.findByPk(1)
//     .then( (user) => {
//          return  user.getSensor_data();
//     })
//     .then(data => console.log(data[0].x_axis))   
//     .catch(err => console.log(err));
// }
// getData()

app.listen(process.env.PORT || 8080, process.env.IP, ()=> console.log("The Server has started!"));