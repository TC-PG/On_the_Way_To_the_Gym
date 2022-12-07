const express = require("express");
const router = express.Router();
const passport = require("passport");
// const User = require("../models/user");
// const middleware = require("../middleware");

//	root route
router.get("/", (req, res) => res.render("landing"));

router.get("/index", (req, res) => {
    res.render("index");
})

router.get("/JumpRope", (req, res) => {
    res.render("JumpRope");
})

router.get("/Bike", (req, res) => {
    res.render("Bike");
})

router.get("/Kettlebell", (req, res) => {
    res.render("Kettlebell");
})

router.get("/Run", (req, res) => {
    res.render("Run");
})








module.exports = router;