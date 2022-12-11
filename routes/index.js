const express = require("express");
const router = express.Router();
const passport = require("passport");
// const { PythonShell} = require('python-shell')
const PlotUtil = require("../util/plot");
// const User = require("../models/user");
// const middleware = require("../middleware");

//	root route
router.get("/", (req, res) => res.render("landing"));

router.get("/index", (req, res) => {
    res.render("index");
})

router.get("/JumpRope", async (req, res) => {
    PlotUtil.plot('test_fix_acc_1.csv', 'jump');
    await PlotUtil.sleep(2000);
    res.render("JumpRope");
})

router.get("/Bike", async (req, res) => {
    PlotUtil.plot('test_fix_acc_2.csv', 'bike');
    await PlotUtil.sleep(2000);
    res.render("Bike");
})

router.get("/Kettlebell", async (req, res) => {
    PlotUtil.plot('test_fix_acc_3.csv', 'kettlebell');
    await PlotUtil.sleep(2000);
    res.render("Kettlebell");
})

router.get("/Run", async (req, res) => {
    PlotUtil.plot('test_fix_acc_4.csv', 'run');
    await PlotUtil.sleep(2000);
    res.render("Run");
})



// TODO: for testing
router.get("/test", async (req, res) => {

    PlotUtil.plot('test_fix_acc_1.csv', 'jump');
    await PlotUtil.sleep(1700);
    res.render("test", {});
})


module.exports = router;