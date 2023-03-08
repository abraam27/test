const FieldOwner = require("../Models/FieldOwnerModel");
const nodemailer = require("../Configiration/nodeMailer.config");
const Field = require("../Models/FieldModel");

class FieldOwnerServices{
    constructor(fullName,phone,email,userName,password,role,status){
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.status=status;
    }
    static async GetAllFieldOwners(){
        return await FieldOwner.find({});
    }
    static async GetFieldOwnerByID(id){
        return await FieldOwner.findById(id);;
    }
    async AddFieldOwner(){
        var newFieldOwner = new FieldOwner({ fullName: this.fullName, phone: this.phone,email: this.email, userName: this.userName, password: this.password, role:this.role,status:this.status});
        let foundFieldOwner = await FieldOwner.find({$or:[{userName:newFieldOwner.userName},{email:newFieldOwner.email}]}).exec();//null
        if(foundFieldOwner.length==0){
            await newFieldOwner.save();
            nodemailer.sendConfirmationEmail(this.fullName,this.email,this.userName);
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
    static async ChangeStatus(userName){
        if(await FieldOwner.updateOne({userName:userName}, {status: 'Active'})){
            return true;
        }else{
            return false;
        }
    }
    static async ResetPassword(userName, password){
        if(await Field.updateOne({userName:userName}, {password:password})){
            return true;
        }else{
            return false;
        }
    }
    static SendEmailPw (fullName,email,userName){
        nodemailer.sendResetEmail(fullName,email,userName);
        return true
   }
}
module.exports = FieldOwnerServices;