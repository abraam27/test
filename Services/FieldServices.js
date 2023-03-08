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
        var date = new Date();
        var month = (date.getMonth() + 1)<10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1;
        var day = date.getDate()<10 ? "0" + date.getDate() : date.getDate();
        var currentDate = `${date.getFullYear()}/${month}/${day}`;
        var field = await Field.findById(id);
        var calender = [];
        var games = await Game.find({fieldOwnerId:id, date :{$gte: currentDate}});
        if(calender.length == 0){
            var reservedDate = {};
            reservedDate.date = currentDate;
            var reservedHours = [];
            for(var k=0; k<=date.getHours() ;k++){
                reservedHours.push(k);
            }
            reservedDate.reservedHours = reservedHours;
            calender.push(reservedDate);
        }
        for(var i=0 ; i<games.length ; i++){
            if((games[i].date == currentDate) && (+games[i].hour > +date.getHours())){
                console.log(games[i].hour);
                calender[0].reservedHours.push(games[i].hour);
            }
            for(var j=0 ; j<calender.length ; j++){
                if(calender[j].date == games[i].date && (games[i].date != currentDate)){
                    calender[j].reservedHours.push(games[i].hour);
                }
            }
            var flag = 1;
            for(var j=0 ; j<calender.length ; j++){
                if(calender[j].date == games[i].date){
                    flag = 0;
                }
            }
            if(flag){
                console.log(games[i])
                var newReservedDate = {};
                newReservedDate.date = games[i].date;
                var newReservedHours = [];
                newReservedHours.push(games[i].hour);
                newReservedDate.reservedHours = newReservedHours;
                calender.push(newReservedDate);
            }
        }
        field = {...field._doc, calender : calender}
        return field;
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
    static async UpdateStatus(id){
        if(await Field.updateOne({_id:id}, {valid:"1"})){
            return true;
        }else{
            return false;
        }
    }
}
module.exports = FieldServices;