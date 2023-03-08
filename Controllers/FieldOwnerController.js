const FieldOwnerValidate = require("../Utils/FieldOwnerValidation");
const AuthValidation = require("../Utils/AuthValidation");
const FieldOwnerServices = require("../Services/FieldOwnerServices");
const bcrypt= require("bcrypt");

var GetAllFieldOwners = async (req, res)=>{
    res.status(200).json(await FieldOwnerServices.GetAllFieldOwners());
};
var GetFieldOwnerByID = async (req, res)=>{
    res.status(200).json(await FieldOwnerServices.GetFieldOwnerByID(req.params.id));
};
var AddNewFieldOwner = async (req, res)=>{
    var HashedPassword = await bcrypt.hash(req.body.password,10);
    var newFieldOwner = new FieldOwnerServices(req.body.fullName, req.body.phone, req.body.email, req.body.userName, HashedPassword, "FieldOwner");
    var newFieldOwnerr = {...newFieldOwner, password:req.body.password};
    if(FieldOwnerValidate(newFieldOwnerr)){
        if(await newFieldOwner.AddFieldOwner()){
            res.status(201).send("Add Successfully !");
        }else{
            res.status(400).send("Not Added !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
        console.log(FieldOwnerValidate.errors)
    }
};
var UpdateFieldOwner = async (req, res)=>{
    var HashedPassword = await bcrypt.hash(req.body.password,10);
    var updatedFieldOwner = new FieldOwnerServices(req.body.fullName, req.body.phone,req.body.email, req.body.userName, HashedPassword, req.body.role);
    if(FieldOwnerValidate(updatedFieldOwner)){
        if(updatedFieldOwner.UpdateFieldOwner(req.body._id)){
            res.status(201).send("Updated Successfully !");
        }else{
            res.status(400).send("Not Updated !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
        console.log(FieldOwnerValidate.errors);
    }
};
var DeleteFieldOwner = async (req, res)=>{
    if(FieldOwnerServices.DeleteFieldOwner(req.params.id)){
        res.status(201).send("Deleted Successfully !");
    }else{
        res.status(400).send("Not Deleted !");
    }
};
module.exports = {
    GetAllFieldOwners,
    GetFieldOwnerByID,
    AddNewFieldOwner,
    UpdateFieldOwner,
    DeleteFieldOwner
};