const Ajv = require("ajv");
var ajv = new Ajv();
const FieldSchema = {
    type:"object",
    properties:{
        fieldName:{type:"string",pattern:"^[a-zA-Z\s\.]*$" },
        location:{type:"string",pattern:"^[a-zA-Z\s\.]*$" },
        price:{type:"string",pattern:"^[0-9]+$",maxLength:3,minLength:1},
        rate:{type:"string",pattern:"^[1-5]+$",maxLength:1},
        fieldOwnerId:{type:"string"},
        valid:{type:"string",pattern:"^[0-1]+$"},
        
    },
    required:["fieldName","location","price","fieldOwnerId"],
    additionalProperties:false
}
const FieldValidate = ajv.compile(FieldSchema);

module.exports = FieldValidate;

