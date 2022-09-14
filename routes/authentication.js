const User = require("../models/UserModel");
const router = require("express").Router()
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");

const verify = require("../verifyMiddleware");

// REGISTER ROUTE
router.post("/register", async (req, res) => {
    try {
        const hash = await argon2.hash(req.body.password)

        const newUser = new User({
            ...req.body,
            password: hash
        })

        await newUser.save();
        res.status(201).json(newUser)

    } catch (err) {
        res.status(401).json(err)
    }
})

// LOGIN ROUTE
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) return res.status(404).json("User not Found!")

        if (await argon2.verify(user.password, req.body.password)) {

            const token = jwt.sign({
                email: user.email
            }, process.env.JWT_SECRET)

            res.cookie("access_token", token, { httpOnly: true }).status(200).json(user)

        } else {
            res.status(401).json("Invalid credentials!!")
        }
    } catch (err) {
        res.status(500).json("Something went wrong")
    }

})

// LOGOUT ROUTE
router.get("/logout", verify, async (req, res) => {
    try {
        res.clearCookie("access_token").status(200).json("Logout successfully")

    } catch (err) {
        res.status(500).json("Something went wrong")
    }
})

module.exports = router;