const Field = require("../Models/FieldModel");
const Game = require("../Models/GameModel");
class FieldServices{
    constructor(fieldName,location,price,rate,fieldOwnerId,valid){
        this.fieldName=fieldName;
        this.location=location;
        this.price=price;
        this.rate=rate;
        this.fieldOwnerId=fieldOwnerId;
        this.valid=valid;
    }
    static async GetAllFields(){
        return await Field.find({});
    }
    static async GetFieldByID(id){
        var field = await Field.findById(id);
        var hoursOfDay = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 18, 19, 20, 21, 22, 23]
        var reservedHours = [];
        var games = await Game.find({fieldOwnerId:id});
        const date = new Date();
        let month = (date.getMonth() + 1)<10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
        let day = date.getDate()<10 ? "0" + date.getDate() : date.getDate();
        let currentDate = `${date.getFullYear()}/${month}/${day}`;
        for(var i=0 ; i<games.length ; i++){
            if(games[i].date == currentDate){
                for(var j=0 ; j<hoursOfDay.length ; j++){
                    if(date.getHours >= hoursOfDay[j]){
                        reservedHours.push(hoursOfDay[j]);
                    }
                    console.log(reservedHours);
                }
            }
        }
        return  field;
    }
    async AddField(){
        var newField = new Field({ fieldName: this.fieldName, location: this.location, price: this.price, rate: this.rate, fieldOwnerId: this.fieldOwnerId,valid:this.valid});
            await newField.save();
            return true;
        
    }
    async UpdateField(id){
        if(await Field.updateOne({_id:id}, {fieldName: this.fieldName, location: this.location, price: this.price, rate: this.rate, fieldOwnerId: this.fieldOwnerId,valid:this.valid})){
            return true;
        }else{
            return false;
        }
    }
    static async DeleteField(id){
        return await Field.deleteOne({ _id:id});
    }
    static async GetAllFieldsByFieldOwnerID(id){
        return await Field.find({fieldOwnerId:id});
    }

    static async GetAllValidFields(){
        return await Field.find({valid:1})
    }
    static async GetNotValidFields(){
        return await Field.find({valid:0})
    }
    static async GetFieldsByLocation(location){
        return await Field.find({location: { $regex: '.*' + location + '.*' },valid:1})
    }
}
module.exports = FieldServices;