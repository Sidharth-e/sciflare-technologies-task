require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require('./config/passport');
const userRoutes = require("./routes/user");
const loginRoute = require("./routes/login");
const organizationRoute = require("./routes/organization");
// const verify = require("./middleware/auth");
const connection = require("./db");


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// routes
app.use("/api/user",userRoutes);
app.use("/api/login" ,loginRoute);
app.use("/api/organization",organizationRoute);





const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));