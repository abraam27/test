const express = require("express");
const router = express.Router();
const FieldController = require("../Controllers/FieldController");
// get all Fields
router.get("/",FieldController.GetAllFields)
// get Field by id
router.get("/:id",FieldController.GetFieldByID);
// add new Field
router.post("/add",FieldController.AddNewField);
// update Field by id
router.put("/update",FieldController.UpdateField);
// delete Field by id
router.delete("/delete/:id",FieldController.DeleteField);
// get all vaild fields
router.get("/valid",FieldController.GetAllValidFields);
// get all invaild fields
router.get("/invalid",FieldController.GetNotValidFields);
// update field status
router.patch("/updateStatus/:id",FieldController.UpdateStatus);
// get fields by location
router.get("/location/:location",FieldController.GetFieldsByLocation);
module.exports = router;