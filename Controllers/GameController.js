const GameValidate = require("../Utils/GameValidation");
const GameServices = require("../Services/GameServices");
var GetAllGames = async (req, res)=>{
    res.status(200).json(await GameServices.GetAllGames());
};
var GetGameByID = async (req, res)=>{
    res.status(200).json(await GameServices.GetGameByID(req.params.id));
};

var AddNewGame = (req, res)=>{
    var newGame = new GameServices(req.body.playerId,req.body.fieldId,req.body.date,req.body.hour,"","","");
    console.log(newGame);
    if(GameValidate(newGame)){
        if(newGame.AddGame()){
            res.status(201).send("Add Successfully !");
        }else{
            res.status(400).send("Not Added !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
    }
};
var UpdateGame = (req, res)=>{
    var updatedGame = new GameServices(req.body.playerId,req.body.fieldId,req.body.date,req.body.hour,req.body.rate,req.body.complain,req.body.comment);
    if(GameValidate(updatedGame)){
        if(updatedGame.UpdateGame(req.body._id)){
            res.status(201).send("Updated Successfully !");
        }else{
            res.status(400).send("Not Updated !");
        }
    }else{
        res.status(400).send("Validation Not Added !");
    }
};
var DeleteGame = async (req, res)=>{
    if(GameServices.DeleteGame(req.params.id)){
        res.status(201).send("Deleted Successfully !");
    }else{
        res.status(400).send("Not Deleted !");
    }
};
var GetAllGamesByFieldID = async (req, res)=>{
    res.status(200).json(await GameServices.GetAllGamesByFieldID(req.params.id));
};
module.exports = {
    GetAllGames,
    GetGameByID,
    AddNewGame,
    UpdateGame,
    DeleteGame,
    GetAllGamesByFieldID,  
};