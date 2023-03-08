const express = require("express");
const router = express.Router();
const FieldOwnerController = require("../Controllers/FieldOwnerController");
const FieldController = require("../Controllers/FieldController");
const GameController = require("../Controllers/GameController");
// get all FieldOwners
router.get("/",FieldOwnerController.GetAllFieldOwners)
// get FieldOwner by id
router.get("/:id",FieldOwnerController.GetFieldOwnerByID);
// add new FieldOwner
router.post("/add",FieldOwnerController.AddNewFieldOwner);
// update FieldOwner by id
router.put("/update",FieldOwnerController.UpdateFieldOwner);
// delete FieldOwner by id
router.delete("/delete/:id",FieldOwnerController.DeleteFieldOwner);
// FieldOwner get all fields
router.get("/fields/:id",FieldController.GetAllFieldsByFieldOwnerID);


module.exports = router;