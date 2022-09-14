const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const app = express()
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

const authRoute = require("./routes/authentication")

//DB CONNECTION
const connect = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("DB connected");
    }).catch((err) => {
        throw err
    })

}

app.use("/api", authRoute)

const PORT = 5000
app.listen(PORT, () => {
    connect();
    console.log("Server is running");
})