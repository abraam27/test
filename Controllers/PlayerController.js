const PlayerValidate = require("../Utils/PlayerValidation");
const AuthValidation = require("../Utils/AuthValidation");
const PlayerServices = require("../Services/PlayerServices");
const bcrypt= require("bcrypt");

var GetAllPlayers = async (req, res)=>{
    res.status(200).json(await PlayerServices.GetAllPlayers());
};
var GetPlayerByID = async (req, res)=>{
    res.status(200).json(await PlayerServices.GetPlayerByID(req.params.id));
};
var AddNewPlayer = async (req, res)=>{
    // console.log(req.body);
    // console.log(req.file);
    // res.json({body:req.body,file:req.file});
    var HashedPassword = await bcrypt.hash(req.body.password,10);
    var newPlayer = new PlayerServices(req.body.fullName, req.body.phone, req.body.birthDate, req.body.location, req.body.email, req.body.userName, HashedPassword,"player_image","Player","Pending");
    var newPlayerr = {...newPlayer, password:req.body.password};
    if(PlayerValidate(newPlayerr)){
        if(await newPlayer.AddPlayer()){
            res.status(201).send("Add Successfully !");
        }else{
            res.status(400).send("Not Added !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
        console.log(PlayerValidate.errors);
    }
};
var UpdatePlayer = async (req, res)=>{
    var HashedPassword = await bcrypt.hash(req.body.password,10);
    var updatedPlayer = new PlayerServices(req.body.fullName, req.body.phone, req.body.birthDate, req.body.location, req.body.email, req.body.userName,req.body.image ,HashedPassword,req.body.role,req.body.status);
    var newPlayerr = {...newPlayer, password:req.body.password};

    if(PlayerValidate(newPlayerr)){
        if(updatedPlayer.UpdatePlayer(req.body._id)){
            res.status(200).send("Updated Successfully !");
        }else{
            res.status(400).send("Not Updated !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
    }
};
var UpdateImage = async (req, res)=>{
    var HashedPassword = await bcrypt.hash(req.body.password,10);
    var updatedImage = new PlayerServices(req.body.fullName, req.body.phone, req.body.birthDate, req.body.location, req.body.email, req.body.userName,req.file.filename,HashedPassword,req.body.role,req.body.status);
    var newPlayerr = {...newPlayer, password:req.body.password};

    if(PlayerValidate(newPlayerr)){
        if(updatedImage.UpdateImage(req.params._id)){
            res.status(200).send("Updated Successfully !");
        }else{
            res.status(400).send("Not Updated !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
    }
};

var DeletePlayer = async (req, res)=>{
    if(PlayerServices.DeletePlayer(req.params.id)){
        res.status(201).send("Deleted Successfully !");
    }else{
        res.status(400).send("Not Deleted !");
    }
};
var GetAllGamesByPlayerID = async (req, res)=>{
    let games =await PlayerServices.GetAllGamesByPlayerID(req.params.id)
    if(games){
        res.status(201).json(games);
    }else{
        res.status(400).send("there is no games !");
    }
};
var ChangeSatus = async (req, res)=>{
    if(PlayerServices.ChangeStatus(req.params.userName)){
        res.status(201).send("Status Updated Successfully !");
    }else{
        res.status(400).send("Not Updated !");
    }
};
var ResetPassword = async (req, res)=>{
    var HashedPassword = await bcrypt.hash(req.body.password,10);
    if(PlayerServices.ResetPassword(req.params.userName,HashedPassword)){
        res.status(201).send("password Updated Successfully !");
    }else{
        res.status(400).send("Not Updated !");
    }
};
var SendEmailPw = async (req, res)=>{
    if(PlayerServices.SendEmailPw(req.params.email)){
        res.status(201).send("sent it Successfully !");
    }else{
        res.status(400).send("Not sent !");
    }
};
module.exports = {
    GetAllPlayers,
    GetPlayerByID,
    AddNewPlayer,
    UpdatePlayer,
    DeletePlayer,
    GetAllGamesByPlayerID,
    UpdateImage,
    ChangeSatus,
    ResetPassword,
    SendEmailPw
};