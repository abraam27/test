/**
 * 1-npm i express
 * 2-npm i body-parser
 * 3-npm i path
 */

const express = require("express");
const app = express();
const PORT = process.env.PORT || 7500
const bodyParser = require("body-parser");
const path = require("path");
// image variable

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
// app.use("/images",express.static(path.join(__dirname,"images")))
// app.use(multer().single("image"));
app.use((req, res, next) => {
    // Attach CORS headers
    // Required when using a detached backend (that runs on a different domain)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

//#region For courses [CRUD] [Creat-Read-Update-Delete]
const CourseRoutes = require("./Routes/CourseRoutes");
app.use("/api/courses",CourseRoutes);
//#endregion

//#region For players [CRUD] [Creat-Read-Update-Delete]
const playerRoutes = require("./Routes/PlayerRoutes");
app.use("/api/players",playerRoutes);
//#endregion

//#region For fieldOwners [CRUD] [Creat-Read-Update-Delete]
const fieldOwnerRoutes = require("./Routes/FieldOwnerRoutes");
app.use("/api/fieldOwners",fieldOwnerRoutes);
//#endregion

//#region For fields [CRUD] [Creat-Read-Update-Delete]
const fieldRoutes = require("./Routes/FieldRoutes");
app.use("/api/fields",fieldRoutes);
//#endregion

//#region For games [CRUD] [Creat-Read-Update-Delete]
const gameRoutes = require("./Routes/GameRoutes");
app.use("/api/games",gameRoutes);
//#endregion

//#region For admins [CRUD] [Creat-Read-Update-Delete]
const adminRoutes = require("./Routes/AdminRoutes");
app.use("/api/admin",adminRoutes);
//#endregion

//#region For admins [CRUD] [Creat-Read-Update-Delete]
const AuthRoute = require("./Routes/AuthRoute");
app.use("/api/login",AuthRoute);
//#endregion

app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)})

