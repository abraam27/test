const DB_Connection = require("../DB_Connection");
var FieldSchema = {

    fieldName:{type:String,pattern:"^[a-zA-Z\s\.]*$", required:true},
    location:{type:String,pattern:"^[a-zA-Z\s\.]*$", required:true},
    price:{type:String,pattern:"^[0-9]+$",maxLength:3,minLength:1, required:true},
    rate:{type:String,pattern:"^[1-5]+$",maxLength:1},
    fieldOwnerId:{type:String,pattern:"^[a-zA-Z0-9]+$", required:true},
    valid:{type:String,pattern:"^[0-1]+$"}

}
var Field = DB_Connection.model("Fields",FieldSchema);
module.exports = Field;
