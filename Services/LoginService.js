const Player = require("../Models/PlayerModel");
const FieldOwner = require("../Models/FieldOwnerModel");
const Admin = require("../Models/AdminModel");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
var Models = [Player, FieldOwner, Admin]
class LoginService{
    static async LoginUser(userData){
        var foundUser;
        var token;
        for(var i=0 ; i<Models.length ; i++){
            if(userData.userName){
                foundUser = await Models[i].findOne({userName:userData.userName}).exec();
                console.log(foundUser);
                console.log(userData);
                if(foundUser){
                    if(bcrypt.compare(userData.password, foundUser.password)){
                        console.log("-- Done -- username is true & password is true");
                        if(Models[i] == Player){
                            token = jwt.sign({userID:foundUser._id, 
                                fullName:foundUser.fullName, 
                                phone:foundUser.phone, 
                                birthDate:foundUser.birthDate, 
                                location:foundUser.location, 
                                email:foundUser.email, 
                                userName:foundUser.userName,
                                role:foundUser.role},
                                "Arena"); 
                            return token;
                        }else if(Models[i] == FieldOwner){
                            token = jwt.sign({userID:foundUser._id, 
                                fullName:foundUser.fullName, 
                                phone:foundUser.phone, 
                                email:foundUser.email, 
                                userName:foundUser.userName,
                                role:foundUser.role},
                                "Arena"); 
                            return token;
                        }else{
                            token = jwt.sign({userID:foundUser._id, 
                                userName:foundUser.userName, 
                                role:foundUser.role},
                                "Arena")
                            return token;
                        }
                    }else{
                        console.log(" -- Unfortunately -- username is true but password is false");
                        return false;
                    }
                }else{
                    console.log("username false");
                }
            }else if(userData.email){
                foundUser = await Models[i].findOne({email:userData.email}).exec();
                console.log(foundUser);
                console.log(userData);
                if(foundUser){
                    if(bcrypt.compare(userData.password, foundUser.password)){
                        console.log("-- Done -- email is true & password is true");
                        if(Models[i] == Player){
                            token = jwt.sign({userID:foundUser._id, 
                                fullName:foundUser.fullName, 
                                phone:foundUser.phone, 
                                birthDate:foundUser.birthDate, 
                                location:foundUser.location, 
                                email:foundUser.email, 
                                userName:foundUser.userName,
                                role:foundUser.role},
                                "Arena"); 
                            return token;
                        }else if(Models[i] == FieldOwner){
                            token = jwt.sign({userID:foundUser._id, 
                                fullName:foundUser.fullName, 
                                phone:foundUser.phone, 
                                email:foundUser.email, 
                                userName:foundUser.userName,
                                role:foundUser.role},
                                "Arena"); 
                            return token;
                        }else{
                            token = jwt.sign({userID:foundUser._id, 
                                userName:foundUser.userName, 
                                role:foundUser.role},
                                "Arena")
                            return token;
                        }                        
                    }else{
                        console.log("-- Unfortunately --  email is true but password is false");
                        return false;
                    }
                }else{
                    console.log("email false");
                }
            }else{
                return false;
            }
        }
    }
}
module.exports = LoginService;