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
    var newPlayer = new PlayerServices(req.body.fullName, req.body.phone, req.body.birthDate, req.body.location, req.body.email, req.body.userName, HashedPassword,"Player_Image","Player");
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
    var updatedPlayer = new PlayerServices(req.body.fullName, req.body.phone, req.body.birthDate, req.body.location, req.body.email, req.body.userName, HashedPassword);
    if(PlayerValidate(updatedPlayer)){
        if(updatedPlayer.UpdatePlayer(req.body._id)){
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
    let games = await PlayerServices.GetAllGamesByPlayerID(req.params.id)
    if(games){
        res.status(201).json(games);
    }else{
        res.status(400).send("there is no games !");
    }
};
var GetAllNextGamesByPlayerID = async (req, res)=>{
    let games = await PlayerServices.GetAllNextGamesByPlayerID(req.params.id)
    if(games){
        res.status(201).json(games);
    }else{
        res.status(400).send("there is no games !");
    }
};
var GetAllPreviousGamesByPlayerID = async (req, res)=>{
    let games = await PlayerServices.GetAllPreviousGamesByPlayerID(req.params.id)
    if(games){
        res.status(201).json(games);
    }else{
        res.status(400).send("there is no games !");
    }
};
module.exports = {
    GetAllPlayers,
    GetPlayerByID,
    AddNewPlayer,
    UpdatePlayer,
    DeletePlayer,
    GetAllGamesByPlayerID,
    GetAllNextGamesByPlayerID,
    GetAllPreviousGamesByPlayerID
};