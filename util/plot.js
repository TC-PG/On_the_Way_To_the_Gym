const { PythonShell} = require('python-shell');

const PlotUtil = {};

const plot = async (csv_data, exercise) => {
    let options = {
        mode: 'text',    
        args: [csv_data, exercise]
      };
    PythonShell.run('./util/plot_test.py', options, function (err) {
        if (err) {
            console.log(err);
        }
      });    
}

const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
} 

PlotUtil.plot = plot;
PlotUtil.sleep = sleep;
  
module.exports = PlotUtil;