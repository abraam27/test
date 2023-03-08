const Admin = require("../Models/AdminModel");
class AdminServices{
    constructor(adminName,userName,password){
        this.adminName=adminName;
        this.userName=userName;
        this.password=password;
    }
}
module.exports = AdminServices;