const { request, response } = require("express");
const token = process.env.BASIC_TOKEN;

const checkBasic = (request, response, next)=>{
    if (request.headers && request.headers['authorization'] && request.headers['authorization'].split('')[1] === token )
    next();
    else
    response.status(401).json({
        "Error ": "Invalid Tocken"
    })
}
module.exports