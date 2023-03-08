const Game = require("../Models/GameModel");
const Field = require("../Models/FieldModel");
class GameServices{
    constructor(playerId,fieldId,date,hour,rate,complain,comment){
        this.playerId=playerId;
        this.fieldId=fieldId;
        this.date=date;
        this.hour=hour;
        this.rate=rate;
        this.complain=complain;
        this.comment=comment;
    }
    static async GetAllGames(){
        return await Game.find({});
    }
    static async GetGameByID(id){
        return await Game.findById(id);;
    }
    async AddGame(){
        var newGame = new Game ({playerId:this.playerId,fieldId:this.fieldId,date:this.date,hour:this.hour,rate:this.rate,complain:this.complain,comment:this.comment });
        await newGame.save();
        return true;
    }
    static async DeleteGame(id){
        return await Game.deleteOne({ _id:id});
    }
    async UpdateGame(id){
        if(await Game.updateOne({_id:id}, {playerId:this.playerId,fieldId:this.fieldId,date:this.date,hour:this.hour,rate:this.rate,complain:this.complain,comment:this.comment})){
            var games = await Game.find({fieldOwnerId:id});
            var sum = 0;
            var count = 0;
            for(var i=0 ; i<games.length ; i++){
                console.log(games[i].rate);
                if(games[i].rate != ""){
                    sum += +games[i].rate;
                    count++;
                }
            }
            var rate = +(sum/count).toFixed(0);
            if(await Field.updateOne({_id:this.fieldId}, {rate: rate})){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    static async GetAllGamesByFieldID(id){
        return await Game.find({fieldId:id});;
    }
}
module.exports = GameServices;