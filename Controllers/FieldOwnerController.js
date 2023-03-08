const FieldOwnerValidate = require("../Utils/FieldOwnerValidation");
const AuthValidation = require("../Utils/AuthValidation");
const FieldOwnerServices = require("../Services/FieldOwnerServices");
const bcrypt= require("bcrypt");
const FieldServices = require("../Services/FieldServices");

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
        if(newFieldOwner.AddFieldOwner()){
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
    var updatedFieldOwner = new FieldOwnerServices(req.body.fullName, req.body.phone,req.body.email, req.body.userName, HashedPassword, req.body.role,req.body.status);
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
var ChangeSatus = async (req, res)=>{
    if(FieldOwnerServices.ChangeStatus(req.params.userName)){
        res.status(201).send("Status Updated Successfully !");
    }else{
        res.status(400).send("Not Updated !");
    }
};
var ResetPassword = async (req, res)=>{
    var HashedPassword = await bcrypt.hash(req.body.password,10);
    if(FieldServices.ResetPassword(req.params.userName,HashedPassword)){
        res.status(201).send("password Updated Successfully !");
    }else{
        res.status(400).send("Not Updated !");
    }
};
var SendEmailPw = async (req, res)=>{
    if(FieldOwnerServices.SendEmailPw(req.params.fullName,req.params.email,req.params.userName)){
        res.status(201).send("sent it Successfully !");
    }else{
        res.status(400).send("Not sent !");
    }
};
module.exports = {
    GetAllFieldOwners,
    GetFieldOwnerByID,
    AddNewFieldOwner,
    UpdateFieldOwner,
    DeleteFieldOwner,
    ResetPassword,
    SendEmailPw,
    ChangeSatus
};