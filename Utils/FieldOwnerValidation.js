const Ajv = require("ajv");
var ajv = new Ajv();
const FieldOwnerSchema = {
    type:"object",
    properties:{
        fullName:{type:"string"},
        phone:{type:"string",pattern:"^01[0125][0-9]{8}$"},
        email:{type:"string", pattern:"^[a-zA-Z0-9\._\-]+\@[a-zA-Z0-9]+(.com)|(.eg)|(.net)|(.org){1}$"},
        userName:{type:"string",pattern:"^[a-zA-Z0-9]+$"},
        password:{type:"string", minLength:5},
        role:{type:"string"},
        status: {type: "string"}

    },
    required:["fullName", "phone", "userName", "password","role"],
    additionalProperties:false
}
const FieldOwnerValidate = ajv.compile(FieldOwnerSchema);

module.exports = FieldOwnerValidate;

