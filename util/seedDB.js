const User = require("../models/user.js"),
      Sensor = require("../models/sensor.js"),
      Sensor_data = require("../models/sensor_data.js"),
      SensorToData = require("../models/sensorToData"),
      csv = require('csv-parser'),
      fs = require('fs'),
      sequelize = require("./database")

// insert test data
const seedDB = async () =>{    
    try{
        const results = [];
        fs.createReadStream('./project_data/M5StickC_data.csv')
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => console.log(results[0].time));

        let user1, sensor1, sensor2 = null;
        await sequelize.transaction(async (t) =>{
             user1 = await User.create({
                name: 'user1',
                password: '$2a$12$7wxtaaPBDg2wUme3uQpZcuE/FSM3chm6np4kutmGAx8Cddj9hGFEu',
                age: 20
            });
             sensor1 = await Sensor.create({
                sensor_type: 'acc'
            });
             sensor2 = await Sensor.create({
                sensor_type: 'gyro'
            });
        });


        // begin transaction 
        await sequelize.transaction(async (t) => {           
            await results.forEach( async result => {
                
                let gyro_sensor_data = await Sensor_data.create({
                    instant: result.time,
                    x_axis: result.gyroX,
                    y_axis: result.gyroY,
                    z_axis: result.gyroZ,
                    user_id: user1.user_id
                });
                // console.log(gyro_sensor_data.id)
                await SensorToData.create({
                    sensor_id: sensor2.id,
                    sensor_data_id: gyro_sensor_data.id,
                    relationID: gyro_sensor_data.id
                });
                let acc_sensor_data = await Sensor_data.create({
                    instant: result.time,
                    x_axis: result.accX,
                    y_axis: result.accY,
                    z_axis: result.accZ,
                    user_id: user1.user_id
                });
                await SensorToData.create({
                    sensor_id: sensor1.id,
                    sensor_data_id: acc_sensor_data.id,
                    relationID: gyro_sensor_data.id
                });
            })
        });       

      }catch(err){
        console.log(err);
      }    
}

module.exports = seedDB;