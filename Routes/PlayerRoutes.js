const express = require("express");
const router = express.Router();
const PlayerController = require("../Controllers/PlayerController");
const GameController = require("../Controllers/GameController");
const FieldController = require("../Controllers/FieldController");
const Multer= require("../Services/multer")
const multerPath = Multer.multerPath;
const multerValidators= Multer.multerValidators;
const HMR= Multer.HMR;
const myMulter= Multer.myMulter;



// update Player image
router.put("/updateImage/:id",myMulter(multerPath.profilePic , multerValidators.image).single('image'),HMR,PlayerController.UpdateImage);
// get all Players
router.get("/",PlayerController.GetAllPlayers)
// get Player by id
router.get("/:id",PlayerController.GetPlayerByID);
// add new Player
router.post("/add",PlayerController.AddNewPlayer);
// update Player by id
router.put("/update",PlayerController.UpdatePlayer);
// delete Player by id
router.delete("/delete/:id",PlayerController.DeletePlayer);
// get the uaser his all reservations
router.get("/games/:id",PlayerController.GetAllGamesByPlayerID);
// change status 
router.patch("/changeStatus/:userName",PlayerController.ChangeSatus);
// reset password
router.patch("/resetPassword/:email",PlayerController.ResetPassword);
// send email to reset password
router.post("/emailToUpdatePw/:email",PlayerController.SendEmailPw);
module.exports = router;