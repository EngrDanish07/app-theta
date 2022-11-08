const express = require ('express');
const bodyParser = require('body-parser'); 
const app = express();
const port = 3000;
const pool = require ('./dbConn');
//const path = require('path');

//Text
app.get('/' , (request, response) => {
    response.send("Responding..")
    //response.json({info: 'Node.js, Express and Postgres API'})
})

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

//Test DataBase
app.get('/testdb' , async (request, response) => {
    let res = await pool.query('SELECT * FROM public.toDoList')
    response.json({
        todo: res.rows
    })
    //console.log(res.rows);
    //response.json({info: 'Node.js, Express and Postgres API'})
})

app.post('/todo/create', async(req, res)=>{
    //console.log(req.body);
    let result = await pool.query(`INSERT INTO public.todolist
    (id,task,done)
    VALUES($1, $2, $3)`,
    [req.body.id, req.body.task, req.body.done])
    //console.log(result)
    res.json({
        "status": "Task Created"
    })
})
/* app.put('/updated', (req, res) => {
    res.send("Chill")
});
 */

//To Liten
app.listen(port, () => {
    console.log(`Server listening on port  ${port}`)
})