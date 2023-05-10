const express = require('express')
const student = require('./students')
const app = express()
const port = 3000

// add middleware function that read json data from request and return object into req.body
app.use(express.urlencoded({extended:true}));  
app.use(express.json()); // To parse the incoming request with JSON payload


// app.get('/getRequest', (req, res) => {
  // res.status(200).send('Status: OK');
  // res.status(201).send('Status: Created');
  // res.status(204).send('Status: No Content');
  // res.status(400).send('Status: Bad Request');
  // res.status(401).send('Status: Unauthorized');
  // res.status(403).send('Status: Forbidden');
  // res.status(404).send('Status: Not Found');
  // res.status(500).send('Status: Internal Server Error');
  // res.status(503).send('Status: Service Not Available');
  // res.send({
  //   status: 'success',
  //   message: 'get api called'
  // })
// })



app.get('/', (req, res) => {
  res.status(200).send('Status: OK');

});

app.get('/studentData', (req, res) => {
  res.json(student)
});
app.post('/studentData', (req, res) => {
  if(!req.body.email){
    return res.status(400).send('Status: Email is required')
  }

  const user = {
    id  : student.length+1,
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
  }
  student.push(user)
  res.json(user)
});


//put api
app.put('/studentData/:id', (req, res) => {
   let id = req.params.id,
   first_name = req.body.first_name,
   last_name = req.body.last_name,
   email = req.body.email

   let index = student.findIndex((student) =>{
     return (student.id == Number(id))
   })

   if(index>0){
    let std = student[index]
    std.first_name = first_name
    std.last_name = last_name
    std.email = email
    res.json(std)
   }
   else{
    res.status(404)
   }


})


//patch api
app.patch('/updateParticularData', (req, res) => {
  console.log('req body:', req.body)
  res.send({
    message: 'patch api called successfully'
  })
})

//delete api
app.delete('/deleteRequest', (req, res) => {
  console.log('req body:', req.body)
  res.send({
    message: 'delete api called successfully'
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})