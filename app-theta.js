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
//Test DataBase
app.get('/testdb' , async (request, response) => {
    let res = await pool.query('SELECT * FROM public.todoList')
    response.json({
        todo: res.rows
    })
    //console.log(res.rows);
})

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
//Creating Tasks to table along with auto increment 
app.post('/create', async(req, res)=>{
    let query = await pool.query(`INSERT INTO todolist
    (task,done)
    VALUES($1, $2)`,
    [req.body.task, req.body.done])
    //console.log(result)
    res.json({
        "status": "Task Created"
    })
})

//Shows done tasks
app.get('/doneTask', async(req, res)=>{
    let response = await pool.query('SELECT * FROM toDoList WHERE done=$1',[req.body.done])
    //console.log(response);
    res.json({
        "Tasks Status": response.rows
    })
})

//Count of task
app.get('/countTask', async(req, res)=>{
    let total = await pool.query('SELECT COUNT (id) FROM toDoList ')
    let done = await pool.query('SELECT COUNT (task) FROM toDoList WHERE done=true')
    let pending = await pool.query('SELECT COUNT (task) FROM toDoList WHERE done=false')
    //onsole.log('Total Tasks' + response);
    res.json({
        "Total": total.rows[0],
        "Done" :done.rows,
        "Pending": pending.rows
    })
})

//Getting one task
app.get('/oneTask', async(req, res)=>{
    let response = await pool.query('SELECT * FROM toDoList WHERE id=$1',[req.body.id])
    //console.log(response);
    res.json({
        "Tasks Status": response.rows
    })
})

//Update Tasks
app.put('/update', async (req, res) =>{
    let updated = await pool.query (`UPDATE todolist
    SET task = $2 
    WHERE id = $1`,
    [req.body.id, req.body.task])
    res.json({
        'Status': 'Task Updated'
    })
})

//Update Status
app.put('/updatedStatus', async (req, res) =>{
    let updated = await pool.query (`UPDATE todolist
    SET done = $2 
    WHERE id = $1`,
    [req.body.id, req.body.done])
    res.json({
        'Status': 'Task Status Updated'
    })
})

//Delete Task
app.delete('/delete', async(req, res)=>{
    let query = await pool.query('DELETE FROM todolist where id = $1', [req.body.id])
    res.json({
        "status": "Task Deleted"
    })
})

//To Liten
app.listen(port, () => {
    console.log(`Server listening on port  http://localhost:${port}`)
})