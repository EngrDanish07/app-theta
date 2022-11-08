const express = require ('express');
const app = express();
const port = 3000;
const pool = require ('./dbConn');
//const path = require('path');

//Text
/* app.get('/' , (request, response) => {
    response.json({info: 'Node.js, Express and Postgres API'})
}) */

//Test DataBase
app.get('/' , async (request, response) => {
    let res = await pool.query('SELECT * FROM public.toDoList')
    console.log(res);
    response.json({info: 'Node.js, Express and Postgres API'})
})


//To Liten
app.listen(port, () => {
    console.log(`Server listening on port  ${port}`)
})