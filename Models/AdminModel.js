const DB_Connection = require("../DB_Connection");
var AdminSchema = {
    
    adminName:{type:String,required:true},
    userName:{type:String,pattern:"^[a-zA-Z0-9]+$", required:true},
    password:{type:String,minlength:5, required:true},
    role:{type:String, required:true}

}
var Admin = DB_Connection.model("Admin",AdminSchema);
module.exports = Admin;
