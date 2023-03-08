const FieldValidate = require("../Utils/FieldValidation");
const FieldServices = require("../Services/FieldServices");
var GetAllFields = async (req, res)=>{
    res.status(200).json(await FieldServices.GetAllFields());
};
var GetFieldByID = async (req, res)=>{
    res.status(200).json(await FieldServices.GetFieldByID(req.params.id));
};
var GetAllValidFields = async (req, res)=>{
    res.status(200).json(await FieldServices.GetAllValidFields());
};
var GetNotValidFields = async (req, res)=>{
    res.status(200).json(await FieldServices.GetNotValidFields());
};
var AddNewField = async(req, res)=>{
    var newField = new FieldServices(req.body.fieldName,req.body.location,req.body.price,"3",req.body.fieldOwnerId,"0");
    console.log(newField);
    if(FieldValidate(newField)){
        if(await newField.AddField()){
            res.status(201).send("Add Successfully !");
        }else{
            res.status(400).send("Not Added !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
    }
};
var UpdateField = (req, res)=>{
    var updatedField = new FieldServices(req.body.fieldName,req.body.location,req.body.price,req.body.rate,req.body.fieldOwnerId,req.body.valid);
    console.log(updatedField);
    if(FieldValidate(updatedField)){
        if(updatedField.UpdateField(req.body._id)){
            res.status(201).send("Updated Successfully !");
        }else{
            res.status(400).send("Not Updated !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
    }
};
var DeleteField = async (req, res)=>{
    if(FieldServices.DeleteField(req.params.id)){
        res.status(201).send("Deleted Successfully !");
    }else{
        res.status(400).send("Not Deleted !");
    }
};
var GetAllFieldsByFieldOwnerID = async (req, res)=>{
    res.status(200).json(await FieldServices.GetAllFieldsByFieldOwnerID(req.params.id));
};
var GetFieldsByLocation = async (req, res)=>{
    res.status(200).json(await FieldServices.GetFieldsByLocation(req.params.location));
};
module.exports = {
    GetAllFields,
    GetFieldByID,
    AddNewField,
    UpdateField,
    DeleteField,
    GetAllFieldsByFieldOwnerID,
    GetAllValidFields,
    GetNotValidFields,
    GetFieldsByLocation
};