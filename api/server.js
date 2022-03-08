const express = require('express')
const server = express();
const User = require('./users/model')
// BUILD YOUR SERVER HERE
server.use(express.json());
server.get('/api/users',(req, res) => {
User.find()
.then(users => {
    res.json(users);
});
});
//GET
server.get('/api/users/:id', (req, res) => {
   User.findById(req.params.id)
    .then(user => {
        if(user == null){
            res.status(404).json({message: `does not exist`})
        }else{
            res.json(user)
        }
    })
    .catch(() => {
        res.status(400).json({message: `Could not get user`})
    })
})
//POST
server.post('/api/users', (req, res) =>{
    const body = req.body;
    if(!req.body.name || !req.body.bio) {
        res.status(400).json({ message:  "Please provide name and bio for the user" });
        return;
    }
  

User.insert(body)
.then(user =>{
    res.status(201).json(user);
})
.catch(() =>{
    res.status(500).json({message:"There was an error while saving the user to the database"})
})

})





module.exports = server; // EXPORT YOUR SERVER instead of {}
