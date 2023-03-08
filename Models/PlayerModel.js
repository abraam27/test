const DB_Connection = require("../DB_Connection");

var PlayerSchema = {
    fullName:{type:String,pattern:"^[a-zA-Z\s\.]*$"},
    phone:{type:String,pattern:"^01[0125][0-9]{8}$"},
    birthDate:{type:String,pattern:"(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[469]|11)[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[13578]|1[02])[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))"},
    location:{type:String,pattern:"^[a-zA-Z\s]*$"},
    email:{
        type:String,pattern:"^[a-zA-Z0-9]+\@[a-zA-Z0-9]+(.com)|(.eg)|(.net)|(.org){1}$"
    },
    userName:{type:String,pattern:"^[a-zA-Z0-9]+$", required:true},
    password:{type:String,minlength:5, required:true},
    image:{type:String},
    role:{type:String,required:true}
}
var Player = DB_Connection.model("Players",PlayerSchema);
module.exports = Player;
