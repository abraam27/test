const FieldOwner = require("../Models/FieldOwnerModel");
class FieldOwnerServices{
    constructor(fullName,phone,email,userName,password,role,status){
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.status = status;
    }
    static async GetAllFieldOwners(){
        return await FieldOwner.find({});
    }
    static async GetFieldOwnerByID(id){
        return await FieldOwner.findById(id);;
    }
    async AddFieldOwner(){
        var newFieldOwner = new FieldOwner({ fullName: this.fullName, phone: this.phone,email: this.email, userName: this.userName, password: this.password, role:this.role, status:this.status});
        let foundFieldOwner = await FieldOwner.find({$or:[{userName:newFieldOwner.userName},{email:newFieldOwner.email}]}).exec();//null
        if(foundFieldOwner.length==0){
            await newFieldOwner.save();
            return true;
        }else{
            return false;
           
        }
    }
    async UpdateFieldOwner(id){
        if(await FieldOwner.updateOne({_id:id}, {fullName: this.fullName, phone: this.phone,email: this.email, userName: this.userName, password: this.password, role: this.role})){
            return true;
        }else{
            return false;
        }
    }
    static async DeleteFieldOwner(id){
        return await FieldOwner.deleteOne({ _id:id});
    }
}
module.exports = FieldOwnerServices;