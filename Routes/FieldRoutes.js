const express = require("express");
const router = express.Router();
const FieldController = require("../Controllers/FieldController");
const Multer= require("../Services/multer")
const multerPath = Multer.multerPath;
const multerValidators= Multer.multerValidators;
const HMR= Multer.HMR;
const myMulter= Multer.myMulter;

// get all Fields
router.get("/",FieldController.GetAllFields)
// get Field by id
router.get("/:id",FieldController.GetFieldByID);
// add new Field
router.post("/add",myMulter(multerPath.fieldPic, multerValidators.image).array('image',5),HMR,FieldController.AddNewField);
// update Field by id
router.put("/update",FieldController.UpdateField);
// delete Field by id
router.delete("/delete/:id",FieldController.DeleteField);
// get all vaild fields
router.get("/valid",FieldController.GetAllValidFields);
// get all invaild fields
router.get("/invalid",FieldController.GetNotValidFields);
// get all invaild fields
router.get("/location/:location",FieldController.GetFieldsByLocation);
module.exports = router;